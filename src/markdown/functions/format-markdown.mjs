export default function formatMarkdown(markdown) {
  const format = markdown.replace(/:::\s*(info|warning|danger|tip)/g, function (match, p1) {
    return ':::' + p1;
  });
  return format;
}
