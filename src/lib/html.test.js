import { describe, expect, it } from '@jest/globals';
import {template, indexTemplate, questionsTemplate} from './html.js';

const testIndexTitles = ['Test'];
const testIndexFiles = ['test.json'];
const testQuestions = ['Hvað heiti ég'];
const testAnswers = [[['Jón',false],['Jói',true],['Mjói',false],['Spói',false]]];

describe('html', () => {
    describe('template', () => {
        it('should return a template with a given title and body', () => {
            const body = /* HTML */ `<div><p>Body</p></div>`;
            const result = template('title',body);
            expect(result).toContain('title');
            expect(result).toContain(body);
        });
    });

    describe('indexTemplate', () => {
        it('should return a template with a list of the titles', () => {
            const result = indexTemplate(testIndexTitles,testIndexFiles);   
            expect(result).toContain('<li><a href="./test.html" class="button">Test</a></li>');
        });
    });

    describe('questionsTemplate', () => {
        it('should return a template with qcards containing the questions and answers', () => {
            const result = questionsTemplate(testQuestions,testAnswers);
            expect(result).toContain('<strong>Hvað heiti ég</strong>');
        });
    });
});