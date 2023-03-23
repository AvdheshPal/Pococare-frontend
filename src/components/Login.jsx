import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import Alert from 'react-bootstrap/Alert';
import {useNavigate} from 'react-router-dom'

export const Login = () => {
  const navigate = useNavigate();
  const { setToken, setUser, user } = useContext(AuthContext)

  const [data, setData] = useState({})
  const [error, setError] = useState(false)

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  
  const FetchApi = async () => {
    try {

      setError(null)

      let req = await fetch(`http://localhost:5000/login`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      })

      let res = await req.json();

      if(res.status == 'failed'){
        let er = res.massage.trim().split(':')
        setError(er[er.length - 1])
      }
      else{
        setToken(res.token)
        setUser(res.user)
        console.log(user);
        navigate('/')
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
        <h2>Login</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control type="email" name="email" onChange={handleInput} placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control type="password" name="password" onChange={handleInput} placeholder="Password" />
        </Form.Group>
        <Button variant="secondary" type="submit">
          Submit
        </Button>
      </Form>


    </>
  )
}
