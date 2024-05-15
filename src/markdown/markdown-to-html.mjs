import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkDirective from 'remark-directive';
import remarkRehype from 'remark-rehype';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeHighlight from 'rehype-highlight';
import rehypeFormat from 'rehype-format';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import { h } from 'hastscript';
import remarkDirectivePlugin from './remark-plugin.mjs';

async function markdownToHtml(md) {
  const file = await unified()
    .use(remarkGfm)
    .use(remarkParse)
    .use(remarkDirective)
    .use(remarkDirectivePlugin)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeHighlight)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(md);

  return String(file);
}

export default markdownToHtml;
