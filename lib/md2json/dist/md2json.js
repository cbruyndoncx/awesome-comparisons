"use strict";
// GENERATED FROM SPEC - DO NOT EDIT
// @generated with Tessl v0.28.0 from ../../specs/lib/md2json/md2json.spec.md
// (spec:b5537801) (code:d584890d)
// (spec:76566e08) (code:updated)
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Md2Json = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class Md2Json {
    constructor(options = {}) {
        this.level = options.level !== undefined ? options.level : 2;
        this.pretty = options.pretty !== undefined ? options.pretty : false;
    }
    convertMarkdownToJson(markdown) {
        const lines = markdown.split('\n');
        let titleLine = '';
        let titleIndex = -1;
        // Find the first line beginning with # (space optional)
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            const match = line.match(/^#\s*(.+)$/);
            if (match) {
                titleLine = match[1].trim();
                titleIndex = i;
                break;
            }
        }
        if (!titleLine) {
            return null;
        }
        const children = [];
        let currentIndex = titleIndex + 1;
        // Extract description (text between title and first ##)
        const descriptionLines = [];
        while (currentIndex < lines.length) {
            const line = lines[currentIndex];
            const trimmed = line.trim();
            if (trimmed.startsWith('## ') || (trimmed.startsWith('#') && !trimmed.startsWith('##'))) {
                break;
            }
            descriptionLines.push(line);
            currentIndex++;
        }
        // Add description as text node if it exists (trim blank lines but preserve intentional line breaks)
        if (descriptionLines.length > 0) {
            // Remove leading and trailing blank lines
            while (descriptionLines.length > 0 && descriptionLines[0].trim() === '') {
                descriptionLines.shift();
            }
            while (descriptionLines.length > 0 && descriptionLines[descriptionLines.length - 1].trim() === '') {
                descriptionLines.pop();
            }
            if (descriptionLines.length > 0) {
                children.push({
                    type: "text",
                    content: descriptionLines.join('\n')
                });
            }
        }
        // Process ## and ### sections
        while (currentIndex < lines.length) {
            const raw = lines[currentIndex];
            const trimmed = raw.trim();
            // Stop if we hit another single-# header (next comparison entry)
            if (trimmed.startsWith('#') && !trimmed.startsWith('##')) {
                break;
            }
            // Handle level-2 headers
            if (trimmed.startsWith('## ')) {
                const criterionTitle = trimmed.substring(3).trim();
                const criterionHeader = {
                    type: "header",
                    level: 2,
                    content: criterionTitle,
                    children: []
                };
                currentIndex++;
                const mainContent = [];
                let mainList = [];
                let inMainList = false;
                const flushMainText = () => {
                    if (mainContent.length === 0) {
                        return;
                    }
                    const textContent = mainContent.join('\n').trim();
                    if (textContent) {
                        criterionHeader.children.push({
                            type: "text",
                            content: textContent
                        });
                    }
                    mainContent.length = 0;
                };
                const flushMainList = () => {
                    if (!inMainList || mainList.length === 0) {
                        return;
                    }
                    const listChildren = mainList
                        .filter(item => item.trim().length > 0)
                        .map(item => ({
                        type: "item",
                        level: 2,
                        content: item,
                        plainChildren: ""
                    }));
                    if (listChildren.length > 0) {
                        criterionHeader.children.push({
                            type: "list",
                            level: 2,
                            children: listChildren
                        });
                    }
                    mainList = [];
                    inMainList = false;
                };
                while (currentIndex < lines.length) {
                    const line = lines[currentIndex];
                    const t = line.trim();
                    if (t.startsWith('## ') || (t.startsWith('#') && !t.startsWith('##'))) {
                        break;
                    }
                    if (t.startsWith('### ')) {
                        flushMainList();
                        flushMainText();
                        const subTitle = t.substring(4).trim();
                        currentIndex++;
                        const subHeader = {
                            type: "header",
                            level: 3,
                            content: subTitle,
                            children: []
                        };
                        const subContent = [];
                        let subList = [];
                        let inSubList = false;
                        const flushSubText = () => {
                            if (subContent.length === 0) {
                                return;
                            }
                            const textContent = subContent.join('\n').trim();
                            if (textContent) {
                                subHeader.children.push({
                                    type: "text",
                                    content: textContent
                                });
                            }
                            subContent.length = 0;
                        };
                        const flushSubList = () => {
                            if (!inSubList || subList.length === 0) {
                                return;
                            }
                            const listChildren = subList
                                .filter(item => item.trim().length > 0)
                                .map(item => ({
                                type: "item",
                                level: 3,
                                content: item,
                                plainChildren: ""
                            }));
                            if (listChildren.length > 0) {
                                subHeader.children.push({
                                    type: "list",
                                    level: 3,
                                    children: listChildren
                                });
                            }
                            subList = [];
                            inSubList = false;
                        };
                        while (currentIndex < lines.length) {
                            const subLine = lines[currentIndex];
                            const st = subLine.trim();
                            if (st.startsWith('### ') ||
                                st.startsWith('## ') ||
                                (st.startsWith('#') && !st.startsWith('##'))) {
                                break;
                            }
                            if (st.startsWith('- ')) {
                                inSubList = true;
                                subList.push(st.substring(2).trim());
                            }
                            else if (inSubList && st === '') {
                                // keep list open
                            }
                            else if (inSubList && !st.startsWith('- ')) {
                                flushSubList();
                                subContent.push(subLine);
                            }
                            else {
                                subContent.push(subLine);
                            }
                            currentIndex++;
                        }
                        flushSubList();
                        flushSubText();
                        criterionHeader.children.push(subHeader);
                        continue;
                    }
                    if (t.startsWith('- ')) {
                        inMainList = true;
                        mainList.push(t.substring(2).trim());
                    }
                    else if (inMainList && t === '') {
                        // keep list open across blank lines
                    }
                    else if (inMainList && !t.startsWith('- ')) {
                        flushMainList();
                        mainContent.push(line);
                    }
                    else {
                        mainContent.push(line);
                    }
                    currentIndex++;
                }
                flushMainList();
                flushMainText();
                children.push(criterionHeader);
                continue;
            }
            currentIndex++;
        }
        return {
            type: "header",
            level: 1,
            content: titleLine,
            children
        };
    }
    async dirToJson(inputDir, tmpDir, outputPath) {
        try {
            // Ensure input directory exists
            if (!fs.existsSync(inputDir)) {
                const error = new Error(`Input directory does not exist: ${inputDir}`);
                console.error('Error:', error.message);
                throw error;
            }
            // Ensure tmp directory exists (recursive create)
            if (!fs.existsSync(tmpDir)) {
                fs.mkdirSync(tmpDir, { recursive: true });
            }
            // Ensure output directory exists (recursive create)
            const outputDir = path.dirname(outputPath);
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }
            const collectMarkdownFiles = (dir) => {
                const entries = fs.readdirSync(dir, { withFileTypes: true });
                const results = [];
                entries.forEach(entry => {
                    const entryPath = path.join(dir, entry.name);
                    if (entry.isDirectory()) {
                        results.push(...collectMarkdownFiles(entryPath));
                    }
                    else if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
                        results.push(entryPath);
                    }
                });
                return results;
            };
            const files = collectMarkdownFiles(inputDir)
                .map(filePath => ({
                absolute: filePath,
                relative: path.relative(inputDir, filePath).replace(/\\/g, '/')
            }))
                .sort((a, b) => a.relative.localeCompare(b.relative, undefined, { sensitivity: 'base' }));
            const allEntries = [];
            for (const file of files) {
                try {
                    const content = fs.readFileSync(file.absolute, 'utf-8');
                    const jsonData = this.convertMarkdownToJson(content);
                    if (jsonData) {
                        // Add sourcePath field for aggregated output (normalize to string)
                        const entryWithSourcePath = {
                            ...jsonData,
                            sourcePath: (typeof file.relative === 'string' ? file.relative : String(file.relative))
                        };
                        // Write each converted entry as JSON to tmp directory (write the normalized entry)
                        const jsonFileName = (typeof file.relative === 'string' ? file.relative : String(file.relative)).replace(/\.md$/i, '.json');
                        const jsonFilePath = path.join(tmpDir, jsonFileName);
                        const jsonDir = path.dirname(jsonFilePath);
                        if (!fs.existsSync(jsonDir)) {
                            fs.mkdirSync(jsonDir, { recursive: true });
                        }
                        const jsonString = this.pretty
                            ? JSON.stringify(entryWithSourcePath, null, 2)
                            : JSON.stringify(entryWithSourcePath);
                        fs.writeFileSync(jsonFilePath, jsonString);
                        allEntries.push(entryWithSourcePath);
                    }
                    else {
                        console.warn(`Warning: Skipping ${file.relative} - no title found`);
                    }
                }
                catch (error) {
                    const errorMsg = `Error processing ${file.relative}: ${error instanceof Error ? error.message : String(error)}`;
                    console.error(errorMsg);
                    throw new Error(errorMsg);
                }
            }
            // Aggregate all successfully parsed entries into single JSON array
            const aggregatedString = this.pretty
                ? JSON.stringify(allEntries, null, 2)
                : JSON.stringify(allEntries);
            fs.writeFileSync(outputPath, aggregatedString);
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error:', error.message);
                throw error;
            }
            else {
                const errorMsg = `Unknown error: ${String(error)}`;
                console.error(errorMsg);
                throw new Error(errorMsg);
            }
        }
    }
}
exports.Md2Json = Md2Json;
