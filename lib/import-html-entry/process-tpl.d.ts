export declare const genLinkReplaceSymbol: (linkHref: string) => string;
export declare const genScriptReplaceSymbol: (scriptSrc: string) => string;
export declare const inlineScriptReplaceSymbol = "<!-- inline scripts replaced by import-html-entry -->";
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
export default function processTpl(tpl: string, entryUrl: string): {
    template: string;
    scripts: string[];
    styles: string[];
};
