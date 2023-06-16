const fs = require('fs');

// Function to count the number of words in a string
function countWords(str) {
  return str.trim().split(/\s+/).length;
}

function processInspirationData(data) {
  try {
    const inspirationData = JSON.parse(data);
    const wordCounts = {};

    inspirationData.forEach(obj => {
      const wordCount = countWords(obj.Quote);
      if (!wordCounts[wordCount]) {
        wordCounts[wordCount] = [];
      }
      wordCounts[wordCount].push(obj.Quote);
    });

    const processedJson = JSON.stringify(wordCounts, null, 2);

    fs.writeFile('processed.json', processedJson, 'utf8', err => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Processed data saved successfully!');
    });
  } catch (err) {
    console.error('Error parsing JSON:', err);
  }
}

fs.readFile('inspiration.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  processInspirationData(data);
});
