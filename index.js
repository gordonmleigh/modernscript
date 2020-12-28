const fs = require("fs");
const mod = require("module");
const pirates = require("pirates");
const sucrase = require("sucrase");

function addHook(extension, options, regops) {
  pirates.addHook(
    (code, filePath) => {
      const { code: transformedCode, sourceMap } = sucrase.transform(code, {
        ...options,
        sourceMapOptions: { compiledFilename: filePath },
        filePath,
      });
      const mapBase64 = Buffer.from(JSON.stringify(sourceMap)).toString(
        "base64"
      );
      const suffix =
        `//# ` +
        `sourceMappingURL=data:application/json;charset=utf-8;base64,${mapBase64}`;
      return `${transformedCode}\n${suffix}`;
    },
    { ...regops, exts: [extension] }
  );
}

function registerDefaults() {
  replaceBuiltinLoader();
  addHook(".js", { transforms: ["imports"] }, { ignoreNodeModules: false });
  addHook(
    ".ts",
    { transforms: ["imports", "typescript"] },
    { ignoreNodeModules: false }
  );
}

function replaceBuiltinLoader() {
  // replace built-in module loader to prevent it complaining about es modules
  mod.Module._extensions[".js"] = function (module, filename) {
    const contents = fs.readFileSync(filename, "utf8");
    module._compile(contents, filename);
  };
}

exports.addHook = addHook;
exports.registerDefaults = registerDefaults;
exports.replaceBuiltinLoader = replaceBuiltinLoader;
