const model = require('../models/index');
const UserRepository = require('../repositories/userRepository')
const ProductRepository = require('../repositories/productRepository');


class UserService {
    constructor (){
        this.userRepository = new UserRepository(model.User)
        this.productRepository = new ProductRepository(model.Product);
    }

    async GetUserIdSession(req, res, next){
        return await this.userRepository.getById(req.session.userId);   
    }


    async createNewProduct(product, req) {
        product.user_id = req.session.userId;
        return await this.productRepository.create(product);
    }

    async getUserProduct(req) {
        return await this.productRepository.getAll({
            where: { user_id: req.session.userId },
            order: [
                ['product_id', 'ASC']
            ]
        })
    }

    async getProductById(product_id) {
        return await this.productRepository.getById(product_id);
    }

    async getProductDetail(product_id) {
        return await this.productRepository.getAll({ where: { product_id: product_id }, include: [{ 
            model: model.User,
            as: 'user',
            required: true
        }]});
    }

    async updateProduct(product) {
        const productInDb = await this.productRepository.getById(product.product_id);
        if (productInDb) {
            productInDb.product_name = product.name;
            productInDb.price = product.price;
            productInDb.quantity = product.quantity;
            productInDb.image = product.image;
            await productInDb.save();
            return await this.productRepository.getAll({
                order: [
                    ['product_id', 'ASC']
                ]
            })
        } else {
            throw new Error();
        }
    }
}

module.exports = UserService; 