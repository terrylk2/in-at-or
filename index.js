const express = require('express');
const { parse } = require('url');
const next = require('next');

const nextServer = next({dev: true});


nextServer.prepare().then(() => {

  const app = express();
  
  app.get('/', function (req, res){
    const parsed = parse(req.url,true);
    console.log(parsed);

    nextServer.render(req,res,'/things',req.query);
  });

  app.listen(3000, function(){
    'Express Listening...'
  })

})

// var app = express();

// const subDomain = (req, res, next) => {
//   const domain = req.headers.host.split(':')[0];
//   const sub = domain.split('.')[0];
//   console.log(sub)
//   req.subdomain = sub;
//   app.use(express.static(sub));

//   next()
// }

// app.use(subDomain);

// app.get('/', function (req, res) {

//     var test = require(`./${req.subdomain}`)
//     test();
//     res.sendFile('index.html', {root: `./${req.subdomain}`});
// })


// app.listen(3000, function () {
//   console.log('Listening...')
// })