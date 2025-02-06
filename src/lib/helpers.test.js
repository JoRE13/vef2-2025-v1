import { describe, expect, it } from '@jest/globals';
import { escapeHTML, shuffleExceptFirst } from "./helpers.js";

describe('helpers', () => {
    describe('escapeHTML', () => {
        it('should return a string with replaced characters.', () => {
            const text = '&<>';
            const result = escapeHTML(text);
            expect(result).toEqual('&amp;&lt;&gt;');
        });
    });

    describe('escapeHTML', () => {
        it('should return the array if its length is less than 1', () => {
            const arr = ['test'];
            const result = shuffleExceptFirst(arr);
            expect(result).toEqual(arr);
        });
        it('should return the array with the first element the same ', () => {
            const arr = [1,2,3,4,5,6,7,8,9,10];
            const result = shuffleExceptFirst(arr);
            expect(result[0]).toEqual(arr[0]);
        });
    });
});