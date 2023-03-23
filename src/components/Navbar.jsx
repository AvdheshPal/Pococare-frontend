import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';



export const Navbar = () => {
    return (<>

    
        <div id='navbar' >

            <Button variant="secondary"><Link to='/' className='link' >Home</Link></Button>{' '}

            <Button variant="secondary"><Link to='/login' className='link' >Login</Link></Button>{' '}

            <Button variant="secondary"><Link to='/signup' className='link' >Signup</Link></Button>{' '}

        </div>
    </>)
}
