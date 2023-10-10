import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Form, Button, Image } from 'react-bootstrap';

import { useTranslation } from 'react-i18next';
import socket from '../socket';

const MessagesForm = () => {
  const messageInputRef = useRef();
  const { username } = JSON.parse(localStorage.getItem('userId'));
  const { currentChannelId } = useSelector((state) => state.channelsInfo);
  const { t } = useTranslation();

  useEffect(() => {
    messageInputRef.current.focus();
  });

  const submitMessage = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const date = new Date();
    const hours = String(date.getHours()).length === 1 ? `0${date.getHours()}` : date.getHours();
    const minutes = String(date.getMinutes()).length === 1 ? `0${date.getMinutes()}` : date.getMinutes();
    const time = {
      hours,
      minutes,
    };

    const message = {
      body: data.get('body'),
      channelId: currentChannelId,
      username,
      time,
    };

    if (message.body.length === 0) {
      return;
    }

    socket.emit('newMessage', message, (res) => {
      if (res.status !== 'ok') {
        socket.emit('newMessage', message);
      }
    });
    messageInputRef.current.value = '';
  };

  return (
    <div className="mt-auto px-5 py-3">
      <Form
        className="py-1 border rounded-2"
        onSubmit={submitMessage}
      >
        <div className="input-group has-validation">
          <Form.Control
            className="border-0 p-0 ps-2"
            name="body"
            type="text"
            autoComplete="off"
            aria-label="Новое сообщение"
            placeholder={t('enter_a_message')}
            ref={messageInputRef}
          />
          <Button
            variant="light"
            type="submit"
          >
            <Image
              src="../../images/send_msg_btn.png"
              style={{ width: '28px' }}
            />
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default MessagesForm;
