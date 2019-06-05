import { registerApplication, start as startSpa } from 'single-spa';
import { importEntry, setGlobalExcludes } from './import-html-entry';

interface AppObject {
  name: string
  entry: string;
  render (arg: {appContent: string; loading: boolean}): void;
  activeRule: (location: Location) => boolean;
}

export const setExcludes = setGlobalExcludes

export function registerMicroApp(app: AppObject) {
  const {
    name,
    entry,
    render,
    activeRule,
  } = app;

  const appRender = async () => {
    render({ appContent: '', loading: true });
    const { template, execScripts } = await importEntry(entry);
    const appContent = template
    await execScripts();

    return {
      bootstrap: [
        async () => console.log('bootstrap app')
      ],
      mount: [
        async () => render({ appContent, loading: false }),
      ],
      unmount: [
        async () => render({ appContent: '', loading: false }),
      ],
    };
  }

  registerApplication(name, appRender,activeRule);
}

export function start() {
  startSpa();
}