/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channelsInfo';

const initialState = {
  messages: [],
};

const messagesInfoSlice = createSlice({
  name: 'messagesInfo',
  initialState,
  reducers: {
    setMessages(state, { payload }) {
      state.messages = payload;
    },
    addMessage(state, { payload }) {
      state.messages = [...state.messages, payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelsActions.removeChannel, (state, { payload }) => {
        const deletedChannelId = payload;
        state.messages = state.messages.filter((message) => message.channelId !== deletedChannelId);
      })
      .addCase(channelsActions.setInitialState, (state, { payload }) => {
        state.messages = [...payload.messages];
      });
  },
});

export const { actions } = messagesInfoSlice;
export default messagesInfoSlice.reducer;
