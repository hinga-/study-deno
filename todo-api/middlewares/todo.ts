import { Status } from "../deps.ts";
import type { RouterContext } from "../deps.ts";
import { todoModel } from '../models/mod.ts';

export const FILE_PATH = './db/todos.json';

export async function getAll(ctx: RouterContext<"/todos", Record<string | number, string | undefined>>) {
  const todos = await todoModel.getAll();

  ctx.response.status = Status.OK;
  ctx.response.body = {
    data: todos,
  };
}