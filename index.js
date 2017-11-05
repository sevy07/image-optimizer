const im = require('imagemagick');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

const inputPath = './input/';
const width = 300; // output width in pixels

const optimizeOptions = [
  '-filter',
  'Triangle',
  '-define',
  'filter:support=2',
  '-thumbnail',
  width,
  '-unsharp',
  '0.25x0.08+8.3+0.045',
  '-dither',
  'None',
  '-posterize',
  '136',
  '-quality',
  '82',
  '-define',
  'jpeg:fancy-upsampling=off',
  '-define',
  'png:compression-filter=5',
  '-define',
  'png:compression-level=9',
  '-define',
  'png:compression-strategy=1',
  '-define',
  'png:exclude-chunk=all',
  '-interlace',
  'none',
  '-colorspace',
  'sRGB'
];

const read = (dir) =>
  fs.readdirSync(dir)
    .reduce((files, file) =>
      fs.statSync(path.join(dir, file)).isDirectory() ?
        files.concat(read(path.join(dir, file))) :
        files.concat(path.join(dir, file)),
    []);

const getOptions = (input) => {
  const res = optimizeOptions.slice();
  res.unshift(input);
  res.push(input.replace('input', 'output'));
  return res;
};

const optimizeAll = () => {

const files = read(inputPath);

fs.mkdir('./output/');

files.forEach((element) => {
  im.convert(getOptions(element), (err, stdout, stderr) => {
    if (err) throw err;
    console.log(element, 'optimized');
    });
  });
};

rimraf('./output/', () => { console.log('cleaned output \n'); optimizeAll();});


