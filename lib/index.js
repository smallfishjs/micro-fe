"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerMicroApp = registerMicroApp;
exports.start = start;
exports.setExcludes = void 0;

var _singleSpa = require("single-spa");

var _importHtmlEntry = require("./import-html-entry");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var setExcludes = _importHtmlEntry.setGlobalExcludes;
exports.setExcludes = setExcludes;

function registerMicroApp(app) {
  var name = app.name,
      entry = app.entry,
      render = app.render,
      activeRule = app.activeRule;

  var appRender =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var _ref2, template, execScripts, appContent;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              render({
                appContent: '',
                loading: true
              });
              _context4.next = 3;
              return (0, _importHtmlEntry.importEntry)(entry);

            case 3:
              _ref2 = _context4.sent;
              template = _ref2.template;
              execScripts = _ref2.execScripts;
              appContent = template;
              _context4.next = 9;
              return execScripts();

            case 9:
              return _context4.abrupt("return", {
                bootstrap: [
                /*#__PURE__*/
                _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee() {
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          return _context.abrupt("return", console.log('bootstrap app'));

                        case 1:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }))],
                mount: [
                /*#__PURE__*/
                _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee2() {
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          return _context2.abrupt("return", render({
                            appContent: appContent,
                            loading: false
                          }));

                        case 1:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                }))],
                unmount: [
                /*#__PURE__*/
                _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee3() {
                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          return _context3.abrupt("return", render({
                            appContent: '',
                            loading: false
                          }));

                        case 1:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3);
                }))]
              });

            case 10:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function appRender() {
      return _ref.apply(this, arguments);
    };
  }();

  (0, _singleSpa.registerApplication)(name, appRender, activeRule);
}

function start() {
  (0, _singleSpa.start)();
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJzZXRFeGNsdWRlcyIsInNldEdsb2JhbEV4Y2x1ZGVzIiwicmVnaXN0ZXJNaWNyb0FwcCIsImFwcCIsIm5hbWUiLCJlbnRyeSIsInJlbmRlciIsImFjdGl2ZVJ1bGUiLCJhcHBSZW5kZXIiLCJhcHBDb250ZW50IiwibG9hZGluZyIsInRlbXBsYXRlIiwiZXhlY1NjcmlwdHMiLCJib290c3RyYXAiLCJjb25zb2xlIiwibG9nIiwibW91bnQiLCJ1bm1vdW50Iiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7QUFTTyxJQUFNQSxXQUFXLEdBQUdDLGtDQUFwQjs7O0FBRUEsU0FBU0MsZ0JBQVQsQ0FBMEJDLEdBQTFCLEVBQTBDO0FBQUEsTUFFN0NDLElBRjZDLEdBTTNDRCxHQU4yQyxDQUU3Q0MsSUFGNkM7QUFBQSxNQUc3Q0MsS0FINkMsR0FNM0NGLEdBTjJDLENBRzdDRSxLQUg2QztBQUFBLE1BSTdDQyxNQUo2QyxHQU0zQ0gsR0FOMkMsQ0FJN0NHLE1BSjZDO0FBQUEsTUFLN0NDLFVBTDZDLEdBTTNDSixHQU4yQyxDQUs3Q0ksVUFMNkM7O0FBUS9DLE1BQU1DLFNBQVM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDRCQUFHO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDaEJGLGNBQUFBLE1BQU0sQ0FBQztBQUFFRyxnQkFBQUEsVUFBVSxFQUFFLEVBQWQ7QUFBa0JDLGdCQUFBQSxPQUFPLEVBQUU7QUFBM0IsZUFBRCxDQUFOO0FBRGdCO0FBQUEscUJBRXdCLGtDQUFZTCxLQUFaLENBRnhCOztBQUFBO0FBQUE7QUFFUk0sY0FBQUEsUUFGUSxTQUVSQSxRQUZRO0FBRUVDLGNBQUFBLFdBRkYsU0FFRUEsV0FGRjtBQUdWSCxjQUFBQSxVQUhVLEdBR0dFLFFBSEg7QUFBQTtBQUFBLHFCQUlWQyxXQUFXLEVBSkQ7O0FBQUE7QUFBQSxnREFNVDtBQUNMQyxnQkFBQUEsU0FBUyxFQUFFO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0NBQ1Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDJEQUFZQyxPQUFPLENBQUNDLEdBQVIsQ0FBWSxlQUFaLENBQVo7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBRFMsR0FETjtBQUlMQyxnQkFBQUEsS0FBSyxFQUFFO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0NBQ0w7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDREQUFZVixNQUFNLENBQUM7QUFBRUcsNEJBQUFBLFVBQVUsRUFBVkEsVUFBRjtBQUFjQyw0QkFBQUEsT0FBTyxFQUFFO0FBQXZCLDJCQUFELENBQWxCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQURLLEdBSkY7QUFPTE8sZ0JBQUFBLE9BQU8sRUFBRTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdDQUNQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw0REFBWVgsTUFBTSxDQUFDO0FBQUVHLDRCQUFBQSxVQUFVLEVBQUUsRUFBZDtBQUFrQkMsNEJBQUFBLE9BQU8sRUFBRTtBQUEzQiwyQkFBRCxDQUFsQjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFETztBQVBKLGVBTlM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBSDs7QUFBQSxvQkFBVEYsU0FBUztBQUFBO0FBQUE7QUFBQSxLQUFmOztBQW1CQSxzQ0FBb0JKLElBQXBCLEVBQTBCSSxTQUExQixFQUFvQ0QsVUFBcEM7QUFDRDs7QUFFTSxTQUFTVyxLQUFULEdBQWlCO0FBQ3RCO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZWdpc3RlckFwcGxpY2F0aW9uLCBzdGFydCBhcyBzdGFydFNwYSB9IGZyb20gJ3NpbmdsZS1zcGEnO1xuaW1wb3J0IHsgaW1wb3J0RW50cnksIHNldEdsb2JhbEV4Y2x1ZGVzIH0gZnJvbSAnLi9pbXBvcnQtaHRtbC1lbnRyeSc7XG5cbmludGVyZmFjZSBBcHBPYmplY3Qge1xuICBuYW1lOiBzdHJpbmdcbiAgZW50cnk6IHN0cmluZztcbiAgcmVuZGVyIChhcmc6IHthcHBDb250ZW50OiBzdHJpbmc7IGxvYWRpbmc6IGJvb2xlYW59KTogdm9pZDtcbiAgYWN0aXZlUnVsZTogKGxvY2F0aW9uOiBMb2NhdGlvbikgPT4gYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNvbnN0IHNldEV4Y2x1ZGVzID0gc2V0R2xvYmFsRXhjbHVkZXNcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyTWljcm9BcHAoYXBwOiBBcHBPYmplY3QpIHtcbiAgY29uc3Qge1xuICAgIG5hbWUsXG4gICAgZW50cnksXG4gICAgcmVuZGVyLFxuICAgIGFjdGl2ZVJ1bGUsXG4gIH0gPSBhcHA7XG5cbiAgY29uc3QgYXBwUmVuZGVyID0gYXN5bmMgKCkgPT4ge1xuICAgIHJlbmRlcih7IGFwcENvbnRlbnQ6ICcnLCBsb2FkaW5nOiB0cnVlIH0pO1xuICAgIGNvbnN0IHsgdGVtcGxhdGUsIGV4ZWNTY3JpcHRzIH0gPSBhd2FpdCBpbXBvcnRFbnRyeShlbnRyeSk7XG4gICAgY29uc3QgYXBwQ29udGVudCA9IHRlbXBsYXRlXG4gICAgYXdhaXQgZXhlY1NjcmlwdHMoKTtcblxuICAgIHJldHVybiB7XG4gICAgICBib290c3RyYXA6IFtcbiAgICAgICAgYXN5bmMgKCkgPT4gY29uc29sZS5sb2coJ2Jvb3RzdHJhcCBhcHAnKVxuICAgICAgXSxcbiAgICAgIG1vdW50OiBbXG4gICAgICAgIGFzeW5jICgpID0+IHJlbmRlcih7IGFwcENvbnRlbnQsIGxvYWRpbmc6IGZhbHNlIH0pLFxuICAgICAgXSxcbiAgICAgIHVubW91bnQ6IFtcbiAgICAgICAgYXN5bmMgKCkgPT4gcmVuZGVyKHsgYXBwQ29udGVudDogJycsIGxvYWRpbmc6IGZhbHNlIH0pLFxuICAgICAgXSxcbiAgICB9O1xuICB9XG5cbiAgcmVnaXN0ZXJBcHBsaWNhdGlvbihuYW1lLCBhcHBSZW5kZXIsYWN0aXZlUnVsZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFydCgpIHtcbiAgc3RhcnRTcGEoKTtcbn0iXX0=