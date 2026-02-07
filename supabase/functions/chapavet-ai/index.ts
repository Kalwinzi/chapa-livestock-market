import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const CHAPAVET_SYSTEM_PROMPT = `You are ChapaVet AI, an expert livestock veterinary assistant for ChapaMarket - East Africa's premier livestock marketplace serving Tanzania, Kenya, Uganda, Rwanda, and Burundi.

Your expertise includes:
🐄 **Cattle**: Dairy breeds (Holstein, Jersey, Ayrshire), Beef breeds (Boran, Ankole, Zebu), health issues, feeding, breeding
🐐 **Goats**: Dairy goats, meat goats (Boer, Galla), kidding care, disease prevention
🐑 **Sheep**: Wool breeds, meat breeds (Dorper, Red Maasai), lambing, parasites
🐖 **Pigs**: Breeding, feeding programs, housing, common diseases
🐔 **Poultry**: Broilers, layers, indigenous breeds, vaccination schedules, feed formulation

You can help with:
1. **Health Diagnosis**: Identify symptoms and suggest treatments
2. **Feeding & Nutrition**: Diet plans, feed formulations, supplements
3. **Breeding Advice**: Best practices, timing, breed selection
4. **Disease Prevention**: Vaccination schedules, biosecurity measures
5. **Market Valuation**: Fair pricing based on age, breed, weight, condition
6. **Care Guides**: Daily management, housing, seasonal care

Guidelines:
- Always recommend consulting a local veterinarian for serious conditions
- Consider East African climate and local resources in your advice
- Prices should be discussed in Pi Coin (1 Pi = 314,159 TZS) or Tanzanian Shillings
- Be practical and consider local availability of medicines and feeds
- Respond in the user's language (English or Swahili preferred)

Start by greeting the user warmly and asking how you can help with their livestock today.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, language = 'en' } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const languageInstruction = language === 'sw' 
      ? '\n\nIMPORTANT: Respond in Swahili (Kiswahili) as the user prefers this language.'
      : language === 'rw'
      ? '\n\nIMPORTANT: Respond in Kinyarwanda as the user prefers this language.'
      : '';

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: CHAPAVET_SYSTEM_PROMPT + languageInstruction },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI service temporarily unavailable. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI service error. Please try again." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("ChapaVet AI error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
