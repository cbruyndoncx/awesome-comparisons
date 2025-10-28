import { isNullOrUndefined, splitNameUrl } from "../util.js";
import { CriteriaData } from "./criteriaData.js";
import { CriteriaTypes } from "../criteria/criteria.js";

class DataElement {
  constructor(name, url, shortDescription, criteriaData, averageRating, html, latex, groupData, criteriaGroup, sourcePath) {
    const ref = {
      name: name,
      url: url,
      shortDescription: shortDescription,
      criteriaData: criteriaData,
      averageRating: averageRating,
      groupData: groupData,
      criteriaGroup: criteriaGroup,
      sourcePath: sourcePath
    };

    if (isNullOrUndefined(criteriaData)) {
      ref.criteriaData = new Map();
    }
    if (isNullOrUndefined(groupData)) {
      ref.groupData = new Map();
    }
    if (isNullOrUndefined(criteriaGroup)) {
      ref.criteriaGroup = new Map();
    }

    this.name = ref.name;
    this.url = ref.url;
    this.shortDescription = ref.shortDescription;
    this.criteriaData = ref.criteriaData;
    this.averageRating = ref.averageRating;

    this.html = html;
    this.latex = latex;
    this.groupData = ref.groupData;
    this.criteriaGroup = ref.criteriaGroup;
    this.sourcePath = ref.sourcePath || null;
    this.editLink = null;
  }

  static loadJson(json, configuration) {
    const indent = "    ";
    const nameUrl = splitNameUrl(json.content);

    const name = nameUrl.name;
    const url = nameUrl.url;
    const shortDescription = (json.children || [])
      .filter(obj => obj.type !== "header")
      .map(obj => {
        if (obj.type === "text") return obj.content;
        if (obj.type === "list") return obj.children.reduce(
          (arr, label) => {
            arr.push(`- ${(label.content || "").concat(
              indent.concat(label.plainChildren).replace(/\n/gm, "\n".concat(indent))
            )}`);
            return arr;
          }, []).join("\n");
        return null;
      })
      .filter(obj => !isNullOrUndefined(obj))
      .join("\n\n") || "";

    const criteriaData = new Map();
    const groupData = new Map();
    const criteriaGroup = new Map();
    const headers = (json.children || []).filter(obj => obj.type === "header" && !isNullOrUndefined(obj));
    const processedHeaders = new Set();

    const processHeader = (header, parentGroupKey = null) => {
        if (processedHeaders.has(header)) {
            return null;
        }
        processedHeaders.add(header);

        const nestedHeaders = (header.children || [])
            .filter(child => child.type === 'header' && !isNullOrUndefined(child));
        const sanitizedHeader = Object.assign({}, header, {
            children: CriteriaData.filterContentChildren(header.children)
        });
        const headerCriteria = isNullOrUndefined(configuration) ? null : configuration.getCriteria(header.content);
        const headerKey = headerCriteria ? headerCriteria.id : header.content;

        const data = CriteriaData.loadJson(sanitizedHeader, headerCriteria);
        criteriaData.set(data.name, data);

        if (!isNullOrUndefined(parentGroupKey)) {
            criteriaGroup.set(data.name, parentGroupKey);
            if (headerCriteria && headerCriteria.id) {
                criteriaGroup.set(headerCriteria.id, parentGroupKey);
            }
            if (headerCriteria && headerCriteria.name) {
                criteriaGroup.set(headerCriteria.name, parentGroupKey);
            }
            if (data.name !== sanitizedHeader.content) {
                criteriaGroup.set(sanitizedHeader.content, parentGroupKey);
            }
        }

        if (parentGroupKey === null && header.level === 2 && nestedHeaders.length > 0) {
            const childKeys = [];
            nestedHeaders.forEach(childHeader => {
                const childData = processHeader(childHeader, headerKey);
                if (!isNullOrUndefined(childData) && !isNullOrUndefined(childData.name)) {
                    childKeys.push(childData.name);
                }
            });
            const groupRecord = {
                label: data,
                children: childKeys
            };
            groupData.set(header.content, groupRecord);
            if (headerCriteria && headerCriteria.id !== header.content) {
                groupData.set(headerCriteria.id, groupRecord);
            }
        } else {
            nestedHeaders.forEach(childHeader => processHeader(childHeader, parentGroupKey));
        }

        return data;
    };

    headers.forEach(header => processHeader(header));

    return new DataElement(
      name,
      url,
      shortDescription,
      criteriaData,
      undefined,
      undefined,
      undefined,
      groupData,
      criteriaGroup,
      json.sourcePath
    );
  }

  json() {
    const children = [];
    children.push({type: "text", content: this.shortDescription});
    this.criteriaData.forEach(criteriaData => children.push(criteriaData.json()));

    const payload = {
      type: "header",
      level: 1,
      content: isNullOrUndefined(this.url) || this.url.length === 0 ? this.name : this.name.concat(" - ", this.url),
      children: children
    };
    if (!isNullOrUndefined(this.sourcePath) && this.sourcePath !== '') {
      payload.sourcePath = this.sourcePath;
    }
    return payload;
  }

  markdown() {
    const content = [];
    const description = this.shortDescription || "";
    content.push(`\# ${this.name} - ${this.url}\n${description}`);
    this.criteriaData.forEach(criteriaDataElement => content.push(criteriaDataElement.markdown()));
    return content.join("\n\n");
  }

  getCriteriaData(id) {
    if (id === 'id') {
      return new CriteriaData('id', this.name, new Map(), CriteriaTypes.NAME_URL, this.url);
    } else if (id === 'ShortDescription' || id === 'description') {
      const criteriaId = id === 'description' ? 'description' : 'ShortDescription';
      return new CriteriaData(criteriaId, this.shortDescription, new Map(), CriteriaTypes.MARKDOWN, this.url, this.html, this.latex);
    } else {
      return this.criteriaData.get(id);
    }
  }

  getGroupData(id) {
    return this.groupData.get(id);
  }

  getGroupLabel(id) {
    const group = this.groupData.get(id);
    return isNullOrUndefined(group) ? null : group.label;
  }

  getGroupChildren(id) {
    const group = this.groupData.get(id);
    return isNullOrUndefined(group) ? [] : group.children;
  }

  getGroupForCriteria(criteriaId) {
    return this.criteriaGroup.get(criteriaId);
  }

    listGroups() {
        return Array.from(new Set(this.groupData.keys()));
    }

  getCriteriaDataExtended() {
    return [
      this.getCriteriaData('id'),
      this.getCriteriaData('ShortDescription'),
      ...Array.from(this.criteriaData).map(([key, value]) => value)
    ];
  }
}

export { DataElement };
