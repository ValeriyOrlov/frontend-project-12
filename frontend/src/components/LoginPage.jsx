/* eslint-disable react/jsx-props-no-spreading */
import { useFormik } from 'formik';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useAuth from '../hooks';
import routes from '../routes';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const { from } = location.state;
    if (auth.loggedIn) {
      navigate(from);
    }
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const response = await axios.post(routes.loginPath(), values);
        auth.logIn();
        localStorage.setItem('userId', JSON.stringify(response.data));
        const { from } = location.state;
        navigate(from);
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        if (err.isAxiosError && err.response.status === 500) {
          toast(t('server_error'));
          return;
        }
        if (err.message === 'Network Error') {
          toast(t('Connection_error'));
          return;
        }
        throw err;
      }
    },
  });

  return (
    <div className="containter-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  className="rounded-circle"
                  style={{ width: '300px' }}
                  src={authFailed ? '../../images/signup_failed_bird.jpg' : '../../images/auth_bird.jpg'}
                  alt="auth_bird"
                />
              </div>
              <Form
                onSubmit={formik.handleSubmit}
                className="col-12 col-md-6 mt-3 mt-mb-0"
              >
                <h1 className="text-center mb-4">{t('login')}</h1>
                <fieldset disabled={formik.isSubmitting}>
                  <FloatingLabel
                    controlId="username"
                    label={t('nickname')}
                    className="mb-3"
                  >
                    <Form.Control
                      name="username"
                      autoComplete="username"
                      placeholder={t('nickname')}
                      isInvalid={authFailed}
                      required
                      ref={inputRef}
                      {...formik.getFieldProps('username')}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="floatingInput"
                    label={t('password')}
                    className="mb-3"
                  >
                    <Form.Control
                      name="password"
                      autoComplete="password"
                      type="password"
                      placeholder={t('password')}
                      isInvalid={authFailed}
                      required
                      {...formik.getFieldProps('password')}
                    />
                    <Form.Control.Feedback className="invalid-tooltip">{t('Incorrect_username_and_password')}</Form.Control.Feedback>
                  </FloatingLabel>
                  <Button
                    type="submit"
                    disabled={formik.isSubmitting}
                    variant="outline-success"
                    className="w-100"
                  >
                    {t('login')}
                  </Button>
                </fieldset>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('no_account')}</span>
                {' '}
                <a href="/signup">{t('registration')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
