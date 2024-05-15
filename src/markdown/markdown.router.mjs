import express from 'express';
import controller from './markdown.controller.mjs';

const markdownRouter = express.Router();

markdownRouter.printName = 'markdown';

markdownRouter.route('/test').get(controller.convertExemple);
markdownRouter.route('/tohtml').post(controller.toHtml);

export default markdownRouter;
