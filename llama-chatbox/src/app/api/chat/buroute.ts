import path from "path"
import { spawn } from "child_process"


/** spawns a child process to run the LLaMA 2 model with a set of arguments. 
 * The arguments include the path to the model, 
 * the number of threads to use, and the text to process. */
const getAnswer = (messages: any) => {
  const messageString = messages.map((m: any) => {
    if (m.role === "system") {
      return `<s>[INST] <<SYS>>\n${m.content}\n<</SYS>>\n\n`;
    }
    if (m.role === "assistant") {
      return `${m.content}</s><s>[INST] `;
    }

    return `${m.content} [/INST] `;
  });

  return spawn(
    `./main`,
    [
      "-t",
      "8",
      "-ngl",
      "1",
      "-m",
      "llama-2-13b-chat.ggmlv3.q4_0.bin",
      "--color",
      "-c",
      "2048",
      "--temp",
      "0.7",
      "--repeat_penalty",
      "1.1",
      "-n",
      "-1",
      "-p",
      messageString,
    ],
    {
      cwd: path.join(process.cwd(), "llama"),
    }
  );
};

/** creates a ReadableStream that processes the data returned by the LLaMA 2 model. 
 * It uses the TextEncoder API to convert the string data into a stream of chunks */
const getAnswerStream = (messages: any) => {
  const encoder = new TextEncoder();
  return new ReadableStream({
    start(controller) {
      const llama = getAnswer({ messages });

      let start = false;
      llama.stdout.on("data", (data) => {
        if (data.includes("[/INST]")) {
          start = true;
          return;
        }
        if (!start) return;

        const chunk = encoder.encode(String(data));
        controller.enqueue(chunk);
      });

      llama.stderr.on("data", (data) => {
        // TODO error handling
      });

      llama.on("close", () => {
        controller.close();
      });
    },
  });
};

export async function POST(request: any) {
  const { messages } = await request.json();

  if (!messages) {
    return new Response("No message in the request", { status: 400 });
  }

  return new Response(getAnswerStream({ messages }));
}

//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