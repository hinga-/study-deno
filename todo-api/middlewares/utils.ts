import { RouterContext, Status } from "../deps.ts";

export async function getParams<T extends string>(ctx: RouterContext<T>) {
  const body = await ctx.request.body();
  const value = await body.value;

  return {
    ...ctx.params,
    ...value,
  };
}

export function handleOK<T extends string, U>(ctx: RouterContext<T>, data: U) {
  ctx.response.status = Status.OK;
  ctx.response.body = {
    data,
  };
}

export function handleError<T extends string>(
  ctx: RouterContext<T>,
  error: Error,
) {
  ctx.response.status = Status.BadRequest;
  ctx.response.body = {
    error: {
      message: error.message,
      stack: error.stack,
    },
  };
}
