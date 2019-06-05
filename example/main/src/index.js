import 'core-js/features/array'
import 'core-js/features/promise'
import 'core-js/features/string'
import 'regenerator-runtime/runtime'

import { registerMicroApp, start, setExcludes } from '../../../lib';

function render({ appContent, loading }) {
  const container = document.getElementById('container');
  container.innerHTML = appContent
}

function gotoLink(title, href) {
  window.history.pushState({}, title, href);
}

document.getElementById('vue').onclick = () => {
  gotoLink('vue', '/vue')
}

document.getElementById('react').onclick = () => {
  gotoLink('react', '/react')
}


function genActiveRule(routerPrefix) {
  return (location) => location.pathname.startsWith(routerPrefix);
}

setExcludes([
  /document-register-element.js/
])

registerMicroApp({
  name: 'vue app',
  entry: '//0.0.0.0:9000/index.html',
  render,
  activeRule: genActiveRule('/vue'),
});

registerMicroApp({
  name: 'react app',
  entry: '//0.0.0.0:9001/index.html',
  render,
  activeRule: genActiveRule('/react'),
  execScripts: [
    /register/
  ]
});


start();