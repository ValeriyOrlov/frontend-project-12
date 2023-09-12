import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Channels from './Channels';
import MessagesForm from './MessagesForm';
import Messages from './Messages';
import ModalWindow from '../modals/index.jsx';

import routes from '../routes';
import axios from 'axios';

import { actions as channelsActions } from '../slices/channelsInfo';
import { actions as modalActions } from '../slices/modal';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const ChatPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(routes.getData(), { headers: getAuthHeader() });
        dispatch(channelsActions.setInitialState(data));

      } catch(err) {
        throw err;
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const openAddChannelModal = () => {
    dispatch(modalActions.openModal({type: 'addChannel', extra: null }));
  }

  const getActiveChannelName = useSelector((state) => {
    const activeChannelId = state.channelsInfo.currentChannelId;
    if (activeChannelId === null) {
      return null;
    };

    return state.channelsInfo.channels
    .filter((channel) => channel.id === activeChannelId)[0].name;
  });

  const getActiveChannelMessagesCount = useSelector((state) => {
    const activeChannelId = state.channelsInfo.currentChannelId;
    if (activeChannelId === null) {
      return null;
    };

    return state.messagesInfo.messages
      .filter(({ message }) => message.channelId === activeChannelId).length;
  })

  return (
    <div className='container h-100 my-4 overflow-hidden rounded shadow'>
      <div className='row h-100 bg-white flex-md-row'>
        <div className='col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex'>
          <div className='d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4'>
            <b>Каналы</b>
            <button 
              className='p-0 text-primary btn btn-group-vertical'
              onClick={openAddChannelModal} 
              type='button'
            > + </button>
          </div>
          <Channels />
          <ModalWindow />
        </div>
        <div className='col p-0 h-100'>
          <div className='d-flex flex-column h-100'>
            <div className='bg-light mb-4 p-3 shadow-sm small'>
              <p className='m-0'>
              <span className="me-1">#</span>
                <b>{getActiveChannelName}</b>
              </p>
              <span className='text-muted'>{getActiveChannelMessagesCount} сообщений</span>
            </div>
            <div id='messages-box' className='chat-messages overflow-auto px-5'>
              <Messages />
            </div>
            <div className='mt-auto px-5 py-3'>
              <MessagesForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPage;