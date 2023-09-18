import React, { useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import { Form, Button, Image } from 'react-bootstrap';
import _ from 'lodash';

import socket from '../socket';

const MessagesForm = () => {
  const messageInputRef = useRef();
  const username = JSON.parse(localStorage.getItem('userId')).username;
  const { currentChannelId } = useSelector((state) => state.channelsInfo);

  useEffect(() => {
    messageInputRef.current.focus();
  });

  const submitMessage = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const message = {
      body: data.get('body'),
      channelId: currentChannelId,
      username: username,
      id: _.uniqueId(),
    };
    socket.emit('newMessage', message, (res) => {
      if (res.status !== 'ok') {
        socket.emit('newMessage', message);
      }
    });
    messageInputRef.current.value = "";
  }

  return (
    <div className='mt-auto px-5 py-3'>
    <Form 
      className='py-1 border rounded-2' 
      onSubmit={submitMessage}
    >
      <div className='input-group has-validation'>
        <Form.Control
          className='border-0 p-0 ps-2'
          name='body'
          aria-label='Новое сообщение'
          placeholder='Введите сообщение...'
          ref={messageInputRef}
        />
        <Button
          variant='light'
          type='submit'
        >
        <Image 
          src='../../images/send_msg_btn.png'
          style={{ width: '32px' }} 
        />
        </Button>
      </div>
    </Form>
  </div>
  );
};

export default MessagesForm;