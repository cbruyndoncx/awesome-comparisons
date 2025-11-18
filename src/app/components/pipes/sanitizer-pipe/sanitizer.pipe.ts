import { Pipe, PipeTransform } from '@angular/core';
import { SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
    name: 'sanitizeHtml',
    pure: false
})
export class SanitizerPipe implements PipeTransform {

    constructor(private _sanitizer: DomSanitizer) {
    }

    transform(v: string): string {
        // Pre-process to handle specific pattern if needed
        let processedValue = v;
        if (/^<p>\d+\./.test(v)) {
            const dotIndex = v.indexOf('.');
            if (dotIndex !== -1) {
                processedValue = '<p>' + v.slice(dotIndex + 1);
            }
        }

        // Use proper sanitization instead of bypassing security
        const sanitized = this._sanitizer.sanitize(SecurityContext.HTML, processedValue);
        return sanitized || '';
    }
} 
