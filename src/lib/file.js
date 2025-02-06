import { readFile as fsReadFile, mkdir, readdir, stat } from "fs/promises";
import { join } from "path";

/**
 * Check if a directory exists.
 * @param {string} dir Directory to check
 * @returns `true` if dir exists, `false` otherwise
 */
export async function direxists(dir) {
  if (!dir) {
    return false;
  }

  try {
    const info = await stat(dir);
    return info.isDirectory();
  } catch (e) {
    console.log(e);
    return false;
  }
}


/**
 * Creates a directory if it doesn't exist
 * @param {string} dir  Directory to create
 */
export async function createDirIfNotExists(dir) {
  if (!(await direxists(dir))) {
    await mkdir(dir);
  }
}

/**
 * Read only files from a directory and returns as an array.
 * @param {string} dir Directory to read files from
 * @returns {Promise<string[]>} Array of files in dir with full path, empty if
 *   error or no files
 */
export async function readFilesFromDir(dir) {
    let files = [];
    try {
      files = await readdir(dir);
    } catch (e) {
      console.log(e);
      return [];
    }
  
    const mapped = files.map(async (file) => {
      const path = join(dir, file);
      const info = await stat(path);
  
      if (info.isDirectory()) {
        return null;
      }
  
      return path;
    });
  
    const resolved = await Promise.all(mapped);
  
    // Remove any directories that will be represented by `null`
    const filtered = [];
    for (const file of resolved) {
      if (file) {
        filtered.push(file);
      }
    }
  
    return filtered;
  }


  /**
   * Reads a file and encodes it contents to a string.
   * @param {string} file the name of the file to be read 
   * @param {*} param1 
   * @returns {Promise<string>} The contents of the file as a string, empty if error.
   */
  export async function readFile(file, { encoding = 'utf8' } = {}) {
    try {
      const content = await fsReadFile(file, { encoding });
  
      return content.toString(encoding);
    } catch (e) {
      console.log(e);
      return null;
    }
  }