import { useFormik } from 'formik';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import routes from '../routes';
import useAuth from '../hooks';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupPage = () => {
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const [validFormError, setValidFormError] = useState('');
  const inputRef = useRef();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: { username: '', password: '', confirmPassword: '' },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, `${t('from_3_to_20 characters')}`)
        .max(20, `${t('from_3_to_20 characters')}`)
        .required(t('required_field')),
      password: Yup.string()
        .min(6, `${t('at_least_6_characters')}`)
        .required(t('required_field')),
      confirmPassword: Yup.string()
        .oneOf(
          [Yup.ref('password'), null],
          `${t('passwords_must_match')}`,
        )
    }),
    onSubmit: async (values) => {
      setValidFormError('');
      setAuthFailed(false);
      try {
        const { username, password } = values;
        const response = await axios.post(routes.signupPath(), { username, password });
        auth.logIn();
        localStorage.setItem('userId', JSON.stringify(response.data));
        navigate('/');
      } catch (err) {
        formik.setSubmitting(false);
        setAuthFailed(true);
        if (err.isAxiosError && err.response.status === 401) {
          setValidFormError(`${t('server_error')}`);
          inputRef.current.select();
          return;
        }
        if (err.isAxiosError && err.response.status === 409) {
          setValidFormError(`${t('such_a_user_already_exists')}`);
          inputRef.current.select();
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
    <div className='containter-fluid h-100'>
      <div className='row justify-content-center align-content-center h-100'>
        <div className='col-12 col-md-8 col-xxl-6'>
          <div className='card shadow-sm'>
            <div className='card-body row p-5'>
              <div className='col-12 col-md-6 d-flex align-items-center justify-content-center'>
                <img 
                  className="rounded-circle" 
                  style={{ width: '300px'}}
                  src={authFailed ? "../../images/signup_failed_bird.jpg" : "../../images/registr_bird.jpg" }
                  alt="signup_bird" />
              </div>
              <Form
                onSubmit={formik.handleSubmit}
                className="col-12 col-md-6 mt-3 mt-mb-0"
                >
                <h1 className='text-center mb-4'>{t('registration')}</h1>
                  <FloatingLabel
                    controlId='username'
                    label={t('username')}
                    className='mb-3'
                    >
                    <Form.Control
                      name="username"
                      className={formik.touched.username && formik.errors.username && 'is-invalid'}
                      autoComplete='username'
                      placeholder={t('from_3_to_20 characters')}
                      isInvalid={authFailed}
                      required
                      ref={inputRef}
                      {...formik.getFieldProps('username')}
                    />
                     {formik.touched.username && formik.errors.username && <div className='invalid-tooltip'>{formik.errors.username}</div>}
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="password"
                    label={t('password')}
                    className="mb-3"
                    >
                    <Form.Control 
                      name='password'
                      className={formik.touched.password && formik.errors.password && 'is-invalid'}
                      type='password'
                      autoComplete='password'
                      placeholder={t('at_least_6_characters')}
                      isInvalid={authFailed}
                      required
                      {...formik.getFieldProps('password')}
                    />
                      {formik.touched.password && formik.errors.password && <div className='invalid-tooltip'>{formik.errors.password}</div>}
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="confirmPassword"
                    label={t('confirm_pswrd')}
                    className="mb-4"
                    >
                    <Form.Control 
                      name='confirmPassword'
                      className={formik.values.confirmPassword !== formik.values.password && 'is-invalid'}
                      type='password'
                      autoComplete='new-password'
                      placeholder={t('passwords_must_match')}
                      isInvalid={authFailed}
                      required
                      {...formik.getFieldProps('confirmPassword')}
                    />
                      {formik.values.confirmPassword !== formik.values.password && <div className='invalid-tooltip'>{t('passwords_must_match')}</div>}
                      {!!validFormError && <div className='invalid-tooltip'>{validFormError}</div>}
                  </FloatingLabel>
                  <Button 
                    type="submit" 
                    disabled={formik.isSubmitting}
                    variant="outline-primary" 
                    className='w-100'
                    >
                      {t('sign_up')}
                  </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage;