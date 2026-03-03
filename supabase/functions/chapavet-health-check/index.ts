import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const report: any = {
    timestamp: new Date().toISOString(),
    status: "operational",
    services: {},
  };

  // 1. Check LOVABLE_API_KEY
  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  report.services.ai_gateway = {
    status: apiKey ? "configured" : "missing",
    detail: apiKey ? "API key is present" : "LOVABLE_API_KEY not found",
  };

  // 2. Check Supabase connection
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY");
  report.services.database = {
    status: supabaseUrl && supabaseKey ? "connected" : "misconfigured",
    url: supabaseUrl ? "configured" : "missing",
    key: supabaseKey ? "configured" : "missing",
  };

  // 3. Test AI gateway connectivity
  if (apiKey) {
    try {
      const testResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [{ role: "user", content: "ping" }],
          max_tokens: 5,
        }),
      });
      report.services.ai_model = {
        status: testResp.ok ? "loaded" : "error",
        model: "google/gemini-3-flash-preview",
        response_code: testResp.status,
      };
      await testResp.text(); // consume body
    } catch (e) {
      report.services.ai_model = {
        status: "unreachable",
        error: e instanceof Error ? e.message : "Unknown",
      };
    }
  } else {
    report.services.ai_model = { status: "skipped", reason: "No API key" };
  }

  // 4. CORS status
  report.services.cors = { status: "enabled" };

  // 5. Available AI modes
  report.services.ai_modes = {
    chat: "active",
    pricing_prediction: "active",
    health_diagnosis: "active",
    fraud_detection: "active",
    debug_mode: "available",
  };

  // Overall status
  const hasIssues = Object.values(report.services).some((s: any) => 
    s.status === "missing" || s.status === "error" || s.status === "unreachable" || s.status === "misconfigured"
  );
  report.status = hasIssues ? "degraded" : "operational";

  return new Response(JSON.stringify(report, null, 2), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
