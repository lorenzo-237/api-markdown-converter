import { h } from 'hastscript';
import { visit } from 'unist-util-visit';
import directives from './directives.mjs';

function remarkDirectivePlugin() {
  return (tree) => {
    visit(tree, 'containerDirective', (node) => {
      const data = node.data || (node.data = {});

      const hast = h('div', { class: node.name }, [h('h4', 'Tip')]);

      data.hName = hast.tagName;
      data.hProperties = hast.properties;
    });

    directives.forEach((directive) => {
      visit(tree, 'text', (node) => {
        if (node.value.includes(directive.marker)) {
          const data = node.data || (node.data = {});
          const children = [];
          let gap = 0;
          const array = node.value.split(directive.marker);
          for (let i = 0; i < array.length; i++) {
            const element = array[i];
            if ((i + gap) % 2 === 0) {
              // pair
              if (element.endsWith('\\')) {
                children.push(element.slice(0, -1));
                children.push(directive.marker);
                gap++;
              } else {
                children.push(element);
              }
            } else {
              // impair odd
              children.push(
                h(directive.html == undefined ? 'span' : directive.html, { class: directive.class }, [element])
              );
            }
          }

          const hast = h('span', {}, children);

          data.hName = hast.tagName;
          data.hProperties = hast.properties;
          data.hChildren = hast.children;
        }
      });
    });
  };
}

export default remarkDirectivePlugin;
