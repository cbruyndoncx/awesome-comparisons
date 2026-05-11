export function isNullOrUndefined(value) {
  return value === undefined || value === null;
}

export function resolveDefault(def, ref) {
  if (!isNullOrUndefined(def) && def.hasOwnProperty('template')) {
    let i = 0;
    return def.template.replace(/{}/g, (x) => ref[def.variables[i++]])
  } else {
    return def;
  }
}

export function resolveLock(id, ref) {
  if (ref.lock.hasOwnProperty(id)) {
    return ref.lock[id];
  } else {
    return {};
  }
}

export function deleteUndefinedKeys(obj) {
  Object.keys(obj).forEach(key => isNullOrUndefined(obj[key]) && delete obj[key]);
  return obj;
}

export function splitNameUrl(string) {
  if (isNullOrUndefined(string) || typeof string !== 'string') {
    return { name: "", url: "" };
  }

  // Linear-time replacement for an O(2^n) catastrophic-backtracking regex.
  // Find the last URL-like token in the string; everything before it is the name.
  const urlRegex = /(?:(?:https?|ftp):\/\/[\w.-]+(?:\.[\w.-]+)+|www\.[\w.-]+(?:\.[\w.-]+)+)(?:[\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/gi;
  let match;
  let lastMatch = null;
  while ((match = urlRegex.exec(string)) !== null) {
    lastMatch = match;
    if (match.index === urlRegex.lastIndex) urlRegex.lastIndex++;
  }

  if (!lastMatch) {
    return { name: string.trim(), url: "" };
  }

  let name = string.slice(0, lastMatch.index).replace(/\s*-?\s*$/, "").trim();
  let url = lastMatch[0];
  if (/^www/i.test(url)) {
    url = "http://" + url;
  }

  return { name, url };
}

export function getDefaultCriteria(criteria, type) {
  let key = "default-" + (type || "").toString().toLowerCase();

  const result = criteria.filter(value => value.hasOwnProperty(key));
  if (result.length > 0) {
    return result[0][key];
  }
  return {};
}
