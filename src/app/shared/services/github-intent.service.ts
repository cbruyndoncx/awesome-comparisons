import { Injectable } from '@angular/core';

export interface GitHubNewFileParams {
  owner: string;
  repo: string;
  branch: string;
  filepath: string;
  content: string;
  message?: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class GitHubIntentService {

  constructor() { }

  /**
   * Builds a GitHub URL for creating a new file with pre-filled content
   * @param params Configuration for the new file
   * @returns GitHub URL string
   */
  buildNewFileUrl(params: GitHubNewFileParams): string {
    const { owner, repo, branch, filepath, content, message, description } = params;

    // Base URL for creating a new file
    const baseUrl = `https://github.com/${owner}/${repo}/new/${branch}`;

    // Build query parameters
    const queryParams = new URLSearchParams();
    queryParams.set('filename', filepath);
    queryParams.set('value', content);

    if (message) {
      queryParams.set('message', message);
    }

    if (description) {
      queryParams.set('description', description);
    }

    return `${baseUrl}?${queryParams.toString()}`;
  }

  /**
   * Opens GitHub's new file page in a new tab with pre-filled content
   * @param params Configuration for the new file
   */
  openNewFileIntent(params: GitHubNewFileParams): void {
    const url = this.buildNewFileUrl(params);
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  /**
   * Extracts repository info from a GitHub URL
   * @param url GitHub repository URL
   * @returns Object with owner and repo, or null if invalid
   */
  parseGitHubUrl(url: string): { owner: string; repo: string } | null {
    try {
      const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
      if (match && match[1] && match[2]) {
        return {
          owner: match[1],
          repo: match[2].replace(/\.git$/, '')
        };
      }
    } catch (e) {
      console.warn('Failed to parse GitHub URL:', e);
    }
    return null;
  }

  /**
   * Sanitizes a filename by removing invalid characters
   * @param filename Original filename
   * @returns Sanitized filename suitable for file systems
   */
  sanitizeFilename(filename: string): string {
    return filename
      .toLowerCase()
      .replace(/[^a-z0-9-_]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
}
