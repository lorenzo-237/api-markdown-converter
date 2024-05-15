import express from 'express';
import bodyParser from 'body-parser';
import markdownRouter from './markdown/markdown.router.mjs';
import logErrors from './logs/log-error.mjs';
import errorHandler from './errors/error-handler.mjs';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ message: 'Lorenzo' });
});

app.use('/markdown', markdownRouter);

app.use(logErrors);
app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({
    status: 'NOT FOUND',
    code: 404,
    message: `Cannot GET ${req.url}`,
  });
});

export default app;
