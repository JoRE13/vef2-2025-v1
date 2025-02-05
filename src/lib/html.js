import path from 'node:path';

export function template(title, body) {
    return /* HTML */ `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width" />
          <link rel="stylesheet" href="../public/style.css" />
          <title>${title}</title>
        </head>
        
        <body>
          <main>${body}</main>
          <script type="module" src="../src/main.js"></script>
        </body>
      </html>`;
  }


export function indexTemplate(titles, files){
    const listElement = [];
    for (let i = 0; i < titles.length; i++){
       listElement.push(`<li><a href="./${files[i].split(".")[0]}.html" class="button">${titles[i]}</a></li>`); 
    }
    const list = listElement.join("\n");
    const htmlBody = /* HTML */ `
    <h1> Æfingar í Vefforritun </h1>
    <p> Verið hjartanlega velkomin á æfingasíðuna mína. Hér er hægt
    að finna hinar ýmsu æfingar í vefforritun. Smelltu á einhvern af hlekkjunum
    að neðan til þess að byrja.</p>
    <ul> ${list} </ul>
    `;
    return template("vef1", htmlBody)
}

export function questionsTemplate(questions, answers){
    const qCards = [];
    for (let i = 0; i < questions.length; i++){
        const qElement = [`<strong>${escapeHTML(questions[i])}</strong>`];
        for (let j = 0; j < answers[i].length; j++){
            const ansElement = `<div class="${answers[i][j][1] ? 'trueans answer' : 'answer'}">
            <p>${escapeHTML(answers[i][j][0])}</p>
            <input type="checkbox">
            </div>`;
            qElement.push(ansElement);
        }
        const qCard = 
        `<div class="qcard" style="white-space: pre-line;">
        ${qElement.join("\n")}
        </div>
        `
        qCards.push(qCard)
    }
    const htmlBody = `
    <h1> Spurningar </h1>
    <a class="button return" href="./index.html"> Til baka </a>
    <div class="qcards">
        ${qCards.join("\n")}
    </div>
    <a class="button show-ans"> Sýna svör </a>
    `
    return template("spurn", htmlBody);
}

function escapeHTML(text) {
  return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}