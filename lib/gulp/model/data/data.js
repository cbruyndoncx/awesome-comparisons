import { DataElement } from "./dataElement.js";
import { isNullOrUndefined } from "../util.js";

class Data {
  constructor(dataElements, groups = new Map()) {
    this.dataElements = dataElements;
    this.groups = groups;
  }

  static loadJson(json, configuration) {
    const dataElements = (json || [])
      .filter(obj => obj.type === "header")
      .map(obj => DataElement.loadJson(obj, configuration));

    const groups = new Map();
    dataElements.forEach(element => {
      (element.groupData || new Map()).forEach((groupInfo, groupKey) => {
        if (!groups.has(groupKey)) {
          groups.set(groupKey, {
            name: groupKey,
            children: [],
            labels: new Set()
          });
        }
        const summary = groups.get(groupKey);
        (groupInfo.children || []).forEach(child => {
          if (summary.children.indexOf(child) === -1) {
            summary.children.push(child);
          }
        });
        if (!isNullOrUndefined(groupInfo.label) && !isNullOrUndefined(groupInfo.label.labels)) {
          groupInfo.label.labels.forEach((value, labelName) => summary.labels.add(labelName));
        }
      });
    });

    return new Data(dataElements, groups);
  }

  json() {
    return this.dataElements.map(element => element.json());
  }

  markdown() {
    return this.dataElements.map(element => element.markdown());
  }
}

export { Data };
