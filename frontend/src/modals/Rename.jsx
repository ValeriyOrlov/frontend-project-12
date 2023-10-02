import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from 'formik';
import { Form, Button, Modal } from 'react-bootstrap';
import { actions as modalActions } from '../slices/modal';
import socket from "../socket";
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Rename = ({ channels, isOpened, type, extra }) => {
  const dispatch = useDispatch();
  const channelsNames = channels.map(({ name }) => name);
  const inputRef = useRef();
  const { id } = extra;
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
      channelName: Yup.string()
        .notOneOf(channelsNames, 'должно быть уникально'),
    }),
    onSubmit: ({ name }) => {
      socket.emit('renameChannel', { id, name }, (res) => {
        if (res.status !== 'ok') {
          toast(t('Channel_err_msg'));
          socket.emit('renameChannel', { id, name });
        }
      })
      toast(t('Rename_channel_toastify_msg'));
      closeModal();
      name = '';
    }
  });

  return (
    <>
      <Modal
        show={isOpened && type === 'renameChannel'} 
        onHide={closeModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t('rename_the_channel')}</Modal.Title>
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
  )
};

export default Rename;