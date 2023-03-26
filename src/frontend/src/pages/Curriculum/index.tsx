import React, { useEffect } from "react";

import logo from '../../logo.svg';
import './style.css';
import { Link } from 'react-router-dom';

import React, { useState, useEffect } from "react";
import axiosClient from '../../utils/axiosClient';
import Sidebar from "../../components/Sidebar";



export function Curriculum() {
   const [learningAnswerText] = useState("");
   const [backendResponse, setBackendResponse] = useState<string | null>(null);

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