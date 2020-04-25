const KoaRouter = require('koa-router');

const index = require('./routes/index');
const examples = require('./routes/examples');

const router = new KoaRouter();

router.use('/', index.routes());
router.use('/examples', examples.routes());

module.exports = router;
