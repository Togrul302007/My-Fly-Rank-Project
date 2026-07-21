// Set to true or use searchParams/headers to test sabotage paths
const SABOTAGE_CONFIG = {
  FAIL_IMMEDIATELY: false, // Tests immediate 500 error
  FAIL_MID_STREAM: false,  // Tests error halfway through streaming
  RATE_LIMIT: false,       // Tests 429 status code
};

export async function POST(req: Request) {
  if (SABOTAGE_CONFIG.RATE_LIMIT) {
    return new Response("Too Many Requests", { status: 429 });
  }

  if (SABOTAGE_CONFIG.FAIL_IMMEDIATELY) {
    return new Response("Internal Server Error: Model Overloaded", { status: 500 });
  }

  if (SABOTAGE_CONFIG.FAIL_MID_STREAM) {
    // Simulates connection dropping halfway through response
    const stream = new ReadableStream({
      async start(controller) {
        controller.enqueue(new TextEncoder().encode("This is the start of the response..."));
        await new Promise((resolve) => setTimeout(resolve, 1000));
        controller.error(new Error("Stream interrupted: Connection lost mid-response"));
      },
    });

    // StreamingTextResponse(stream) əvəzinə standart Response qaytarırıq:
    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  // Normal Chat Completion Logic goes here...
  // E.g., streamText with Vercel AI SDK / Claude API
}