const boom = require('@hapi/boom');

const { models } = require('../../lib/sequelize');

class CategoriesService {
  constructor() {}

  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async get() {
    const categories = await models.Category.findAll();
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(categories);
      }, 2000);
    });
  }

  async getCategory(id) {
    const category = await models.Category.findByPk(id, {
      include: ['products'],
    });
    if (!category) throw boom.notFound('Category not found');
    return category;
  }

  async update(id, changes) {
    const category = await this.getCategory(id);
    const rta = await category.update(changes);

    return rta;
  }

  async delete(id) {
    const category = await this.getCategory(id);
    await category.destroy();

    return { rta: true };
  }
}

module.exports = CategoriesService;
