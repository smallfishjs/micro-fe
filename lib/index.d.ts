import { setGlobalExcludes } from './import-html-entry';
interface AppObject {
    name: string;
    entry: string;
    render(arg: {
        appContent: string;
        loading: boolean;
    }): void;
    activeRule: (location: Location) => boolean;
}
export declare const setExcludes: typeof setGlobalExcludes;
export declare function registerMicroApp(app: AppObject): void;
export declare function start(): void;
export {};
