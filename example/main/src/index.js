import 'core-js/features/array'
import 'core-js/features/promise'
import 'core-js/features/string'
import 'regenerator-runtime/runtime'

import { registerMicroApp, start, setExcludes } from 'smallfish-mf';

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

document.getElementById('smallfish').onclick = () => {
  gotoLink('smallfish', '/smallfish')
}

function genActiveRule(routerPrefix) {
  return (location) => location.pathname.startsWith(routerPrefix);
}

setExcludes([
  /document-register-element.js/
])

registerMicroApp({
  name: 'vue app',
  entry: '//localhost:9000/index.html',
  render,
  activeRule: genActiveRule('/vue'),
});

registerMicroApp({
  name: 'react app',
  entry: '//localhost:9001/index.html',
  render,
  activeRule: genActiveRule('/react'),
});

registerMicroApp({
  name: 'smallfish app',
  entry: '//localhost:7001/index.html',
  render,
  activeRule: genActiveRule('/smallfish'),
});

start();