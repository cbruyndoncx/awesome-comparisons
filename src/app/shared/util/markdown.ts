// GENERATED FROM SPEC - DO NOT EDIT
// @generated with Tessl v0.28.0 from ../../../../specs/app/shared/markdown-renderer.spec.md
// (spec:ab9752a3) (code:542ae831)

export function renderMarkdown(markdown: string | null | undefined): string {
    if (!markdown) {
        return '';
    }

    // Escape HTML special characters
    let html = markdown
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    // Convert headings (# to <h#>)
    html = html.replace(/^ {0,3}(#{1,6})\s*(.+)$/gm, (_match, hashes, content) => {
        const level = hashes.length;
        return `<h${level}>${content.trim()}</h${level}>`;
    });

    // Bold **text**
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // Italic *text*
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // Line breaks
    html = html.replace(/\r?\n/g, '<br>');

    return html;
}

export function renderMarkdownToText(markdown: string | null | undefined): string {
    if (!markdown) {
        return '';
    }

    const html = renderMarkdown(markdown);
    // Strip HTML tags
    return html.replace(/<[^>]*>/g, '').trim();
}
