/* =============================================================
   City Garden — optional AI drafting endpoint  (Cloudflare Worker)
   =============================================================

   The review page works perfectly without this file. It drafts
   reviews on the device, instantly and for free. Deploy this only
   if you want an AI model to do the writing instead.

   WHY A SERVER AT ALL?
   An API key put into review/index.html would be readable by anyone
   who opens the page source, and they could spend your credit. The
   key belongs on a server. This Worker is that server: the page
   sends it the guest's answers, it calls the model, it sends back
   text. The key never leaves Cloudflare.

   DEPLOY (about five minutes, free tier is plenty):
     1. npm install -g wrangler && wrangler login
     2. Save this file as worker.js in an empty folder
     3. wrangler deploy worker.js --name citygarden-review
     4. wrangler secret put ANTHROPIC_API_KEY     (paste the key)
     5. Copy the deployed URL, then in review/index.html set:
          aiEndpoint: "https://citygarden-review.<you>.workers.dev"

   If the endpoint is slow, down, or out of credit, the page quietly
   falls back to drafting on the device. The guest never sees an error.
   ============================================================= */

const ALLOWED_ORIGINS = [
  "https://www.citygarden.co.in",
  "https://citygarden.co.in"
  // add your GitHub Pages origin here while testing, e.g.
  // "https://arsh77344.github.io"
];

const MODEL = "claude-sonnet-4-5";

function cors(origin) {
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400"
  };
}

function buildPrompt(d) {
  const stars = Number(d.stars) || 5;
  const tone =
    stars >= 4 ? "genuinely positive, but not gushing"
    : stars === 3 ? "balanced — real positives and real reservations, neither softened"
    : "clearly dissatisfied and fair, written by someone who wants the problems fixed";

  return `Write a Google review of ${d.business}, in the voice of the guest described below.

WHAT THE GUEST TOLD US
Rating: ${stars} out of 5 ("${d.experience}")
Parts of the experience they chose to talk about: ${(d.topics || []).join(", ") || "none specified"}
Their own words: ${d.comment ? `"${d.comment}"` : "(they did not add anything)"}

RULES — these matter more than style
1. Invent nothing. Do not add facts, numbers, dates, names, dishes, guest counts
   or events the guest did not mention. If they gave you little, write something short.
2. Match the rating honestly. A ${stars}-star review must read as ${tone}.
   Never talk someone out of a complaint or inflate a lukewarm experience.
3. Keep the guest's own words and meaning intact. Tidy the grammar, do not
   reinterpret what they said or put opinions in their mouth.
4. Write only about the parts listed above. Say nothing about anything else.
5. First person, plain Indian English, the way a real person writes a review.
   No marketing language, no slogans, no exclamation marks, no emoji, no headings.
6. Length: between ${d.targetWords?.[0] || 70} and ${d.targetWords?.[1] || 105} words.

SEARCH PHRASING
Readers find this venue by searching things like: ${(d.keywords || []).slice(0, 6).join("; ") || "a wedding venue in Varanasi"}.
Work AT MOST ONE of those phrases in, only where it falls naturally in a sentence
a real person would write, and only if the rating is 3 stars or higher. A review
that reads like an advertisement gets removed by Google and embarrasses the venue,
so when in doubt leave it out entirely.
${d.variant ? `\nThis is an alternative draft — vary the structure and opening from an obvious first attempt.` : ""}

Reply with the review text only. No preamble, no quotation marks, no notes.`;
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const headers = cors(origin);

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers });
    if (request.method !== "POST") return new Response("POST only", { status: 405, headers });
    if (origin && !ALLOWED_ORIGINS.includes(origin)) return new Response("Forbidden", { status: 403, headers });

    let data;
    try { data = await request.json(); }
    catch { return Response.json({ error: "bad json" }, { status: 400, headers }); }

    // Keep a stray paste from turning into a large bill.
    if (typeof data.comment === "string" && data.comment.length > 1200) {
      data.comment = data.comment.slice(0, 1200);
    }

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
          model: MODEL,
          max_tokens: 700,
          temperature: 1,
          messages: [{ role: "user", content: buildPrompt(data) }]
        })
      });

      if (!res.ok) {
        // The page falls back to its own drafting, so a soft failure is fine.
        return Response.json({ error: "upstream", status: res.status }, { status: 502, headers });
      }

      const out = await res.json();
      const review = (out.content || [])
        .filter(b => b.type === "text")
        .map(b => b.text)
        .join("")
        .trim()
        .replace(/^["']|["']$/g, "");

      if (!review) return Response.json({ error: "empty" }, { status: 502, headers });
      return Response.json({ review }, { headers });

    } catch (err) {
      return Response.json({ error: "failed" }, { status: 502, headers });
    }
  }
};
