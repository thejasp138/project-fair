import React, { useState,useContext } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { userLogin, userRegister } from '../services/allApis';
import { useNavigate } from 'react-router-dom';
import { TokenAuthContext } from '../Context Api/AuthContext';

function Auth() {

    const {authStatus,setAuthStatus}=useContext(TokenAuthContext)

    const [status, setstatus]=useState(true)
    const [data,SetData]=useState({
        username:"",password:"",email:""
    })


    const Navigate=useNavigate()
    // console.log(data)


    const chnageStatus=()=>{
        setstatus(!status)
    }

    const handleRegister = async()=>{
        console.log(data)
        const {username,password,email}=data
        if(!username  || !password || !email){

            toast.warning("Invalide Details...! Enter form details Properlly")

        }

        else{
            const result=await userRegister(data)
            console.log(result)
            if(result.status==201){

                toast.success('User Registration Successfull')
                // SetData({username:"",password:"",email:""})
                setstatus(true)

            }
            else{

                toast.error(result.response.data)
            }
            
        }
    }

    const handleLogin=async()=>{
        const {email,password}=data
        if(!email || !password){
            toast.warning("Invalide Details...! Enter form details Properlly")


        }
        else{
            const result=await userLogin({email,password})
            console.log(result)
            if(result.status==200){
                sessionStorage.setItem("token",result.data.token)
                sessionStorage.setItem("username",result.data.user)
                sessionStorage.setItem("userDetails",JSON.stringify(result.data.userDetails))
                toast.success("Login success ")
                Navigate('/')
                setAuthStatus(true)

            }
            else{
                toast.error(result.response.data)
            }  
            
            // console.log(result)
           


        }
    }



    return (
        <>
            <div className='d-flex justify-content-center align-items-center w-100' style={{ height: '100vh' }}>
                <div className='shadow border w-50 p-4'>
                    <Row>
                        <Col sm={12} md={6}>
                            {
                                status?
                            <img src="https://img.lovepik.com/photo/45009/7677.jpg_wh860.jpg" className='img-fluid' alt="image" />

                                :
                                <img className='img-fluid' src="https://t3.ftcdn.net/jpg/05/56/55/06/360_F_556550658_HdTG42xb5HCJENnAJ9FtanFpITpRvK67.jpg" alt="" />
                            }
                        </Col>
                        <Col sm={12} md={6}>
                            {
                                status?
                            <h3>Login</h3>
                            :
                            <h3>Register</h3>


                            }
                            <div className='mt-5'>
                                {
                                    !status &&
                                    <FloatingLabel controlId="user" label="userName"  className="mb-3" >
                                    <Form.Control type="text" placeholder="Username"  onChange={(e)=>{SetData({...data,username:e.target.value})}}/>
                                </FloatingLabel>
                                }
                                <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                                    <Form.Control type="email" placeholder="name@example.com"  onChange={(e)=>{SetData({...data,email:e.target.value})}}/>
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingPassword" label="Password">
                                    <Form.Control type="password" placeholder="Password" onChange={(e)=>{SetData({...data,password:e.target.value})}} />
                                </FloatingLabel>

                            </div>
                            <div className='mt-4'>
                                {
                                    status?
                                    <button className='btn btn-success me-3' onClick={handleLogin} >
                                        <span>Login</span>
                                    </button>
                                    :
                                    <button className='btn btn-success me-3' onClick={handleRegister}>
                                        <span>Register</span>
                                    </button>
                                }
                                
                                
                                <button className='btn btn-link' onClick={chnageStatus}>{
                                    status?
                                    <span>Are You New?</span>:
                                    <span>Already a User</span>
                                }</button>
                            </div>
                        </Col>
                    </Row>

                </div>
            </div>

        </>
    )
}

export default Auth