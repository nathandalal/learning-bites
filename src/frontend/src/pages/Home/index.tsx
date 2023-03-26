import React, { useState } from "react";

import logo from '../../logo.svg';
import './style.css';
import { Link } from 'react-router-dom';

export function HomePage() {
  const [learningAnswerText, setLearningAnswerText] = useState("");

  return (
    <div className="container mx-auto py-5">
      <p className="py-2">
        What do you want to learn?
      </p>
      <textarea
        id="message"
        rows={4}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Write your thoughts here..." />

      <Link to="/curriculum" className="App-link">
        Next Page
      </Link>
    </div>
  );
}
