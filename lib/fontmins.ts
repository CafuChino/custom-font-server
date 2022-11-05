import fontmin from 'fontmin';
import fs from 'fs';


function getCssFromGlyphs(fontname: string, glyphs: string) {
  const fontminCss = new fontmin().src('fonts/' + fontname + '.ttf').use(fontmin.glyph({
    text: glyphs,
    hinting: false
  })).use(fontmin.css({
    base64: true
  }));
  return new Promise((resolve, reject) => {
    fontminCss.run((err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files[1]._contents.toString());
      }
    });
  });
}

export default {
  getCssFromGlyphs
};