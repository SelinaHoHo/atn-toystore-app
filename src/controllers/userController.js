const UserService = require('../services/userService');

const getUserDetail = async (req, res) => {
    try {
        if (req.session.role == null) {
            res.status(400).json({ TRAVE: false, message: "Wrong user"});
        }
        const userService = new UserService();
        const userInDb = await userService.GetUserIdSession(req);
        res.render('user/user-detail', {
            user: userInDb
        });
    } catch (error) {
        res.status(500).json({ TRAVE: true, message: error });
    }
}

const getUserCreateProduct = async (req, res) => {
    const userService = new UserService();
    await userService.GetUserIdSession(req);
    res.render('user/user-createProduct');
}

const userCreateProduct = async (req, res) => {
    try {
        if (req.session.role == null) {
            res.status(400).json({ TRAVE: false, message: "Wrong user"});
        }
        const userService = new UserService();
        const product = req.body;
        await userService.createNewProduct(product, req);
        res.send();
    } catch (error) {
        res.status(500).json({ TRAVE: true, message: error });
    }
}

const getProduct = async (req, res) => {
    try {
        if (req.session.role == null || req.session.role == 'Admin') {
            res.status(400).json({ TRAVE: false, message: "Wrong user"});
        }
        const userService = new UserService();
        const db = await userService.getUserProduct(req);
        console.log(db)
        res.render('user/product', {
            products: db
        });
    } catch (error) {
        res.status(500).json({ TRAVE: true, message: error });
    }
}

const getEditProduct = async (req, res) => {
    try {
        if (req.session.role == null || req.session.role == 'Admin') {
            res.status(400).json({ TRAVE: false, message: "Wrong user"});
        }
        const userService = new UserService();
        const data = req.query;
        const db = await userService.getProductById(data?.id);
        res.render('user/edit-product', {
            product: db
        });
    } catch (error) {
        res.status(500).json({ TRAVE: true, message: error });
    }
}

const editProduct = async (req, res) => {
    try {
        if (req.session.role == null || req.session.role == 'Admin') {
            res.status(400).json({ TRAVE: false, message: "Wrong user"});
        }
        const userService = new UserService();
        const product = req.body;
        await userService.updateProduct(product, req);
        res.send();
    } catch (error) {
        res.status(500).json({ TRAVE: true, message: error });
    }
}
const productDetail = async (req, res) => {
    try {
        if (req.session.role == null || req.session.role == 'Admin') {
            res.status(400).json({ TRAVE: false, message: "Wrong user"});
        }
        const userService = new UserService();
        const data = req.params.product_id;
        const db = await userService.getProductDetail(data);
        console.log(db)
        res.render('user/product-detail', {
            product: db
        });
    } catch (error) {
        res.status(500).json({ TRAVE: true, message: error });
    }
}

const removeProduct = async (req, res) => {
    try {
        if (req.session.role == null || req.session.role == 'Admin') {
            res.status(400).json({ TRAVE: false, message: "Wrong user"});
        }
        const userService = new UserService();
        const data = req.params.product_id;
        await userService.removeProduct(data);
        res.send();
    } catch (error) {
        res.status(500).json({ TRAVE: true, message: error });
    }
}

module.exports = {
    getUserDetail,
    userCreateProduct,
    getUserCreateProduct,
    getProduct,
    getEditProduct,
    editProduct,
    productDetail,
    removeProduct
}