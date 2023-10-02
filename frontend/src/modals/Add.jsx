import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap'
import { actions as modalActions } from '../slices/modal';
import * as Yup from 'yup';
import socket from '../socket';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Add = ({ state }) => {
  const dispatch = useDispatch();
  const { isOpened, type } = state.modal;
  const channelsNames = state.channelsInfo.channels
    .map(({ name }) => name);
  const inputRef = useRef();
  const closeModal = () => dispatch(modalActions.closeModal());
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .notOneOf(channelsNames, 'должно быть уникально'),
    }),
    onSubmit: ({ name }) => {
      const channel = {
        name,
        removable: true,
      };
      socket.emit('newChannel', channel, (res) => {
        console.log('emit add')
        if (res.status !== 'ok') {
          toast(t('Channel_err_msg'));
          socket.emit('newChannel', channel)
        }
      });
      toast(t('Add_channel_toastify_msg'));
      closeModal();
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
          <Modal.Title>{t('add_channel')}</Modal.Title>
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
              {t('channel_name')}
            </Form.Label> 
            <div className='d-flex justify-content-end'>
              <Button className='me-2 btn btn-secondary' type='button' onClick={closeModal}>{t('cancel')}</Button>
              <Button className='me-2 btn btn-primary' type='submit'>{t('send')}</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default Add;