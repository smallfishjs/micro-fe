__webpack_public_path__ = "http://0.0.0.0:9001/"

import React, { lazy, Suspense } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from './home'


const Post = lazy(() => import(/* webpackChunkName: "post" */"./post"));

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/:id" component={WaitingComponent(Post)} />
        </Switch>
      </div>
    </Router>
  );
}

function WaitingComponent(Component) {
  return props => (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );
}

export default App

