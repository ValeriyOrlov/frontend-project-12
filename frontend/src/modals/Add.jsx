import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap'
import { actions as channelsActions } from '../slices/channelsInfo';
import { actions as modalActions } from '../slices/modal';
import * as Yup from 'yup';


const Add = ({ state }) => {
  const dispatch = useDispatch();
  const { isOpened, type } = state.modal;
  const lastChannelId = state.channelsInfo.channels.length;
  const inputRef = useRef();
  const closeModal = () => dispatch(modalActions.closeModal());

  useEffect(() => {
    inputRef.current.focus();
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Обязательное поле'),
    }),
    onSubmit: ({ name }) => {
      const channel = {
        name,
        removable: true,
        id: lastChannelId + 1,
      };
      dispatch(channelsActions.setCurrentChannelId({ channelId: channel.id }));
      closeModal();
      dispatch(channelsActions.addChannel(channel));
      name = '';
    }
  });
 
  return (
    <>
      <Modal 
        show={isOpened && type === 'addChannel'} 
        onHide={closeModal}
        >
        <Modal.Header closeButton>
          <Modal.Title>Добавить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Control
              className={`mb-2 ${formik.errors.name ? 'is-invalid' : null}`}
              id='name'
              name='name'
              type='text'
              ref={inputRef}
              {...formik.getFieldProps('name')}
            />
            {formik.touched.name && formik.errors.name ? (
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
    </>
  );
};

export default Add;