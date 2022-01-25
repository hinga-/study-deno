import todos from '../db/todos.json' assert { type: "json" }
import { FILE_PATH } from "../middlewares/todo.ts";

type Todos = typeof todos

export async function getAll(): Promise<Todos> {
  const data = await Deno.readFile(FILE_PATH);
  const decorder = new TextDecoder();
  return JSON.parse(decorder.decode(data));
}