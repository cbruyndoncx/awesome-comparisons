import { existsSync, lstatSync, readdirSync, rmdirSync, unlinkSync, readFileSync } from "fs";
import * as path from "path";
import yaml2json from "js-yaml";
import { Configuration } from "../model/model.module.js";

/**
 * Load configuration from YAML file
 * @param {string} filePath - Path to the YAML configuration file
 * @returns {Configuration} Loaded configuration object
 */
export function loadConfigurationFromYaml(filePath) {
    const yamlContent = readFileSync(filePath, "utf8");
    const jsonData = yaml2json.load(yamlContent);
    return Configuration.load(jsonData);
}

export function deleteFolderRecursive(folder) {
    if (existsSync(folder)) {
        readdirSync(folder).forEach(function (file) {
            const curPath = path.join(folder, file);
            if (lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                unlinkSync(curPath);
            }
        });
        rmdirSync(folder);
    }
}
