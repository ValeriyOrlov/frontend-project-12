import { useFormik } from 'formik';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import React, { useEffect, useRef, useState } from 'react';

const LoginPage = () => {
  const inputRef = useRef();

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
        .min(6, 'must be 6 characters or more')
        .required('Required'),
    }),
    onSubmit: (values) => console.log(values),
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
            <FloatingLabel
              controlId='username'
              label='Ваш ник'
              className='mb-3'
            >
             <Form.Control
                name="username"
                autoComplete='username'
                placeholder='Ваш ник'
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
                required
                {...formik.getFieldProps('password')}
              />
                {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
                ) : null}
            </FloatingLabel>
            <Button type="submit" variant="outline-primary" className='w-100'>Войти</Button>
        </Form>
      </div>
      <div className='card-footer p-4'></div>
    </div>
  )
}

export default LoginPage;