import path from 'path';
import fs from 'fs';

import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';

import App from '../src/App';
import OneBusiness from '../src/components/OneBusinessComponent/oneBusiness'
const PORT  = process.env.PORT || 6006;
const app = express();

app.get('/a',(req,res) => {
    console.log("buraya")
    const app = ReactDOMServer.renderToString(<App/>);
    const indexFile = path.resolve('./build/index.html');
    fs.readFile(indexFile,'utf8',(err,data)=>{
        if(err){
            console.error('Something went wrong:',err);
            return res.status(500).send('Opss,better luck next time!');
        }
        return res.send(
            data.replace('<div id="root"></div>',`<div id="root">${app}</div>`)
        );
    });
});
app.get("/biz/:name/:city/:state/:mid", async (req, res) => {
    // <script src="vendor.js" charset="utf-8"></script>
    // <script src="business.js" charset="utf-8"></script>
    console.log(req.params)
    
    let query = "SELECT * FROM final_businesses WHERE id= " + req.params.mid.toString()
    console.log(query)
    con.query(query, (err, data) => {
        if (err) {
            console.log(err)
        }
       
        console.log(data[0])

        
        const theHtml = `
        <html>
        <head><title>My First SSR</title></head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <script data-search-pseudo-elements defer src="https://pro.fontawesome.com/releases/v5.10.1/js/all.js"></script>
        <script
      src="https://code.jquery.com/jquery-3.3.1.min.js"
      integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
      crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>    
   
        <body>
        
        <div id="reactele">{{{reactele}}}</div>
        
        
        
        </body>
        </html>
        `;
        const hbsTemplate = hbs.compile(theHtml)
        console.log(hbsTemplate)
        const reactComp = renderToString(<OneBusiness params={data[0]}></OneBusiness>)
        console.log(reactComp)
        const htmlToSend = hbsTemplate({ reactele: reactComp })


        res.send(htmlToSend);
    })
});

app.use(express.static('./build'));

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});