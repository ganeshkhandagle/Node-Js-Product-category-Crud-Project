const { Sequelize } = require('sequelize');
const { Category, Product } = require('./models');
const database = require('./database');

async function verify() {
    try {
        console.log('Syncing database...');
        await database.sync({ force: true }); 

        console.log('Creating Categories...');
        const cat1 = await Category.create({ name: 'Electronics' });
        const cat2 = await Category.create({ name: 'Books' });

        console.log('Creating 15 Products...');
        const products = [];
        for (let i = 1; i <= 15; i++) {
            products.push({
                name: `Product ${i}`,
                categoryId: i % 2 === 0 ? cat2.id : cat1.id
            });
        }
        await Product.bulkCreate(products);

        console.log('Verifying Pagination (Page 1, Limit 10)...');
        const page1 = await Product.findAndCountAll({
            limit: 10,
            offset: 0
        });
        console.log(`Page 1 Count: ${page1.rows.length} (Expected 10)`);

        console.log('Verifying Pagination (Page 2, Limit 10)...');
        const page2 = await Product.findAndCountAll({
            limit: 10,
            offset: 10
        });
        console.log(`Page 2 Count: ${page2.rows.length} (Expected 5)`);
        console.log(`First item on Page 2: ${page2.rows[0].name} (Expected Product 11)`);

        if (page1.rows.length === 10 && page2.rows.length === 5 && page2.rows[0].name === 'Product 11') {
            console.log('SUCCESS: Pagination logic verified.');
        } else {
            console.error('FAILURE: Pagination logic incorrect.');
        }

    } catch (err) {
        console.error('Error during verification:', err);
    } finally {
        
    }
}

verify();
