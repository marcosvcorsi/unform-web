import React, { useRef, useEffect } from 'react';
import { Form } from '@unform/web';
import { Scope } from '@unform/core';
import './App.css';
import Input from './components/Form/Input';

import * as Yup from 'yup';

const initialData = {
  email: 'marcos.corsi@hotmail.com',
  address: {
    city: 'Francisco Beltrão'
  }
};

function App() {
  const formRef = useRef(null);

  async function handleSubmit(data, { reset }) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string().required('O e-mail é obrigatório'),
        address: Yup.object().shape({
          city: Yup.string()
            .min(3, 'No mínimo 3 caracteres')
            .required('Campo Cidadade é obrigatório')
        })
      });

      await schema.validate(data, {
        abortEarly: false
      });

      console.log(data);

      formRef.current.setErrors([]);
      reset();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errorMessages = {};

        error.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      formRef.current.setData({
        name: 'Marcos Corsi',
        email: 'marcos.corsi@hotmail.com'
      });
    }, 2000);
  }, []);

  return (
    <div className="App">
      <h1>Hello World</h1>

      <Form onSubmit={handleSubmit} ref={formRef}>
        <Input name="name" />
        <Input name="email" type="email" />

        <Scope path="address">
          <Input name="street" />
          <Input name="number" />
          <Input name="city" />
          <Input name="state" />
        </Scope>

        <button type="submit">Enviar</button>
      </Form>
    </div>
  );
}

export default App;
