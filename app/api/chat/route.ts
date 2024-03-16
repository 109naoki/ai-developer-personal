import { OpenAIStream, OpenAIStreamPayload } from "../../../utils/OpenAIStream";
import { NextResponse } from "next/server";
export const runtime = "experimental-edge";
if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export async function POST(request: Request) {
  const { prompt } = await request.json();

  if (!prompt) {
    return new NextResponse("No prompt in the request", { status: 400 });
  }

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 200,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);

  return new NextResponse(stream, {
    headers: new Headers({
      "Cache-Control": "no-cache",
    }),
  });
}
