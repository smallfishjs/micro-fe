## smallfish-fe

English | [中文](./README_zh-CN.md)

Both microservices and micro-frontends are expected to transform a single application into multiple aggregates of services or applications that can be independently operated, independently developed, independently deployed, and independently maintained to meet the rapid changes in business and distributed. The need for team parallel development. Smallfish-mf is one of the micro frontend solutions. The core is to encapsulate multiple subApps into the same portal project by encapsulating subApps into custom elements. As a micro-frontend solution for smallfish, it provides smallfish-plugin-mf support, which can easily convert smallfish applications into subApps that meet the requirements of smallfish-mf.

## Feature

+ SubApp technology independence. Independent development, independent deployment, independent operation，independently maintained
+ Style isolation
+ Multi-instance support
+ Public dependency loading
+ Lazy load
+ smallfish-plugin-mf support


## Install && Usage

```bash
$ npm i smallfish-fe
```

```js
import { registerMicroApp, start, setExcludes } from 'smallfish-mf';

function render({ appContent, loading }) {
  const container = document.getElementById('container');
  container.innerHTML = appContent;
}


function genActiveRule(routerPrefix) {
  return (location) => location.pathname.startsWith(routerPrefix);
}

/**
 * exclude resources file (js or css) which in the subapp
 *
 * @schema
 * setExcludes(excludes: Array<RegExp>): void;
 */
setExcludes([
  /document-register-element.js/
])

/**
 * register micro app
 *
 * @schema
 * registerMicroApp(app: AppObj): void;
 *
 * Interface AppObj {
 *  name: string;
 *  entry: string;
 *  // if activeRule return true, will call this method, only called once.
 *  render(obj: {appContent: string, loading: boolean});
 *  activeRule(location) => boolean;
 * }
 */
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
});


/**
 * start micro service. it will call single-spa's start method
 */
start();
```

## run demo

```bash
# it will listen the ports of 8080, 9000, 9001, 7001
$ npm run install:example
$ npm start
```

## about

+ https://github.com/kuitos/import-html-entry
+ https://github.com/CanopyTax/single-spa
+ https://github.com/WebReflection/document-register-element