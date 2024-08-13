import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import {Row,Col} from 'react-bootstrap'
import Add from '../components/Add'
import Edit from '../components/Edit'
import Profile from '../components/Profile'
import Footer from '../components/Footer'
import { deleteProject, userProjects } from '../services/allApis'
import { addProjectResponseContext } from '../Context Api/Contextapi'
import { editProjectResponseContext } from '../Context Api/Contextapi'
import { toast } from 'react-toastify'


function Dashboard() {
  const [user,setUser]=useState("")
  const [projects,setprojects]=useState([])


  const {addProjectResponse,setAddProjectResponse}=useContext(addProjectResponseContext )

  const {editProjectResponse,setEditProjectResponse}=useContext(editProjectResponseContext )


  useEffect(()=>{
    setUser(sessionStorage.getItem("username"))
    getData()
  },[addProjectResponse,editProjectResponse])
  console.log(projects)
   
  const getData=async()=>{
    const header={"Authorization":`Bearer ${sessionStorage.getItem('token')}`}
    const result=await userProjects(header)

    if(result.status==200){
      setprojects(result.data)
    }
    else{
      console.log(result.response.data)
    }
  }

  


  const handleDelete=async(id)=>{
    const token=sessionStorage.getItem('token')

    const header={
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
    }
    const result=await deleteProject(id,header)
    if(result.status==200){
      toast.success("project Deleted SuccessFulli")

      getData()
    }

    else{
      toast.error(result.response.data)
    }
  }

  return (
   <>
    <Header />
     <div>
      <Row>
       <Col cm={12} md={8} className='p-5'>
        <h1>Welcome <span className='text-warning'>{user}</span></h1>
        <h3>Your Projects</h3>
        <Add/>
        {
          projects.length > 0 ?

          projects.map(item=>(


          <div className='border border-3 p-4'>
            <div className='d-flex justify-content-between border shadow mb-3 p-3 rounded'>
             <h4>{item.title}</h4>
            
             <div>
               <a href={item.github} className='btn me-3'>
               <i className="fa-brands fa-github fa-xl"></i>
               </a>
               <Edit project={item}/>
               
               <button className='btn me-3' onClick={()=>{handleDelete(item?._id)}}>
               <i class="fa-solid fa-trash fa-xl " style={{color:'red'}}></i>
               </button>
             </div>
            </div>
          
           </div>


          ))
          :
          <h3 className='text-center'>NO Projects Avilable</h3>
        }
       

       
       </Col>
       <Col cm={12} md={4} className='p-3'>
        <Profile/>
       </Col>
       </Row>
     </div>
     <Footer/>
   </>
  )
}

export default Dashboard