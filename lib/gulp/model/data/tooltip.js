function markdownToHtml(markdown) {
  if (!markdown) {
    return "";
  }

  let html = markdown
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  html = html.replace(/^ {0,3}(#{1,6})\s*(.+)$/gm, (_match, hashes, content) => {
    const level = hashes.length;
    return `<h${level}>${content.trim()}</h${level}>`;
  });

  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  html = html.replace(/\r?\n/g, "<br>");

  return html;
}

class Tooltip {
  constructor(text, plain, html) {
    this.text = text;
    this.plain = plain;
    this.html = html;
  }

  static fromHtmlString(string) {
    let html = string;

    // if string contains only one item ("\n-"|"\n*" can not be found) remove the prefix "- "
    html = /^[-*] /.test(html) && !/\n[-*] /.test(html) ? html.substring(1).trim() : html;

    // convert plain markdown string to html
    html = markdownToHtml(html);

    return new Tooltip("", string, html);
  }
}

export { Tooltip };
