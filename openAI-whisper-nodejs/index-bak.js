require('dotenv').config();
// fs = file system
const fs = require('fs')
const axios = require('axios')

async function transcribe(file) {
  const api_key = process.env.OPENAI_API_KEY;
  const response = await axios.post(
    // Transcribes audio into the input language.
    'https://api.openai.com/v1/audio/transcriptions',
    // Translates audio into English.
    // 'https://api.openai.com/v1/audio/translations',
    {
      // file and model is required
      file,
      model: 'whisper-1',
      // prompt // string Optional
      // response_format // string Optional Defaults to json
      // language: 'es',//language string Optional
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${api_key}`
      }
    }
  )
  console.log(api_key, "api keyyyy");
  return response.data.text;
}

async function main() {
  const file = fs.createReadStream('lesson_audio.mp3');
  const transcript = await transcribe(file);

  console.log(transcript);
}
main();