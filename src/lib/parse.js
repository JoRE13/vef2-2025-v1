import { readFilesFromDir, readFile } from "./file.js";

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

export async function parseFileJSON(data) {
  let pageParsed;
  try {
    pageParsed = JSON.parse(data);
  } catch (e) {
    throw new Error("unable to parse file data");
  }
  const questions = []
  const answers = []
  if (Array.isArray(pageParsed.questions)){
    for (const question of pageParsed.questions){
      if (question.question && question.answers){
        const questionParsed = await validatePage(question.answers);
        if( questionParsed ) {
          questions.push(question.question);
          answers.push(questionParsed);
        }
      }
    }
  }
  else {
    console.log('questions are not an array')
  }
  return [questions, answers]
}

async function validPageFile(pagePath) {
  const data = await readFile(pagePath);
  let pageParsed;
  try {
    pageParsed = JSON.parse(data);
  } catch (e) {
    console.log("unable to parse file data");
    return false
  }
  if (!pageParsed.title || !pageParsed.questions){
    console.log("page format not valid");
    return false
  }
  return true
}

async function validatePage(data){
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
  return answers;
}