const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const engine = require('express-handlebars').engine;

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
// handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

let Note = sequelize.define('Note', {
    content: DataTypes.STRING
});

const before = async () => {
    await sequelize.sync();
}
app.get('/', async (req, res) => {
    const notes = await Note.findAll();
    res.render('index', { notes, layout: 'main' });
});

app.get('/note', async (req, res) => {
    const note = await Note.create({
        content: req.query.content
    })
    console.log(note);
    res.redirect('/');
});

before();
app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});