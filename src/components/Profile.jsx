import React,{useEffect, useState} from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import server_url from '../services/server_url'

function Profile() {
  const [user,setUser]=useState({
    id:"",username:"",email:"",password:"",github:"",linkedin:"",profile:""
  })
  const[open,setOpen]=useState(false)
  const [preview,setPreview]=useState("")
  const [existingProfile,setExistingProfile] = useState("")
  useEffect(()=>{
    if(sessionStorage.getItem('token')){
      const userDetails=JSON.parse(sessionStorage.getItem('userDetails'))
      console.log(userDetails)
      setUser({id:userDetails._id,username:userDetails.username,email:userDetails.email,password:userDetails.password,github:userDetails.github,linkedin:userDetails.linkedin, profile:""

      })
      setExistingProfile(userDetails.Profile)
    }

  },[open])

  useEffect(()=>{
    if(user.profile){
      setPreview(URL.createObjectURL(user.profile))
    }
    else{
      setPreview("")
    }

  },[user.profile])
  // console.log(user)

  const handleProfileUpdate=()=>{
    console.log(user)
  }

  
  return (
    <>
      <div className='p-5 border shadow border-3 mm-3'>
        <div className='d-flex justify-content-between'> 
            <h4>Profile</h4>
            <button className='btn' onClick={()=>setOpen(!open)}>
                <i className="fa-solid fa-down-long" style={{color:'#63E6BE'}}/>
                {/* <i className="fa-solid fa-check" style={{color:'#63E6BE'}}/> */}


            </button>

        </div>
        {
          open &&
          <div>
          <label >
             <input type="file" name="" id='in' onChange={(e)=>setUser({...user,profile:e.target.files[0]})}  style={{display:'none'}}/>
             {
               existingProfile ==" " ?
               <img className='img-fluid' style={{width:'200px'}} src={preview?preview:"https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"} alt="im" />

               :
               <img className='img-fluid' style={{width:'200px'}} src={preview?preview:`${server_url}/uploads/${existingProfile}`} alt="im" />

             }
         </label>
         <FloatingLabel className='mb-3' controlId="username" label="Username" >
                 <Form.Control type="text" placeholder="Username" value={user?.username}  onChange={(e)=>setUser({...user,username:e.target.value})}  />
             </FloatingLabel>
            
             <FloatingLabel className='mb-3' controlId="git" label="GitLink">
                 <Form.Control type="text" placeholder="Git Account Url" value={user?.github}   onChange={(e)=>setUser({...user,github:e.target.value})}  />
             </FloatingLabel>
             <FloatingLabel className='mb-3' controlId="Linkedin" label="Linkedin Url">
                 <Form.Control type="text" placeholder="Linkedin Url" value={user?.linkedin}  onChange={(e)=>setUser({...user,linkedin:e.target.value})} />
             </FloatingLabel>
             <div className='d-grid'>
              <button className='btn btn-block btn-warning'onClick={handleProfileUpdate}>Update</button>

             </div>

          </div>
        }
       

      </div>
    
    </>
  )
}

export default Profile