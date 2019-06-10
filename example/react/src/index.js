__webpack_public_path__ = "http://localhost:9001/"

import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import App from './view'
import './styles/index.less'


class ReactEl extends HTMLElement {
  constructor() {
    super()
    this.root = null
  }
  connectedCallback() {
    ReactDOM.render(<App />, this);
  }
  disconnectedCallback() {
    ReactDOM.unmountComponentAtNode(this);
  }
  attributeChangedCallback() {

  }
}


customElements.define('react-el', ReactEl);

