import { Status } from "../deps.ts";
import type { RouterContext } from "../deps.ts";

export function getHome(
  ctx: RouterContext<"/", Record<string | number, string | undefined>>,
) {
  ctx.response.status = Status.OK;
  ctx.response.body = "Todo list API with Deno";
}
