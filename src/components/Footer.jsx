import React from 'react'
import {Row,Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
      <div className='w-100 d-flex   ' style={{ backgroundColor:'rgb(72, 211, 232)'}}>

        <Row>
          <Col className='p-5'>

          <h4 style={{color:"white"}}>Project Fair 2024</h4>
          <p style={{textAlign:'justify',color:"white"}}>Besides that, if you specify for video such data as Title, Description, Play page URL, Thumbnail URL, Raw video file 
            location, and Player URL Google will have all the necessary information to include it in search, thereby moving you up on
             the ladder as a helpful, informative resource.</p>


          </Col>
          <Col className='d-flex flex-column align-items-center p-5' >
          < h4 style={{color:"white"}}>Links</h4>
            <Link to={'/' } style={{color:"white"}}>Landing</Link><br />
            <Link to={'/dash'} style={{color:"white"}}>Dashbord</Link><br />
            <Link to={'/auth'} style={{color:"white"}}>Login</Link><br />
            

          </Col>
          <Col className='d-flex flex-column align-items-center p-5'>
          <h4 style={{color:"white"}}>Reference</h4>
            <a href="https://getbootstrap.com/" target='-blank' style={{color:"white"}}>Bootsttrap</a> <br />
            <a href="https://react-bootstrap.netlify.app/"  target='-blank' style={{color:"white"}}>React-Bootstrap</a> <br />
            <a href="https://react.dev/" target='-blank' style={{color:"white"}}>React</a>
          </Col>
           
        </Row>

       
        
         

       </div>
      

    
    
    </>
    
  )
}

export default Footer