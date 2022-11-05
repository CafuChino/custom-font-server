"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fontmin_1 = __importDefault(require("fontmin"));
function getCssFromGlyphs(fontname, glyphs) {
    const fontminCss = new fontmin_1.default().src('fonts/' + fontname + '.ttf').use(fontmin_1.default.glyph({
        text: glyphs,
        hinting: false
    })).use(fontmin_1.default.css({
        base64: true
    }));
    return new Promise((resolve, reject) => {
        fontminCss.run((err, files) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(files[1]._contents.toString());
            }
        });
    });
}
exports.default = {
    getCssFromGlyphs
};
