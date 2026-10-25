import { readdirSync } from "node:fs";

// Tokens can be declared in any module, so every module is a source for
// the undefined-var() check. Reading the directory keeps the list from
// going stale when files are added, renamed, or merged.
const moduleDir = "suede/module";
const modules = readdirSync(moduleDir)
    .filter((file) => file.endsWith(".css"))
    .map((file) => `${moduleDir}/${file}`);

export default {
    extends: ["stylelint-config-standard"],
    plugins: ["stylelint-value-no-unknown-custom-properties"],
    rules: {
        "csstools/value-no-unknown-custom-properties": [
            true,
            { importFrom: modules },
        ],
        "selector-class-pattern": [
            "^(l|u)\\\\?:[a-z0-9-]+$",
            {
                message:
                    "Classes are namespaced with an escaped colon: l\\:name (layout) or u\\:name (utility)",
            },
        ],
        "layer-name-pattern": null,
        "custom-property-empty-line-before": null,
        "declaration-empty-line-before": null,
        "import-notation": "string",
        "hue-degree-notation": "number",
        "value-keyword-case": null,
        "at-rule-empty-line-before": null,
        "comment-empty-line-before": null,
        "property-no-vendor-prefix": [
            true,
            { ignoreProperties: ["/text-size-adjust$/"] },
        ],
        "no-descending-specificity": null,
    },
};
