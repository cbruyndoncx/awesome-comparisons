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
  constructor(text, plain, html, latex) {
    this.text = text;
    this.plain = plain;
    this.html = html;
    this.latex = latex;
  }

  static fromHtmlString(string) {
    let html = string;

    // if string contains only one item ("\n-"|"\n*" can not be found) remove the prefix "- "
    html = /^[-*] /.test(html) && !/\n[-*] /.test(html) ? html.substring(1).trim() : html;

    // build latex string (replace [@BIBKEY] with \cite{BIBKEY})
    const latex = (html.replace(/(?:\[@)([^\]]*)(?:])/g, (match, dec) => '\\cite{' + dec + '}') || "").trim();

    // convert plain markdown string to html
    html = markdownToHtml(html);

    return new Tooltip("", string, html, latex);
  }
}

export { Tooltip };
