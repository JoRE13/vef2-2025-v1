import { describe, expect, it } from '@jest/globals';
import { parseIndexJSON, parseFileJSON, validPageFile, validateAnswers } from './parse.js';
import { readFile } from './file.js';

const testIndexJSON = '[{"title": "test", "file": "test.json"}]';
const testIndexInvalid = '[{"foo":"moo"}]';
const testParseFile = '{"title": "Test","questions": []}';



describe('parse', () => {
    describe('parseIndexJSON', () => {
        it('should return empty arrays if json array empty', async () => {
            const result = await parseIndexJSON('[]');
            expect(result).toEqual([[],[]]);
        });
        it('should return empty arrays if no valid pages', async () => {
            const result = await parseIndexJSON(testIndexInvalid);
            expect(result).toEqual([[],[]]);
        });
        it('should return the titles and filenames if they are valid', async () => {
            const result = await parseIndexJSON(testIndexJSON);
            expect(result).toEqual([["test"],["test.json"]]);
        });
    });

    describe('parseFileJSON', () => {
        it('should return empty arrays if questions is empty', async () => {
            const result = await parseFileJSON(testParseFile);
            expect(result).toEqual([[],[]]);
        });
        it('should return arrays of questions and answers if valid', async () => {
            const file = await readFile('./data/test.json');
            const result = await parseFileJSON(file);
            expect(result).toEqual([['q1','q2'],[[['a1',true],['a2',false],['a3',false],['a4',false]],[['a1',true],['a2',false],['a3',false],['a4',false]]]]);
        });
    });

    describe('validPageFile', () => {
        it('should return false if the file not found', async () => {
            const result = await validPageFile('test');
            expect(result).toBe(false);
        });
        it('should return false if the file non json', async () => {
            const result = await validPageFile('./src/test/data/test1');
            expect(result).toBe(false);
        });
        it('should return false if the data in the wrong format', async () => {
            const result = await validPageFile('./src/test/data/test2');
            expect(result).toBe(false);
        });
        it('should return true if the data in the correct format', async () => {
            const result = await validPageFile('./data/test.json');
            expect(result).toBe(true);
        });
    });

    describe('validateAnswers', () => {
        it('should return false if the answers not an array', async () => {
            const json = await JSON.parse('{}');
            const result = await validateAnswers(json);
            expect(result).toBe(false);
        });
        it('should return false if no valid answers', async () => {
            const json = await JSON.parse('[]');
            const result = await validateAnswers(json);
            expect(result).toBe(false);
        });
        it('should return an array of the answers if valid', async () => {
            const json = await JSON.parse('[{"answer": "test", "correct": true}]');
            const result = await validateAnswers(json);
            expect(result).toEqual([ [ 'test', true ] ]);
        });
    });
});