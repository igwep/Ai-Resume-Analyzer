declare module 'pdf-text-extract' {
  interface ExtractOptions {
    splitPages?: boolean;
    cwd?: string; // Optional: helps resolve relative paths if needed
  }

  type ExtractCallback = (err: Error | null, text: string[]) => void;

  function extract(
    file: string | Buffer,
    options: ExtractOptions,
    callback: ExtractCallback
  ): void;

  export = extract;
}
