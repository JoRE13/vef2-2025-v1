import { describe, expect, it } from '@jest/globals';
import { join } from 'path';
import { direxists, readFile, readFilesFromDir } from './file';

/** Directory that contains test data, relative to the project root. */
const testDir = './src/test/data';

describe('file', () => {
    describe('direxists', () => {
        it('returns false if dir does not exist', async () => {
            const result = await direxists("./helloworld");
            expect(result).toBe(false);
        });
        it('returns true if dir does exist', async () => {
            const result = await direxists(testDir);
            expect(result).toBe(true);
        });     
        it('returns false if no input', async () => {
            const result = await direxists('');
            expect(result).toBe(false);
        });
    });

    describe('readFilesFromDir', () => {
        it('returns empty array for dir that doesn´t exist', async () => {
            const result = await readFilesFromDir("./helloworld");
            expect(result).toEqual([]);
        })
        it('should return the files from an array that does exist', async () => {
            const result = await readFilesFromDir(testDir);
            expect(result).toEqual([join(testDir, "test1"), join(testDir,"test2")]);
        })
    });

    describe('readFile', () => {
        it('returns null for file that doesn´t exist', async () => {
            const result = await readFile("./helloworld");
            expect(result).toEqual(null);
        })
        it('should return the file content as a string for a file that does exist', async () => {
            const result = await readFile(join(testDir,"test1"));
            expect(result).toEqual("Hello");
        })
    });
});