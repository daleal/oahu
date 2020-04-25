const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('example', '/', async (ctx) => {
  // Use helper functions
  ctx.helpers.examples.sayHey();
  ctx.helpers.examples.sayHo();

  // Render view
  await ctx.render('examples/index', {
    exampleString: 'This is an example string!',
  });
});

module.exports = router;
