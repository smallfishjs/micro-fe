## document

#### setExcludes(list: Array<RegExp>)

> exclude resources file (js or css) which in the subapp

#### start()

> start micro service. it will call single-spa's start method

#### registerMicroApp(app: AppObj)

```typescript
Interface AppObj {
  name: string;
  /**
   * e.g. http://0.0.0.0:9000/index.html
   */
  entry: string;
  /**
   * if activeRule return true, will call this method, only called once.
   */
  render(obj: {appContent: string, loading: boolean});
  activeRule(location) => boolean;
}
```

## example

```
# it will listen the ports of 8080, 9000, 9001
npm i
npm run install:example
npm start
```

## About

+ https://github.com/kuitos/import-html-entry
+ https://github.com/CanopyTax/single-spa
+ https://github.com/WebReflection/document-register-element
