import path from 'path';
import fs from 'fs';

import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';

import App from '../src/App';
import OneBusiness from '../src/components/OneBusinessComponent/oneBusiness'
import mysql from 'mysql'
import { Provider } from 'react-redux'
import store from '../src/redux/store'
const PORT = process.env.PORT || 6006;
const app = express();
import con from '../src/config'

app.get('/', (req, res) => {
    console.log("buraya")
    const app = ReactDOMServer.renderToString(<App />);
    const indexFile = path.resolve('./build/index.html');
    fs.readFile(indexFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Something went wrong:', err);
            return res.status(500).send('Opss,better luck next time!');
        }
        return res.send(
            data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
        );
    });
});

app.get("/biz/:name/:city/:state/:id", (req, res) => {

    console.log(req.url)

    let query = "SELECT * FROM final_businesses WHERE id= " + req.params.id.toString()
    console.log(query)
    con.query(query, (err, data) => {

        if (err) {
            console.log(err)
        }
        //console.log(data)



            const theHtml = `
            <html>
            <head><title>My First SSR</title></head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
            <script data-search-pseudo-elements defer src="https://pro.fontawesome.com/releases/v5.10.1/js/all.js"></script>
            <script
          src="https://code.jquery.com/jquery-3.3.1.min.js"
          integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
          crossorigin="anonymous"></script>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>    

            <body>
            <div id="root"></div>
     

            </body>
            </html>`;
        const app = ReactDOMServer.renderToString(<OneBusiness params={data[0]} />);
        const indexFile = path.resolve('./build/index.html');
        console.log(typeof '<div id="root"></div>', typeof `<div id="root">${app}</div>`)
        return res.send(
            theHtml.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
        );

        // const hbsTemplate = hbs.compile(theHtml)
        // console.log(hbsTemplate)
        // const reactComp = renderToString(<OneBusiness params={data[0]}></OneBusiness>)
        // console.log(reactComp)
        // const htmlToSend = hbsTemplate({ reactele: reactComp })


        // res.send(htmlToSend);
    })
});

// app.use(express.static('./build'));
app.use(express.static('./build'))


app.listen(PORT, () => {
    console.log(__dirname)
    console.log(`Server is listening on port ${PORT}`);
});