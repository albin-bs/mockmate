const fs = require('fs');
const path = require('path');

function replaceMotionInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Replace import
  if (content.includes('from "framer-motion"')) {
    // Replace motion with m in imports
    const importRegex = /import\s*\{([^}]*)\}\s*from\s*["']framer-motion["']/g;
    content = content.replace(importRegex, (match, imports) => {
      if (imports.includes('motion') && !imports.includes(' m,') && !imports.includes(', m')) {
        changed = true;
        // Add m to imports and keep motion for now
        const newImports = imports.trim() + ', m';
        return `import { ${newImports} } from "framer-motion"`;
      }
      return match;
    });

    // Replace JSX tags
    if (content.includes('<motion.') || content.includes('</motion.')) {
      content = content.replace(/<motion\./g, '<m.');
      content = content.replace(/<\/motion\./g, '</m.');
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, 'utf8');
    console.log(`✅ Updated: ${path.relative(process.cwd(), filePath)}`);
    return true;
  }
  return false;
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  let totalUpdated = 0;
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && file !== 'node_modules' && file !== '.git') {
      totalUpdated += walkDir(filePath);
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      if (replaceMotionInFile(filePath)) {
        totalUpdated++;
      }
    }
  });
  
  return totalUpdated;
}

console.log('🔄 Replacing motion with m in all components...\n');
const updated = walkDir('./src');
console.log(`\n✨ Done! Updated ${updated} files.`);
console.log('\n⚠️  Please review the changes before committing!');
