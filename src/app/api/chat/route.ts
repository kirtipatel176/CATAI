import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { message, context } = await req.json();

  const encoder = new TextEncoder();
  
  // Create a readable stream
  const customReadable = new ReadableStream({
    async start(controller) {
      const responseText = `I am CatGPT. You asked: "${message}". Here is some information about ${context}. This is a simulated streaming response from the mock backend API.`;
      
      const words = responseText.split(' ');
      
      for (let i = 0; i < words.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 100)); // Delay per word
        controller.enqueue(encoder.encode(words[i] + ' '));
      }
      
      controller.close();
    },
  });

  return new Response(customReadable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
    },
  });
}
