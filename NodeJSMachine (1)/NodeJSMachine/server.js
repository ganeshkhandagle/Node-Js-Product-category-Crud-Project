const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const database = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


const { Category, Product } = require('./models');


const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');

app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);

app.get('/', (req, res) => {
    res.redirect('/products');
});


database.authenticate()
    .then(() => {
        console.log('Database connected...');
        return database.sync();
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server started on http://localhost:${PORT}`);
        });
    })
    .catch(err => console.log('Error: ' + err));
