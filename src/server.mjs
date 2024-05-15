import * as dotenv from 'dotenv';

dotenv.config();

import app from './app.mjs';

const port = process.env.APP_PORT || 3008;

app.listen(port, async () => {
  console.log(`\x1b[33m\x1b[4mApp Start\x1b[0m \x1b[33m=>\x1b[0m \x1b[34mPORT : ${port}\x1b[0m`);
  logRoutes();
});

const logRoutes = () => {
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      // Route normale
      console.log(
        `\x1b[32m[${middleware.route.stack[0].method.toUpperCase()}]\t:\x1b[0m \x1b[36m${middleware.route.path}\x1b[0m`
      );
    } else if (middleware.name === 'router') {
      // Routeur monté avec app.use()
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          console.log(
            `\x1b[32m[${handler.route.stack[0].method.toUpperCase()}]\t:\x1b[0m \x1b[36m${middleware.handle.printName}${
              handler.route.path
            }\x1b[0m`
          );
        }
      });
    }
  });
};
