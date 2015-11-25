import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../app/components/app';
import Router from 'express';

let router = Router();

router.get('/', function(req, res) {
    var markup = ReactDOMServer.renderToString(<App />);
    res.render('main', {root: markup});
});

export default router;
