import { commonApi } from "./commonApi";
import base_url from "./server_url";


//register
export  const userRegister=async(data)=>{
    return await commonApi("POST",`${base_url}/register`,data,"")
}

//login

export const userLogin=async(data)=>{
    return await commonApi("POST",`${base_url}/login`,data,"")
}

//addprojects


export const addProject=async(data,header)=>{
    return await commonApi("POST",`${base_url}/addproject`,data,header)

}

// home projects

export const homeProjects=async()=>{
    return await commonApi("GET",`${base_url}/home-projects`,"","")
}

//all projects

export const allProjects=async(header,search)=>{

    return await commonApi("GET",`${base_url}/all-projects?search=${search}`,"",header)
}

//userprojects

export const userProjects=async(header)=>{
    return await commonApi("GET",`${base_url}/user-projects`,"",header)
}
//edit projects


export const editProjects=async(id,data,header)=>{
    return await commonApi("PUT",`${base_url}/edit-project/${id}`,data,header)

}


//delete projects


export const deleteProject=async(id,header)=>{
    return await commonApi("DELETE",`${base_url}/delete-project/${id}`,{},header

    
    )
}


