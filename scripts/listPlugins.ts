import fs from 'fs';
import path from 'path';

function getDirectories(pathToRead: string): string[] {
  const items = fs.readdirSync(pathToRead);
  const directories = items.filter((item) => {
    const itemPath = path.join(pathToRead, item);
    return fs.statSync(itemPath).isDirectory();
  });
  return directories;
}

function writeDirectoriesToFile(pathToRead: string, outputPath: string) {
  const directories = getDirectories(pathToRead);
    console.log(directories);
    
    

//   fs.writeFileSync(outputPath, directories, 'utf-8');
}

// Example usage:
const directoryPath = 'node_modules/tinymce/plugins';
const outputPath = 'directory_names.txt'; // Change to your desired output file

writeDirectoriesToFile(directoryPath, outputPath);
console.log('Directory names have been written to', outputPath);