import { useDispatch } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";
import { actions as channelsActions } from '../slices/channelsInfo';
import { actions as modalActions } from '../slices/modal';
import socket from '../socket';
import { useTranslation } from 'react-i18next';

const RemoveChannel = ({ state }) => {
  const dispatch = useDispatch();
  const { isOpened, type, extra } = state.modal;
  const { t } = useTranslation();

  const closeModal = () => dispatch(modalActions.closeModal());

  const onSubmit = () => {
    const lastChannelId = state.channelsInfo.channels.length - 1;
    socket.emit('removeChannel', extra, (res) => {
      dispatch(channelsActions.setCurrentChannelId({ channelId: lastChannelId }));
      if (res.status !== 'ok') {
        socket.emit('removeChannel', extra)
        dispatch(channelsActions.setCurrentChannelId({ channelId: lastChannelId }));
      }
    })

    closeModal();
  };
  return (
    <>
      <Modal 
        show={isOpened && type === 'removeChannel'} 
        onHide={closeModal}
        >
        <Modal.Header closeButton>
          <Modal.Title>{t('delete_channel')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="lead">{t('confirmation')}</p>
          <Form
            onSubmit={onSubmit}
            className='d-flex justify-content-end'
          >
            <Button className='me-2 btn btn-secondary' type='button' onClick={closeModal}>{t('cancel')}</Button>
            <Button 
              className='me-2 btn btn-danger'
              type='submit'
            >
              {t('remove')}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RemoveChannel;