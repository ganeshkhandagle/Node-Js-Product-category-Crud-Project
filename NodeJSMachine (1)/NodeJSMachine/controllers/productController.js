const { Product, Category } = require('../models');

module.exports = {
    
    getAll: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 10;
            const offset = (page - 1) * limit;

            const { count, rows } = await Product.findAndCountAll({
                include: [{
                    model: Category,
                    attributes: ['id', 'name']
                }],
                limit: limit,
                offset: offset,
                order: [['id', 'ASC']]
            });

            const totalPages = Math.ceil(count / limit);

            res.render('products/index', {
                products: rows,
                currentPage: page,
                totalPages: totalPages,
                totalRecords: count
            });
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    },

    
    createForm: async (req, res) => {
        try {
            const categories = await Category.findAll();
            res.render('products/create', { categories });
        } catch (err) {
            res.status(500).send(err.message);
        }
    },

    // Handle create
    create: async (req, res) => {
        try {
            await Product.create(req.body);
            res.redirect('/products');
        } catch (err) {
            res.status(500).send(err.message);
        }
    },

    // Show edit form
    editForm: async (req, res) => {
        try {
            const product = await Product.findByPk(req.params.id);
            const categories = await Category.findAll();
            res.render('products/edit', { product, categories });
        } catch (err) {
            res.status(500).send(err.message);
        }
    },

    // Handle update
    update: async (req, res) => {
        try {
            await Product.update(req.body, {
                where: { id: req.params.id }
            });
            res.redirect('/products');
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    },

    // Handle delete
    delete: async (req, res) => {
        try {
            await Product.destroy({
                where: { id: req.params.id }
            });
            res.redirect('/products');
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
};
