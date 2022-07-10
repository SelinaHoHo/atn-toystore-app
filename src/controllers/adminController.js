const AdminService = require('../services/adminService')

const getDashboard = async (req, res) => {
    const adminService = new AdminService();
    const countUser = (await adminService.getDashboardData()).totalUser;
    const countProduct = (await adminService.getDashboardData()).totalProduct;
    const countRole = (await adminService.getDashboardData()).totalRole;
    res.render('admin/dashboard', {
        totalUser: countUser,
        totalProduct: countProduct,
        totalRole: countRole
    })
}

const getCreateUser = async(req, res) => {
    res.render('admin/admin-createUser');
}

const createUser = async(req, res) => {
    const adminService = new AdminService();
    const user = req.body;
    try {
        await adminService.createNewUser(user);
        res.redirect('/admin/user-list');
        
    } catch(err) {
        res.render('admin/admin-createUser', {
            error: err.message
        });
    }
}

const getUserList = async (req, res) => {
    try {
        if (req.session.role != 'Admin') {
            res.status(400).json({ TRAVE: false, message: "user is not admin"});
        }
        const adminService = new AdminService();
        const data = req.body;
        const db = await adminService.getAllUser(data);
        res.render('admin/admin-userlist', {
        users: db,
        })
    } catch (error) {
        res.status(500).json({ TRAVE: true, message: error });
    }
}

const userDetail = async (req, res) => {
    const adminService = new AdminService();
    const id = req.params.user_id;
    const data = await adminService.getUserDetail(id);
    res.render('admin/user-detail', {
        users: data
    });
}

const getProductList = async (req, res) => {
    try {
        if (req.session.role != 'Admin') {
            res.status(400).json({ TRAVE: false, message: "user is not admin"});
        }
        const adminService = new AdminService();
        const data = req.body;
        const db = await adminService.getAllProduct(data);
        res.render('admin/admin-product', {
        products: db
        })
    } catch (error) {
        res.status(500).json({ TRAVE: true, message: error });
    }
}

const getEditUser = async (req, res) => {
    try {
        if (req.session.role != 'Admin') {
            res.status(400).json({ TRAVE: false, message: "user is not admin"});
        }
        const adminService = new AdminService();
        const data = req.query;
        const db = await adminService.getUserById(data?.id);
        res.render('admin/admin-edit-user', {
            user: db
        })
    } catch (error) {
        res.status(500).json({ TRAVE: true, message: error });
    }
}

const EditUser = async (req, res) => {
    try {
        if (req.session.role != 'Admin') {
            res.status(400).json({ TRAVE: false, message: "user is not admin"});
        }
        const adminService = new AdminService();
        const data = req.body;
        data.user_id = parseInt(data.user_id);
        await adminService.updateUser(data);
        res.send();
    } catch (error) {
        res.status(500).json({ TRAVE: true, message: error });
    }
}

  
module.exports = {
    createUser,
    getCreateUser,
    getUserList,
    userDetail,
    getEditUser,
    EditUser,
    getProductList,
    getDashboard
}
