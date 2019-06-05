__webpack_public_path__ = "http://0.0.0.0:9000/"

import Vue from 'vue'
import App from './view'
import router from './router'
import './styles/index.less'


class VueEl extends HTMLElement {
  constructor() {
    super()
    this.root = null
  }
  connectedCallback() {
    this.root = new Vue({
      el: this,
      router,
      render: h => h(App),
    })
  }
  disconnectedCallback() {
    if (this.root) {
      this.root.$destroy()
      this.root = null
    }

  }
  attributeChangedCallback() {

  }
}


customElements.define('vue-el', VueEl);
