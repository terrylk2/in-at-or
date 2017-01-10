const express = require('express');
const next = require('next');

const nextServer = next({ dev: true });
const handle = nextServer.getRequestHandler();

const subDomainer = (req, res, nxt) => {
    const domain = req.headers.host.split(':')[0]; //ignore ports
    const pieces = domain.split('.');

    if (pieces.length > 2) { //has AT LEAST a subdomain
        req.subDomainRoute = `/${pieces[0]}`;
    }

    req.subDomainRoute = req.subDomainRoute || '';
    nxt();
}


nextServer.prepare().then(() => {

    const app = express();
    app.use(subDomainer);

    app.get('*', function(req, res) {
        const path = req.originalUrl;

        nextServer.render(req, res, `${req.subDomainRoute}/${path}`, req.query);
    });

    app.listen(3000, function() {})

});