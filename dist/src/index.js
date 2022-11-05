"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const router_1 = __importDefault(require("@koa/router"));
const fontmins_1 = __importDefault(require("../lib/fontmins"));
const app = new koa_1.default();
const router = new router_1.default();
router.get('/', (ctx, next) => {
    ctx.body = 'Fontmin server is running';
});
router.get('/css/:name', (ctx) => {
    // time log
    const start = Date.now();
    const { name } = ctx.params;
    const chars = ctx.query.chars;
    return fontmins_1.default.getCssFromGlyphs(name, chars).then((css) => {
        // set css content type
        ctx.type = 'text/css';
        // enable gzip
        ctx.compress = true;
        // enable cors
        ctx.set('Access-Control-Allow-Origin', '*');
        ctx.body = css;
        console.log(`Fontmin server: ${name} ${chars} ${Date.now() - start}ms`);
    });
});
app.use(router.routes());
console.log('Listening on port 8081');
app.listen(8081);
