import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { actions as channelsActions } from '../slices/channelsInfo';
import { actions as modalActions } from '../slices/modal';

const Channel = ({ channel }) => {
  const dispatch = useDispatch();
  const { currentChannelId } = useSelector((state) => state.channelsInfo);
  const { t } = useTranslation();

  const setCurrentChannelId = () => {
    dispatch(channelsActions.setCurrentChannelId({ channelId: channel.id }));
  };

  const openRemoveModal = () => {
    dispatch(modalActions.openModal({ type: 'removeChannel', extra: { id: channel.id } }));
  };

  const openRenameModal = () => {
    dispatch(modalActions.openModal({ type: 'renameChannel', extra: { id: channel.id } }));
  };

  const renderRemovableChannel = (name) => (
    <Dropdown
      className="d-flex btn-group"
      role="group"
    >
      <Button
        className={`w-100 rounded-0 text-start text-truncate ${currentChannelId === channel.id ? 'btn btn-success' : 'btn'}`}
        variant={null}
        onClick={setCurrentChannelId}
      >
        <span className="me-1">#</span>
        {name}
      </Button>
      <Dropdown.Toggle
        className={`flex-grow-0 dropdown-toggle-split ${currentChannelId === channel.id ? 'btn btn-success' : 'btn'}`}
        id="react-aria6138745391-1"
        variant={null}
      >
        <span className="visually-hidden">Управление каналом</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item
          onClick={openRemoveModal}
        >
          {t('delete')}
        </Dropdown.Item>
        <Dropdown.Item
          onClick={openRenameModal}
        >
          {t('rename')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  const renderNonRemovableChannel = (name) => (
    <button
      className={`w-100 rounded-0 text-start btn ${currentChannelId === channel.id && 'btn-success'}`}
      type="button"
      onClick={setCurrentChannelId}
    >
      <span className="me-1">#</span>
      {name}
    </button>
  );

  return (
    <li
      key={channel.id}
      className="nav-item w-100"
    >
      {channel.removable
        ? renderRemovableChannel(channel.name)
        : renderNonRemovableChannel(channel.name)}
    </li>
  );
};

export default Channel;
