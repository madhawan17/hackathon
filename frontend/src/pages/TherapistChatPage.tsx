import React, { useState } from 'react';

// Define a type for our message objects for better code quality
type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const TherapistChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Call your FastAPI backend
      const response = await fetch('http://127.0.0.1:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const assistantMessage: Message = { role: 'assistant', content: data.response };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);

    } catch (error) {
      console.error('Error fetching data:', error);
      const errorMessage: Message = { role: 'assistant', content: 'Sorry, something went wrong.' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-center">Chat with Medibot</h1>
      <div className="flex-grow overflow-y-auto mb-4 p-4 bg-white rounded-lg shadow-md">
        {messages.map((msg, index) => (
          <div key={index} className={`my-2 p-3 rounded-lg max-w-lg ${
            msg.role === 'user' ? 'bg-blue-500 text-white self-end ml-auto' : 'bg-gray-300 text-black self-start mr-auto'
          }`}>
            {msg.content}
          </div>
        ))}
        {isLoading && <div className="p-3 rounded-lg bg-gray-300 text-black self-start mr-auto">Thinking...</div>}
      </div>
      <form onSubmit={handleSendMessage} className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a medical question..."
          className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 disabled:bg-blue-300"
          disabled={isLoading}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default TherapistChatPage;