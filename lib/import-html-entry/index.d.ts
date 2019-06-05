interface EmbedHtmlObject {
    template: string;
    getExternalScripts: () => Promise<any>;
    getExternalStyleSheets: () => Promise<any>;
    execScripts: (proxy?: any) => Promise<any>;
}
interface ImportEntryObject {
    html?: string;
    scripts?: Array<string>;
    styles?: Array<string>;
}
export declare function setGlobalExcludes(excludes: Array<RegExp>): void;
export default function importHTML(url: string): Promise<EmbedHtmlObject>;
export declare function importEntry(entry: string | ImportEntryObject): Promise<EmbedHtmlObject>;
export {};
