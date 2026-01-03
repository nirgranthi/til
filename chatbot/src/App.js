import './App.css';
import { useState } from 'react';
import {ChatInput} from './components/chatbot';

function App() {
  const [chatMessages, setChatMessages] = useState([
        {
            message: "Hi there!",
            sender: 'user',
            id: 1
        }, 
        {
            message: "Hello, how can I help you today?",
            sender: 'robot',
            id: 2
        }, 
        {
            message: "get me todays date",
            sender: 'user',
            id: 3
        }, 
        {
            message: "it is ummm... oops i forgot, google it for me and tell me",
            sender: 'robot',
            id: 4
        }
    ]);

  return (
    <div className='chatContainer'>
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App;