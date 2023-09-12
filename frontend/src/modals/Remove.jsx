import { useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { actions as channelsActions } from '../slices/channelsInfo';
import { actions as modalActions } from '../slices/modal';

const RemoveChannel = ({ state }) => {
  const dispatch = useDispatch();
  const { isOpened, type, extra } = state.modal;

  const closeModal = () => dispatch(modalActions.closeModal());

  const onSubmit = () => {
    const prevChannelId = extra.channelId - 1;
    dispatch(channelsActions.setCurrentChannelId({channelId: prevChannelId}));
    dispatch(channelsActions.removeChannel(extra.channelId));
    closeModal();
  };
  return (
    <>
      <Modal 
        show={isOpened && type === 'removeChannel'} 
        onHide={closeModal}
        >
        <Modal.Header closeButton>
          <Modal.Title>Удалить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="lead">Уверены?</p>
          <div className='d-flex justify-content-end'>
            <Button className='me-2 btn btn-secondary' type='button' onClick={closeModal}>Отменить</Button>
            <Button 
              onClick={onSubmit}
              className='me-2 btn btn-danger'
              type='button'
            >
              Удалить
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RemoveChannel;