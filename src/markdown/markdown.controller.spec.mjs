import ErrorMessage from '../errors/error-message.mjs';
import { NO_BODY_MESSAGE, MARKDOWN_MISSING, MARKDOWN_STRING } from './errors/message.mjs';
import controller from './markdown.controller.mjs';
import { jest } from '@jest/globals';

const next = jest.fn();
const response = {
  json: jest.fn((x) => x),
};

describe('toHtml function', () => {
  it('should call next with 412 error when body is null', async () => {
    await controller.toHtml({ body: null }, null, next);
    expect(next).toHaveBeenCalledWith(new ErrorMessage(NO_BODY_MESSAGE, 412));
  });

  it('should call next with 412 error when body is missing', async () => {
    await controller.toHtml({}, null, next);
    expect(next).toHaveBeenCalledWith(new ErrorMessage(NO_BODY_MESSAGE, 412));
  });

  it('should call next with 412 error when body.markdown is missing', async () => {
    const req = {
      body: {},
    };
    await controller.toHtml(req, null, next);
    expect(next).toHaveBeenCalledWith(new ErrorMessage(MARKDOWN_MISSING, 412));
  });

  it('should call next with 412 error if body.markdown is not a string', async () => {
    const req = { body: { markdown: 12 } };
    const type = 'number';
    await controller.toHtml(req, null, next);
    expect(next).toHaveBeenCalledWith(new ErrorMessage(MARKDOWN_STRING + `\nType returned is ${type}`));
  });

  it('should return HTML if markdown to html succeeds', async () => {
    const req = {
      body: {
        markdown: '# Titre',
      },
    };
    await controller.toHtml(req, response, next);
    expect(response.json).toHaveBeenCalledWith({ html: '\n<h1 id="titre">Titre</h1>\n' });
  });
});
