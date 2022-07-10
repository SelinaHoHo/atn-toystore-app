const db = require("../models");
const Role = db.Role;
const User = db.User;
const Request = db.Request;
const hmacSHA512 = require('crypto-js/hmac-sha512.js');
const Base64 = require('crypto-js/enc-base64.js');
const sha256 = require('crypto-js/sha256.js');
const dotenv = require('dotenv');
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

async function createRole(){
  try{
    let role = new Role({
      role_name: 'admin test'
    });
    console.log(role);
    await role.save();
    console.log("createRole success");
  } catch(error){
    console.log("Error creating role", error);
  }
}

async function getRoles(){
  try {
    let roles = await Role.findAll();
    console.log(roles);
    console.log("getRoles success");
  } catch (error) {
    console.log("Error getRoles ", error);
  }
}

async function createUser(){
  try {
    let password = Base64.stringify(hmacSHA512(sha256('abc123').toString(), SECRET_KEY));
    let user = new User({
      username: 'Store1',
      password: password,
      full_name: 'Lee Min Ho',
      email: 'lee@mail.com',
      role_id: 2,
    });
    console.log(user);
    await user.save();
    console.log("createUser success");
  } catch (error) {
    console.log("Error createUser ", error);
  }
}

async function getUsers(){
  try {
    let users = await User.findAll();
    console.log(users);
    console.log("getUsers success");
  } catch (error) {
    console.log("Error getUsers ", error)
  }
}

async function test(){
  await createRole();
  await getRoles();
  await createUser();
  await getUsers();
}

test();
