const fs = require('fs');
const chapters = require('./chapters.json');

const lineBreak = (pattern) => `\n\n${pattern.repeat(3)}\n\n`

// keep JSON in chapters
// send MarkDown files to dist folder

function makeMarkdown() {
  Object.keys(chapters).forEach(chapterNum => {
    var chapterPath = `./chapters/${chapterNum}/${chapterNum}.json`;
    var chapter = require(chapterPath)
    var data = `# Chapter ${chapterNum}\n## ${chapter.title}${lineBreak('-')}`;
    chapter.topics.forEach((topic, i) => {
      data += `## ${topic.topic}`;
      topic.slides.forEach(slide => {
        data += lineBreak('^')
        if (typeof slide === 'string') data += slide;
        else slide.forEach(line => data += `${line}  \n`)
      });
      if (i+1 !== chapter.topics.length)data += lineBreak('-')
    });
    var filename = `./chapters/${chapterNum}/${chapterNum}.md`;
    fs.writeFile(filename, data, err => {
      err ? console.log(err) : console.log(`Saved chapter ${chapterNum}`);
    });
  });
}

function splitJSON() {
  Object.keys(chapters).forEach(chapterNum => {
    var current = chapters[chapterNum];
    current.topics = current.topics.map(topic => {
      return {
        topic: topic,
        slides: []
      };
    })
    var filename = `./chapters/${chapterNum}/${chapterNum}.json`;
    fs.writeFile(filename, JSON.stringify(current, null, 2), err => {
      err ? console.log(err) : console.log(`Saved ${filename}`);
    })
  })
}

// splitJSON()
makeMarkdown();