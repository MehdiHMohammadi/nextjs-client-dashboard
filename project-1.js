// generate-structure.js
const fs = require("fs");
const path = require("path");

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

    structure += prefix + pointer + item + "\n";

    if (stats.isDirectory()) {
      const newPrefix = prefix + (isLast ? "    " : "│   ");
      structure += getFolderStructure(filePath, newPrefix);
    }
  });

  return structure;
}

const rootDir = process.cwd(); // مسیر فعلی پروژه
const output = getFolderStructure(rootDir);

// ذخیره در فایل
fs.writeFileSync("project-structure.txt", output);

console.log("✅ ساختار پروژه در فایل project-structure.txt ذخیره شد!");
