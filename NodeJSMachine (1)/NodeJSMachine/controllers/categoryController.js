const { Category } = require('../models');

module.exports = {
    // List all categories
    getAll: async (req, res) => {
        try {
            const categories = await Category.findAll();
            res.render('categories/index', { categories });
        } catch (err) {
            res.status(500).send(err.message);
        }
    },

    // Show create form
    createForm: (req, res) => {
        res.render('categories/create');
    },

    // Handle create
    create: async (req, res) => {
        try {
            await Category.create(req.body);
            res.redirect('/categories');
        } catch (err) {
            res.status(500).send(err.message);
        }
    },

    // Show edit form
    editForm: async (req, res) => {
        try {
            const category = await Category.findByPk(req.params.id);
            res.render('categories/edit', { category });
        } catch (err) {
            res.status(500).send(err.message);
        }
    },

    // Handle update
    update: async (req, res) => {
        try {
            await Category.update(req.body, {
                where: { id: req.params.id }
            });
            res.redirect('/categories');
        } catch (err) {
            res.status(500).send(err.message);
        }
    },

    // Handle delete
    delete: async (req, res) => {
        try {
            await Category.destroy({
                where: { id: req.params.id }
            });
            res.redirect('/categories');
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
};
