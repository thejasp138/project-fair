import React from 'react'
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Row,Col} from 'react-bootstrap'
import server_url from '../services/server_url'







function ProjectCard({project}) {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


    
  return (
    <>
        <Card style={{ width: '18rem' }} className='shadow'>
         <Card.Img variant="top" style={{height:"300px"}} onClick={handleShow} src={project.image?`${server_url}/uploads/${project.image}`:"https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2018/08/Empire-Flippers-an-online-business-marketplace-1024x564.webp" } />
            <Card.Body>
                <Card.Title>{project.title}</Card.Title>
            </Card.Body>
         </Card>

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{project.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col>
                <img className='img-fluid' style={{height:"200px"}} src={project.image?`${server_url}/uploads/${project.image}`:"https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2018/08/Empire-Flippers-an-online-business-marketplace-1024x564.webp" } alt="" />
                </Col>
                <Col>
                    <h4>{project.title}</h4>
                    <p>{project.overview}</p>
                    <h6>{project.languges}</h6>
                    <div className='d-flex  justify-content-between'>
                        <a href={project.github}>
                            <i className="fa-brands fa-github fa-xl"></i>
                        </a>
                        <a href={project.demo}>
                        <i class="fa-solid fa-link fa-xl"></i>
                        </a>
                    </div>
                </Col>
            </Row>
          
        </Modal.Body>  
        
      </Modal>
    </>
  )
}

export default ProjectCard