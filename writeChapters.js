const fs = require('fs');
const chapters = require('./chapters.json');

const lineBreak = '\n\n---\n\n'

function makeMarkdown() {
  Object.keys(chapters).forEach(chapterNum => {
    var chapterPath = `./chapters/${chapterNum}/${chapterNum}.json`;
    var chapter = require(chapterPath)
    var data = `# Chapter ${chapterNum}\n## ${chapter.title}${lineBreak}`;
    chapter.topics.forEach(topic => {
      data += `## ${topic}${lineBreak}`;
    });
    var filename = `./chapters/${chapterNum}/${chapterNum}.md`;
    fs.writeFile(filename, data, err => {
      err ? console.log(err) : console.log(`Saved chapter ${chapterNum}`);
    })
  })
}

function splitJSON() {
  Object.keys(chapters).forEach(chapterNum => {
    var filename = `./chapters/${chapterNum}.json`;
    fs.writeFile(filename, JSON.stringify(chapters[chapterNum], null, 2), err => {
      err ? console.log(err) : console.log(`Saved ${filename}`);
    })
  })
}

makeMarkdown()