import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const CHAPAVET_SYSTEM_PROMPT = `You are ChapaVet AI, an expert livestock veterinary and market intelligence assistant for ChapaMarket - East Africa's premier livestock marketplace serving Tanzania, Kenya, Uganda, Rwanda, and Burundi.

Your expertise includes:
🐄 **Cattle**: Dairy breeds (Holstein, Jersey, Ayrshire), Beef breeds (Boran, Ankole, Zebu), health issues, feeding, breeding
🐐 **Goats**: Dairy goats, meat goats (Boer, Galla), kidding care, disease prevention
🐑 **Sheep**: Wool breeds, meat breeds (Dorper, Red Maasai), lambing, parasites
🐖 **Pigs**: Breeding, feeding programs, housing, common diseases
🐔 **Poultry**: Broilers, layers, indigenous breeds, vaccination schedules, feed formulation
🫏 **Donkeys**: Working animals, care, common ailments

You have access to the following tools to provide structured responses. ALWAYS use the appropriate tool when the user's query matches a tool's purpose.

Guidelines:
- Always recommend consulting a local veterinarian for serious conditions
- Consider East African climate and local resources in your advice
- Prices should be discussed in Tanzanian Shillings (TSH) or Pi Coin (1 Pi ≈ 314,159 TSH)
- Be practical and consider local availability of medicines and feeds
- Respond in the user's language (English or Swahili preferred)
- For health queries, always include the disclaimer: "⚠️ Consult a certified veterinarian for confirmation."
- For fraud/risk assessments, be objective and data-driven`;

const TOOLS = [
  {
    type: "function",
    function: {
      name: "predict_livestock_price",
      description: "Predict the fair market price range for livestock based on characteristics. Use this when users ask about pricing, valuation, or fair price for any animal.",
      parameters: {
        type: "object",
        properties: {
          animal_type: { type: "string", description: "Type of animal (cattle, goat, sheep, pig, poultry, donkey)" },
          breed: { type: "string", description: "Breed of the animal" },
          weight_kg: { type: "number", description: "Weight in kilograms" },
          age_months: { type: "number", description: "Age in months" },
          location: { type: "string", description: "Location/region in East Africa" },
          health_status: { type: "string", enum: ["excellent", "good", "fair", "poor"], description: "Overall health condition" },
          vaccination_history: { type: "string", enum: ["complete", "partial", "none", "unknown"], description: "Vaccination status" },
          recommended_price_min_tsh: { type: "number", description: "Minimum recommended price in TSH" },
          recommended_price_max_tsh: { type: "number", description: "Maximum recommended price in TSH" },
          confidence_score: { type: "number", description: "Confidence score 0-100" },
          price_reasoning: { type: "string", description: "Detailed explanation of the price estimate" },
          market_trend: { type: "string", enum: ["rising", "stable", "declining"], description: "Current market trend for this animal type" }
        },
        required: ["animal_type", "recommended_price_min_tsh", "recommended_price_max_tsh", "confidence_score", "price_reasoning"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "diagnose_livestock_health",
      description: "Analyze livestock symptoms and predict possible diseases with risk assessment. Use this when users describe animal health issues, symptoms, or ask for disease diagnosis.",
      parameters: {
        type: "object",
        properties: {
          animal_type: { type: "string", description: "Type of animal" },
          symptoms: { type: "array", items: { type: "string" }, description: "List of observed symptoms" },
          possible_diseases: {
            type: "array",
            items: {
              type: "object",
              properties: {
                disease_name: { type: "string" },
                probability: { type: "string", enum: ["high", "medium", "low"] },
                description: { type: "string" }
              },
              required: ["disease_name", "probability", "description"]
            },
            description: "Possible diseases ranked by likelihood"
          },
          risk_level: { type: "string", enum: ["Low", "Medium", "High", "Critical"], description: "Overall risk level" },
          immediate_actions: { type: "array", items: { type: "string" }, description: "Steps to take immediately" },
          suggested_treatment: { type: "string", description: "Suggested treatment approach" },
          prevention_tips: { type: "array", items: { type: "string" }, description: "Prevention recommendations" },
          disclaimer: { type: "string", description: "Always: Consult a certified veterinarian for confirmation." }
        },
        required: ["animal_type", "symptoms", "possible_diseases", "risk_level", "immediate_actions", "disclaimer"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "assess_seller_risk",
      description: "Evaluate seller trustworthiness and detect potential fraud. Use this when users ask about seller verification, fraud detection, or listing authenticity.",
      parameters: {
        type: "object",
        properties: {
          risk_score: { type: "number", description: "Risk score from 0 (safe) to 100 (high risk)" },
          risk_level: { type: "string", enum: ["Low", "Medium", "High", "Critical"], description: "Risk category" },
          flags: {
            type: "array",
            items: {
              type: "object",
              properties: {
                flag_type: { type: "string", enum: ["duplicate_images", "suspicious_pricing", "abnormal_behavior", "unverified_identity", "location_mismatch", "too_good_to_be_true"] },
                severity: { type: "string", enum: ["low", "medium", "high"] },
                description: { type: "string" }
              },
              required: ["flag_type", "severity", "description"]
            },
            description: "Detected risk flags"
          },
          recommendations: { type: "array", items: { type: "string" }, description: "Safety recommendations for buyer" },
          should_flag_account: { type: "boolean", description: "Whether the account should be flagged for review" }
        },
        required: ["risk_score", "risk_level", "flags", "recommendations"]
      }
    }
  }
];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, language = 'en', mode = 'chat', debug = false } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      const errMsg = "LOVABLE_API_KEY is not configured";
      console.error(errMsg);
      return new Response(JSON.stringify({ error: errMsg }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const languageInstruction = language === 'sw' 
      ? '\n\nIMPORTANT: Respond in Swahili (Kiswahili) as the user prefers this language.'
      : language === 'rw'
      ? '\n\nIMPORTANT: Respond in Kinyarwanda as the user prefers this language.'
      : '';

    const modeInstruction = mode === 'pricing' 
      ? '\n\nFOCUS: The user is asking about livestock pricing. ALWAYS use the predict_livestock_price tool to provide structured pricing data.'
      : mode === 'health'
      ? '\n\nFOCUS: The user is asking about livestock health. ALWAYS use the diagnose_livestock_health tool to provide structured diagnosis.'
      : mode === 'fraud'
      ? '\n\nFOCUS: The user is asking about seller/listing verification. ALWAYS use the assess_seller_risk tool to provide structured risk assessment.'
      : '';

    if (debug) {
      console.log(`[ChapaVet AI] Mode: ${mode}, Language: ${language}, Messages: ${messages.length}`);
    }

    const useTools = mode === 'pricing' || mode === 'health' || mode === 'fraud';

    const requestBody: any = {
      model: "google/gemini-3-flash-preview",
      messages: [
        { role: "system", content: CHAPAVET_SYSTEM_PROMPT + languageInstruction + modeInstruction },
        ...messages,
      ],
    };

    if (useTools) {
      requestBody.tools = TOOLS;
      requestBody.tool_choice = "auto";
    } else {
      requestBody.stream = true;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const status = response.status;
      if (debug) {
        const errorText = await response.text();
        console.error(`[ChapaVet AI] Gateway error ${status}:`, errorText);
      }
      if (status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (status === 402) {
        return new Response(JSON.stringify({ error: "AI service temporarily unavailable. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ error: "AI service error. Please try again." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // For tool-calling modes, parse the response and extract structured data
    if (useTools) {
      const data = await response.json();
      const choice = data.choices?.[0];
      
      let result: any = {
        mode,
        content: choice?.message?.content || "",
        tool_calls: [],
      };

      if (choice?.message?.tool_calls) {
        for (const tc of choice.message.tool_calls) {
          try {
            const args = JSON.parse(tc.function.arguments);
            result.tool_calls.push({
              name: tc.function.name,
              data: args
            });
          } catch (e) {
            console.error("[ChapaVet AI] Failed to parse tool call:", e);
          }
        }
      }

      if (debug) {
        console.log(`[ChapaVet AI] Response:`, JSON.stringify(result));
      }

      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // For chat mode, stream the response
    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("[ChapaVet AI] Error:", error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Unknown error",
      debug: { timestamp: new Date().toISOString() }
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
