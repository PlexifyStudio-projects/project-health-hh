// Minimal ambient declarations so `vite.config.ts` typechecks without
// installing @types/node (which isn't a runtime dependency).
declare const __dirname: string;
declare module "node:path" {
  export function resolve(...segments: string[]): string;
  export function join(...segments: string[]): string;
  export function dirname(p: string): string;
  const _default: { resolve: typeof resolve; join: typeof join; dirname: typeof dirname };
  export default _default;
}
