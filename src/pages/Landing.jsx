import React,{useState,useEffect} from 'react'
import {Row,Col} from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { homeProjects } from '../services/allApis'

function Landing() {

        const [token,setToken]=useState("")
        const [projects,setProjects]=useState([])

        useEffect(()=>{
            setToken(sessionStorage.getItem("token"))
            getHomeProjects()

        },[])
        const getHomeProjects=async()=>{
            const result=await homeProjects()
            console.log(result);
            if(result.status==200){
                setProjects(result.data)
            }
            else{
              console.log(result.response.data);
            }
          }
        
          console.log(projects);
    


  return (
    <>
    <div className='w-100 align-items-center d-flex p-5 ' style={{height:'100vh', backgroundColor:'whit'}}>
        <Row>
            <Col className='align-items-center d-flex'>
                <div >
                    <h1 className='display-4 mb-2 '>Projct Fair 2024</h1>
                    <p style={{textAlign:'justify'}}> It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
                    {/* <button className='btn btn-success' ></button> */}
                    {
                        token ?
                        <Link className='btn btn-info' to={'/dash'}> Manage Your Projects</Link>

                        :
                        <Link className='btn btn-success' to={'/auth'}>Start To Explore...</Link>

                    }
                </div>
            </Col>
            <Col >
                <img className='img-fluid' src="https://static.vecteezy.com/system/resources/previews/006/948/455/original/startup-project-mobile-development-team-rocket-startup-takes-off-for-launching-a-new-business-start-your-business-flat-style-illustration-vector.jpg" alt="" />
            </Col>
            
        </Row>
    </div>
    <div className='p-5 w-100'>
        <h2 className='text-center mt-4 mb-3'>Project For you</h2>
        <marquee behavior="" direction="">
        <div className='d-flex justify-content-evenly mt2'>
        {
           projects.length>0 ?
           projects.map(item=>(
            <ProjectCard project={item}/>
           ))
           :
           <h5>No Projects Available</h5>


        }
        </div>
        </marquee>
        <div className='text-center'>
            <Link to={'/projects'} >Click For More...</Link>

        </div>

    </div>
    <Footer/>

    </>
    
  )
}

export default Landing