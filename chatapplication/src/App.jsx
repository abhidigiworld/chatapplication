import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

function App() {
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]); // State to hold received messages
  const [socket, setSocket] = useState(null); // State to hold the socket instance

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("connected", newSocket.id);
    });

    newSocket.on("message", (data) => {
      console.log("Received message:", data);
      // Append the received message to the array of messages
      setReceivedMessages(prevMessages => [...prevMessages, data]);
    });

    return () => {
      newSocket.disconnect(); // Disconnect the socket when the component unmounts
    };
  }, []); 

  const sendMessage = () => {
    socket.emit("message", { sender: socket.id, message }); // Include sender's id
    setMessage(''); 
  };

  const clearMessages = () => {
    setReceivedMessages([]); // Clear all received messages
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chat Application</h1>
      <div className="flex mb-4">
        <input
          type="text"
          className="border border-gray-400 rounded-md p-2 mr-2 w-full"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md" onClick={sendMessage}>Send</button>
        <button className="bg-gray-500 text-white py-2 px-4 rounded-md ml-2" onClick={clearMessages}>Clear</button>
      </div>
      <div>
        {receivedMessages.map((msg, index) => (
          <div key={index} className="bg-gray-100 p-2 mb-2 rounded-md">
            <p><strong>{msg.sender}: </strong>{msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
