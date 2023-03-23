import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

export const Home = () => {
  const { token, user } = useContext(AuthContext)
  const [status, setStatus] = useState('loading')

  async function ckeckVerify() {
    try {
      let req = await fetch('http://localhost:5000/varify', {
        method: 'POST',
        body: JSON.stringify({ token }),
        headers: { 'Content-Type': 'application/json' }
      })

      let res = await req.json();

      if (res.status !== 'failed') {
        setStatus(true)
      }
      else {
        setStatus(false)
      }
    }
    catch (err) {
      console.log(err);
      setStatus(false)
    }
  }

  useEffect(() => {
    ckeckVerify();
  }, [])

  return (<>
    {status === 'loading' ? <h1>Loading ...</h1> :

      status ?

        <div>

          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>User Details</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">some info</Card.Subtitle>
              <Card.Text>
                <strong>Name : </strong> {user.name} <br />
                <strong>Email : </strong> {user.email} <br />
                <strong>Mobile : </strong> {user.phone} <br />
              </Card.Text>

            </Card.Body>
          </Card>

        </div>

        :

        <div>
          <Card classname="card" style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>401 error</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Invalid User</Card.Subtitle>
              <Card.Text>
                You are not authorized to visit please login
              </Card.Text>

              <Link to={'/login'} >go to login</Link>

            </Card.Body>
          </Card>
        </div>
    }


  </>)
}
