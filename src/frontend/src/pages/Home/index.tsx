import React, { useState, useEffect } from "react";
import axios from "axios";

import logo from '../../logo.svg';
import './style.css';
import { Link } from 'react-router-dom';
import axiosClient from "../../utils/axiosClient";

export function HomePage() {
  const [learningAnswerText, setLearningAnswerText] = useState("How browsers work");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null)

  const onSubmit = async () => {
    if (!learningAnswerText) {
      alert("Please add what you want to learn!")
      return;
    }
    setLoading(true);
    await axiosClient({
      method: 'post',
      url: `/milestone`,
      params: {
        topic: learningAnswerText,
      },
      data: {},
    }).then(({data}) => {
      setResponse(data);
      console.log(data)
      setLoading(false);
    })
  }

  // ts-ignore
  const milestones = (response?.data?.[0].trim().split(",") || []) as string[]

  console.log(response)

  return (
    <div className="container mx-auto py-5 grid grid-cols-2">
      <div>
      <p className="py-2 mb-4 text-3xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl">
        What do you want to <br/><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">learn</span>?
      </p>
      <textarea
        id="message"
        rows={4}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Teach yourself anything."
        value={learningAnswerText}
        onChange={(event) => { setLearningAnswerText(event.target.value) }} />

      <button disabled={loading} className="my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={onSubmit}>
        {!loading ? "Experience Bite-Size Learning" : "Making your custom bite-sized learning experience...."}
      </button>
      </div>

      <div className="flex flex-col items-start ml-16">
      {milestones.map((milestone) => (
        <p className="py-2" key={milestone}>
        <Link to={`/curriculum/${milestone}/${learningAnswerText}`} className="App-link">
        <button className="text-pink-500 border border-pink-500 hover:bg-pink-500 hover:text-white active:bg-pink-600 font-bold uppercase px-8 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
          <i className="fas fa-heart"></i> {milestone.trim()}
        </button>
        </Link>
        </p>
        ))}
      </div>
    </div>
  );
}
