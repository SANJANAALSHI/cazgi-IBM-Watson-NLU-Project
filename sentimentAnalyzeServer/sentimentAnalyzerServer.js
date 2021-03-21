const express = require('express');
const app = new express();
const dotenv = require('dotenv');
dotenv.config();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

function getNLUInstance(){
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-whatson/natural-language-understanding/v1');
    const {IamAuthenticator} = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: '2020-08-01',
  authenticator: new IamAuthenticator({
    apikey: '{apikey}',
  }),
  serviceUrl: '{url}',
});
return naturalLanguageUnderstanding;

}
app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {

    getNLUInstance({"happy":"90","sad":"10"});
});

app.get("/url/sentiment", (req,res) => {
    getNLUInstance("url sentiment for "+req.query.url);
});

app.get("/text/emotion", (req,res) => {
    getNLUInstance({"happy":"10","sad":"90"});
});

app.get("/text/sentiment", (req,res) => {
    getNLUInstance("text sentiment for "+req.query.text);
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

