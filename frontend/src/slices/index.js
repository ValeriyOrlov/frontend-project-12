import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsInfo';
import messagesReducer from './messagesInfo';
import modalReducer from './modal';

export default configureStore({
  reducer: {
    channelsInfo: channelsReducer,
    messagesInfo: messagesReducer,
    modal: modalReducer,
  },
});