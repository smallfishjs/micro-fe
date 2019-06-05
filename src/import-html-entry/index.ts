import processTpl, { genLinkReplaceSymbol } from './process-tpl';
import { getInlineCode } from './utils';

interface EmbedHtmlObject{
	template: string;
	getExternalScripts: () => Promise<any>,
	getExternalStyleSheets: () => Promise<any>,
	execScripts: (proxy?: any) => Promise<any>,
}

interface ImportEntryObject {
	html?: string;
	scripts?: Array<string>;
	styles?: Array<string>;
}

const styleCache: Record<string, any> = {};
const scriptCache: Record<string, any> = {};
const embedHTMLCache: Record<string, Promise<EmbedHtmlObject>> = {};
let globalExcludes: Array<RegExp> = [];

function isExclude(url: string) {
	return globalExcludes.some((exclude) => {
		return exclude.test(url)
	})
}
/**
 * convert external css link to inline style for performance optimization
 * @param template
 * @param styles
 * @return Promise<string>
 */
function getEmbedHTML(template: string, styles: Array<string>) {

	let embedHTML = template;

	return getExternalStyleSheets(styles)
		.then(styleSheets => {
			embedHTML = styles.reduce((html, styleSrc, i) => {
				html = html.replace(genLinkReplaceSymbol(styleSrc), `<style>/* ${styleSrc} */${styleSheets[i]}</style>`);
				return html;
			}, embedHTML);
			return embedHTML;
		});
}

// for prefetch
function getExternalStyleSheets(styles: Array<string>) {
	const tasks = styles.filter((styleLink) => {
		return !isExclude(styleLink)
	}).map((styleLink) => {
		if (styleLink.startsWith('<')) {
			// if it is inline style
			return Promise.resolve(getInlineCode(styleLink));
		} else {
			// external styles
			return styleCache[styleLink] ||
				(styleCache[styleLink] = fetch(styleLink).then(response => response.text()));
		}
	})
	return Promise.all(tasks);
}

// for prefetch
function getExternalScripts(scripts: Array<string>) {
	const tasks = scripts.filter((script) => {
		return !isExclude(script)
	}).map((script) => {
		if (script.startsWith('<')) {
			// if it is inline script
			return Promise.resolve(getInlineCode(script))
		} else {
			// external script
			return scriptCache[script] ||
				(scriptCache[script] = fetch(script).then(response => response.text())
				);
		}
	})
	return Promise.all(tasks);
}

function execScripts(scripts: Array<string>, proxy = window) {
	return getExternalScripts(scripts)
		.then(scriptsText => {
			(window as any).proxy = proxy;
			const geval = eval;

			function exec(scriptSrc: string, inlineScript: string, resolve: Function) {

				try {
					geval(`;(function(window){;${inlineScript}\n})(window.proxy);`);
				} catch (e) {
					console.error(`error occurs while executing ${scriptSrc}`);
					console.error(e);
				}

				if (scriptSrc === scripts[scripts.length - 1]) {
					resolve()
				}
			}

			function schedule(i: number, resolvePromise: Function) {

				if (i < scripts.length) {
					const scriptSrc = scripts[i];
					const inlineScript = scriptsText[i];

					exec(scriptSrc, inlineScript, resolvePromise);
					schedule(i + 1, resolvePromise);
				}
			}

			return new Promise(resolve => schedule(0, resolve));
		});
}

export function setGlobalExcludes (excludes: Array<RegExp>) {
	globalExcludes = excludes
}

export default function importHTML(url: string) {

	return embedHTMLCache[url] || (embedHTMLCache[url] = fetch(url)
		.then(response => response.text())
		.then(html => {

			const { template, scripts, styles } = processTpl(html, url);

			return getEmbedHTML(template, styles).then(embedHTML => ({
				template: embedHTML,
				getExternalScripts: () => getExternalScripts(scripts),
				getExternalStyleSheets: () => getExternalStyleSheets(styles),
				execScripts: (proxy) => execScripts(scripts, proxy),
			}));
		}));
};


export function importEntry(entry: string | ImportEntryObject): Promise<EmbedHtmlObject> {

	if (!entry) {
		throw new SyntaxError('entry should not be empty!');
	}

	if (typeof entry === 'string') {
		return importHTML(entry);
	}
	// config entry
	if (Array.isArray(entry.scripts) || Array.isArray(entry.styles)) {

		const { scripts = [], styles = [], html = '' } = entry;

		return getEmbedHTML(html, styles).then(embedHTML => ({
			template: embedHTML,
			getExternalScripts: () => getExternalScripts(scripts),
			getExternalStyleSheets: () => getExternalStyleSheets(styles),
			execScripts: (proxy) => execScripts(scripts, proxy),
		}));

	} else {
		throw new SyntaxError('entry scripts or styles should be array!');
	}
}