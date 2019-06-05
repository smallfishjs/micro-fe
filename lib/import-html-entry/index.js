"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setGlobalExcludes = setGlobalExcludes;
exports["default"] = importHTML;
exports.importEntry = importEntry;

var _processTpl2 = _interopRequireWildcard(require("./process-tpl"));

var _utils = require("./utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

var styleCache = {};
var scriptCache = {};
var embedHTMLCache = {};
var globalExcludes = [];

function isExclude(url) {
  return globalExcludes.some(function (exclude) {
    return exclude.test(url);
  });
}
/**
 * convert external css link to inline style for performance optimization
 * @param template
 * @param styles
 * @return Promise<string>
 */


function getEmbedHTML(template, styles) {
  var embedHTML = template;
  return _getExternalStyleSheets(styles).then(function (styleSheets) {
    embedHTML = styles.reduce(function (html, styleSrc, i) {
      html = html.replace((0, _processTpl2.genLinkReplaceSymbol)(styleSrc), "<style>/* ".concat(styleSrc, " */").concat(styleSheets[i], "</style>"));
      return html;
    }, embedHTML);
    return embedHTML;
  });
} // for prefetch


function _getExternalStyleSheets(styles) {
  var tasks = styles.filter(function (styleLink) {
    return !isExclude(styleLink);
  }).map(function (styleLink) {
    if (styleLink.startsWith('<')) {
      // if it is inline style
      return Promise.resolve((0, _utils.getInlineCode)(styleLink));
    } else {
      // external styles
      return styleCache[styleLink] || (styleCache[styleLink] = fetch(styleLink).then(function (response) {
        return response.text();
      }));
    }
  });
  return Promise.all(tasks);
} // for prefetch


function _getExternalScripts(scripts) {
  var tasks = scripts.filter(function (script) {
    return !isExclude(script);
  }).map(function (script) {
    if (script.startsWith('<')) {
      // if it is inline script
      return Promise.resolve((0, _utils.getInlineCode)(script));
    } else {
      // external script
      return scriptCache[script] || (scriptCache[script] = fetch(script).then(function (response) {
        return response.text();
      }));
    }
  });
  return Promise.all(tasks);
}

function _execScripts(scripts) {
  var proxy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  return _getExternalScripts(scripts).then(function (scriptsText) {
    window.proxy = proxy;
    var geval = eval;

    function exec(scriptSrc, inlineScript, resolve) {
      try {
        geval(";(function(window){;".concat(inlineScript, "\n})(window.proxy);"));
      } catch (e) {
        console.error("error occurs while executing ".concat(scriptSrc));
        console.error(e);
      }

      if (scriptSrc === scripts[scripts.length - 1]) {
        resolve();
      }
    }

    function schedule(i, resolvePromise) {
      if (i < scripts.length) {
        var scriptSrc = scripts[i];
        var inlineScript = scriptsText[i];
        exec(scriptSrc, inlineScript, resolvePromise);
        schedule(i + 1, resolvePromise);
      }
    }

    return new Promise(function (resolve) {
      return schedule(0, resolve);
    });
  });
}

function setGlobalExcludes(excludes) {
  globalExcludes = excludes;
}

function importHTML(url) {
  return embedHTMLCache[url] || (embedHTMLCache[url] = fetch(url).then(function (response) {
    return response.text();
  }).then(function (html) {
    var _processTpl = (0, _processTpl2["default"])(html, url),
        template = _processTpl.template,
        scripts = _processTpl.scripts,
        styles = _processTpl.styles;

    return getEmbedHTML(template, styles).then(function (embedHTML) {
      return {
        template: embedHTML,
        getExternalScripts: function getExternalScripts() {
          return _getExternalScripts(scripts);
        },
        getExternalStyleSheets: function getExternalStyleSheets() {
          return _getExternalStyleSheets(styles);
        },
        execScripts: function execScripts(proxy) {
          return _execScripts(scripts, proxy);
        }
      };
    });
  }));
}

;

function importEntry(entry) {
  if (!entry) {
    throw new SyntaxError('entry should not be empty!');
  }

  if (typeof entry === 'string') {
    return importHTML(entry);
  } // config entry


  if (Array.isArray(entry.scripts) || Array.isArray(entry.styles)) {
    var _entry$scripts = entry.scripts,
        scripts = _entry$scripts === void 0 ? [] : _entry$scripts,
        _entry$styles = entry.styles,
        styles = _entry$styles === void 0 ? [] : _entry$styles,
        _entry$html = entry.html,
        html = _entry$html === void 0 ? '' : _entry$html;
    return getEmbedHTML(html, styles).then(function (embedHTML) {
      return {
        template: embedHTML,
        getExternalScripts: function getExternalScripts() {
          return _getExternalScripts(scripts);
        },
        getExternalStyleSheets: function getExternalStyleSheets() {
          return _getExternalStyleSheets(styles);
        },
        execScripts: function execScripts(proxy) {
          return _execScripts(scripts, proxy);
        }
      };
    });
  } else {
    throw new SyntaxError('entry scripts or styles should be array!');
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbXBvcnQtaHRtbC1lbnRyeS9pbmRleC50cyJdLCJuYW1lcyI6WyJzdHlsZUNhY2hlIiwic2NyaXB0Q2FjaGUiLCJlbWJlZEhUTUxDYWNoZSIsImdsb2JhbEV4Y2x1ZGVzIiwiaXNFeGNsdWRlIiwidXJsIiwic29tZSIsImV4Y2x1ZGUiLCJ0ZXN0IiwiZ2V0RW1iZWRIVE1MIiwidGVtcGxhdGUiLCJzdHlsZXMiLCJlbWJlZEhUTUwiLCJnZXRFeHRlcm5hbFN0eWxlU2hlZXRzIiwidGhlbiIsInN0eWxlU2hlZXRzIiwicmVkdWNlIiwiaHRtbCIsInN0eWxlU3JjIiwiaSIsInJlcGxhY2UiLCJ0YXNrcyIsImZpbHRlciIsInN0eWxlTGluayIsIm1hcCIsInN0YXJ0c1dpdGgiLCJQcm9taXNlIiwicmVzb2x2ZSIsImZldGNoIiwicmVzcG9uc2UiLCJ0ZXh0IiwiYWxsIiwiZ2V0RXh0ZXJuYWxTY3JpcHRzIiwic2NyaXB0cyIsInNjcmlwdCIsImV4ZWNTY3JpcHRzIiwicHJveHkiLCJ3aW5kb3ciLCJzY3JpcHRzVGV4dCIsImdldmFsIiwiZXZhbCIsImV4ZWMiLCJzY3JpcHRTcmMiLCJpbmxpbmVTY3JpcHQiLCJlIiwiY29uc29sZSIsImVycm9yIiwibGVuZ3RoIiwic2NoZWR1bGUiLCJyZXNvbHZlUHJvbWlzZSIsInNldEdsb2JhbEV4Y2x1ZGVzIiwiZXhjbHVkZXMiLCJpbXBvcnRIVE1MIiwiaW1wb3J0RW50cnkiLCJlbnRyeSIsIlN5bnRheEVycm9yIiwiQXJyYXkiLCJpc0FycmF5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQWVBLElBQU1BLFVBQStCLEdBQUcsRUFBeEM7QUFDQSxJQUFNQyxXQUFnQyxHQUFHLEVBQXpDO0FBQ0EsSUFBTUMsY0FBd0QsR0FBRyxFQUFqRTtBQUNBLElBQUlDLGNBQTZCLEdBQUcsRUFBcEM7O0FBRUEsU0FBU0MsU0FBVCxDQUFtQkMsR0FBbkIsRUFBZ0M7QUFDL0IsU0FBT0YsY0FB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QUFQLEtBQWlCLFFBQXJCLEVBQStCO0FBQzlCLFdBQU9GLFVBQVUsQ0FBQ0UsS0FBRCxDQUFqQjtBQUNBLEdBUnVGLENBU3hGOzs7QUFDQSxNQUFJRSxLQUFLLENBQUNDLE9BQU4sQ0FBY0gsS0FBSyxDQUFDckIsT0FBcEIsS0FBZ0N1QixLQUFLLENBQUNDLE9BQU4sQ0FBY0gsS0FBSyxDQUFDM0MsTUFBcEIsQ0FBcEMsRUFBaUU7QUFBQSx5QkFFZjJDLEtBRmUsQ0FFeERyQixPQUZ3RDtBQUFBLFFBRXhEQSxPQUZ3RCwrQkFFOUMsRUFGOEM7QUFBQSx3QkFFZnFCLEtBRmUsQ0FFMUMzQyxNQUYwQztBQUFBLFFBRTFDQSxNQUYwQyw4QkFFakMsRUFGaUM7QUFBQSxzQkFFZjJDLEtBRmUsQ0FFN0JyQyxJQUY2QjtBQUFBLFFBRTdCQSxJQUY2Qiw0QkFFdEIsRUFGc0I7QUFJaEUsV0FBT1IsWUFBWSxDQUFDUSxJQUFELEVBQU9OLE1BQVAsQ0FBWixDQUEyQkcsSUFBM0IsQ0FBZ0MsVUFBQUYsU0FBUztBQUFBLGFBQUs7QUFDcERGLFFBQUFBLFFBQVEsRUFBRUUsU0FEMEM7QUFFcERvQixRQUFBQSxrQkFBa0IsRUFBRTtBQUFBLGlCQUFNQSxtQkFBa0IsQ0FBQ0MsT0FBRCxDQUF4QjtBQUFBLFNBRmdDO0FBR3BEcEIsUUFBQUEsc0JBQXNCLEVBQUU7QUFBQSxpQkFBTUEsdUJBQXNCLENBQUNGLE1BQUQsQ0FBNUI7QUFBQSxTQUg0QjtBQUlwRHdCLFFBQUFBLFdBQVcsRUFBRSxxQkFBQ0MsS0FBRDtBQUFBLGlCQUFXRCxZQUFXLENBQUNGLE9BQUQsRUFBVUcsS0FBVixDQUF0QjtBQUFBO0FBSnVDLE9BQUw7QUFBQSxLQUF6QyxDQUFQO0FBT0EsR0FYRCxNQVdPO0FBQ04sVUFBTSxJQUFJbUIsV0FBSixDQUFnQiwwQ0FBaEIsQ0FBTjtBQUNBO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcHJvY2Vzc1RwbCwgeyBnZW5MaW5rUmVwbGFjZVN5bWJvbCB9IGZyb20gJy4vcHJvY2Vzcy10cGwnO1xuaW1wb3J0IHsgZ2V0SW5saW5lQ29kZSB9IGZyb20gJy4vdXRpbHMnO1xuXG5pbnRlcmZhY2UgRW1iZWRIdG1sT2JqZWN0e1xuXHR0ZW1wbGF0ZTogc3RyaW5nO1xuXHRnZXRFeHRlcm5hbFNjcmlwdHM6ICgpID0+IFByb21pc2U8YW55Pixcblx0Z2V0RXh0ZXJuYWxTdHlsZVNoZWV0czogKCkgPT4gUHJvbWlzZTxhbnk+LFxuXHRleGVjU2NyaXB0czogKHByb3h5PzogYW55KSA9PiBQcm9taXNlPGFueT4sXG59XG5cbmludGVyZmFjZSBJbXBvcnRFbnRyeU9iamVjdCB7XG5cdGh0bWw/OiBzdHJpbmc7XG5cdHNjcmlwdHM/OiBBcnJheTxzdHJpbmc+O1xuXHRzdHlsZXM/OiBBcnJheTxzdHJpbmc+O1xufVxuXG5jb25zdCBzdHlsZUNhY2hlOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ge307XG5jb25zdCBzY3JpcHRDYWNoZTogUmVjb3JkPHN0cmluZywgYW55PiA9IHt9O1xuY29uc3QgZW1iZWRIVE1MQ2FjaGU6IFJlY29yZDxzdHJpbmcsIFByb21pc2U8RW1iZWRIdG1sT2JqZWN0Pj4gPSB7fTtcbmxldCBnbG9iYWxFeGNsdWRlczogQXJyYXk8UmVnRXhwPiA9IFtdO1xuXG5mdW5jdGlvbiBpc0V4Y2x1ZGUodXJsOiBzdHJpbmcpIHtcblx0cmV0dXJuIGdsb2JhbEV4Y2x1ZGVzLnNvbWUoKGV4Y2x1ZGUpID0+IHtcblx0XHRyZXR1cm4gZXhjbHVkZS50ZXN0KHVybClcblx0fSlcbn1cbi8qKlxuICogY29udmVydCBleHRlcm5hbCBjc3MgbGluayB0byBpbmxpbmUgc3R5bGUgZm9yIHBlcmZvcm1hbmNlIG9wdGltaXphdGlvblxuICogQHBhcmFtIHRlbXBsYXRlXG4gKiBAcGFyYW0gc3R5bGVzXG4gKiBAcmV0dXJuIFByb21pc2U8c3RyaW5nPlxuICovXG5mdW5jdGlvbiBnZXRFbWJlZEhUTUwodGVtcGxhdGU6IHN0cmluZywgc3R5bGVzOiBBcnJheTxzdHJpbmc+KSB7XG5cblx0bGV0IGVtYmVkSFRNTCA9IHRlbXBsYXRlO1xuXG5cdHJldHVybiBnZXRFeHRlcm5hbFN0eWxlU2hlZXRzKHN0eWxlcylcblx0XHQudGhlbihzdHlsZVNoZWV0cyA9PiB7XG5cdFx0XHRlbWJlZEhUTUwgPSBzdHlsZXMucmVkdWNlKChodG1sLCBzdHlsZVNyYywgaSkgPT4ge1xuXHRcdFx0XHRodG1sID0gaHRtbC5yZXBsYWNlKGdlbkxpbmtSZXBsYWNlU3ltYm9sKHN0eWxlU3JjKSwgYDxzdHlsZT4vKiAke3N0eWxlU3JjfSAqLyR7c3R5bGVTaGVldHNbaV19PC9zdHlsZT5gKTtcblx0XHRcdFx0cmV0dXJuIGh0bWw7XG5cdFx0XHR9LCBlbWJlZEhUTUwpO1xuXHRcdFx0cmV0dXJuIGVtYmVkSFRNTDtcblx0XHR9KTtcbn1cblxuLy8gZm9yIHByZWZldGNoXG5mdW5jdGlvbiBnZXRFeHRlcm5hbFN0eWxlU2hlZXRzKHN0eWxlczogQXJyYXk8c3RyaW5nPikge1xuXHRjb25zdCB0YXNrcyA9IHN0eWxlcy5maWx0ZXIoKHN0eWxlTGluaykgPT4ge1xuXHRcdHJldHVybiAhaXNFeGNsdWRlKHN0eWxlTGluaylcblx0fSkubWFwKChzdHlsZUxpbmspID0+IHtcblx0XHRpZiAoc3R5bGVMaW5rLnN0YXJ0c1dpdGgoJzwnKSkge1xuXHRcdFx0Ly8gaWYgaXQgaXMgaW5saW5lIHN0eWxlXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGdldElubGluZUNvZGUoc3R5bGVMaW5rKSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIGV4dGVybmFsIHN0eWxlc1xuXHRcdFx0cmV0dXJuIHN0eWxlQ2FjaGVbc3R5bGVMaW5rXSB8fFxuXHRcdFx0XHQoc3R5bGVDYWNoZVtzdHlsZUxpbmtdID0gZmV0Y2goc3R5bGVMaW5rKS50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLnRleHQoKSkpO1xuXHRcdH1cblx0fSlcblx0cmV0dXJuIFByb21pc2UuYWxsKHRhc2tzKTtcbn1cblxuLy8gZm9yIHByZWZldGNoXG5mdW5jdGlvbiBnZXRFeHRlcm5hbFNjcmlwdHMoc2NyaXB0czogQXJyYXk8c3RyaW5nPikge1xuXHRjb25zdCB0YXNrcyA9IHNjcmlwdHMuZmlsdGVyKChzY3JpcHQpID0+IHtcblx0XHRyZXR1cm4gIWlzRXhjbHVkZShzY3JpcHQpXG5cdH0pLm1hcCgoc2NyaXB0KSA9PiB7XG5cdFx0aWYgKHNjcmlwdC5zdGFydHNXaXRoKCc8JykpIHtcblx0XHRcdC8vIGlmIGl0IGlzIGlubGluZSBzY3JpcHRcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoZ2V0SW5saW5lQ29kZShzY3JpcHQpKVxuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBleHRlcm5hbCBzY3JpcHRcblx0XHRcdHJldHVybiBzY3JpcHRDYWNoZVtzY3JpcHRdIHx8XG5cdFx0XHRcdChzY3JpcHRDYWNoZVtzY3JpcHRdID0gZmV0Y2goc2NyaXB0KS50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLnRleHQoKSlcblx0XHRcdFx0KTtcblx0XHR9XG5cdH0pXG5cdHJldHVybiBQcm9taXNlLmFsbCh0YXNrcyk7XG59XG5cbmZ1bmN0aW9uIGV4ZWNTY3JpcHRzKHNjcmlwdHM6IEFycmF5PHN0cmluZz4sIHByb3h5ID0gd2luZG93KSB7XG5cdHJldHVybiBnZXRFeHRlcm5hbFNjcmlwdHMoc2NyaXB0cylcblx0XHQudGhlbihzY3JpcHRzVGV4dCA9PiB7XG5cdFx0XHQod2luZG93IGFzIGFueSkucHJveHkgPSBwcm94eTtcblx0XHRcdGNvbnN0IGdldmFsID0gZXZhbDtcblxuXHRcdFx0ZnVuY3Rpb24gZXhlYyhzY3JpcHRTcmM6IHN0cmluZywgaW5saW5lU2NyaXB0OiBzdHJpbmcsIHJlc29sdmU6IEZ1bmN0aW9uKSB7XG5cblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRnZXZhbChgOyhmdW5jdGlvbih3aW5kb3cpezske2lubGluZVNjcmlwdH1cXG59KSh3aW5kb3cucHJveHkpO2ApO1xuXHRcdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcihgZXJyb3Igb2NjdXJzIHdoaWxlIGV4ZWN1dGluZyAke3NjcmlwdFNyY31gKTtcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGUpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHNjcmlwdFNyYyA9PT0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZSgpXG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0ZnVuY3Rpb24gc2NoZWR1bGUoaTogbnVtYmVyLCByZXNvbHZlUHJvbWlzZTogRnVuY3Rpb24pIHtcblxuXHRcdFx0XHRpZiAoaSA8IHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHRcdFx0Y29uc3Qgc2NyaXB0U3JjID0gc2NyaXB0c1tpXTtcblx0XHRcdFx0XHRjb25zdCBpbmxpbmVTY3JpcHQgPSBzY3JpcHRzVGV4dFtpXTtcblxuXHRcdFx0XHRcdGV4ZWMoc2NyaXB0U3JjLCBpbmxpbmVTY3JpcHQsIHJlc29sdmVQcm9taXNlKTtcblx0XHRcdFx0XHRzY2hlZHVsZShpICsgMSwgcmVzb2x2ZVByb21pc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNjaGVkdWxlKDAsIHJlc29sdmUpKTtcblx0XHR9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEdsb2JhbEV4Y2x1ZGVzIChleGNsdWRlczogQXJyYXk8UmVnRXhwPikge1xuXHRnbG9iYWxFeGNsdWRlcyA9IGV4Y2x1ZGVzXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGltcG9ydEhUTUwodXJsOiBzdHJpbmcpIHtcblxuXHRyZXR1cm4gZW1iZWRIVE1MQ2FjaGVbdXJsXSB8fCAoZW1iZWRIVE1MQ2FjaGVbdXJsXSA9IGZldGNoKHVybClcblx0XHQudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS50ZXh0KCkpXG5cdFx0LnRoZW4oaHRtbCA9PiB7XG5cblx0XHRcdGNvbnN0IHsgdGVtcGxhdGUsIHNjcmlwdHMsIHN0eWxlcyB9ID0gcHJvY2Vzc1RwbChodG1sLCB1cmwpO1xuXG5cdFx0XHRyZXR1cm4gZ2V0RW1iZWRIVE1MKHRlbXBsYXRlLCBzdHlsZXMpLnRoZW4oZW1iZWRIVE1MID0+ICh7XG5cdFx0XHRcdHRlbXBsYXRlOiBlbWJlZEhUTUwsXG5cdFx0XHRcdGdldEV4dGVybmFsU2NyaXB0czogKCkgPT4gZ2V0RXh0ZXJuYWxTY3JpcHRzKHNjcmlwdHMpLFxuXHRcdFx0XHRnZXRFeHRlcm5hbFN0eWxlU2hlZXRzOiAoKSA9PiBnZXRFeHRlcm5hbFN0eWxlU2hlZXRzKHN0eWxlcyksXG5cdFx0XHRcdGV4ZWNTY3JpcHRzOiAocHJveHkpID0+IGV4ZWNTY3JpcHRzKHNjcmlwdHMsIHByb3h5KSxcblx0XHRcdH0pKTtcblx0XHR9KSk7XG59O1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBpbXBvcnRFbnRyeShlbnRyeTogc3RyaW5nIHwgSW1wb3J0RW50cnlPYmplY3QpOiBQcm9taXNlPEVtYmVkSHRtbE9iamVjdD4ge1xuXG5cdGlmICghZW50cnkpIHtcblx0XHR0aHJvdyBuZXcgU3ludGF4RXJyb3IoJ2VudHJ5IHNob3VsZCBub3QgYmUgZW1wdHkhJyk7XG5cdH1cblxuXHRpZiAodHlwZW9mIGVudHJ5ID09PSAnc3RyaW5nJykge1xuXHRcdHJldHVybiBpbXBvcnRIVE1MKGVudHJ5KTtcblx0fVxuXHQvLyBjb25maWcgZW50cnlcblx0aWYgKEFycmF5LmlzQXJyYXkoZW50cnkuc2NyaXB0cykgfHwgQXJyYXkuaXNBcnJheShlbnRyeS5zdHlsZXMpKSB7XG5cblx0XHRjb25zdCB7IHNjcmlwdHMgPSBbXSwgc3R5bGVzID0gW10sIGh0bWwgPSAnJyB9ID0gZW50cnk7XG5cblx0XHRyZXR1cm4gZ2V0RW1iZWRIVE1MKGh0bWwsIHN0eWxlcykudGhlbihlbWJlZEhUTUwgPT4gKHtcblx0XHRcdHRlbXBsYXRlOiBlbWJlZEhUTUwsXG5cdFx0XHRnZXRFeHRlcm5hbFNjcmlwdHM6ICgpID0+IGdldEV4dGVybmFsU2NyaXB0cyhzY3JpcHRzKSxcblx0XHRcdGdldEV4dGVybmFsU3R5bGVTaGVldHM6ICgpID0+IGdldEV4dGVybmFsU3R5bGVTaGVldHMoc3R5bGVzKSxcblx0XHRcdGV4ZWNTY3JpcHRzOiAocHJveHkpID0+IGV4ZWNTY3JpcHRzKHNjcmlwdHMsIHByb3h5KSxcblx0XHR9KSk7XG5cblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgU3ludGF4RXJyb3IoJ2VudHJ5IHNjcmlwdHMgb3Igc3R5bGVzIHNob3VsZCBiZSBhcnJheSEnKTtcblx0fVxufSJdfQ==