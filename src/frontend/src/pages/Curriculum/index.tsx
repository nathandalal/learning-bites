<<<<<<< HEAD
import React, { useState, useEffect } from "react";

=======
>>>>>>> 6ddd08b85d28061f621dafea7563aaefdecc5c18
import logo from '../../logo.svg';
import './style.css';
import { Link, useParams } from 'react-router-dom';

import axiosClient from '../../utils/axiosClient';
import Sidebar from "../../components/Sidebar";



export function Curriculum() {
<<<<<<< HEAD
  const { milestone } = useParams<{ milestone: string }>();
  const [learningAnswerText, setLearningAnswerText] = useState("");
  const [backendResponse, setBackendResponse] = useState<string | null>(null);
 
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

   const fetchBackendResponse = async () => {
      try {
         const response = await axiosClient({
            method: 'post',
            url: `/response`,
            params: {
               human_input: learningAnswerText,
            },
            data: {},
         })

         setBackendResponse(response.data.data);
      } catch (error) {
         console.error("Error fetching backend response:", error);
      }
   };

   useEffect(() => {
      fetchBackendResponse();
   }, []);
 
   return (
     <div className="container mx-auto py-5">
       <p className="py-2">
         You're learning about the following topic: {milestone}
       </p>
<<<<<<< Updated upstream

=======
 
       <h3 className="py-2">
         Learning Goal 1 
       </h3>
=======
   const [learningAnswerText] = useState("");
   const [backendResponse, setBackendResponse] = useState<string | null>(null);
>>>>>>> 6ddd08b85d28061f621dafea7563aaefdecc5c18

   const fetchBackendResponse = async () => {
      try {
         const response = await axiosClient({
            method: 'post',
            url: `/response`,
            params: {
               human_input: learningAnswerText,
            },
            data: {},
         })

         setBackendResponse(response.data.data);
      } catch (error) {
         console.error("Error fetching backend response:", error);
      }
   };

   useEffect(() => {
      fetchBackendResponse();
   }, []);

   return (
      <div className="container mx-auto py-5">
         <p className="py-2">
            Here is a curriculum tailored to your learning needs.
         </p>

>>>>>>> Stashed changes
         {backendResponse && (
            <div className="py-2">
               {backendResponse}
            </div>
         )}

         <div>
            <Link to="/" className="App-link">
               {'<<'} Previous Page
            </Link>
         </div>
      </div>
   );
}

export default Curriculum;