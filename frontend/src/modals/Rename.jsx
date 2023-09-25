import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from 'formik';
import { Form, Button, Modal } from 'react-bootstrap';
import { actions as modalActions } from '../slices/modal';
import socket from "../socket";
import * as Yup from 'yup';

const Rename = ({ state }) => {
  const dispatch = useDispatch();
  const { isOpened, type, extra } = state.modal;
  const channelsNames = state.channelsInfo.channels
  .map(({ name }) => name);
  const inputRef = useRef();
  const { id } = extra;
  const closeModal = () => dispatch(modalActions.closeModal());
  useEffect(() => {
    inputRef.current.focus();
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      channelName: Yup.string()
        .notOneOf(channelsNames, 'должно быть уникально'),
    }),
    onSubmit: ({ name }) => {
      socket.emit('renameChannel', { id, name }, (res) => {
        if (res.status !== 'ok') {
          socket.emit('renameChannel', { id, name });
        }
      })
      closeModal();
      name = '';
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
              id='name'
              name='name'
              type='text'
              ref={inputRef}
              {...formik.getFieldProps('name')}
            />
            {formik.errors.name ? (
              <div>{formik.errors.name}</div>
            ) : null}
            <Form.Label 
              className='visually-hidden'
              htmlFor='name'
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