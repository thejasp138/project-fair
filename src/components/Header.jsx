import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { TokenAuthContext } from '../Context Api/AuthContext';

function Header({status}) {

  const {authStatus,setAuthStatus}=useContext(TokenAuthContext)


  const navigate=useNavigate()

  const handlelogOut=()=>{
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('username')
    navigate('/')
    setAuthStatus(false)
  }
  return (
    <>

<Navbar className="bg-body-tertiary ">
        <Container>
          <Navbar.Brand href="#home">
          <i className="fa-solid fa-snowflake" style={{color:' #3cb993'}}></i>
          {' '}
          Project Fair
          </Navbar.Brand>
          <div>
            {!status  &&
            <button className='btn btn-outline-danger rounded' onClick={handlelogOut}>
            <i className="fa-solid fa-right-from-bracket fa-lg me-2"></i>
            Logout
            </button>
            }
            
          </div>
        </Container>
      </Navbar>     
    </>
  )
}

export default Header