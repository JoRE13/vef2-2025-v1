import { readFilesFromDir, readFile } from "./file.js";

/**
 * Parses the data and returns arrays of all valid pages
 * @param {string} data the stringified content of json file
 * @returns array containing the titles of the pages and an array of the files.
 */
export async function parseIndexJSON(data) {
  let indexParsed;
  try {
    indexParsed = JSON.parse(data);
  } catch (e) {
    throw new Error("unable to parse index data");
  }
  const indexTitles = [];
  const indexFiles = [];
  const dataDir = await readFilesFromDir("data");

  // we expect an array
  if (Array.isArray(indexParsed)) {
    for (const page of indexParsed) {
      // the page must have a title and file value and have a valid data file
      if (
        page.title &&
        page.file &&
        dataDir.includes(`data/${page.file}`)  &&
        await validPageFile(`data/${page.file}`)
      ) {
        indexTitles.push(page.title);
        indexFiles.push(page.file);
      } else {
        console.log(`Page ${JSON.stringify(page)} is not valid`);
      }
    }
  } else {
    throw new Error("index page data is not an array");
  }
  return [indexTitles, indexFiles];
}


/**
 * Parses the question files and returns an array with the valid questions and answers
 * @param {string} data content of file to parse 
 * @returns An array containing the valid questions and answers.
 */
export async function parseFileJSON(data) {
  let pageParsed;
  try {
    pageParsed = JSON.parse(data);
  } catch (e) {
    throw new Error("unable to parse file data");
  }
  const questions = []
  const answers = []
  
  for (const question of pageParsed.questions){
    if (question.question && question.answers){
      const questionParsed = await validateAnswers(question.answers);
      if( questionParsed ) {
        questions.push(question.question);
        answers.push(questionParsed);
      }
    }
  }
  
  return [questions, answers]
}
/**
 * Checks wether a given a questions file has the right format.
 * @param {string} pagePath the path of the file to check
 * @returns true if it is valid and false otherwise
 */
export async function validPageFile(pagePath) {
  const data = await readFile(pagePath);
  if (!data) {
    return false;
  }
  let pageParsed;
  try {
    pageParsed = JSON.parse(data);
  } catch (e) {
    console.log("unable to parse file data");
    return false
  }
  if (!pageParsed.title || !pageParsed.questions || !Array.isArray(pageParsed.questions)){
    console.log("page format not valid");
    return false
  }
  return true
}
/**
 * Checks whether the answers are of the correct format.
 * @param {*} data an JSON array containing the answers 
 * @returns Returns all valid answers.
 */
export async function validateAnswers(data){
  const answers = []
  if (Array.isArray(data)){
    for (const ans of data){
      if(ans.answer && (ans.correct === true || ans.correct === false)){
        answers.push([ans.answer, ans.correct]);
      }
    }
  } else {
    return false;
  }
  if (answers.length === 0){
    return false;
  }
  return answers;
}