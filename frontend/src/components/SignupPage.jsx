import { useFormik } from 'formik';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import routes from '../routes';
import useAuth from '../hooks';
import { useLocation, useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: { username: '', password: '', confirmPassword: '' },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(6, 'Must be 6 characters or more')
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      password: Yup.string().min(6, 'Must be 6 characters or more')
        .required('Required'),
      confirmPassword: Yup.string()
        .required('Password confirmation is a required field')
        .oneOf(
          [Yup.ref('password')],
          'Password confirmation does not match to password',
        ),
    }),
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const { username, password } = values;
        const response = await axios.post(routes.signupPath(), { username, password });
        auth.logIn();
        localStorage.setItem('userId', JSON.stringify(response.data));
        console.log(location)
        navigate('/');
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
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
                  src="../../images/registr_bird.jpg" 
                  alt="signup_bird" />
              </div>
              <Form
                onSubmit={formik.handleSubmit}
                className="col-12 col-md-6 mt-3 mt-mb-0"
                >
                <h1 className='text-center mb-4'>Регистрация</h1>
                <fieldset disabled={formik.isSubmitting}>
                  <FloatingLabel
                    controlId='username'
                    label='Имя пользователя'
                    className='mb-3'
                    >
                    <Form.Control
                      name="username"
                      autoComplete='username'
                      placeholder='От 3 до 20 символов'
                      isInvalid={authFailed}
                      required
                      ref={inputRef}
                      {...formik.getFieldProps('username')}
                    />
                     {formik.touched.username && formik.errors.username ? (
                      <div>{formik.errors.username}</div>
                      ) : null}
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Пароль"
                    className="mb-3"
                    >
                    <Form.Control 
                      name='password'
                      type='password'
                      autoComplete='password'
                      placeholder="Не менее 6 символов"
                      isInvalid={authFailed}
                      required
                      {...formik.getFieldProps('password')}
                    />
                      {formik.touched.password && formik.errors.password ? (
                      <div>{formik.errors.password}</div>
                      ) : null}
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Подтверите пароль"
                    className="mb-4"
                    >
                    <Form.Control 
                      name='confirmPassword'
                      type='password'
                      autoComplete='confirmPassword'
                      placeholder="Пароли должны совпадать"
                      isInvalid={authFailed}
                      required
                      {...formik.getFieldProps('confirmPassword')}
                    />
                      {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                      <div>{formik.errors.confirmPassword}</div>
                      ) : null}
                    <Form.Control.Feedback type="invalid">the username or password is incorrect</Form.Control.Feedback>
                  </FloatingLabel>
                  <Button type="submit" variant="outline-primary" className='w-100'>Зарегистрироваться</Button>
                </fieldset>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage;