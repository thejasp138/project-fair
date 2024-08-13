import React, { useEffect,useContext } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Row,Col} from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import base_url from '../services/server_url';
import { editProjects } from '../services/allApis';
import { editProjectResponseContext } from '../Context Api/Contextapi';
import { toast } from 'react-toastify';



function Edit({project}) {
    const [show, setShow] = useState(false);
    const {editProjectResponse,setEditProjectResponse}=useContext(editProjectResponseContext )


    const [projectData,setProjectData]=useState({
     id:project._id, title:project.title,overview:project.overview,languges:project.languges,github:project.github,demo:project.demo,projectImage:""
    })

    const [imaStatus,setImageStatus]=useState(false)
    const [preview,setPreview]=useState("")

    useEffect(()=>{

      if(projectData.projectImage.type=="image/jpg" || projectData.projectImage.type=="image/jpeg" || projectData.projectImage.type=="image/png" ){
        setImageStatus(false)
        setPreview(URL.createObjectURL(projectData.projectImage))

      }
      else{
        setImageStatus(true)
        setPreview("")
      }
       
    },[projectData.projectImage])

    // console.log(projectData)

    const handleUpdate=async()=>{
      console.log(projectData)
      const { title,overview,languges,github,demo,projectImage}=projectData
      if(!title || !overview || !languges || !github || !demo ){
        toast.error("Invalide inputs !! Enter valide input data in every fields")
        
      }
      else{
        const formData=new FormData()
        formData.append("title",title)
        formData.append("overview",overview)
        formData.append("languges",languges)
        formData.append("github",github)
        formData.append("demo",demo)
        preview?formData.append("image",projectData.projectImage):formData.append("image",projectImage)

        const token=sessionStorage.getItem('token')
        if(preview){
          const reqHeader={

            "Content-Type":"multipart/form-data",
            "Authorization":`Bearer ${token}`
  
          }

          const result=await editProjects(projectData.id,formData,reqHeader)
          if(result.status==201){
            toast.success(`data update Successfulli`)

            handleClose()
            setEditProjectResponse()

            
          }
          else{
            toast.warning(result.response.data)

          }

        }
        else{
          const reqHeader={

            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
  
          }
          const result=await editProjects(projectData.id,formData,reqHeader)
          if(result.status==200){
            toast.success(`data update Successfulli`)

            handleClose()
            setEditProjectResponse()
          }
          else{
            toast.warning(result.response.data)

          }
          

        }

      }
    }
    
  


  


    const handleClose = () => {
      setShow(false)
      setPreview("")
      setProjectData({
        id:project._id, title:project.title,overview:project.overview,languges:project.languges,github:project.github,demo:project.demo,projectImage:""


      })
      };
    const handleShow = () => setShow(true);
  return (
    <>
        <button className='btn me-3' onClick={handleShow}>
            <i class="fa-solid fa-pen-to-square fa-xl"></i>
        </button>



      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
                <Row>
                    <Col>
                        <label >
                            <input type="file" name=""   onChange={(e)=>{setProjectData({...projectData,projectImage:e.target.files[0]})}} style={{display:'none'}}/>
                            <img className='img-fluid' src={preview?preview:`${base_url}/uploads/${project.image}`} alt=""  />
                        </label>
                        {
                          imaStatus && 
                          <p className='text-danger'>invalide file formating !! image should be JPG,PNG or JPEG</p>
                        }
                    </Col>
                    <Col>
                        <div>
                           <FloatingLabel controlId="titleinp" label="tittle" className="mb-3">
                                <Form.Control type="text" onChange={(e)=>{setProjectData({...projectData,title:e.target.value})}} value={projectData.title} placeholder="Project Title" />
                           </FloatingLabel>
                           <FloatingLabel controlId="overviewinp" label="Overview" className="mb-3">
                                <Form.Control type="text" onChange={(e)=>{setProjectData({...projectData,overview:e.target.value})}} value={projectData.overview } placeholder="Brief about Project" />
                           </FloatingLabel>
                           <FloatingLabel controlId="langinp" label="Languges" className="mb-3">
                                <Form.Control type="text"onChange={(e)=>{setProjectData({...projectData,languges:e.target.value})}}  value={projectData.languges} placeholder="Languges used" />
                           </FloatingLabel>
                       
                        </div>
                    </Col>
                    <FloatingLabel controlId="githubinp" label="GitHub Url" className="mb-3">
                            <Form.Control type="text" onChange={(e)=>{setProjectData({...projectData,github:e.target.value})}} value={projectData.github} placeholder="GitHub Urlt" />
                        </FloatingLabel>
                    <FloatingLabel controlId="demoinp" label="Demo Url" className="mb-3">
                            <Form.Control type="text" onChange={(e)=>{setProjectData({...projectData,demo:e.target.value})}} value={projectData.demo} placeholder="Demo Url " />
                     </FloatingLabel>
                </Row>
            </div>
            
         

         
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate} className='bg-info'>Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Edit