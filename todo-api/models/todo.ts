import todos from "../db/todos.json" assert { type: "json" };

import { FILE_PATH } from "../middlewares/todo.ts";
import { fromMap, toMap } from "./utils.ts";

type Todos = typeof todos;
type Result<T> = [T, undefined] | [undefined, Error];

export async function getAll(): Promise<Todos> {
  const data = await Deno.readFile(FILE_PATH);
  const decorder = new TextDecoder();
  return JSON.parse(decorder.decode(data));
}

export async function get(
  { id }: Pick<Todos[0], "id">,
): Promise<Result<Todos[0]>> {
  const todos = await getAll();
  const todo = toMap(todos).get(id);
  if (!todo) {
    return [undefined, new Error("Cannot find item")];
  }
  return [todo, undefined];
}

export async function create(
  { title }: Pick<Todos[0], "title">,
): Promise<true> {
  const todos = await getAll();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  console.log(title);
  await updateAll([...todos, {
    id,
    done: false,
    title,
    createdAt: now,
    updatedAt: now,
  }]);
  return true;
}

async function updateAll(todos: Todos): Promise<true> {
  const encoder = new TextEncoder();
  await Deno.writeFile(FILE_PATH, encoder.encode(JSON.stringify(todos)));
  return true;
}

export async function update(
  params: Partial<Todos[0]> & Pick<Todos[0], "id">,
): Promise<Result<true>> {
  const todos = await getAll();
  const todosMap = toMap(todos);
  const current = todosMap.get(params.id);

  if (!current) {
    return [undefined, new Error("Cannot find item")];
  }

  todosMap.set(params.id, {
    ...current,
    ...params,
    updatedAt: new Date().toISOString(),
  });
  console.log(fromMap(todosMap));
  await updateAll(fromMap(todosMap));
  return [true, undefined];
}

export async function remove(
  { id }: Pick<Todos[0], "id">,
): Promise<Result<true>> {
  const todos = await getAll();
  const todosMap = toMap(todos);

  if (!todosMap.has(id)) {
    return [undefined, new Error("Cannot find item")];
  }

  todosMap.delete(id);
  await updateAll(fromMap(todosMap));
  return [true, undefined];
}
