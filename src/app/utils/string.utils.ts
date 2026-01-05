export function deNormalize(str: string): string {
    if (!str) {
        return '';
    }
    const words = str.split(/(?=[A-Z][a-z])/);
    const result = words.join(' ');
    return result.charAt(0).toUpperCase() + result.slice(1);
}
