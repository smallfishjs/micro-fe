import { getInlineCode, resolvePath } from './utils'

const ALL_SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi
const SCRIPT_TAG_REGEX = /<(script)\s+((?!type=('|')text\/ng-template\3).)*?>.*?<\/\1>/i
const SCRIPT_SRC_REGEX = /.*\ssrc=('|")(\S+)\1.*/
const LINK_TAG_REGEX = /<(link)\s+.*?>/gi
const STYLE_TYPE_REGEX = /\s+rel=("|')stylesheet\1.*/
const STYLE_HREF_REGEX = /.*\shref=('|")(\S+)\1.*/
const HTML_COMMENT_REGEX = /<!--([\s\S]*?)-->/g


export const genLinkReplaceSymbol = (linkHref: string) => `<!-- link ${linkHref} replaced by import-html-entry -->`
export const genScriptReplaceSymbol = (scriptSrc: string) => `<!-- script ${scriptSrc} replaced by import-html-entry -->`
export const inlineScriptReplaceSymbol = '<!-- inline scripts replaced by import-html-entry -->'

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
export default function processTpl (tpl: string, entryUrl: string) {
  let scripts: string[] = []
  const styles: string[] = []

  const template = tpl

    /*
		remove html comment first
		*/
    .replace(HTML_COMMENT_REGEX, '')
    .replace(LINK_TAG_REGEX, match => {
      /*
			change the css link
			*/
      const styleType = !!match.match(STYLE_TYPE_REGEX)
      if (styleType) {
        const styleHref = match.match(STYLE_HREF_REGEX)
        if (styleHref) {
          const href = styleHref && styleHref[2]
          const newHref = resolvePath(href, entryUrl)

          styles.push(newHref)
          return genLinkReplaceSymbol(newHref)
        }
      }

      return match
    })
    .replace(ALL_SCRIPT_REGEX, match => {
      // in order to keep the exec order of all javascripts
      // if it is a external script
      if (SCRIPT_TAG_REGEX.test(match)) {
        const matchedScriptSrcMatch = match.match(SCRIPT_SRC_REGEX)
        let matchedScriptSrc = matchedScriptSrcMatch && matchedScriptSrcMatch[2]
        if (matchedScriptSrc) {
          matchedScriptSrc = resolvePath(matchedScriptSrc, entryUrl)
          scripts.push(matchedScriptSrc)
          return genScriptReplaceSymbol(matchedScriptSrc)
        }

        return match
      } else {
        // if it is an inline script
        const code = getInlineCode(match)

        // remove script blocks when all of these lines are comments.
        const isPureCommentBlock = code.split(/[\r\n]+/).every(line => !line.trim() || line.trim().startsWith('//'))

        if (!isPureCommentBlock) {
          scripts.push(match)
        }

        return inlineScriptReplaceSymbol
      }
    })

  scripts = scripts.filter(function (script) {
    // filter empty script
    return !!script
  })

  return {
    template,
    scripts,
    styles,
  }
}
