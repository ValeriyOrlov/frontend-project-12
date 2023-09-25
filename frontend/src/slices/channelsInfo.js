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
      state.channels = state.channels.filter((channel) => channel.id !== payload.id);
    },
    renameChannel(state, { payload }) {
      state.channels = state.channels.map((channel) => {
        if (channel.id === payload.id) {
          channel.name = payload.name;
          return channel;
        }
        return channel;
      });
    },
  },
});

export const { actions } = channelsInfoSlice;
export default channelsInfoSlice.reducer;