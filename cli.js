#!/usr/bin/env node
const program = require('commander');
const directoryGifify = require('./directory-gifify');

const requiredArg = (argName, argValue) => {
  if (argValue === undefined) {
    console.error(`error: option ${argName} is required. run --help command for more info.`)
    process.exit(1);
  }
};

program
  .version('1.0.0')
  .option('-i, --inputDir <path>', 'Assets source directory')
  .option('-o, --outputDir <path>', 'Assets output directory')
  .option('--colors [number]', 'How many colors should be kept', parseInt, 24)
  .option('--from [number]', 'Start position, hh:mm:ss or seconds', parseInt, 0)
  .option('--to [number]', 'End position, hh:mm:ss or seconds (default: end of movie)', parseInt)
  .option('--fps [number]', 'Frames Per Second', parseInt, 10)
  .option('--cropSize [number]', 'crop size', parseInt, 400)
  .parse(process.argv);

requiredArg('--inputDir', program.inputDir);
requiredArg('--outputDir', program.outputDir);

directoryGifify({
  inputDir: program.inputDir,
  outputDir: program.outputDir,
  cropSize: program.cropSize,
  gififyParams: {
    colors: program.colors,
    from: program.from,
    to: program.to,
    fps: program.fps,
  },
});
