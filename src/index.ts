import koa from 'koa';
import Router from '@koa/router';
import fontmin from '../lib/fontmins';

const app = new koa();
const router = new Router();

router.get('/', (ctx, next) => {
  ctx.body = 'Fontmin server is running';
});

router.get('/css/:name', (ctx) => {
  // time log
  const start = Date.now();
  const { name } = ctx.params;
  const chars = ctx.query.chars as string;
  return fontmin.getCssFromGlyphs(name, chars).then((css) => {
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