import user from '../assets/user.png';
import robot from '../assets/robot.png';
import { useState, useRef, useEffect } from 'react';

/* global Chatbot */

function ChatInput({ chatMessages, setChatMessages }) {
    const [inputText, setInputText] = useState("");

    const SaveInputText = (event) => { setInputText(event.target.value) };

    const handleSend = () => {
        const response = Chatbot.getResponse(inputText)
        setChatMessages([...chatMessages, {
            message: inputText,
            sender: 'user',
            id: crypto.randomUUID()
        },
        {
            message: response,
            sender: 'robot',
            id: crypto.randomUUID()
        }
    ]);

        setInputText('')
    };

    const SendMessages = () => {
        const chatsRef = useRef(null)
        useEffect(() => {
            const chatsRefElem = chatsRef.current;
            if (chatsRefElem) {
                chatsRefElem.scrollTop = chatsRefElem.scrollHeight
            }
        }, [chatsRef]
    )
        return (
            <div className='chats' ref={chatsRef} >
                {chatMessages.map((msg) => (
                    <ChatInterface
                        sender={msg.sender} 
                        message={msg.message}
                        key={msg.id} 
                    />
                ))}
            </div>
        );
    }
    const SendButtonRef = useRef(null);
    useEffect(() => {
        const div = SendButtonRef.current;
        if (div) {
            div.addEventListener('Enter', handleSend)
        }
    })


    return (
        <>
            <SendMessages/>
            <div ref={SendButtonRef} className='inputContainer'>
                <input 
                    placeholder="Send a message to Chatbot" 
                    onChange={SaveInputText}
                    value={inputText}
                    className='inputBox'
                    />
                <button
                    className='sendButton'
                    onClick={handleSend}>
                    Send
                </button>
            </div>
            

        </>
    );
}

function ChatInterface({ sender, message }) {   
    return (
        <div className={
                sender==='user' 
                ? 'userChatMessage' 
                : 'robotChatMessage'
            }>

            {sender === 'robot' 
                && 
                (<img 
                    className='profileImage' 
                    src={robot} 
                    alt='robot'/>
                )
            }

            <div className='chatMessageText'>
                {message}
            </div>

            {sender === 'user' && 
                (<img 
                    src={user} 
                    className='profileImage' 
                    alt='user'/>
                )
            }
        </div>
    );
}

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