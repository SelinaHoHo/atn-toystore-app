const AdminRepository = require('../repositories/adminRepository');
const ProductRepository = require('../repositories/productRepository');
const RoleRepository = require('../repositories/roleRepository');
const model = require('../models/index');
const hmacSHA512 = require('crypto-js/hmac-sha512.js');
const Base64 = require('crypto-js/enc-base64.js');
const sha256 = require('crypto-js/sha256.js');
const SECRET_KEY =process.env.SECRET_KEY;

class AdminService {
    constructor() {
        this.adminRepository = new AdminRepository(model.User);
        this.productRepository = new ProductRepository(model.Product);
        this.roleRepository = new RoleRepository(model.Role);
    }

    async getDashboardData() {
        const allUser = await this.adminRepository.getAll({})
        const allProduct = await this.productRepository.getAll({})
        const allRole = await this.roleRepository.getAll({})
        const totalUser = allUser.length;
        const totalProduct = allProduct.length;
        const totalRole = allRole.length;
        return {
            totalUser,
            totalProduct,
            totalRole
        }
    }

    async getNameRole(id) {
        return await this.roleRepository.getOne({where:{role_id: id}});
    }

    async createNewUser(user) {
        if (user.password !== user.confirmPassword) {
            throw new Error('Password and confirm password do not match');
        }
        const userInDb = await this.adminRepository.getOne({where:{username: user.username}});
        if (userInDb) {
            throw new Error('Username already exists');
        }
        user.role_id = process.env.STAFF
        user.password = Base64.stringify(hmacSHA512(sha256(user.password).toString(), SECRET_KEY));
        return await this.adminRepository.create(user);
    }

    async getAllUser(users) {
        return await this.adminRepository.getAll({
            ...users,
            order: [
                ['user_id', 'ASC']
            ]
        })
    }

    async getUserDetail(id) {
        return await this.adminRepository.getAll({ where: {user_id: id}});
    }

    async getUserById(user_id){
        return await this.adminRepository.getById(user_id);
    }
    
    async updateUser(data){
        const user =  await this.adminRepository.getById(data.user_id);
        if(user){
            user.full_name = data.fullname;
            user.username = data.username;
            user.email = data.email;
            await user.save();
            return await this.adminRepository.getAll({
                order: [
                    ['user_id', 'ASC']
                ]
            })
        } else {
            throw new Error();
        }
    }

    async getAllProduct(products) {
        return await this.productRepository.getAll({
            ...products,
            order: [
                ['product_id', 'ASC']
            ]
        })
    }
    async removeUser(user_id) {
        const userInDb = await this.userRepository.getById(user_id);
        if (userInDb) {
            await userInDb.destroy();
            return await this.userRepository.getAll({
                order: [
                    ['user_id', 'ASC']
                ]
            })
        } else {
            throw new Error();
        }
    }
}

module.exports = AdminService;