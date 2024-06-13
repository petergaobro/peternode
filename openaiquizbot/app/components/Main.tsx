'use client'
import React, { useEffect, useState } from 'react';
import { OpenAI } from 'langchain/llms/openai';
import { BufferMemory } from 'langchain/memory';
import { ConversationChain } from 'langchain/chains';

const apiKey = process.env.OPENAI_API_KEY

const model = new OpenAI({
  openAIApiKey: apiKey,
  temperature: 0.9,
})

const memory = new BufferMemory();
const chain = new ConversationChain({ llm: model, memory: memory })

const run = async (input: string) => {
  const response = await chain.call({ input: input });
  return response.response;
}

const categories = [
  { label: "Sport", value: "sport" },
  { label: "Hollywood", value: "hollywood" },
  { label: "Biology", value: "biology" },
  { label: "Geography", value: "geography" }
]

const Main = () => {
  const [input, setInput] = useState("")
  const [response, setResponse] = useState("")
  const [category, setCategory] = useState("")

  const askFirstQuestion = async () => {
    const firstQuestion = await run(
      `Ask a trivia question in the ${category} category`
    )
    setResponse(firstQuestion);
  }


  useEffect(() => {
    if (category! === "") {
      askFirstQuestion();
    }
  }, [category])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const result = await run(
      `AI: ${response} \nYou: ${input}\nAI: Evaluate the answer and ask another trivia question.`
    )
    setResponse(result);
    setInput("")
  }

  return (
    <div className='container mx-auto p-4 w-full sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2'>
      <h1 className="text-2xl font-bold mb-4">Quiz Bot Game Show</h1>
      <form action="" onSubmit={handleSubmit} className='space-y-4'>
        {/* <form action="" className='space-y-4'> */}
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className='w-full p-2 border border-gray-300 rounded' placeholder='Your answer' />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className='w-full p-2 border border-gray-300 rounded'>
          <option value="">Select a category</option>
          {categories.map((item) => (
            <option value={item.value} key={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <button type='submit' className='w-full p-2 bg-blue-600 text-white font-semibold rounded'>Submit</button>
      </form>
      {response && (
        <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded">
          <p>{response}</p>
        </div>
      )}
    </div>
  )
}

export default Main;