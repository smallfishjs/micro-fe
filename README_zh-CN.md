## smallfish-mf

[English](./README.md) | 中文


微服务与微前端，都是希望将某个单一的单体应用，转化为多个可以独立运行、独立开发、独立部署、独立维护的服务或者应用的聚合，从而满足业务快速变化及分布式多团队并行开发的需求。smallfish-mf是微前端的解决方案之一，核心是通过将子应用封装成custom element，以方便多个子应用集成在同一个portal项目中。作为smallfish的微服务解决方案，提供了smallfish-plugin-mf支持，可以方便的将smallfish应用转换为符合smallfish-mf要求的子应用

## Feature

+ 子应用技术无关性。独立开发，独立部署，独立运行，独立维护
+ 样式隔离
+ 多实例支持
+ 公共依赖加载
+ 按需加载
+ smallfish-plugin-mf 支持

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
