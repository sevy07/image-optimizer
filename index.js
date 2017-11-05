var im = require('imagemagick');

var inputPath = './input/proposal-maria-wild.png';
var outputPath = './output/proposal-maria-wild.png';
var width = 300; // output width in pixels

var args = [
  inputPath,
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
  'sRGB',
  outputPath
];

im.convert(args, function (err, stdout, stderr) {
  if (err) throw err;
  console.log('stdout:', stdout);
});