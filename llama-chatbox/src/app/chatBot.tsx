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
    <div>
      {messages.map(m => (
        <div key={m.id}>
          {m.role === 'assistant' ? 'User: ' : 'AI: '}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <label>
          Say something...
          <input value={input} onChange={handleInputChange} className='text-black' />
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

