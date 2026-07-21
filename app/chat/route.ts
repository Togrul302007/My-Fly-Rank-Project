// Note: StreamingTextResponse is deprecated in modern AI SDK versions.
// Use standard Web ReadableStream with TextEncoder.

const SABOTAGE_CONFIG = {
  FAIL_IMMEDIATELY: false,
  FAIL_MID_STREAM: true, // Set to true to test mid-stream failure
  RATE_LIMIT: false,
};

export async function POST(req: Request) {
  if (SABOTAGE_CONFIG.RATE_LIMIT) {
    return new Response("Too Many Requests", { status: 429 });
  }

  if (SABOTAGE_CONFIG.FAIL_IMMEDIATELY) {
    return new Response("Internal Server Error: Model Overloaded", { status: 500 });
  }

  if (SABOTAGE_CONFIG.FAIL_MID_STREAM) {
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        // 1. Send first chunk
        controller.enqueue(encoder.encode("This is the start of the response... "));
        
        // 2. Wait 1 second
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // 3. Intentionally break the stream mid-way
        controller.error(new Error("Stream interrupted: Connection lost mid-response"));
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  // Normal stream code (using streamText from 'ai' with your provider)
}