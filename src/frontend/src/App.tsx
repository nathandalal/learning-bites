import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { HomePage } from './pages/Home';
import Curriculum from './pages/Curriculum';

const App = () => (
    <BrowserRouter>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/curriculum/:milestone/:learningAnswerText" exact component={Curriculum} />
    </Switch>
  </BrowserRouter>
);

export default App;