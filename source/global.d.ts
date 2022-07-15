type StylisPlugin = (
  context: number,
  selector: string[],
  parent: string[],
  content: string,
  line: number,
  column: number,
  length: number,
) => string | void;

declare module 'stylis-important-plugin' {
  plugin = StylisPlugin;
  export = plugin;
};
