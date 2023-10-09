import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import useAuth from '../hooks';
import Channels from './Channels';
import ModalWindow from '../modals/index.jsx';
import { actions as modalActions } from '../slices/modal';

const AuthButton = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const userName = JSON.parse(localStorage.getItem('userId')).username;

  return (
    <div className="d-flex flex-column">
      <h2 className="m-1">{userName}</h2>
      <Button variant="outline-danger" onClick={auth.logOut}>{t('logout')}</Button>
    </div>
  );
};

const ChannelsBox = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const openAddChannelModal = () => {
    dispatch(modalActions.openModal({ type: 'addChannel', extra: null }));
  };

  return (
    <>
      <Button
        variant="light"
        onClick={handleShow}
        className="m-2"
      >
        <img
          src="../../images/offcanvas-button.svg"
          alt="offcanvas-btn"
          style={{ width: '24px' }}
        />
      </Button>

      <Offcanvas
        show={show}
        onHide={handleClose}
        style={{ width: '200px',
          'background-color': '#f6efe9' }}
      >
        <Offcanvas.Header
          closeButton
        >
          <AuthButton />
        </Offcanvas.Header>
        <Offcanvas.Body>
          <button
            className="w-100 p-1 m-1 btn"
            onClick={openAddChannelModal}
            type="button"
            style={{
              'background-color': '#b27067',
              color: 'white',
              'text-decoration': 'none',
            }}
          >
            {t('add_channel')}
          </button>
          <Channels />
          <ModalWindow />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default ChannelsBox;
