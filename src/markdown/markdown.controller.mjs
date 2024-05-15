import markdownToHtml from './markdown-to-html.mjs';
import { read } from 'to-vfile';
import ErrorMessage from '../errors/error-message.mjs';
import formatMarkdown from './functions/format-markdown.mjs';
import { NO_BODY_MESSAGE, MARKDOWN_MISSING, MARKDOWN_STRING } from './errors/message.mjs';

const controller = {
  convertExemple: async (req, res, next) => {
    try {
      const md = await read('./src/markdown/exemple.md');
      const format = formatMarkdown(String(md));

      res.send(await markdownToHtml(format));
    } catch (error) {
      next(error); // unhandled error
    }
  },
  toHtml: async (req, res, next) => {
    try {
      const body = req.body;

      if (!body) {
        return next(new ErrorMessage(NO_BODY_MESSAGE, 412));
      }

      if (!body.markdown) {
        return next(new ErrorMessage(MARKDOWN_MISSING, 412));
      }

      const type = typeof body.markdown;
      if (type !== 'string') {
        return next(new ErrorMessage(MARKDOWN_STRING + `\nType returned is ${type}`, 412));
      }

      const format = formatMarkdown(body.markdown);

      const html = await markdownToHtml(format);

      res.json({ html });
    } catch (error) {
      next(error); // Internal server error
    }
  },
};

export default controller;
