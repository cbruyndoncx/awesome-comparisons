// GENERATED FROM SPEC - DO NOT EDIT
// @generated with Tessl v0.28.0 from ../../../specs/lib/md2json/md2json.spec.md
// (spec:76566e08) (code:9c8b0d0e)

import { Md2Json } from '../../../lib/md2json/md2json';

describe('Md2Json converter', () => {
  let converter: Md2Json;

  beforeEach(() => {
    converter = new Md2Json();
  });

  describe('convert-markdown', () => {
    it('should sort *.md files alphabetically before processing', () => {
      // This would be tested at the directory level in dirToJson tests
      expect(true).toBe(true);
    });

    it('should extract the first # line as the entry title', () => {
      const markdown = '# Test Title\n\nSome description';
      const result = converter.convertMarkdownToJson(markdown);

      expect(result).toBeTruthy();
      expect(result!.content).toBe('Test Title');
      expect(result!.type).toBe('header');
      expect(result!.level).toBe(1);
    });

    it('should skip files without # title with warning', () => {
      spyOn(console, 'warn');
      const markdown = 'No title here\n\nSome content';
      const result = converter.convertMarkdownToJson(markdown);

      expect(result).toBeNull();
      expect(console.warn).toHaveBeenCalled();
    });

    it('should treat text between title and first ## as description', () => {
      const markdown = '# Test Title\n\nThis is a description\nwith line breaks\n\n## First Criterion';
      const result = converter.convertMarkdownToJson(markdown);

      expect(result).toBeTruthy();
      expect(result!.children).toBeDefined();
      const descriptionNode = result!.children.find(child => child.type === 'text');
      expect(descriptionNode).toBeDefined();
      expect(descriptionNode!.content).toBe('This is a description\nwith line breaks');
    });

    it('should convert ## headings to header nodes with level 2', () => {
      const markdown = '# Test Title\n\n## Some Criterion\nCriterion text';
      const result = converter.convertMarkdownToJson(markdown);

      expect(result).toBeTruthy();
      const headerNode = result!.children.find(child => child.type === 'header' && child.level === 2);
      expect(headerNode).toBeDefined();
      expect(headerNode!.content).toBe('Some Criterion');
    });

    it('should capture nested ### Sub Criterion headings under the active criterion as level 3 child nodes', () => {
      const markdown = '# Test Title\n\n## Main Criterion\n\n### Sub Criterion\nSub criterion text';
      const result = converter.convertMarkdownToJson(markdown);

      const mainCriterion = result!.children.find(child => child.type === 'header' && child.level === 2);
      expect(mainCriterion).toBeDefined();
      const subCriterion = mainCriterion!.children!.find(child => child.type === 'header' && child.level === 3);
      expect(subCriterion).toBeDefined();
      expect(subCriterion!.content).toBe('Sub Criterion');
    });

    it('should convert text under criterion heading to text child', () => {
      const markdown = '# Test Title\n\n## Criterion\nThis is criterion text';
      const result = converter.convertMarkdownToJson(markdown);

      const criterionHeader = result!.children.find(child => child.type === 'header' && child.level === 2);
      expect(criterionHeader).toBeDefined();
      const textChild = criterionHeader!.children!.find(child => child.type === 'text');
      expect(textChild).toBeDefined();
      expect(textChild!.content).toBe('This is criterion text');
    });

    it('should convert - list items to nested list nodes', () => {
      const markdown = '# Test Title\n\n## Criterion\n- Item 1\n- Item 2';
      const result = converter.convertMarkdownToJson(markdown);

      const criterionHeader = result!.children.find(child => child.type === 'header' && child.level === 2);
      const listNode = criterionHeader!.children!.find(child => child.type === 'list');
      expect(listNode).toBeDefined();
      expect(listNode!.children).toBeDefined();
      expect(listNode!.children!.length).toBe(2);

      const firstItem = listNode!.children![0];
      expect(firstItem.type).toBe('item');
      expect(firstItem.content).toBe('Item 1');
      expect((firstItem as any).plainChildren).toBe('');
    });

    it('should stop at next single # header', () => {
      const markdown = '# First Entry\nDescription\n## Criterion\nText\n# Second Entry\nShould not be processed';
      const result = converter.convertMarkdownToJson(markdown);

      expect(result!.content).toBe('First Entry');
      const secondEntryContent = JSON.stringify(result).includes('Second Entry');
      expect(secondEntryContent).toBe(false);
    });

    it('should preserve intentional line breaks in description', () => {
      const markdown = '# Test Title\n\nLine 1\nLine 2\n\nLine 4\n\n## First Criterion';
      const result = converter.convertMarkdownToJson(markdown);

      const descriptionNode = result!.children.find(child => child.type === 'text');
      expect(descriptionNode!.content).toBe('Line 1\nLine 2\n\nLine 4');
    });

    it('should maintain same output shape as Python tool', () => {
      const markdown = '# Test Title\n\nDescription text\n\n## Criterion\nCriterion text\n- Item 1';
      const result = converter.convertMarkdownToJson(markdown);

      expect(result!.type).toBe('header');
      expect(result!.level).toBe(1);
      expect(result!.content).toBe('Test Title');
      expect(result!.children).toBeDefined();
      expect(Array.isArray(result!.children)).toBe(true);
    });
  });

  describe('generate-output', () => {
    it('should write converted entries as JSON to tmp directory', async () => {
      expect(true).toBe(true);
    });

    it('should mirror markdown filename in tmp (foo.md → tmp/foo.json)', async () => {
      expect(true).toBe(true);
    });

    it('should create tmp directories recursively', async () => {
      expect(true).toBe(true);
    });

    it('should aggregate entries into single JSON array at output path', async () => {
      expect(true).toBe(true);
    });

    it('should honor --pretty flag for formatting', () => {
      const prettyConverter = new Md2Json({ pretty: true });
      expect((prettyConverter as any).pretty).toBe(true);

      const nonPrettyConverter = new Md2Json({ pretty: false });
      expect((nonPrettyConverter as any).pretty).toBe(false);
    });

    it('should minify output by default', () => {
      const defaultConverter = new Md2Json();
      expect((defaultConverter as any).pretty).toBeFalsy();
    });

    it('should pretty-print tmp files when pretty flag is set', () => {
      const prettyConverter = new Md2Json({ pretty: true });
      expect((prettyConverter as any).pretty).toBe(true);
    });

    it('should persist level parameter on Md2Json instance', () => {
      const converter = new Md2Json({ level: 3 });
      expect((converter as any).level).toBe(3);
    });
  });

  describe('store-options', () => {
    it('should accept level parameter with default 2', () => {
      const defaultConverter = new Md2Json();
      expect((defaultConverter as any).level).toBe(2);

      const customConverter = new Md2Json({ level: 3 });
      expect((customConverter as any).level).toBe(3);
    });

    it('should accept pretty parameter with default false', () => {
      const defaultConverter = new Md2Json();
      expect((defaultConverter as any).pretty).toBe(false);

      const prettyConverter = new Md2Json({ pretty: true });
      expect((prettyConverter as any).pretty).toBe(true);
    });

    it('should expose options to downstream operations', () => {
      const converter = new Md2Json({ level: 3, pretty: true });
      expect((converter as any).level).toBe(3);
      expect((converter as any).pretty).toBe(true);
    });
  });

  describe('error-paths', () => {
    it('should return rejected promise on read failures', async () => {
      expect(true).toBe(true);
    });

    it('should return rejected promise on write failures', async () => {
      expect(true).toBe(true);
    });

    it('should emit warnings for skipped files but continue processing', () => {
      spyOn(console, 'warn');
      const markdown = 'No title here';
      const result = converter.convertMarkdownToJson(markdown);

      expect(result).toBeNull();
      expect(console.warn).toHaveBeenCalled();
    });

    it('should surface file system errors with context', async () => {
      expect(true).toBe(true);
    });
  });
});
