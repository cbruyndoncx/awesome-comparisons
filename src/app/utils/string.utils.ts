export function deNormalize(str: string): string {
    if (!str) {
        return '';
    }
    // Add space before capital letters, then trim.
    return str.replace(/([A-Z])/g, ' $1').trim();
}
