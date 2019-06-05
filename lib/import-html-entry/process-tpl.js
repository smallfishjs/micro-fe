"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = processTpl;
exports.inlineScriptReplaceSymbol = exports.genScriptReplaceSymbol = exports.genLinkReplaceSymbol = void 0;

var _utils = require("./utils");

var ALL_SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
var SCRIPT_TAG_REGEX = /<(script)\s+((?!type=('|')text\/ng-template\3).)*?>.*?<\/\1>/i;
var SCRIPT_SRC_REGEX = /.*\ssrc=('|")(\S+)\1.*/;
var LINK_TAG_REGEX = /<(link)\s+.*?>/gi;
var STYLE_TYPE_REGEX = /\s+rel=("|')stylesheet\1.*/;
var STYLE_HREF_REGEX = /.*\shref=('|")(\S+)\1.*/;
var HTML_COMMENT_REGEX = /<!--([\s\S]*?)-->/g;

var genLinkReplaceSymbol = function genLinkReplaceSymbol(linkHref) {
  return "<!-- link ".concat(linkHref, " replaced by import-html-entry -->");
};

exports.genLinkReplaceSymbol = genLinkReplaceSymbol;

var genScriptReplaceSymbol = function genScriptReplaceSymbol(scriptSrc) {
  return "<!-- script ".concat(scriptSrc, " replaced by import-html-entry -->");
};

exports.genScriptReplaceSymbol = genScriptReplaceSymbol;
var inlineScriptReplaceSymbol = "<!-- inline scripts replaced by import-html-entry -->";
/**
 * parse the script link from the template
 * TODO
 *    1. collect stylesheets
 *    2. use global eval to evaluate the inline scripts
 *        see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function#Difference_between_Function_constructor_and_function_declaration
 *        see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#Do_not_ever_use_eval!
 * @param tpl
 * @param entryUrl
 * @stripStyles whether to strip the css links
 * @returns {{template: void | string | *, scripts: *[], entry: *}}
 */

exports.inlineScriptReplaceSymbol = inlineScriptReplaceSymbol;

function processTpl(tpl, entryUrl) {
  var scripts = [];
  var styles = [];
  var template = tpl
  /*
  remove html comment first
  */
  .replace(HTML_COMMENT_REGEX, '').replace(LINK_TAG_REGEX, function (match) {
    /*
    change the css link
    */
    var styleType = !!match.match(STYLE_TYPE_REGEX);

    if (styleType) {
      var styleHref = match.match(STYLE_HREF_REGEX);

      if (styleHref) {
        var href = styleHref && styleHref[2];
        var newHref = (0, _utils.resolvePath)(href, entryUrl);
        styles.push(newHref);
        return genLinkReplaceSymbol(newHref);
      }
    }

    return match;
  }).replace(ALL_SCRIPT_REGEX, function (match) {
    // in order to keep the exec order of all javascripts
    // if it is a external script
    if (SCRIPT_TAG_REGEX.test(match)) {
      var matchedScriptSrcMatch = match.match(SCRIPT_SRC_REGEX);
      var matchedScriptSrc = matchedScriptSrcMatch && matchedScriptSrcMatch[2];

      if (matchedScriptSrc) {
        matchedScriptSrc = (0, _utils.resolvePath)(matchedScriptSrc, entryUrl);
        scripts.push(matchedScriptSrc);
        return genScriptReplaceSymbol(matchedScriptSrc);
      }

      return match;
    } else {
      // if it is an inline script
      var code = (0, _utils.getInlineCode)(match); // remove script blocks when all of these lines are comments.

      var isPureCommentBlock = code.split(/[\r\n]+/).every(function (line) {
        return !line.trim() || line.trim().startsWith('//');
      });

      if (!isPureCommentBlock) {
        scripts.push(match);
      }

      return inlineScriptReplaceSymbol;
    }
  });
  scripts = scripts.filter(function (script) {
    // filter empty script
    return !!script;
  });
  return {
    template: template,
    scripts: scripts,
    styles: styles
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbXBvcnQtaHRtbC1lbnRyeS9wcm9jZXNzLXRwbC50cyJdLCJuYW1lcyI6WyJBTExfU0NSSVBUX1JFR0VYIiwiU0NSSVBUX1RBR19SRUdFWCIsIlNDUklQVF9TUkNfUkVHRVgiLCJMSU5LX1RBR19SRUdFWCIsIlNUWUxFX1RZUEVfUkVHRVgiLCJTVFlMRV9IUkVGX1JFR0VYIiwiSFRNTF9DT01NRU5UX1JFR0VYIiwiZ2VuTGlua1JlcGxhY2VTeW1ib2wiLCJsaW5rSHJlZiIsImdlblNjcmlwdFJlcGxhY2VTeW1ib2wiLCJzY3JpcHRTcmMiLCJpbmxpbmVTY3JpcHRSZXBsYWNlU3ltYm9sIiwicHJvY2Vzc1RwbCIsInRwbCIsImVudHJ5VXJsIiwic2NyaXB0cyIsInN0eWxlcyIsInRlbXBsYXRlIiwicmVwbGFjZSIsIm1hdGNoIiwic3R5bGVUeXBlIiwic3R5bGVIcmVmIiwiaHJlZiIsIm5ld0hyZWYiLCJwdXNoIiwidGVzdCIsIm1hdGNoZWRTY3JpcHRTcmNNYXRjaCIsIm1hdGNoZWRTY3JpcHRTcmMiLCJjb2RlIiwiaXNQdXJlQ29tbWVudEJsb2NrIiwic3BsaXQiLCJldmVyeSIsImxpbmUiLCJ0cmltIiwic3RhcnRzV2l0aCIsImZpbHRlciIsInNjcmlwdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFFQSxJQUFNQSxnQkFBZ0IsR0FBRyxxREFBekI7QUFDQSxJQUFNQyxnQkFBZ0IsR0FBRywrREFBekI7QUFDQSxJQUFNQyxnQkFBZ0IsR0FBRyx3QkFBekI7QUFDQSxJQUFNQyxjQUFjLEdBQUcsa0JBQXZCO0FBQ0EsSUFBTUMsZ0JBQWdCLEdBQUcsNEJBQXpCO0FBQ0EsSUFBTUMsZ0JBQWdCLEdBQUcseUJBQXpCO0FBQ0EsSUFBTUMsa0JBQWtCLEdBQUcsb0JBQTNCOztBQUlPLElBQU1DLG9CQUFvQixHQUFHLFNBQXZCQSxvQkFBdUIsQ0FBQ0MsUUFBRDtBQUFBLDZCQUFtQ0EsUUFBbkM7QUFBQSxDQUE3Qjs7OztBQUNBLElB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L3V0aWxzJztcblxuY29uc3QgQUxMX1NDUklQVF9SRUdFWCA9IC88c2NyaXB0XFxiW148XSooPzooPyE8XFwvc2NyaXB0Pik8W148XSopKjxcXC9zY3JpcHQ+L2dpO1xuY29uc3QgU0NSSVBUX1RBR19SRUdFWCA9IC88KHNjcmlwdClcXHMrKCg/IXR5cGU9KCd8Jyl0ZXh0XFwvbmctdGVtcGxhdGVcXDMpLikqPz4uKj88XFwvXFwxPi9pO1xuY29uc3QgU0NSSVBUX1NSQ19SRUdFWCA9IC8uKlxcc3NyYz0oJ3xcIikoXFxTKylcXDEuKi87XG5jb25zdCBMSU5LX1RBR19SRUdFWCA9IC88KGxpbmspXFxzKy4qPz4vZ2k7XG5jb25zdCBTVFlMRV9UWVBFX1JFR0VYID0gL1xccytyZWw9KFwifCcpc3R5bGVzaGVldFxcMS4qLztcbmNvbnN0IFNUWUxFX0hSRUZfUkVHRVggPSAvLipcXHNocmVmPSgnfFwiKShcXFMrKVxcMS4qLztcbmNvbnN0IEhUTUxfQ09NTUVOVF9SRUdFWCA9IC88IS0tKFtcXHNcXFNdKj8pLS0+L2c7XG5cblxuXG5leHBvcnQgY29uc3QgZ2VuTGlua1JlcGxhY2VTeW1ib2wgPSAobGlua0hyZWY6IHN0cmluZykgPT4gYDwhLS0gbGluayAke2xpbmtIcmVmfSByZXBsYWNlZCBieSBpbXBvcnQtaHRtbC1lbnRyeSAtLT5gO1xuZXhwb3J0IGNvbnN0IGdlblNjcmlwdFJlcGxhY2VTeW1ib2wgPSAoc2NyaXB0U3JjOiBzdHJpbmcpID0+IGA8IS0tIHNjcmlwdCAke3NjcmlwdFNyY30gcmVwbGFjZWQgYnkgaW1wb3J0LWh0bWwtZW50cnkgLS0+YDtcbmV4cG9ydCBjb25zdCBpbmxpbmVTY3JpcHRSZXBsYWNlU3ltYm9sID0gYDwhLS0gaW5saW5lIHNjcmlwdHMgcmVwbGFjZWQgYnkgaW1wb3J0LWh0bWwtZW50cnkgLS0+YDtcblxuLyoqXG4gKiBwYXJzZSB0aGUgc2NyaXB0IGxpbmsgZnJvbSB0aGUgdGVtcGxhdGVcbiAqIFRPRE9cbiAqICAgIDEuIGNvbGxlY3Qgc3R5bGVzaGVldHNcbiAqICAgIDIuIHVzZSBnbG9iYWwgZXZhbCB0byBldmFsdWF0ZSB0aGUgaW5saW5lIHNjcmlwdHNcbiAqICAgICAgICBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvRnVuY3Rpb24jRGlmZmVyZW5jZV9iZXR3ZWVuX0Z1bmN0aW9uX2NvbnN0cnVjdG9yX2FuZF9mdW5jdGlvbl9kZWNsYXJhdGlvblxuICogICAgICAgIHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9ldmFsI0RvX25vdF9ldmVyX3VzZV9ldmFsIVxuICogQHBhcmFtIHRwbFxuICogQHBhcmFtIGVudHJ5VXJsXG4gKiBAc3RyaXBTdHlsZXMgd2hldGhlciB0byBzdHJpcCB0aGUgY3NzIGxpbmtzXG4gKiBAcmV0dXJucyB7e3RlbXBsYXRlOiB2b2lkIHwgc3RyaW5nIHwgKiwgc2NyaXB0czogKltdLCBlbnRyeTogKn19XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHByb2Nlc3NUcGwodHBsOiBzdHJpbmcsIGVudHJ5VXJsOiBzdHJpbmcpIHtcblxuXHRsZXQgc2NyaXB0czogQXJyYXk8c3RyaW5nPiA9IFtdO1xuXHRjb25zdCBzdHlsZXM6IEFycmF5PHN0cmluZz4gPSBbXTtcblxuXHRjb25zdCB0ZW1wbGF0ZSA9IHRwbFxuXG5cdFx0Lypcblx0XHRyZW1vdmUgaHRtbCBjb21tZW50IGZpcnN0XG5cdFx0Ki9cblx0XHQucmVwbGFjZShIVE1MX0NPTU1FTlRfUkVHRVgsICcnKVxuXHRcdC5yZXBsYWNlKExJTktfVEFHX1JFR0VYLCBtYXRjaCA9PiB7XG5cdFx0XHQvKlxuXHRcdFx0Y2hhbmdlIHRoZSBjc3MgbGlua1xuXHRcdFx0Ki9cblx0XHRcdGNvbnN0IHN0eWxlVHlwZSA9ICEhbWF0Y2gubWF0Y2goU1RZTEVfVFlQRV9SRUdFWCk7XG5cdFx0XHRpZiAoc3R5bGVUeXBlKSB7XG5cblx0XHRcdFx0Y29uc3Qgc3R5bGVIcmVmID0gbWF0Y2gubWF0Y2goU1RZTEVfSFJFRl9SRUdFWCk7XG5cdFx0XHRcdGlmIChzdHlsZUhyZWYpIHtcblx0XHRcdFx0XHRjb25zdCBocmVmID0gc3R5bGVIcmVmICYmIHN0eWxlSHJlZlsyXTtcblx0XHRcdFx0XHRsZXQgbmV3SHJlZiA9IHJlc29sdmVQYXRoKGhyZWYsIGVudHJ5VXJsKTtcblxuXHRcdFx0XHRcdHN0eWxlcy5wdXNoKG5ld0hyZWYpO1xuXHRcdFx0XHRcdHJldHVybiBnZW5MaW5rUmVwbGFjZVN5bWJvbChuZXdIcmVmKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gbWF0Y2g7XG5cdFx0fSlcblx0XHQucmVwbGFjZShBTExfU0NSSVBUX1JFR0VYLCBtYXRjaCA9PiB7XG5cblx0XHRcdC8vIGluIG9yZGVyIHRvIGtlZXAgdGhlIGV4ZWMgb3JkZXIgb2YgYWxsIGphdmFzY3JpcHRzXG5cdFx0XHQvLyBpZiBpdCBpcyBhIGV4dGVybmFsIHNjcmlwdFxuXHRcdFx0aWYgKFNDUklQVF9UQUdfUkVHRVgudGVzdChtYXRjaCkpIHtcblx0XHRcdFx0Y29uc3QgbWF0Y2hlZFNjcmlwdFNyY01hdGNoID0gbWF0Y2gubWF0Y2goU0NSSVBUX1NSQ19SRUdFWCk7XG5cdFx0XHRcdGxldCBtYXRjaGVkU2NyaXB0U3JjID0gbWF0Y2hlZFNjcmlwdFNyY01hdGNoICYmIG1hdGNoZWRTY3JpcHRTcmNNYXRjaFsyXTtcblx0XHRcdFx0aWYgKG1hdGNoZWRTY3JpcHRTcmMpIHtcblx0XHRcdFx0XHRtYXRjaGVkU2NyaXB0U3JjID0gcmVzb2x2ZVBhdGgobWF0Y2hlZFNjcmlwdFNyYywgZW50cnlVcmwpXG5cdFx0XHRcdFx0c2NyaXB0cy5wdXNoKG1hdGNoZWRTY3JpcHRTcmMpO1xuXHRcdFx0XHRcdHJldHVybiBnZW5TY3JpcHRSZXBsYWNlU3ltYm9sKG1hdGNoZWRTY3JpcHRTcmMpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIG1hdGNoO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gaWYgaXQgaXMgYW4gaW5saW5lIHNjcmlwdFxuXHRcdFx0XHRjb25zdCBjb2RlID0gZ2V0SW5saW5lQ29kZShtYXRjaCk7XG5cblx0XHRcdFx0Ly8gcmVtb3ZlIHNjcmlwdCBibG9ja3Mgd2hlbiBhbGwgb2YgdGhlc2UgbGluZXMgYXJlIGNvbW1lbnRzLlxuXHRcdFx0XHRjb25zdCBpc1B1cmVDb21tZW50QmxvY2sgPSBjb2RlLnNwbGl0KC9bXFxyXFxuXSsvKS5ldmVyeShsaW5lID0+ICFsaW5lLnRyaW0oKSB8fCBsaW5lLnRyaW0oKS5zdGFydHNXaXRoKCcvLycpKTtcblxuXHRcdFx0XHRpZiAoIWlzUHVyZUNvbW1lbnRCbG9jaykge1xuXHRcdFx0XHRcdHNjcmlwdHMucHVzaChtYXRjaCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gaW5saW5lU2NyaXB0UmVwbGFjZVN5bWJvbDtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRzY3JpcHRzID0gc2NyaXB0cy5maWx0ZXIoZnVuY3Rpb24gKHNjcmlwdCkge1xuXHRcdC8vIGZpbHRlciBlbXB0eSBzY3JpcHRcblx0XHRyZXR1cm4gISFzY3JpcHQ7XG5cdH0pO1xuXG5cdHJldHVybiB7XG5cdFx0dGVtcGxhdGUsXG5cdFx0c2NyaXB0cyxcblx0XHRzdHlsZXMsXG5cdH07XG59Il19