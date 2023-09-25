import React, { useEffect, useRef } from 'react';
import Messages from './Messages';

const MessagesBox = () => {
  const messagesBoxRef = useRef();
  useEffect(() => {
    messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight;
  })

  return (
    <div 
      id='messages-box' 
       className='chat-messages overflow-auto px-5'
       ref={messagesBoxRef}
    >
      <Messages />
    </div>
  )
}

export default MessagesBox;