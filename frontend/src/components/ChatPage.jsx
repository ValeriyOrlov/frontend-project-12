import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import ChannelsBox from './ChannelsBox';
import MessagesForm from './MessagesForm';
import MessagesBox from './MessagesBox';
import routes from '../routes';

import { actions as channelsActions } from '../slices/channelsInfo';
import 'react-toastify/dist/ReactToastify.css';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  return userId && userId.token ? { Authorization: `Bearer ${userId.token}` } : {};
};

const ChatPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(routes.getData(), { headers: getAuthHeader() });
        dispatch(channelsActions.setInitialState(data));
      } catch (err) {
        toast(t('Data_loading_error'));
        throw err;
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getActiveChannelName = useSelector((state) => {
    const activeChannelId = state.channelsInfo.currentChannelId;
    if (activeChannelId === null) {
      return null;
    }
    const activeChannelName = state.channelsInfo.channels
      .filter((channel) => channel.id === activeChannelId)[0].name;
    return activeChannelName;
  });

  const getActiveChannelMessagesCount = useSelector((state) => {
    const activeChannelId = state.channelsInfo.currentChannelId;
    if (activeChannelId === null) {
      return null;
    }
    const messageCount = state.messagesInfo.messages
      .filter((message) => message.channelId === activeChannelId).length;
    return messageCount;
  });

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="d-flex flex-row bg-light shadow-sm small">
              <ChannelsBox />
              <div className="flex-column m-2">
                <p className="m-0">
                  <span className="me-1">#</span>
                  <b>{getActiveChannelName}</b>
                </p>
                <span className="text-muted">{t('key', { count: getActiveChannelMessagesCount })}</span>
              </div>
            </div>
            <MessagesBox />
            <MessagesForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
