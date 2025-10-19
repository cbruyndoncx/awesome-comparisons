import { Tooltip } from "./tooltip.js";
import { isNullOrUndefined } from "../util.js";
import { CriteriaTypes } from "../criteria/criteria.js";

class Label {
  constructor(name, tooltip, clazz, color, backgroundColor, stars, comment) {
    this.name = name;
    this.tooltip = tooltip;
    this.clazz = clazz;
    this.color = color;
    this.backgroundColor = backgroundColor;
    this.stars = stars;
    this.comment = comment;
    this.isDetail = false;

    if (isNullOrUndefined(this.tooltip)) {
      this.tooltip = new Tooltip();
    }
  }

  static loadJson(json, criteria) {
    const name = json.content;
    const tooltip = Tooltip.fromHtmlString(json.plainChildren);
    let clazz = null;
    let color = null;
    let backgroundColor = null;
    let stars = 0;
    let comment = "";

    if (!isNullOrUndefined(criteria)) {
      const criteriaValue = criteria.getValue(json.content);
      if (!isNullOrUndefined(criteriaValue)) {
        clazz = criteriaValue.clazz;
        color = criteriaValue.color;
        backgroundColor = criteriaValue.backgroundColor;
      }

      if (criteria.type === CriteriaTypes.RATING) {
        const ratingMatch = /(?:\[(\d*)])((?:.|\n)*)/gm.exec(json.content);
        if (!isNullOrUndefined(ratingMatch)) {
          const [, starsMatch, commentMatch] = ratingMatch;
          stars = parseInt(starsMatch, 10);
          comment = (commentMatch || "").trim();
        } else {
          stars = 0;
          comment = (json.plainChildren || "").trim();
        }
      }
    }

    return new Label(name, tooltip, clazz, color, backgroundColor, stars, comment);
  }

  setClazz(clazz) {
    this.clazz = clazz;
  }

  setColor(color) {
    this.color = color;
  }

  setBackgroundColor(backgroundColor) {
    this.backgroundColor = backgroundColor;
  }

  json() {
    return {
      type: "item",
      level: 1,
      content: this.name,
      plainChildren: isNullOrUndefined(this.tooltip) ? "" : this.tooltip.plain
    };
  }

  markdown() {
    const indent = "   ";
    const content = [];
    content.push(`- ${this.name}`);
    if (!isNullOrUndefined(this.tooltip)
      && !isNullOrUndefined(this.tooltip.plain)
      && this.tooltip.plain.length > 0) {
      content.push(indent.concat(this.tooltip.plain.replace(/\n/gm, "\n".concat(indent))));
    }
    return content.join("\n");
  }

  repositoryMarkdown() {
    let {name, tooltip, clazz, color, bgcolor} = this;
    let content = "";
    if (!isNullOrUndefined(this.tooltip)
      && !isNullOrUndefined(this.tooltip.plain)
      && this.tooltip.plain.length > 0) {
      const array = this.tooltip.plain.match(/<([^>]*)>/);
      if (array && array.length > 1) {
        content = array[1];
      }
    }
    return content;
  }
}

export { Label };
