import '@citation-js/plugin-bibtex';
import { readFile, readFileSync } from "fs";
import * as path from "path";

export function citation(paths, files, configuration, autoConfiguration, defaultConfiguration, done) {
    const citationFiles = configuration.citationFiles || {};
    const citationDefaultFiles = defaultConfiguration.citationFiles;
    const csl = path.join(paths.data, (citationFiles.csl || citationDefaultFiles.csl));
    const bib = path.join(paths.data, (citationFiles.bib || citationDefaultFiles.bib));

    if (csl) {
        readFile(csl, "utf8", function (err, cslString) {
            if (err) {
                return console.error("Could not read File: ".concat(err.toString()));
            }
            readBib(cslString, done)
        });
    } else {
        console.info("Undefined 'csl' file – proceeding without citation styling.");
        readBib(null, done);
    }

    function readBib(cslString, done) {
        if (bib) {
            readFile(bib, "utf8", function (err, bibString) {
                if (err) {
                    return console.error("Could not read File: ".concat(err.toString()));
                }
                if (cslString) {
                    let citationsLoaded = true;
                    try {
                        autoConfiguration.setCitation(cslString, bibString);
                    } catch (error) {
                        console.warn("Skipping citation generation:", error.message);
                        autoConfiguration.citation = [];
                        citationsLoaded = false;
                    }

                    if (!citationsLoaded) {
                        console.warn("Skipping citation validation because citations were not parsed.");
                        return done();
                    }
                } else {
                    console.warn("No CSL file provided; citations will use raw BibTeX data without formatting.");
                    autoConfiguration.citation = [];
                }

                // Filter unused keys
                let data = readFileSync(files.dataJson, "utf8");
                data = data.concat(readFileSync(files.description, "utf8"));
                let keys = new Set();
                let keyReg = /\[@(.*?)]/g;
                let match;
                do {
                    match = keyReg.exec(data);
                    if (match) keys.add(match[1]);
                } while (match);

                const missingKeys = [];
                keys.forEach(key => {
                    if (!autoConfiguration.hasCitation(key)) {
                        missingKeys.push(key);
                    }
                });

                if (missingKeys.length > 0) {
                    console.warn("Missing BibTeX entries for keys:", missingKeys.join(", "), "- continuing without aborting build.");
                }

                autoConfiguration.citation = autoConfiguration.citation.filter((citation) =>
                    keys.has(citation.key));
                done();
            });
        } else {
            console.warn("No BibTeX file configured; skipping citation generation.");
            autoConfiguration.citation = [];
            done();
        }
    }
}
