const fs = require("fs");
const path = require("path");

function readFileInfo(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const imports = [];
  const exports = [];
  const components = [];

  // پیدا کردن import ها
  const importRegex = /import\s+(?:[\s\S]+?)\s+from\s+['"](.+?)['"]/g;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    imports.push(match[1]);
  }

  // پیدا کردن export ها
  const exportRegex = /export\s+(?:const|function|class|default)?\s*([A-Za-z0-9_]*)/g;
  while ((match = exportRegex.exec(content)) !== null) {
    if (match[1]) exports.push(match[1]);
  }

  // پیدا کردن نام کامپوننت‌ها یا فانکشن‌ها
  const componentRegex = /(?:function|const|class)\s+([A-Z][A-Za-z0-9_]*)/g;
  while ((match = componentRegex.exec(content)) !== null) {
    components.push(match[1]);
  }

  return { imports, exports, components };
}

function getFolderStructure(dir, prefix = "") {
  let structure = "";
  const items = fs.readdirSync(dir).filter(
    (item) => !["node_modules", ".next", "out", ".git"].includes(item) // فیلتر پوشه‌ها
  );
  items.forEach((item, index) => {
    const filePath = path.join(dir, item);
    const isLast = index === items.length - 1;
    const stats = fs.statSync(filePath);
    const pointer = isLast ? "└── " : "├── ";

    structure += prefix + pointer + item;

    if (stats.isFile() && /\.(js|jsx|ts|tsx)$/.test(item)) {
      const { imports, exports, components } = readFileInfo(filePath);
      if (imports.length || exports.length || components.length) {
        structure += "\n" + prefix + (isLast ? "    " : "│   ") +
          `📦 imports: ${imports.join(", ") || "—"}\n` +
          prefix + (isLast ? "    " : "│   ") +
          `📤 exports: ${exports.join(", ") || "—"}\n` +
          prefix + (isLast ? "    " : "│   ") +
          `🧩 components: ${components.join(", ") || "—"}`;
      }
    }

    structure += "\n";

    if (stats.isDirectory()) {
      const newPrefix = prefix + (isLast ? "    " : "│   ");
      structure += getFolderStructure(filePath, newPrefix);
    }
  });

  return structure;
}

const rootDir = process.cwd();
const output = getFolderStructure(rootDir);

fs.writeFileSync("project-structure-with-deps.txt", output, "utf-8");

console.log("✅ ساختار پروژه به همراه import/export و کامپوننت‌ها ذخیره شد!");
