// project-info.js
import fs from "fs";
import path from "path";

const ignoreList = ["node_modules", ".next", ".git", "dist", "build"];
const codeExtensions = [".js", ".jsx", ".ts", ".tsx", ".mjs", ".cjs"];

// گرفتن ساختار فولدر
function getFolderStructure(dir, depth = 0, maxDepth = 3) {
  if (depth > maxDepth) return "";
  let result = "";

  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (ignoreList.includes(item)) continue;

    const fullPath = path.join(dir, item);
    const stats = fs.statSync(fullPath);
    result += "  ".repeat(depth) + "- " + item + "\n";

    if (stats.isDirectory()) {
      result += getFolderStructure(fullPath, depth + 1, maxDepth);
    }
  }
  return result;
}

// خواندن فایل
function readFileIfExists(filePath) {
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, "utf8");
  }
  return "⚠️ فایل یافت نشد.";
}

// جمع‌آوری کد از مسیر مشخص
function collectCodeFromFolder(folderPath) {
  let result = "";
  if (!fs.existsSync(folderPath)) return result;

  const items = fs.readdirSync(folderPath, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(folderPath, item.name);
    if (item.isDirectory()) {
      result += collectCodeFromFolder(fullPath);
    } else if (codeExtensions.includes(path.extname(item.name))) {
      result += `\n\n📄 ${fullPath.replace(process.cwd(), "")}:\n`;
      result += readFileIfExists(fullPath);
    }
  }
  return result;
}

// مسیر پروژه
const projectPath = process.cwd();

// ساخت خروجی
let output = "";
output += "📂 ساختار پروژه:\n";
output += getFolderStructure(projectPath, 0, 3);

output += "\n\n📦 package.json:\n";
output += readFileIfExists(path.join(projectPath, "package.json"));

output += "\n\n⚙️ next.config.js:\n";
output += readFileIfExists(path.join(projectPath, "next.config.js"));

output += "\n\n🎨 tailwind.config.js:\n";
output += readFileIfExists(path.join(projectPath, "tailwind.config.js"));

// اضافه کردن کد app یا pages
output += "\n\n💻 کدهای app:\n";
output += collectCodeFromFolder(path.join(projectPath, "app"));

output += "\n\n💻 کدهای pages:\n";
output += collectCodeFromFolder(path.join(projectPath, "pages"));

// اضافه کردن API Routes
output += "\n\n🔌 API Routes:\n";
output += collectCodeFromFolder(path.join(projectPath, "app", "api"));
output += collectCodeFromFolder(path.join(projectPath, "pages", "api"));

// ذخیره در فایل
fs.writeFileSync("project-info.txt", output, "utf8");

console.log("✅ اطلاعات کامل پروژه در فایل project-info.txt ذخیره شد.");
