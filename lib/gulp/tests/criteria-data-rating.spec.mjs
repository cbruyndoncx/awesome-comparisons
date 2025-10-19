import assert from "node:assert";
import { createRequire } from "node:module";

globalThis.require = createRequire(new URL("../model/criteria/criteria.js", import.meta.url));

const { CriteriaData } = await import("../model/data/criteriaData.js");
const RATING_TYPE = "RATING";

const buildRatingCriteria = (starsArray) => {
    const labels = new Map(
        starsArray.map((value, index) => [`label-${index}`, { stars: value }])
    );
    return new CriteriaData("Rating", "", labels, RATING_TYPE);
};

const roundedCriteria = buildRatingCriteria([4, 3]);
assert.strictEqual(
    roundedCriteria.rating,
    3.5,
    "Average rating should round to one decimal place"
);

const roundedUpCriteria = buildRatingCriteria([4, 3, 2, 2]);
assert.strictEqual(
    roundedUpCriteria.rating,
    2.8,
    "Average rating should round up at the second decimal place"
);

const zeroLabelsCriteria = buildRatingCriteria([]);
assert.strictEqual(
    zeroLabelsCriteria.rating,
    undefined,
    "Criteria with no ratings should not set a rating value"
);

const invalidStarsCriteria = buildRatingCriteria([Number.NaN]);
assert.strictEqual(
    invalidStarsCriteria.rating,
    undefined,
    "Invalid star values should be ignored, resulting in no rating"
);

console.log("criteriaData rating tests passed.");
