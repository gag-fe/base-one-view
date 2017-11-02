const express = require('express');
const app = express();
let port = process.env.PORT ||  3021;
const router = express.Router();
router.get('/',function (req, res, next) {
  res.url  =  '/dist/index.html';
  next();
});
app.use(router);
app.use(express.static('./dist'));

module.exports =  app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Listen at http://localhost:${port}\n`);
});
