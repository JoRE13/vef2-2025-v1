import { readFile, createDirIfNotExists } from "./lib/file.js";
import { parseIndexJSON, parseFileJSON} from "./lib/parse.js";
import { indexTemplate, questionsTemplate } from "./lib/html.js";
import fs from 'node:fs/promises';

const INDEX_PATH = "./data/index.json";

async function main(){
    const indexData = await readFile(INDEX_PATH);
    const indexParsed = await parseIndexJSON(indexData);
    const indexHtml = indexTemplate(indexParsed[0], indexParsed[1]);
    await createDirIfNotExists("dist");
    await fs.writeFile("./dist/index.html", indexHtml, "utf-8");
    for (const file of indexParsed[1]){
        const page = await readFile(`./data/${file}`);
        const PageData = await parseFileJSON(page);
        const PageHtml = questionsTemplate(PageData[0], PageData[1]);
        await fs.writeFile(`./dist/${file.split(".")[0]}.html`, PageHtml, "utf-8");
    }
    
}

main();


