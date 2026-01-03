import user from '../assets/user.png';
import robot from '../assets/robot.png';
import { useState } from 'react';

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
        return (
            <div className='chats'>
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

    return (
        <>
            <SendMessages/>
            <div className='inputContainer'>
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


export { ChatInput, ChatInterface };