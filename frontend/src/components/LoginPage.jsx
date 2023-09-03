import { useFormik } from 'formik';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import routes from '../routes';
import useAuth from '../hooks';
import { useLocation, useNavigate } from 'react-router-dom';


const LoginPage = () => {
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: { username: '', password: ''},
    validationSchema: Yup.object({
      username: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      password: Yup.string()
        .required('Required'),
    }),
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const response = await axios.post(routes.loginPath(), values);
        auth.logIn();
        localStorage.setItem('userId', JSON.stringify(response.data));
        const { from } = location.state;
        navigate(from)
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
    <div className='card shadow-sm'>
      <div className='card-body row p-5'>
        <div className='col-12 col-md-6 d-flex align-items-center justify-content-center'>
          <img className="rounded-circle" src="" alt="" />
        </div>
        <Form
          onSubmit={formik.handleSubmit}
          className="col-12 col-md-6 mt-3 mt-mb-0"
        >
          <h1 className='text-center mb-4'>Войти</h1>
          <fieldset disabled={formik.isSubmitting}>
            <FloatingLabel
              controlId='username'
              label='Ваш ник'
              className='mb-3'
            >
             <Form.Control
                name="username"
                autoComplete='username'
                placeholder='Ваш ник'
                isInvalid={authFailed}
                required
                ref={inputRef}
                {...formik.getFieldProps('username')}
              />
               {formik.touched.username && formik.errors.username ? (
                <div>{formik.errors.firstName}</div>
                ) : null}
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Пароль"
              className="mb-3"
            >
              <Form.Control 
                name='password'
                autoComplete='password'
                type="text" 
                placeholder="Пароль"
                isInvalid={authFailed}
                required
                {...formik.getFieldProps('password')}
              />
                {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
                ) : null}
                <Form.Control.Feedback type="invalid">the username or password is incorrect</Form.Control.Feedback>
            </FloatingLabel>
            <Button type="submit" variant="outline-primary" className='w-100'>Войти</Button>
          </fieldset>
        </Form>
      </div>
      <div className='card-footer p-4'></div>
    </div>
  )
}

export default LoginPage;