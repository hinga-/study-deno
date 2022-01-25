import { Context, cyan, green } from "../deps.ts";

export async function logger(ctx: Context, next: () => Promise<unknown>) {
  await next();
  console.log(`${green(ctx.request.method)} ${cyan(ctx.request.url.pathname)}`);
}
