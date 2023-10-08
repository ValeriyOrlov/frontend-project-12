import React, { useEffect, useRef } from 'react';
import Messages from './Messages';

const MessagesBox = () => {
  const messagesBoxRef = useRef();
  useEffect(() => {
    messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight;
  });

  return (
    <div
      id="messages-box"
      className="d-flex flex-column chat-messages overflow-auto px-5 h-100"
      style={{
        backgroundImage: 'url("../../images/message-box-background.jpg"',
        backgroundRepeat: 'repeat',
        backgroundSize: '50%',
      }}
      ref={messagesBoxRef}
    >
      <Messages />
    </div>
  );
};

export default MessagesBox;
