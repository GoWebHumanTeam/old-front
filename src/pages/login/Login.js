import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useState, useEffect } from "react";
import {Link} from 'react-router-dom';

import React from 'react';
import './Login.css';



function Login() {
    const baseUrl = "http://localhost:8081";
 

  const [name, setName] = React.useState();
  const [studentID, setStudentID] = React.useState();

  useEffect(()=>{
      getUser();
  },[]);

  async function getUser(){
      await axios
       .get(baseUrl + "/")
       .then((response)=>{
        console.log(response.data);
        setName(response.data.name);
        setStudentID(response.data.studentID);
       })  
       .catch((error)=>{
        console.log(error);
       })
		  
  }

  const handleChange_username = (e)=>{
      e.preventDefault();
      setName(e.target.value);
  }

  const handleChange_studentID = (e)=>{
      e.preventDefault();
      setStudentID(e.target.value);
  }

  const handleSubmit = async (e) => {
      e.preventDefault();

      await axios
          .post(baseUrl + "api/login" ,{
            name:name,
            studentID:studentID,
          })
          .then((response)=>{
            console.log(response.data)
          })
          .catch((error)=>{
            console.log(error);
          });
		  	  
  }
    return (
        
   
        <div>
        <br></br>
        <h1> Login</h1>
        <p></p>
          <form onSubmit={handleSubmit}>
             <p>username: <input type="text" class="form-control" placeholder="Username" aria-label="Username"  required={true} value={name} onChange={handleChange_username}></input></p>
             <p>studentID: <input type="text" class="form-control" placeholder="StudentID" aria-label="StudentID" required={true} value={studentID} onChange={handleChange_studentID}></input></p>
            

              <Button class="btn btn-outline-primary"  type="submit" > OK</Button>

          </form>
      </div>
    );
}

export default Login;