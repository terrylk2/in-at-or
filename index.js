const express = require('express');
const next = require('next');

const nextServer = next({ dev: true });

const subDomainer = (req, res, nxt) => {
    const domain = req.headers.host.split(':')[0]; //ignore ports
    const pieces = domain.split('.');

    if (pieces.length > 2) { //has AT LEAST a subdomain
        req.subDomain = pieces[0];
    }

    nxt();
}


nextServer.prepare().then(() => {

    const app = express();
    app.use(subDomainer);

    app.get('/', function(req, res) {

        nextServer.render(req, res, `/${req.subDomain}`, req.query);
    });

    app.listen(3000, function() {
        'Express Listening...'
    })

});