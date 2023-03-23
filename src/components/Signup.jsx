import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { AuthContext } from '../context/AuthContext';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';


export const Signup = () => {

  const navigate = useNavigate();

  const { setToken, setUser } = useContext(AuthContext)

  const [data, setData] = useState({})
  const [error, setError] = useState(false)

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  
  const FetchApi = async () => {
    try {

      setError(null)

      let req = await fetch(`http://localhost:5000/signup`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      })

      let res = await req.json();

      if(res.status == 'failed'){
        if(res.massage.split(' ').includes('E11000')){
          setError('Email is already registered')
        }else{
          let er = res.massage.trim().split(':')
          setError(er[er.length - 1])
        }
      }
      else{
        setUser(res.user)
        navigate('/login')
      }

    } catch (e) {
      setError('Errorn in fetchin api')
    }
    
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    FetchApi();
  }


  return (
    <>

      <div className={error ? 'alert' : 'hide'} ><Alert variant="danger" >{error} !</Alert></div>


      <Form className="form" onSubmit={handleSubmit} >
        <h2>Signup</h2>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Control type="text" onChange={handleInput} name='name' placeholder="Enter name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control type="email" onChange={handleInput} name='email' placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control type="password" onChange={handleInput} name='password' placeholder="Password" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Control type="text" onChange={handleInput} name='phone' placeholder="phone" />
        </Form.Group>

        <Button variant="secondary" type="submit">
          Submit
        </Button>
      </Form>


    </>
  )
}
