import { io } from 'socket.io-client';

import store from '../store';

import { addMessage } from '../store/messages';
import {
  addChannel,
  renameChannel,
  removeChannel,
  setCurrentChannelId,
  setDefaultChannelId,
} from '../store/channels';

const socket = io();
const NEW_MESSAGE = 'newMessage';
const NEW_CHANNEL = 'newChannel';
const RENAME_CHANNEL = 'renameChannel';
const REMOVE_CHANNEL = 'removeChannel';

socket.on(NEW_MESSAGE, (payload) => {
  store.dispatch(addMessage(payload));
});

socket.on(NEW_CHANNEL, (payload) => {
  store.dispatch(addChannel(payload));

  const { channels: { entities } } = store.getState();
  const [, newChannel] = Object.entries(entities)
    .find(([, channel]) => channel.name === payload.name);

  store.dispatch(setCurrentChannelId(newChannel.id));
});

socket.on(RENAME_CHANNEL, ({ id, name }) => {
  store.dispatch(renameChannel({ id, changes: { name } }));
});

socket.on(REMOVE_CHANNEL, ({ id }) => {
  store.dispatch(removeChannel(id));
  store.dispatch(setDefaultChannelId(null));
});

export const newChannel = (name) => {
  socket.emit(NEW_CHANNEL, { name });
};

export const deleteChannel = (id) => {
  socket.emit(REMOVE_CHANNEL, { id });
};

export const newNameChannel = ({ id, name }) => {
  socket.emit(RENAME_CHANNEL, { id, name });
};

export const sendMessage = (data) => {
  socket.emit(NEW_MESSAGE, data);
};

// newNameChannel({id: 19, name: 'lalal'});
// deleteChannel(30, () => {});
// newChannel('test1', () => {});
