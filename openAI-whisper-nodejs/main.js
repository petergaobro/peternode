// import OpenAI from "openai";
// import fs from "fs";

const OpenAI = require("openai");
const fs = require("fs");

const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({ apiKey: apiKey });

async function main() {
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream("lesson_audio.mp3"),
    model: "whisper-1",
  });

  console.log(transcription.text);
}
main();
