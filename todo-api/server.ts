import { Application, bold, yellow } from "./deps.ts";
import { router } from "./router.ts";
import { errorHandler, logger } from './middlewares/mod.ts'

const app = new Application();

app.use(logger);
app.use(errorHandler);
app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener('listen', ({ hostname, port, secure }) => {
  console.log(`🦕 ${bold('Start listening on ')}${yellow(`${secure ? "https://" : "http://"}${hostname}:${port}`)}`);
});

const PORT = +(Deno.env.get('PORT') || '8000');

await app.listen({ port: PORT });