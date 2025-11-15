import { isNullOrUndefined } from "../util.js";
import { Label } from "./label.js";
import { CriteriaTypes } from "../criteria/criteria.js";

class CriteriaData {
  constructor(name, text, labels, type, url, html) {
    const ref = {
      name: name,
      text: text,
      labels: labels,
      type: type,
      url: url
    };

    if (isNullOrUndefined(labels)) {
      ref.labels = [];
    }

    this.name = ref.name;
    this.text = ref.text;
    this.labels = ref.labels;
    this.type = ref.type;
    this.url = ref.url;

  this.html = html;

    if (this.type === CriteriaTypes.REPOSITORY) {
      if (ref.labels.size > 0) {
        this.url = Array.from(ref.labels).map(([key, value]) => {
          if (this.type !== CriteriaTypes.REPOSITORY) {
            return value.markdown()
          } else {
            return value.repositoryMarkdown();
          }
        }).join("\n");
      }
    }

    if (this.type === CriteriaTypes.RATING) {
      let ratingSum = 0;
      let ratingCount = 0;
      this.labels.forEach((value) => {
        if (!isNullOrUndefined(value) && Number.isFinite(value.stars)) {
          ratingSum += value.stars;
          ratingCount++;
        }
      });
      if (ratingCount > 0) {
        const average = ratingSum / ratingCount;
        this.rating = Math.round(average * 10) / 10;
      }
    }
  }

  static loadJson(json, criteria) {
    const name = json.content;
    const contentChildren = CriteriaData.filterContentChildren(json.children);
    const hasTodoPlaceholder = CriteriaData.containsTodoPlaceholder(contentChildren);
    let labels = new Map();
    let text = '';
    let type = null;
    if (!isNullOrUndefined(criteria)) {
      type = criteria.type;
    }

    // Type based interpretation
    switch (type) {
      case CriteriaTypes.TEXT:
      case CriteriaTypes.MARKDOWN:
        text = CriteriaData.joinChildren(contentChildren);
        break;
      case CriteriaTypes.RATING:
        [text, labels] = CriteriaData.getTextAndLabels(contentChildren, criteria);
        text = CriteriaData.joinChildren(contentChildren);
        break;
      case CriteriaTypes.REPOSITORY:
      case CriteriaTypes.LABEL:
      default:
        [text, labels] = CriteriaData.getTextAndLabels(contentChildren, criteria);
    }

    if (hasTodoPlaceholder) {
      text = '';
      labels = new Map();
    }

    return new CriteriaData(name, text, labels, type);
  }

  static getTextAndLabels(children, criteria) {
    if (isNullOrUndefined(children) || children.length === 0) {
      return ['', new Map()];
    }
    const lists = children.filter(child => child.type === 'list');
    const lastList = lists.length > 0 ? lists[lists.length - 1] : null;
    const nonListChildren = children.filter(child => child.type !== 'list');

    if (!isNullOrUndefined(lastList)) {
      return [
        CriteriaData.joinChildren(nonListChildren),
        lastList.children
          .map(obj => Label.loadJson(obj, criteria))
          .reduce((map, label) => map.set(label.name, label), new Map())
      ];
    }

    return [
      CriteriaData.joinChildren(nonListChildren),
      new Map()
    ];
  }

  static joinChildren(array) {
    const indent = "    ";
    return (array || [])
      .map(child => {
        if (child.type === "list") {
          return child.children.reduce(
            (arr, obj) => {
              arr.push(`- ${(obj.content || "").concat(
                indent.concat(obj.plainChildren).replace(/\n/gm, "\n".concat(indent))
              )}`);
              return arr;
            }, []).join("\n");
        }
        if (child.type === "text") return child.content;
        return null;
      })
      .filter(obj => !isNullOrUndefined(obj))
      .join("\n\n").trim();
  }

  static filterContentChildren(children) {
    return (children || []).filter(child => child.type !== 'header');
  }

  static containsTodoPlaceholder(children) {
    const todoRegex = /<!--\s*todo\b/i;
    return (children || []).some(child => {
      if (child.type === 'text' && typeof child.content === 'string') {
        return todoRegex.test(child.content);
      }
      if (child.type === 'list') {
        if (typeof child.plainChildren === 'string' && todoRegex.test(child.plainChildren)) {
          return true;
        }
        return (child.children || []).some(item => typeof item.content === 'string' && todoRegex.test(item.content));
      }
      return false;
    });
  }

  json() {
    const children = [];
    if (!isNullOrUndefined(this.text) && this.text.length > 0) {
      children.push({type: "text", content: this.text});
    }
    if (!isNullOrUndefined(this.labels) && this.labels.size > 0 && this.type !== CriteriaTypes.RATING) {
      const list = {type: "list", level: 2, children: []};
      this.labels.forEach(label => list.children.push(label.json()));
      children.push(list);
    }

    return {
      type: "header",
      level: 2,
      content: this.name,
      children: children
    };
  }

  markdown() {
    const content = [];
    content.push(`\#\# ${this.name}`);
    if (!isNullOrUndefined(this.text) && this.text.length > 0) {
      content.push(this.text);
    }

    if (!isNullOrUndefined(this.labels) && this.labels.size > 0 && this.type !== CriteriaTypes.RATING) {
      content.push(
        Array.from(this.labels).map(([key, value]) => {
          if (this.type !== CriteriaTypes.REPOSITORY) {
            return value.markdown()
          } else {
            return this.url;
          }
        }).join("\n")
      );
    }
    return content.join("\n");
  }

  convertToLabels() {
    return this.labels;
  }

  getFirstLabel() {
    return this.labels.values().next().value;
  }
}

export { CriteriaData };
