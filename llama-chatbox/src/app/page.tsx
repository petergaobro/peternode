'use client';
import React from 'react'
import { useChat } from 'ai/react'

export default function ChatBot() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "./api/chat",
    initialMessages: [
      {
        id: "system",
        role: "system",
        content: "You are a philosopher."
      }
    ]
  })

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.length > 0
        ? messages.map(m => (
          <div key={m.id} className="whitespace-pre-wrap">
            {m.role === 'user' ? 'User: ' : 'AI: '}
            {m.content}
          </div>
        ))
        : null}

      <form onSubmit={handleSubmit}>
        <input
          className="text-black fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
        <button type='submit' className='bg-red-500'>Send message</button>
      </form>
    </div>
  )
}

