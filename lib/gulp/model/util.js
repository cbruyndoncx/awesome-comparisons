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
  if (!string) return { name: "", url: "" };

  // Extract URL from end of string (safe, no backtracking)
  const urlMatch = /((?:https?|ftp):\/\/\S+|www\.\S+)$/.exec(string);
  const url = urlMatch ? urlMatch[1] : "";

  // Candidate name: everything before the URL, stripped of trailing separator
  let nameStr = (urlMatch ? string.substring(0, urlMatch.index) : string)
    .replace(/\s*-\s*$/, '')
    .trim();

  // Take only the part before the first " - " (version/description follows the name)
  const dashIdx = nameStr.indexOf(' - ');
  if (dashIdx !== -1) {
    nameStr = nameStr.substring(0, dashIdx).trim();
  }

  const result = {
    name: nameStr || string,
    url
  };

  if (/^www/.test(result.url)) {
    result.url = 'http://'.concat(result.url);
  }

  return result;
}

export function getDefaultCriteria(criteria, type) {
  let key = "default-" + (type || "").toString().toLowerCase();

  const result = criteria.filter(value => value.hasOwnProperty(key));
  if (result.length > 0) {
    return result[0][key];
  }
  return {};
}
