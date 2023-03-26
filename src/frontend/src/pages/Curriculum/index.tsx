import React, { useState, useEffect } from "react";
import logo from '../../logo.svg';
import './style.css';
import { Link, useParams } from 'react-router-dom';

import axiosClient from '../../utils/axiosClient';
import Sidebar from "../../components/Sidebar";



export function Curriculum() {
  const { milestone, learningAnswerText } = useParams<{ milestone: string, learningAnswerText: string }>();
  const [userText, setUserText] = useState(`give me a simple lesson about ${milestone} as it relates to the learner's question "${learningAnswerText}" in it using the following structure:\n\n1. Overview of principle\n\n2. Easy to understand real world examples of the principle assuming no prior experience\n\n3. Details of why principle is important\n\n4. A multiple choice question with three possible answers that you ask me to confirm my understanding (make sure you do not give me the answer and let me answer it! Please return your lesson content to the student informally and approachably, with appropriate line breaks and english language formatting.\n\nAs an example, a simple lesson about soil as it relates to farming is: Soil quality is integral to the health of crops. High nutrient quantity will ensure produce and other crops have a better chance of surviving.`);
  const [backendResponse, setBackendResponse] = useState<string | null>(null);
  const [backendResponseHistory, setBackendResponseHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [moreQuestionsText, setMoreQuestionsText] = useState("");
 
   const onSubmit = async () => {
     await axiosClient({
       method: 'post',
       url: `/response`,
       params: {
         human_input: userText,
       },
       data: {},
     }).then(data => { console.log(data) });
   }

   const onAskMore = async () => {
    if (!moreQuestionsText) {
      alert("Please input for more information!")
      return;
    }
    setBackendResponseHistory((prev) => [...prev, moreQuestionsText])
    console.log("WIOEJOIFJEIOFCOE")
    await fetchBackendResponse(`Based on you providing a question earlier about ${milestone}, the student either had a clarifiication or answered the question with "${moreQuestionsText}" Please help the student clarify their misconceptions!`);
   }

   const fetchBackendResponse = async (learnerInput: string) => {
    setLoading(true);
      try {
         const response = await axiosClient({
            method: 'post',
            url: `/response`,
            params: {
               human_input: learnerInput,
            },
            data: {},
         })

         setBackendResponse(response.data.data);
         setBackendResponseHistory((prev) => [...prev, response.data.data])
      } catch (error) {
         console.error("Error fetching backend response:", error);
      }
      setLoading(false);
   };

   console.log(backendResponse)

   useEffect(() => {
      if (!backendResponse && backendResponseHistory.length === 0) {
        fetchBackendResponse(userText);
      }
   }, []);
 
   return (
     <div className="container mx-auto py-5">
       <h1 className="pt-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
         {milestone}
       </h1>


         {backendResponse ? (
               backendResponseHistory.map((item, idx) => (
                idx % 2 === 0 ? <>
                <div className="whitespace-pre-wrap mb-6 font-normal">
                  {item}
                  </div>
                  </> : <div className="font-bold py-2 whitespace-pre-wrap">
                  Learner asked: {item}
                  </div>
                ))
         ): (
         <div className="py-6">Your AI generated lesson is loading! Please stand by for learning...</div>)}

         {backendResponseHistory.length > 0 && backendResponseHistory.length % 2 === 0 && (
            <div className="py-6">The AI is working on a response to your question...</div>
          )}

         {backendResponse && <><textarea
        id="message"
        rows={4}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Do you have more questions about this topic? Ask them here."
        value={moreQuestionsText}
        onChange={(event) => { setMoreQuestionsText(event.target.value) }} />

      <button className="my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={onAskMore}>
        Ask more questions about this topic!
      </button></>}

         <div>
            <Link to="/" className="App-link">
               {'<<'} Back to Home Page
            </Link>
         </div>
      </div>
   );
}

export default Curriculum;