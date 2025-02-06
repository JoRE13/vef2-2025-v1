import { escapeHTML, shuffleExceptFirst } from "./helpers.js";
/**
 * Generates basic template for HTML for a page.
 * @param {string} title the title of the page
 * @param {string} body the HTML for the body of the page
 * @returns Full HTML for the page
 */
export function template(title, body) {
  return /* HTML */ `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <link rel="stylesheet" href="./style.css" />
        <title>${title}</title>
      </head>

      <body>
        <main>${body}</main>
        <script type="module" src="./src/main.js"></script>
      </body>
    </html>`;
}

/**
 * Creates the HTML body for the Index page
 * @param {Array<string>} titles the titles of the pages on the index page
 * @param {Array<string>} files the filenames for the pages on the index page
 * @returns the HTML for the index page
 */
export function indexTemplate(titles, files) {
  const listElement = [];
  for (let i = 0; i < titles.length; i++) {
    listElement.push(
      `<li><a href="./${files[i].split(".")[0]}.html" class="button">${
        titles[i]
      }</a></li>`
    );
  }
  const list = listElement.join("\n");
  const htmlBody = /* HTML */ `
    <h1>Æfingar í Vefforritun</h1>
    <p>
      Verið hjartanlega velkomin á æfingasíðuna mína. Hér er hægt að finna hinar
      ýmsu æfingar í vefforritun. Smelltu á einhvern af hlekkjunum að neðan til
      þess að byrja.
    </p>
    <ul>
      ${list}
    </ul>
  `;
  return template('Vef1', htmlBody);
}

/**
 * Creates the body of the HTML for the question pages
 * @param {Array<string>} questions An array of the questions
 * @param {*} answers A three dimensional array containing all answers for each question and whether it is true or false.
 * @returns The full HTMl for the questions page.
 */
export function questionsTemplate(questions, answers) {
  const qCards = [];
  for (let i = 0; i < questions.length; i++) {
    let qElement = [`<strong>${escapeHTML(questions[i])}</strong>`];
    for (let j = 0; j < answers[i].length; j++) {
      const ansElement = `<div class="${
        answers[i][j][1] ? "trueans answer" : "answer"
      }">
            <p>${escapeHTML(answers[i][j][0])}</p>
            <input type="checkbox">
            </div>`;
      qElement.push(ansElement);
    }
    //shuffle answers
    qElement = shuffleExceptFirst(qElement);
    const qCard = `<div class="qcard" style="white-space: pre-line;">
        ${qElement.join("\n")}
        </div>
        `;
    qCards.push(qCard);
  }
  const htmlBody = `
    <h1> Spurningar </h1>
    <a class="button return" href="./index.html"> Til baka </a>
    <div class="qcards">
        ${qCards.join("\n")}
    </div>
    <a class="button show-ans"> Sýna svör </a>
    `;
  return template('Spurningar', htmlBody);
}

