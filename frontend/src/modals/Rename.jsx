import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from 'formik';
import { Form, Button, Modal } from 'react-bootstrap';

import { actions as modalActions } from '../slices/modal';
import { actions as channelsActions } from '../slices/channelsInfo';

const Rename = ({ state }) => {
  const dispatch = useDispatch();
  const { isOpened, type, extra } = state.modal;
  const inputRef = useRef();
  const { channelId } = extra;
  const closeModal = () => dispatch(modalActions.closeModal());

  useEffect(() => {
    inputRef.current.focus();
  });

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    onSubmit: ({ channelName }) => {
      dispatch(channelsActions.renameChannel({ channelId, channelName }));
      closeModal();
      channelName = '';
    }
  });

  return (
    <Modal
      show={isOpened && type === 'renameChannel'} 
      onHide={closeModal}
    >
      <Modal.Header closeButton>
          <Modal.Title>Переименовать канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Control
              className='mb-2'
              id='channelName'
              name='channelName'
              type='text'
              ref={inputRef}
              {...formik.getFieldProps('channelName')}
            />

            <Form.Label 
              className='visually-hidden'
              htmlFor='channelName'
            >
              Имя канала
            </Form.Label> 
            <div className='d-flex justify-content-end'>
              <Button className='me-2 btn btn-secondary' type='button' onClick={closeModal}>Отменить</Button>
              <Button className='me-2 btn btn-primary' type='submit'>Отправить</Button>
            </div>
          </Form>
        </Modal.Body>
    </Modal>
  )
};

export default Rename;