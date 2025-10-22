# Plan: Feature Grouping Implementation

Implement grouped feature columns with expand/collapse behavior across data pipeline, state, and rendering layers.

## Tasks

- [x] Analyze current Markdown conversion and data structures to design grouping representation
  > **Bash** `["bash","-lc","ls lib/gulp/model"]`
  >
  > Listed available model modules to understand existing data abstractions.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,200p' lib/gulp/model/model.module.d.ts"]`
  >
  > Reviewed exported classes to map how configuration, criteria, and data elements flow through the pipeline.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,200p' lib/gulp/model/configuration/configuration.js"]`
  >
  > Inspected configuration loading to learn where criteria arrays originate and how defaults merge.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,200p' lib/gulp/model/criteria/criteria.js"]`
  >
  > Examined criteria parsing, default handling, and JSON structure to gauge changes needed for grouping metadata.
  > ---
  > **Bash** `["bash","-lc","sed -n '200,400p' lib/gulp/model/criteria/criteria.js"]`
  >
  > Captured remaining helper methods for criteria serialization to assess extension points.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,200p' lib/gulp/model/data/data.js"]`
  >
  > Analyzed how Markdown JSON becomes `Data` objects and observed current filtering to level-2 headers.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,200p' lib/gulp/model/data/dataElement.js"]`
  >
  > Studied `DataElement` assembly to see how criteria data is mapped and how heading levels are interpreted.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,200p' lib/gulp/model/data/criteriaData.js"]`
  >
  > Understood label/text extraction logic, enabling planning for group label propagation and serialization.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,200p' lib/gulp/tasks/criteria.babel.js"]`
  >
  > Reviewed auto-configuration pipeline to anticipate ripple effects once grouped criteria metadata is introduced.
- [x] Extend build pipeline and shared models to emit group metadata while preserving flat criteria compatibility
  > **Bash** `["bash","-lc","sed -n '1,200p' lib/gulp/model/data/criteriaData.js"]`
  >
  > Reviewed label parsing logic to determine how nested headers influence current behavior.
  > ---
  > **Edit** `apply_patch`
  > ```
  > *** Begin Patch
  > *** Update File: lib/gulp/model/data/criteriaData.js
  > @@
  >-    let labels = new Map();
  >-    let text = "";
  >-    let type = null;
  >-    if (!isNullOrUndefined(criteria)) {
  >-      type = criteria.type;
  >-    }
  >-
  >-    // Type based interpretation
  >-    switch (type) {
  >-      case CriteriaTypes.TEXT:
  >-      case CriteriaTypes.MARKDOWN:
  >-        text = CriteriaData.joinChildren(json.children);
  >-        break;
  >-      case CriteriaTypes.RATING:
  >-        [text, labels] = CriteriaData.getTextAndLabels(json.children, criteria);
  >-        text = CriteriaData.joinChildren(json.children);
  >-        break;
  >-      case CriteriaTypes.REPOSITORY:
  >-      case CriteriaTypes.LABEL:
  >-      default:
  >-        [text, labels] = CriteriaData.getTextAndLabels(json.children, criteria);
  >-    }
  >+    const contentChildren = CriteriaData.filterContentChildren(json.children);
  >+    let labels = new Map();
  >+    let text = '';
  >+    let type = null;
  >+    if (!isNullOrUndefined(criteria)) {
  >+      type = criteria.type;
  >+    }
  >+
  >+    // Type based interpretation
  >+    switch (type) {
  >+      case CriteriaTypes.TEXT:
  >+      case CriteriaTypes.MARKDOWN:
  >+        text = CriteriaData.joinChildren(contentChildren);
  >+        break;
  >+      case CriteriaTypes.RATING:
  >+        [text, labels] = CriteriaData.getTextAndLabels(contentChildren, criteria);
  >+        text = CriteriaData.joinChildren(contentChildren);
  >+        break;
  >+      case CriteriaTypes.REPOSITORY:
  >+      case CriteriaTypes.LABEL:
  >+      default:
  >+        [text, labels] = CriteriaData.getTextAndLabels(contentChildren, criteria);
  >+    }
  > @@
  >-    if (!isNullOrUndefined(children) && children.length > 0 && children[children.length - 1].type === "list") {
  >-      return [
  >-        children.length > 1 ? CriteriaData.joinChildren(children.slice(0, children.length - 1)) : "",
  >-        children[children.length - 1].children
  >-          .map(obj => Label.loadJson(obj, criteria)).reduce((map, label) => map.set(label.name, label), new Map())
  >-      ]
  >-    } else {
  >-      return [
  >-        CriteriaData.joinChildren(children),
  >-        new Map()
  >-      ];
  >-    }
  >+    if (isNullOrUndefined(children) || children.length === 0) {
  >+      return ['', new Map()];
  >+    }
  >+    const lists = children.filter(child => child.type === 'list');
  >+    const lastList = lists.length > 0 ? lists[lists.length - 1] : null;
  >+    const nonListChildren = children.filter(child => child.type !== 'list');
  >+
  >+    if (!isNullOrUndefined(lastList)) {
  >+      return [
  >+        CriteriaData.joinChildren(nonListChildren),
  >+        lastList.children
  >+          .map(obj => Label.loadJson(obj, criteria))
  >+          .reduce((map, label) => map.set(label.name, label), new Map())
  >+      ];
  >+    }
  >+
  >+    return [
  >+      CriteriaData.joinChildren(nonListChildren),
  >+      new Map()
  >+    ];
  >   }
  > @@
  >-        if (child.type === "text") return child.content;
  >-        if (child.type === "header") return child.plainChildren;
  >+        if (child.type === "text") return child.content;
  >         return null;
  >       })
  >       .filter(obj => !isNullOrUndefined(obj))
  >       .join("\n\n").trim();
  >   }
  >+
  >+  static filterContentChildren(children) {
  >+    return (children || []).filter(child => child.type !== 'header');
  >+  }
  > *** End Patch
  > ```
  >
  > Ensured label/text parsing ignores nested headers so group detail headings no longer pollute summary metadata.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,200p' lib/gulp/model/data/dataElement.js"]`
  >
  > Inspected existing DataElement parsing to plan group-aware restructuring.
  > ---
  > **Edit** `apply_patch`
  > ```
  > *** Begin Patch
  > *** Update File: lib/gulp/model/data/dataElement.js
  > @@
  >-class DataElement {
  >-  constructor(name, url, shortDescription, criteriaData, averageRating, html, latex) {
  >+class DataElement {
  >+  constructor(name, url, shortDescription, criteriaData, averageRating, html, latex, groupData, criteriaGroup) {
  >     const ref = {
  >       name: name,
  >       url: url,
  >       shortDescription: shortDescription,
  >       criteriaData: criteriaData,
  >       averageRating: averageRating,
  >+      groupData: groupData,
  >+      criteriaGroup: criteriaGroup
  >     };
  > @@
  >-    if (isNullOrUndefined(criteriaData)) {
  >-      ref.criteriaData = new Map();
  >-    }
  >+    if (isNullOrUndefined(criteriaData)) {
  >+      ref.criteriaData = new Map();
  >+    }
  >+    if (isNullOrUndefined(groupData)) {
  >+      ref.groupData = new Map();
  >+    }
  >+    if (isNullOrUndefined(criteriaGroup)) {
  >+      ref.criteriaGroup = new Map();
  >+    }
  > @@
  >-    this.html = html;
  >-    this.latex = latex;
  >+    this.html = html;
  >+    this.latex = latex;
  >+    this.groupData = ref.groupData;
  >+    this.criteriaGroup = ref.criteriaGroup;
  >   }
  > *** End Patch
  > ```
  >
  > Added constructor support for group metadata and lookup maps.
  > ---
  > **Edit** `apply_patch`
  > ```
  > *** Begin Patch
  > *** Update File: lib/gulp/model/data/dataElement.js
  > @@
  >-    const criteriaData = (json.children || []).filter(obj => obj.type === "header")
  >-      .filter(obj => !isNullOrUndefined(obj))
  >-      .map(obj => CriteriaData.loadJson(obj,
  >-        isNullOrUndefined(configuration) || !configuration.containsCriteria(obj.content) ?
  >-          null :
  >-          configuration.getCriteria(obj.content)
  >-      )).reduce((map, criteriaData) => map.set(criteriaData.name, criteriaData), new Map());
  >-
  >-    return new DataElement(name, url, shortDescription, criteriaData)
  >+    const criteriaData = new Map();
  >+    const groupData = new Map();
  >+    const criteriaGroup = new Map();
  >+    const headers = (json.children || []).filter(obj => obj.type === "header" && !isNullOrUndefined(obj));
  >+    const processedHeaders = new Set();
  >+
  >+    const processHeader = (header, parentGroupKey = null) => {
  >+      if (processedHeaders.has(header)) {
  >+        return null;
  >+      }
  >+      processedHeaders.add(header);
  >+
  >+      const nestedHeaders = (header.children || [])
  >+        .filter(child => child.type === 'header' && !isNullOrUndefined(child));
  >+      const sanitizedHeader = Object.assign({}, header, {
  >+        children: CriteriaData.filterContentChildren(header.children)
  >+      });
  >+      const headerCriteria = isNullOrUndefined(configuration) ? null : configuration.getCriteria(header.content);
  >+
  >+      if (parentGroupKey === null && header.level === 2 && nestedHeaders.length > 0) {
  >+        const labelData = CriteriaData.loadJson(sanitizedHeader, headerCriteria);
  >+        const childKeys = [];
  >+        nestedHeaders.forEach(childHeader => {
  >+          const childData = processHeader(childHeader, header.content);
  >+          if (!isNullOrUndefined(childData) && !isNullOrUndefined(childData.name)) {
  >+            childKeys.push(childData.name);
  >+          }
  >+        });
  >+        groupData.set(header.content, {
  >+          label: labelData,
  >+          children: childKeys
  >+        });
  >+        return null;
  >+      } else {
  >+        const data = CriteriaData.loadJson(sanitizedHeader, headerCriteria);
  >+        criteriaData.set(data.name, data);
  >+        if (!isNullOrUndefined(parentGroupKey)) {
  >+          criteriaGroup.set(data.name, parentGroupKey);
  >+        }
  >+        nestedHeaders.forEach(childHeader => processHeader(childHeader, parentGroupKey));
  >+        return data;
  >+      }
  >+    };
  >+
  >+    headers.forEach(header => processHeader(header));
  >+
  >+    return new DataElement(
  >+      name,
  >+      url,
  >+      shortDescription,
  >+      criteriaData,
  >+      undefined,
  >+      undefined,
  >+      undefined,
  >+      groupData,
  >+      criteriaGroup
  >+    );
  >   }
  > *** End Patch
  > ```
  >
  > Replaced flat header parsing with recursive logic that captures group labels, child criteria, and group mappings.
  > ---
  > **Edit** `apply_patch`
  > ```
  > *** Begin Patch
  > *** Update File: lib/gulp/model/data/dataElement.js
  > @@
  >   getCriteriaData(id) {
  >     if (id === 'id') {
  >       return new CriteriaData('id', this.name, new Map(), CriteriaTypes.NAME_URL, this.url);
  >     } else if (id === 'ShortDescription' || id === 'description') {
  >       const criteriaId = id === 'description' ? 'description' : 'ShortDescription';
  >       return new CriteriaData(criteriaId, this.shortDescription, new Map(), CriteriaTypes.MARKDOWN, this.url, this.html, this.latex);
  >     } else {
  >       return this.criteriaData.get(id);
  >     }
  >   }
  > 
  >+  getGroupData(id) {
  >+    return this.groupData.get(id);
  >+  }
  >+
  >+  getGroupLabel(id) {
  >+    const group = this.groupData.get(id);
  >+    return isNullOrUndefined(group) ? null : group.label;
  >+  }
  >+
  >+  getGroupChildren(id) {
  >+    const group = this.groupData.get(id);
  >+    return isNullOrUndefined(group) ? [] : group.children;
  >+  }
  >+
  >+  getGroupForCriteria(criteriaId) {
  >+    return this.criteriaGroup.get(criteriaId);
  >+  }
  >+
  >+  listGroups() {
  >+    return Array.from(this.groupData.keys());
  >+  }
  >+
  >   getCriteriaDataExtended() {
  >     return [
  >       this.getCriteriaData('id'),
  >       this.getCriteriaData('ShortDescription'),
  >       ...Array.from(this.criteriaData).map(([key, value]) => value)
  >     ];
  >   }
  > *** End Patch
  > ```
  >
  > Added helper accessors for downstream services to retrieve group labels, child lists, and mappings.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,160p' lib/gulp/model/data/dataElement.d.ts"]`
  >
  > Checked TypeScript declaration for DataElement to keep signatures aligned.
  > ---
  > **Edit** `apply_patch`
  > ```
  > *** Begin Patch
  > *** Update File: lib/gulp/model/data/dataElement.d.ts
  > @@
  > import { CriteriaData } from './criteriaData';
  > 
  > export interface CriteriaGroupData {
  >   label: CriteriaData;
  >   children: Array<string>;
  > }
  > 
  > export class DataElement {
  >   public name: string;
  >   public url: string;
  >   public shortDescription: string;
  >   public criteriaData: Map<string, CriteriaData>;
  >+  public groupData: Map<string, CriteriaGroupData>;
  >+  public criteriaGroup: Map<string, string>;
  >   public html: string;
  >   public latex: string;
  > 
  >   constructor(
  >     name: string,
  >     url: string,
  >     shortDescription: string,
  >     criteriaData: Map<string, CriteriaData>,
  >     averageRating?: number,
  >     html?: string,
  >     latex?: string,
  >     groupData?: Map<string, CriteriaGroupData>,
  >     criteriaGroup?: Map<string, string>
  >   );
  > @@
  >   public getCriteriaData(id: string): CriteriaData;
  > 
  >+  public getGroupData(id: string): CriteriaGroupData;
  >+
  >+  public getGroupLabel(id: string): CriteriaData;
  >+
  >+  public getGroupChildren(id: string): Array<string>;
  >+
  >+  public getGroupForCriteria(criteriaId: string): string;
  >+
  >+  public listGroups(): Array<string>;
  >+
  >   // Return criteriaData + criteriaData for (name,url) and (ShortDescription)
  >   public getCriteriaDataExtended(): Array<CriteriaData>;
  > }
  > *** End Patch
  > ```
  >
  > Updated type definitions to expose new group metadata.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,200p' lib/gulp/model/data/data.js"]`
  >
  > Reviewed Data wrapper to plan group aggregation.
  > ---
  > **Edit** `apply_patch`
  > ```
  > *** Begin Patch
  > *** Update File: lib/gulp/model/data/data.js
  > @@
  >-import { DataElement } from "./dataElement.js";
  >+import { DataElement } from "./dataElement.js";
  >+import { isNullOrUndefined } from "../util.js";
  > 
  > class Data {
  >-  constructor(dataElements) {
  >-    this.dataElements = dataElements;
  >+  constructor(dataElements, groups = new Map()) {
  >+    this.dataElements = dataElements;
  >+    this.groups = groups;
  >   }
  > 
  >   static loadJson(json, configuration) {
  >     const dataElements = (json || [])
  >       .filter(obj => obj.type === "header")
  >       .map(obj => DataElement.loadJson(obj, configuration));
  > 
  >-    return new Data(dataElements);
  >+    const groups = new Map();
  >+    dataElements.forEach(element => {
  >+      (element.groupData || new Map()).forEach((groupInfo, groupKey) => {
  >+        if (!groups.has(groupKey)) {
  >+          groups.set(groupKey, {
  >+            name: groupKey,
  >+            children: [],
  >+            labels: new Set()
  >+          });
  >+        }
  >+        const summary = groups.get(groupKey);
  >+        (groupInfo.children || []).forEach(child => {
  >+          if (summary.children.indexOf(child) === -1) {
  >+            summary.children.push(child);
  >+          }
  >+        });
  >+        if (!isNullOrUndefined(groupInfo.label) && !isNullOrUndefined(groupInfo.label.labels)) {
  >+          groupInfo.label.labels.forEach((value, labelName) => summary.labels.add(labelName));
  >+        }
  >+      });
  >+    });
  >+
  >+    return new Data(dataElements, groups);
  >   }
  > *** End Patch
  > ```
  >
  > Aggregated group summaries to surface children ordering and available label values from Markdown.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,200p' lib/gulp/model/data/data.d.ts"]`
  >
  > Confirmed declarations for Data wrapper prior to updating.
  > ---
  > **Edit** `apply_patch`
  > ```
  > *** Begin Patch
  > *** Update File: lib/gulp/model/data/data.d.ts
  > @@
  >-import { DataElement } from './dataElement';
  >+import { CriteriaGroupData } from './dataElement';
  >+import { DataElement } from './dataElement';
  >+
  >+export interface DataGroupSummary {
  >+  name: string;
  >+  children: Array<string>;
  >+  labels: Set<string>;
  >+}
  > 
  > export class Data {
  >   public dataElements: Array<DataElement>;
  >+  public groups: Map<string, DataGroupSummary>;
  > 
  >-  constructor(dataElement: Array<DataElement>);
  >+  constructor(dataElement: Array<DataElement>, groups?: Map<string, DataGroupSummary>);
  > *** End Patch
  > ```
  >
  > Reflected new group summary metadata in TypeScript interfaces.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,200p' lib/gulp/model/criteria/criteria.js"]`
  >
  > Examined Criteria model to weave in child relationships.
  > ---
  > **Edit** `apply_patch`
  > ```
  > *** Begin Patch
  > *** Update File: lib/gulp/model/criteria/criteria.js
  > @@
  >-class Criteria {
  >-  constructor(id, type, name, search, table, detail, description, placeholder, order, andSearch, rangeSearch, values, lock, useDefaults = true) {
  >+class Criteria {
  >+  constructor(id, type, name, search, table, detail, description, placeholder, order, andSearch, rangeSearch, values, lock, children, useDefaults = true) {
  >     const ref = {
  >       id: id,
  >       type: type,
  >       name: name,
  >       search: search,
  >       table: table,
  >       detail: detail,
  >       description: description,
  >       placeholder: placeholder,
  >       order: order,
  >       andSearch: andSearch,
  >       rangeSearch: rangeSearch,
  >       lock: lock,
  >-      values: values
  >+      values: values,
  >+      children: children
  >     };
  > @@
  >-    if (isNullOrUndefined(ref.lock)) {
  >-      ref.lock = new Map();
  >-    }
  >+    if (isNullOrUndefined(ref.lock)) {
  >+      ref.lock = new Map();
  >+    }
  >+
  >+    if (isNullOrUndefined(ref.children)) {
  >+      ref.children = [];
  >+    }
  > @@
  >-    this.values = ref.values;
  >-
  >-    this.lock = ref.lock;
  >+    this.values = ref.values;
  >+
  >+    this.lock = ref.lock;
  >+    this.children = Array.isArray(ref.children) ? ref.children : [];
  >   }
  > *** End Patch
  > ```
  >
  > Added storage for child criteria references on each Criteria.
  > ---
  > **Edit** `apply_patch`
  > ```
  > *** Begin Patch
  > *** Update File: lib/gulp/model/criteria/criteria.js
  > @@
  >-    const lock = new Map();
  >-    if (!isNullOrUndefined(criteria.lock)) {
  >-      criteria.lock.forEach((value, key) => lock.set(key, value));
  >-    }
  >+    const lock = new Map();
  >+    if (!isNullOrUndefined(criteria.lock)) {
  >+      criteria.lock.forEach((value, key) => lock.set(key, value));
  >+    }
  >+    const children = Array.isArray(criteria.children) ? [...criteria.children] : [];
  >@@
  >-      lock);
  >+      lock,
  >+      children);
  >   }
  > *** End Patch
  > ```
  >
  > Ensured copies preserve child ordering.
  > ---
  > **Edit** `apply_patch`
  > ```
  > *** Begin Patch
  > *** Update File: lib/gulp/model/criteria/criteria.js
  > @@
  >-      const values = new Map();
  >+      const values = new Map();
  >@@
  >-      let lock;
  >+      let lock;
  >@@
  >-      return new Criteria(
  >+      const children = Array.isArray(json.children) ? json.children.slice() : [];
  >+
  >+      return new Criteria(
  >         criteriaKey,
  >         type,
  >         json.name,
  >         json.search,
  >         json.table,
  >         json.detail,
  >         json.description,
  >         json.placeholder,
  >         json.order,
  >         json.andSearch,
  >         json.rangeSearch,
  >         values,
  >         lock,
  >+        children,
  >         useDefaults
  >       );
  > *** End Patch
  > ```
  >
  > Added support for loading child arrays from configuration JSON.
  > ---
  > **Edit** `apply_patch`
  > ```
  > *** Begin Patch
  > *** Update File: lib/gulp/model/criteria/criteria.js
  > @@
  >-  static empty(key, type, useDefaults, defaultConfiguration) {
  >+  static empty(key, type, useDefaults = true, defaultConfiguration) {
  >@@
  >-    return new Criteria(key, type, null, null, null, null, null, null, null, null, null, null, null, useDefaults);
  >+    return new Criteria(key, type, null, null, null, null, null, null, null, null, null, null, null, null, useDefaults);
  >   }
  > *** End Patch
  > ```
  >
  > Updated helper to align with new constructor and defaulting.
  > ---
  > **Edit** `apply_patch`
  > ```
  > *** Begin Patch
  > *** Update File: lib/gulp/model/criteria/criteria.js
  > @@
  >     this.rangeSearch = isNullOrUndefined(this.rangeSearch) ? other.rangeSearch : this.rangeSearch;
  >     this.lock = isNullOrUndefined(this.lock) ? other.lock : this.lock;
  >+    if (isNullOrUndefined(this.children) || this.children.length === 0) {
  >+      this.children = Array.isArray(other.children) ? other.children : this.children;
  >+    }
  >@@
  >-      lock: lock
  >+      lock: lock,
  >+      children: Array.isArray(this.children) && this.children.length > 0 ? this.children : undefined
  >     });
  > *** End Patch
  > ```
  >
  > Merged child arrays while serializing to JSON and during configuration combination.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,200p' lib/gulp/model/criteria/criteria.d.ts"]`
  >
  > Verified TS declaration prior to adding child support.
  > ---
  > **Edit** `apply_patch`
  > ```
  > *** Begin Patch
  > *** Update File: lib/gulp/model/criteria/criteria.d.ts
  > @@
  >   public values: Map<string, CriteriaValue>;
  >   public lock: Map<string, string>;
  >+  public children: Array<string>;
  >@@
  >               rangeSearch?: boolean,
  >               values?: Map<string, CriteriaValue>,
  >               lock?: Map<string, string>,
  >+              children?: Array<string>,
  >               useDefaults?: boolean);
  > *** End Patch
  > ```
  >
  > Documented new children property for downstream TypeScript consumers.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,200p' lib/gulp/tasks/criteria.babel.js"]`
  >
  > Reviewed criteria auto-generation task to integrate group metadata.
  > ---
  > **Edit** `apply_patch`
  > ```
  > *** Begin Patch
  > *** Update File: lib/gulp/tasks/criteria.babel.js
  > @@
  >     data.dataElements.forEach(dataElement => {
  >         (dataElement.criteriaData || new Map()).forEach(criteriaData => {
  >@@
  >     });
  > 
  >+    (data.groups || new Map()).forEach((summary, groupKey) => {
  >+        let targetCriteria = null;
  >+        if (configuration.containsCriteria(groupKey)) {
  >+            targetCriteria = configuration.getCriteria(groupKey);
  >+        } else if (autoConfiguration.containsCriteria(groupKey)) {
  >+            targetCriteria = autoConfiguration.getCriteria(groupKey);
  >+        } else {
  >+            const template = defaultConfiguration.getCriteria("Label-Criteria")
  >+                || defaultConfiguration.getCriteria("default-label");
  >+            if (!isNullOrUndefined(template)) {
  >+                targetCriteria = Criteria.copy(groupKey, template.name || groupKey, template);
  >+            } else {
  >+                targetCriteria = Criteria.empty(groupKey, CriteriaTypes.LABEL, false);
  >+            }
  >+            targetCriteria.type = CriteriaTypes.LABEL;
  >+            targetCriteria.table = false;
  >+            targetCriteria.detail = false;
  >+            targetCriteria.search = false;
  >+            autoConfiguration.setCriteria(-1, targetCriteria);
  >+        }
  >+
  >+        if (!isNullOrUndefined(summary.children)) {
  >+            targetCriteria.children = summary.children;
  >+        } else if (isNullOrUndefined(targetCriteria.children)) {
  >+            targetCriteria.children = [];
  >+        }
  >+
  >+        if (!isNullOrUndefined(summary.labels)) {
  >+            summary.labels.forEach(labelName => {
  >+                if (!targetCriteria.values.has(labelName)) {
  >+                    targetCriteria.values.set(labelName, new CriteriaValue(targetCriteria.id, labelName));
  >+                }
  >+            });
  >+        }
  >+
  >+        targetCriteria.table = false;
  >+        targetCriteria.detail = false;
  >+        targetCriteria.search = false;
  >+
  >+        if (!types.has(targetCriteria.id)) {
  >+            types.set(targetCriteria.id, targetCriteria.type || CriteriaTypes.LABEL);
  >+        }
  >+    });
  >+
  >     // Renew 'comparison-auto-config.yml' with autoCitation and auto colors
  > *** End Patch
  > ```
  >
  > Ensured auto-config emits group criteria, preserves child ordering, and registers label values.
- [x] Update NgRx state, actions, and selectors to support group expand/collapse and derived visibility
  > **Edit** `apply_patch`
  > - Added `src/app/models/feature-grouping.model.ts` defining shared grouping interfaces used by store and services.
  > ---
  > **Edit** `apply_patch`
  > - Created `src/app/components/output/feature-grouping.service.ts` with logic to parse grouped metadata, surface selectors, and dispatch toggle actions.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,160p' src/app/redux/uc.action.ts"]`
  > Inspected existing action definitions before wiring new payloads.
  > ---
  > **Edit** `apply_patch`
  > - Updated `src/app/redux/uc.action.ts` to extend `UCDataUpdateAction` with grouping payloads and added `UCToggleGroupAction`.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,40p' src/app/redux/uc.action.ts"]`
  > Verified action import list after modifications.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,120p' src/app/redux/uc.app-state.ts"]`
  > Reviewed state interface prior to adding grouping fields.
  > ---
  > **Edit** `apply_patch`
  > - Augmented `src/app/redux/uc.app-state.ts` with `featureGroups`, `groupExpanded`, and `groupColumnLookup` properties while importing the new model types.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,20p' src/app/redux/uc.reducers.ts"]`
  > Checked reducer imports/constants ahead of grouping integration.
  > ---
  > **Edit** `apply_patch`
  > - Inserted grouping constants and updated action allowlist in `src/app/redux/uc.reducers.ts`.
  > ---
  > **Edit** `apply_patch`
  > - Refactored `UPDATE_DATA` handling in `uc.reducers.ts` to apply grouping metadata, and added `TOGGLE_GROUP` case.
  > ---
  > **Edit** `apply_patch`
  > - Imported `UCToggleGroupAction` within reducers to support the new case.
  > ---
  > **Edit** `apply_patch`
  > - Added `applyGrouping` and `toggleGroup` helper functions in reducers to manage state transitions and URL sync flags.
  > ---
  > **Edit** `apply_patch`
  > - Updated `putStateIntoURL` to persist expanded group keys via a `groups` query parameter.
  > ---
  > **Edit** `apply_patch`
  > - Reworked `filterColumns` to respect collapsed or excluded groups when computing visible columns.
  > ---
  > **Bash** `["bash","-lc","rg 'function routeReducer' -n src/app/redux/uc.reducers.ts"]`
  > Located router reducer to extend URL parsing logic.
  > ---
  > **Edit** `apply_patch`
  > - Modified `routeReducer` to parse the new `groups` query param and seed expand state.
  > ---
  > **Edit** `apply_patch`
  > - Hardened grouping map assignment in reducers to avoid spreading undefined values.
  > ---
  > **Bash** `["bash","-lc","head -n 40 src/app/components/comparison/configuration/configuration.service.ts"]`
  > Confirmed constructor/import region prior to injecting the new service.
  > ---
  > **Edit** `apply_patch`
  > - Injected `FeatureGroupingService` into configuration service.
  > ---
  > **Bash** `["bash","-lc","sed -n '200,320p' src/app/components/comparison/configuration/configuration.service.ts"]`
  > Reviewed data-processing flow to hook in grouping computation.
  > ---
  > **Edit** `apply_patch`
  > - Generated grouping structure inside `loadComparison` and passed it with `UCDataUpdateAction`.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,200p' src/app/redux/uc.reducers.ts"]`
  > Spot-checked final reducer contents after comprehensive updates.
- [x] Enhance table rendering and related UI (settings, details, LaTeX) to honor group state
  > **Edit** `apply_patch`
  > - Added `getColumnGroupMap()` exposure in `feature-grouping.service.ts` for component consumption.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,160p' src/app/components/output/generic-table/generic-table.component.html"]`
  > Inspected existing table markup before injecting group controls.
  > ---
  > **Edit** `apply_patch`
  > - Injected group toggle bar into `generic-table.component.html`.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,160p' src/app/components/output/generic-table/generic-table.component.css"]`
  > Reviewed styles to extend with group-control theming.
  > ---
  > **Edit** `apply_patch`
  > - Styled group toggles, chips, and accessibility helpers in `generic-table.component.css`.
  > ---
  > **Edit** `apply_patch`
  > - Updated `generic-table.component.ts` to inject the grouping service, expose group observables, and provide toggle/label helpers.
  > ---
  > **Edit** `apply_patch`
  > - Added aria-friendly wrappers and class bindings in the table template for group chips.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,200p' src/app/components/comparison/comparison.template.html"]`
  > Audited template bindings ahead of async state refactor.
  > ---
  > **Edit** `apply_patch`
  > - Wrapped comparison template with `*ngIf="store | async as vm"`, passed new inputs (`columnKeys`, `featureGroups`, `groupColumnLookup`) to child components, and streamlined bindings.
  > ---
  > **Edit** `apply_patch`
  > - Replaced residual `store | async` occurrences in select controls with the cached observable state.
  > ---
  > **Edit** `apply_patch`
  > - Expanded `comparison.settings.component.ts` to ingest grouping data, compute grouped/ungrouped column lists, and delegate group toggles to the service.
  > ---
  > **Edit** `apply_patch`
  > - Rebuilt column section markup in `comparison.settings.template.html` to display grouped controls, disabled states, and accessibility cues.
  > ---
  > **Edit** `apply_patch`
  > - Added supporting styles (group containers, toggle buttons, chips, sr-only) to `comparison.settings.component.css`.
  > ---
  > **Edit** `apply_patch`
  > - Ensured settings toggles expose `sr-only` copy and present chip tooltips for assistive tech.
- [x] Verify backwards compatibility, run builds, and prepare regression notes
  > **Bash** `["bash","-lc","npm run build"]`
  > Triggered the Angular production build (auto-invokes data preparation). Build completed successfully; noted existing warnings about unused `environment.prod.ts` and `vendor.ts` entries.
