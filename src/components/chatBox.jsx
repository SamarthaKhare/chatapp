import { useState } from "react";
import { sendMessage } from "../services/api";
import Message from "./Message";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    setMessages((prev) => [...prev, { text: query, sender: "user" }]);
    setQuery("");

    try {
      const data = await sendMessage(query);
      console.log(data);
      if (data?.answer) {
        const responseText = data.answer.answer;
        setMessages((prev) => [...prev, { text: responseText, sender: "bot" }]);
      } else {
        setMessages((prev) => [...prev, { text: "No response available.", sender: "bot" }]);
      }
    } catch (err) {
      setError("Error fetching response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center p-4">
      {/* Conditional layout: Center content if no messages */}
      <div className={`flex flex-col items-center w-full ${messages.length === 0 ? "justify-center flex-1" : "max-w-5xl"}`}>
        <h1 className="text-5xl font-bold mb-2">Welcome to Spritual Assistant</h1>
        <h1 className="text-4xl font-bold mb-2">How can I help??</h1>
        {/* Chat messages (hidden until messages exist) */}
        {messages.length > 0 && (
          <div className="flex-1 overflow-y-auto my-6 p-4 w-full">
            {messages.map((msg, index) => (
              <Message key={index} text={msg.text} sender={msg.sender} />
            ))}
          </div>
        )}

        {/* Input box - Centered initially, moves to bottom when chat starts */}
        <div className={`flex space-x-2 p-2 bg-gray-100 w-full max-w-lvh max-h-60 my-3 ${messages.length > 0 ? "sticky bottom-0" : ""}`}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="Ask Krishna..."
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          >
            {loading ? "Thinking..." : "Ask"}
          </button>
        </div>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default ChatBox;
