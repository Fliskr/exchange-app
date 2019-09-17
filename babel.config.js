module.exports = function(api) {
    api.cache(true);
    const presets = [
        "@babel/react",
        [
            "@babel/preset-env",
            {
                "targets": {
                    "browsers": [
                        "last 4 Chrome versions",
                        "last 4 Firefox versions",
                        "last 4 Edge versions",
                        "safari >= 7",
                        "ie >= 11",
                    ]
                }
            }
        ],
        "@babel/preset-typescript",
    ];
    const plugins = [
        "emotion",
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-syntax-import-meta",
        "@babel/plugin-proposal-json-strings",
        [
            "@babel/plugin-proposal-decorators",
            {
                "legacy": true
            }
        ],
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-function-sent",
        "@babel/plugin-proposal-export-namespace-from",
        "@babel/plugin-proposal-numeric-separator",
        "@babel/plugin-proposal-throw-expressions",
        "@babel/plugin-proposal-export-default-from",
        "@babel/plugin-proposal-logical-assignment-operators",
        "@babel/plugin-proposal-optional-chaining",
        [
            "@babel/plugin-proposal-pipeline-operator",
            {
                "proposal": "minimal"
            }
        ],
        "@babel/plugin-proposal-nullish-coalescing-operator",
        "@babel/plugin-proposal-do-expressions",
        "@babel/plugin-proposal-function-bind",
        "@babel/plugin-proposal-object-rest-spread",
    ];
    return {
        presets,
        plugins,
    }
};
