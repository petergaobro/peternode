import { useState } from "react";
import OpenAI from "openai";
function BasicChat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const handleInputChange = (e) => {
    setQuestion(e.target.value);
  };

  const callGpt = async () => {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: question }],
      model: "gpt-3.5-turbo",
    });
    //console.log(completion.choices[0]);
    setAnswer(completion.choices[0].message.content);
  };

  return (
    <>
      <h1>
        <textarea
          style={{ width: "70%", height: "200px" }}
          type="text"
          value={question}
          onChange={handleInputChange}
        />
      </h1>
      <div className="card">
        <button
          name="btnDemo"
          onClick={callGpt}
        >
          Call and get Answer
        </button>
        <br />
        <p style={{ textAlign: "left" }}>{answer}</p>
      </div>
    </>
  );
}

export default BasicChat;
