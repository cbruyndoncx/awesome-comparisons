import { deleteUndefinedKeys, isNullOrUndefined, resolveDefault } from "../util.js";
import { Details } from "../details/details.js";
import { Criteria } from "../criteria/criteria.js";

const defaultConfiguration = require("../default.js");

class Configuration {
  constructor(title, subtitle, selectTitle, tableTitle, repository, details, criteria, useDefaults = true) {
    const ref = {
      title: title,
      subtitle: subtitle,
      selectTitle: selectTitle,
      tableTitle: tableTitle,
      repository: repository,
      details: details,
      criteria: criteria
    };

    const defaultConfig = this.constructor.defaultConfig || defaultConfiguration;

    if (useDefaults) {
      if (isNullOrUndefined(title)) {
        ref.title = resolveDefault(defaultConfig.title, ref);
      }

      if (isNullOrUndefined(subtitle)) {
        ref.subtitle = resolveDefault(defaultConfig.subtitle, ref);
      }

      if (isNullOrUndefined(selectTitle)) {
        ref.selectTitle = resolveDefault(defaultConfig.selectTitle, ref);
      }

      if (isNullOrUndefined(tableTitle)) {
        ref.tableTitle = resolveDefault(defaultConfig.tableTitle, ref);
      }

      if (isNullOrUndefined(repository)) {
        ref.repository = resolveDefault(defaultConfig.repository, ref);
      }

      if (isNullOrUndefined(details)) {
        ref.details = new Details();
      }
    }

    if (isNullOrUndefined(criteria)) {
      ref.criteria = Criteria.loadArray([], defaultConfig, useDefaults);
    }

    this.title = ref.title;
    this.subtitle = ref.subtitle;
    this.selectTitle = ref.selectTitle;
    this.tableTitle = ref.tableTitle;
    this.repository = ref.repository;
    this.details = ref.details;
    this.criteria = ref.criteria;
  }

  static load(json, defaultConfig, useDefaults) {
    Configuration.defaultConfig = defaultConfig;
    if (isNullOrUndefined(json)) {
      return Configuration.empty(useDefaults);
    } else {
      return new Configuration(
        json.title,
        json.subtitle,
        json.selectTitle,
        json.tableTitle,
        json.repository,
        Details.load(json.details, defaultConfig, useDefaults),
        Criteria.loadArray(json.criteria, defaultConfig, useDefaults),
        useDefaults
      );
    }
  }

  static empty(useDefaults) {
    return new Configuration(null, null, null, null, null, null, null, useDefaults);
  }

  json() {
    return deleteUndefinedKeys({
      title: this.title,
      subtitle: this.subtitle,
      selectTitle: this.selectTitle,
      tableTitle: this.tableTitle,
      repository: this.repository,
      details: this.details ? this.details.json() : null,
      criteria: this.criteria ? this.criteria.map((criteria) => criteria.json()) : null
    });
  }

  static normalizeKey(value) {
    return typeof value === 'string' ? value.replace(/[^A-Za-z0-9]+/g, '').toLowerCase() : '';
  }

  containsCriteria(name) {
    const normalized = Configuration.normalizeKey(name);
    return this.criteria.some(c =>
      c.id === name ||
      Configuration.normalizeKey(c.id) === normalized ||
      c.name === name ||
      Configuration.normalizeKey(c.name || '') === normalized
    );
  }

  setCriteria(index, criteria) {
    if (index >= this.criteria.length || index < 0) {
      this.criteria.push(criteria);
    } else {
      this.criteria.splice(index, 0, criteria);
    }
    return this;
  }

  getCriteria(name) {
    const exact = this.criteria.find(c => c.id === name);
    if (exact) return exact;
    const normalized = Configuration.normalizeKey(name);
    const byId = this.criteria.find(c => Configuration.normalizeKey(c.id) === normalized);
    if (byId) return byId;
    // Fallback: match by display name (e.g. "Tools" → MCP-Tools which has name "Tools")
    return this.criteria.find(c => c.name === name || Configuration.normalizeKey(c.name || '') === normalized) || null;
  }

  combine(other) {
    this.title = isNullOrUndefined(this.title) ? other.title : this.title;
    this.subtitle = isNullOrUndefined(this.subtitle) ? other.subtitle : this.subtitle;
    this.selectTitle = isNullOrUndefined(this.selectTitle) ? other.selectTitle : this.selectTitle;
    this.tableTitle = isNullOrUndefined(this.tableTitle) ? other.tableTitle : this.tableTitle;
    this.repository = isNullOrUndefined(this.repository) ? other.repository : this.repository;
    this.details = isNullOrUndefined(this.details) ? other.details : this.details;

    this.criteria.forEach(value => {
      if (other.containsCriteria(value.id)) {
        value.combine(other.getCriteria(value.id));
      }
    });

    other.criteria.forEach(value => {
      if (!this.containsCriteria(value.id)) {
        this.setCriteria(-1, value);
      }
    });

    return this;
  }
}

export { Configuration };
