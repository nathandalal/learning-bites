import React, { useState, useEffect } from "react";
import axios from "axios";

import logo from '../../logo.svg';
import './style.css';
import { Link } from 'react-router-dom';
import axiosClient from "../../utils/axiosClient";

export function HomePage() {
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
        What do you want to learn?
      </p>
      <textarea
        id="message"
        rows={4}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Write your thoughts here..."
        value={learningAnswerText}
        onChange={(event) => { setLearningAnswerText(event.target.value) }} />

      <button className="my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={onSubmit}>
        Make Bite Size Learning Experience
      </button>

      <div>
        <Link to="/curriculum" className="App-link">
          Next Page
        </Link>
      </div>
    </div>
  );
}
