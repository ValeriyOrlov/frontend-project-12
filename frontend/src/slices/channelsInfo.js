import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  channels: [],
  currentChannelId: null,
};

const channelsInfoSlice = createSlice({
  name: 'channelsInfo',
  initialState,
  reducers: {
    setInitialState(state, { payload }) {
      state.channels = payload.channels;
      state.currentChannelId = payload.currentChannelId;
    },
    setCurrentChannelId(state, { payload }) {
      state.currentChannelId = payload.channelId;
    },
    addChannel(state, { payload }) {
      state.channels = [...state.channels, payload];
    },
    removeChannel(state, { payload }) {
      state.channels = state.channels.filter((channel) => channel.id !== payload);
    },
    renameChannel(state, { payload }) {
      state.channels = state.channels.map((channel) => {
        if (channel.id === payload.channelId) {
          channel.name = payload.channelName;
          return channel;
        }
        return channel;
      });
    },
  },
});

export const { actions } = channelsInfoSlice;
export default channelsInfoSlice.reducer;