import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions as channelsActions } from '../slices/channelsInfo';
import { actions as modalActions } from '../slices/modal';
import { Dropdown, Button } from 'react-bootstrap';

const Channel = ({ channel }) => {
  const dispatch = useDispatch();
  const { currentChannelId } = useSelector((state) => state.channelsInfo)

  const setCurrentChannelId = () => {
    dispatch(channelsActions.setCurrentChannelId({ channelId: channel.id }));
  };

  const openRemoveModal = () => {
    dispatch(modalActions.openModal({ type: 'removeChannel', extra: { channelId: currentChannelId }}));
  };

  const openRenameModal = () => {
    dispatch(modalActions.openModal({ type: 'renameChannel', extra: { channelId: currentChannelId }}));
  }

  const renderRemovableChannel = (name) => {
    return (
      <Dropdown className='d-flex btn-group'>
        <Button 
          className={`w-100 rounded-0 text-start text-truncate ${currentChannelId === channel.id ? 'btn btn-secondary' : 'btn'}`}
          variant={null}
          onClick={setCurrentChannelId}
        >
          # {name}
        </Button>
        <Dropdown.Toggle
          className={`flex-grow-0 dropdown-toggle-split ${currentChannelId === channel.id ? 'btn btn-secondary' : 'btn'}`}
          id="react-aria6138745391-1"
          variant={null}
        >
        </Dropdown.Toggle>
  
        <Dropdown.Menu>
          <Dropdown.Item 
            onClick={openRemoveModal}
            >
              Удалить
          </Dropdown.Item>
          <Dropdown.Item
            onClick={openRenameModal}
          >
            Переименовать
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  const renderNonRemovableChannel = (name) => {
    return (
      <button 
        className={`w-100 rounded-0 text-start btn ${currentChannelId === channel.id && 'btn-secondary'}`} 
        type="button"
        onClick={setCurrentChannelId}
      >
        <span className="me-1">#</span>
          {name}
      </button>
    )
  };

  return (
    <li 
      key={channel.id}
      className="nav-item w-100"
    >
     {channel.removable ? renderRemovableChannel(channel.name) : renderNonRemovableChannel(channel.name)}
    </li>
  );
};

export default Channel;