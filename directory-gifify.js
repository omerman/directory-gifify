const fs = require('fs');
const gifify = require('gifify');

const extensions = ['mp4'];
const directoryGifify = ({ inputDir, outputDir, cropSize, gififyParams }) => {
  fs.readdir(inputDir, (readError, files) => {
    if (readError) {
      throw new Error(`couldnt read ${inputDir}`, readError);
    }

    files.forEach((file) => {
      const ext = file.substr(file.lastIndexOf('.')).substr(1);
      const skipExension = extensions.indexOf(ext) === -1;
      if (skipExension) {
        return;
      }

      const options = {
        ...gififyParams,
      };

      const gifNameNoExtension = `${file.substr(0, file.lastIndexOf('.'))}.gif`;

      const gif = fs.createWriteStream(`${outputDir}/${gifNameNoExtension}`);
      gifify(`${inputDir}/${file}`, options).pipe(gif);

      gif.on('error', (gififyErr) => {
        console.error(
          `couldnt perform giffy on ${outputDir}/${gifNameNoExtension}`,
          gififyErr,
        );
      });

      gif.on('close', () => {
        console.log(`gifify successfull: ${outputDir}/${file}`)
      });
    });
  });
};

module.exports = directoryGifify;
