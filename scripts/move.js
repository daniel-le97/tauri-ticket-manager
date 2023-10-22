import * as fs from 'fs-extra';
/**
 * @param {string} sourceDir 
 * @param {string} destinationDir 
 */
async function copyIfNotExists(
  sourceDir,
  destinationDir
){
  try {
    const sourceExists = await fs.pathExists(sourceDir);
    if (!sourceExists) {
      console.log(`Source directory "${sourceDir}" does not exist.`);
      return;
    }

    const destinationExists = await fs.pathExists(destinationDir);
    if (destinationExists) {
      console.log(`Destination directory "${destinationDir}" already exists. Skipping.`);
      return;
    }

    await fs.copy(sourceDir, destinationDir);
    console.log(`Copied from "${sourceDir}" to "${destinationDir}"`);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Example usage
const sourceDirContent = 'custom/skins/content';
const sourceDirUI = 'custom/skins/ui';
const destinationDirContent = 'node_modules/tinymce/skins/content/CUSTOM';
const destinationDirUI = 'node_modules/tinymce/skins/ui/CUSTOM';

await copyIfNotExists(sourceDirContent, destinationDirContent);
await copyIfNotExists(sourceDirUI, destinationDirUI);
