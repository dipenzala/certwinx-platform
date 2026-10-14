import sharp from 'sharp';
import { readdirSync, statSync, mkdirSync, existsSync } from 'fs';
import { join, extname, basename } from 'path';

const folders = ['public', 'src/assets', 'src/images'];
const TARGET_SIZE = 300 * 1024; // 300KB max
const EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp'];

function findLargeImages(dir) {
  const results = [];
  if (!existsSync(dir)) return results;
  
  try {
    const files = readdirSync(dir);
    for (const file of files) {
      const fullPath = join(dir, file);
      const stat = statSync(fullPath);
      
      if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
        results.push(...findLargeImages(fullPath));
      } else if (stat.isFile()) {
        const ext = extname(file).toLowerCase();
        if (EXTENSIONS.includes(ext) && stat.size > TARGET_SIZE) {
          results.push({ path: fullPath, size: stat.size });
        }
      }
    }
  } catch (e) {}
  
  return results;
}

async function optimize() {
  console.log('🔍 Finding large images...\n');
  
  let allImages = [];
  for (const folder of folders) {
    allImages = allImages.concat(findLargeImages(folder));
  }
  
  if (allImages.length === 0) {
    console.log('✅ No large images found');
    return;
  }
  
  console.log(`Found ${allImages.length} large images:\n`);
  
  for (const img of allImages) {
    const sizeMB = (img.size / 1024 / 1024).toFixed(2);
    console.log(`📸 ${img.path} (${sizeMB} MB)`);
    
    const outputPath = img.path.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    
    try {
      await sharp(img.path)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(outputPath);
      
      const newSize = statSync(outputPath).size;
      const newSizeMB = (newSize / 1024 / 1024).toFixed(2);
      const reduction = ((1 - newSize / img.size) * 100).toFixed(0);
      
      console.log(`   ✓ Created: ${basename(outputPath)} (${newSizeMB} MB) - ${reduction}% smaller\n`);
    } catch (e) {
      console.log(`   ❌ Failed: ${e.message}\n`);
    }
  }
  
  console.log('✅ Optimization complete!\n');
  console.log('⚠️  Update code to use .webp versions for best results\n');
}

optimize();
