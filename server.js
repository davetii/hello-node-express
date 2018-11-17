const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();
let underMaintenance = true;
app.set('view engine', 'hbs');

if (underMaintenance) {
    app.use((req, res) => {
        res.render('maintenance.hbs', {
            pageTitle: 'maintenance Page'
        });
    });
}

app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/partials');

app.use((req, resp,next) => {
    let now = new Date().toString();
    let log  = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
       if(err) {
           console.log('error during logging');
       }
    });
    next();
});







hbs.registerHelper('currentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('greet', (arg) => {
    return 'Hello ' + arg.toUpperCase();
});

app.get('/', (req, res) => {
    res.send({name: 'dave', age: 'old', wt:220 });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/home', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'About Page',
        welcomeText: 'I am the welcome text'
    });
});

app.get('/bad', (req, res) => {
    res.send({code: 232, errorMessage: 'shit didnt work'});
});

app.listen(3000, () => {
    console.log('server is up')
});