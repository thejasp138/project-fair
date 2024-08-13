import React from 'react'
import { useState,useEffect,useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Row,Col} from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { addProject } from '../services/allApis';
import { addProjectResponseContext } from '../Context Api/Contextapi';




function Add() {

    const {addProjectsResponse,setAddProjectResponse}=useContext(addProjectResponseContext)

    const [show, setShow] = useState(false);
    const [preview,setPreview]=useState("")
    const [projectData,setProjectData]=useState({
      title:"",overview:"",languge:"",github:"",demo:"",projectImage:""
    })

    const [imageStatus,setImageStatus]=useState(false)

    useEffect(()=>{
      // console.log(projectData)
      if(projectData.projectImage.type=="image/jpg" || projectData.projectImage.type=="image/png" || projectData.projectImage.type=="image/jpeg"){
        console.log("Image is corrected Formate")

        setImageStatus(false)
        setPreview(URL.createObjectURL(projectData.projectImage))

      }
      else{

        // console.log("invalide file formating !! image should be jpg,png or jpeg ")
        setImageStatus(true)

      }
      
      

    },[projectData.projectImage])
    // console.log(projectData)

    const  handleAddProject = async()=>{
      const { title,overview,languge,github,demo,projectImage}=projectData
      if(!title || !overview || !languge || !github || !demo || !projectImage){
        toast.error("Invalide inputs !! Enter valide input data in every fields")
      }
      else{
          const formData=new FormData()
          formData.append("title",title)
          formData.append("overview",overview)
          formData.append("languge",languge)
          formData.append("github",github)
          formData.append("demo",demo)
          formData.append("image",projectImage)

          const token=sessionStorage.getItem('token')
          const reqHeader={

            "Content-Type":"multipart/form-data",
            "Authorization":`Bearer ${token}`

          }
          const result=await addProject(formData,reqHeader)
          if(result.status==200){
            toast.success("project add successfully")

            setProjectData({
              title:"",overview:"",languges:"",github:"",demo:"",projectImage:""
            })
            handleClose()
            setAddProjectResponse(result)

          }
          else{
            toast.error(result.response.data)
          }

          
      }

    }

    


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
   <>
        <button className='btn btn-info mb-4 p-2' onClick={handleShow} style={{backgroundColor:' #3cb993'}}>
            Add Project

        </button>



      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
                <Row>
                    <Col>
                        <label >
                            <input type="file" name="" onChange={(e)=>{setProjectData({...projectData,projectImage:e.target.files[0]})}} style={{display:'none'}}/>
                            <img className='img-fluid'  src={preview?preview:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png"} alt="" />
                        </label>
                        {
                          imageStatus && 
                          <p className='text-danger '>invalide file formating !! image should be JPG,PNG or JPEG </p>
                        }
                    </Col>
                    <Col>
                        <div>
                        <FloatingLabel controlId="titleinp" label="tittle" className="mb-3">
                            <Form.Control type="text" placeholder="Project Title" onChange={(e)=>{setProjectData({...projectData,title:e.target.value})}}/>
                        </FloatingLabel>
                        <FloatingLabel controlId="overviewinp" label="Overview" className="mb-3">
                            <Form.Control type="text" placeholder="Brief about Project" onChange={(e)=>{setProjectData({...projectData,overview:e.target.value})}} />
                        </FloatingLabel>
                        <FloatingLabel controlId="langinp" label="Languges" className="mb-3">
                            <Form.Control type="text" placeholder="Languges used"  onChange={(e)=>{setProjectData({...projectData,languge:e.target.value})}}/>
                        </FloatingLabel>
                       
                            


                        </div>
                    </Col>
                    <FloatingLabel controlId="githubinp" label="GitHub Url" className="mb-3">
                            <Form.Control type="text" placeholder="GitHub Urlt" onChange={(e)=>{setProjectData({...projectData,github:e.target.value})}} />
                        </FloatingLabel>
                    <FloatingLabel controlId="demoinp" label="Demo Url" className="mb-3">
                            <Form.Control type="text" placeholder="Demo Url " onChange={(e)=>{setProjectData({...projectData,demo:e.target.value})}}/>
                     </FloatingLabel>
                </Row>
            </div>
            
         

         
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" className='bg-success' onClick={handleAddProject}>Save</Button>
        </Modal.Footer>
      </Modal>
   </>
  )
}

export default Add