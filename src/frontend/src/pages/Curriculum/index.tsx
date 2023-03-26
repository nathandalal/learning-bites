import React, { useState, useEffect } from "react";

import logo from '../../logo.svg';
import './style.css';
import { Link, useParams } from 'react-router-dom';

import axiosClient from '../../utils/axiosClient';
import Sidebar from "../../components/Sidebar";



export function Curriculum() {
  const { milestone } = useParams<{ milestone: string }>();
  const [learningAnswerText, setLearningAnswerText] = useState("");
 
   const onSubmit = async () => {
     await axiosClient({
       method: 'post',
       url: `/response`,
       params: {
         human_input: learningAnswerText,
       },
       data: {},
     }).then(data => { console.log(data) });
   }
 
   return (
     <div className="container mx-auto py-5">
       <p className="py-2">
         You're learning about the following topic: {milestone}
       </p>
 
       <h3 className="py-2">
         Learning Goal 1 
       </h3>

       <h3 className="py-2">
         Learning Goal 2
       </h3>
 
       <div>
         <Link to="/" className="App-link">
           Previous Page
         </Link>
       </div>
     </div>
   );
 }

export default Curriculum;