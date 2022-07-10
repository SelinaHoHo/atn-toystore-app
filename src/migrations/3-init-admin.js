const hmacSHA512 = require('crypto-js/hmac-sha512.js');
const Base64 = require('crypto-js/enc-base64.js');
const sha256 = require('crypto-js/sha256.js');
const dotenv = require('dotenv');
dotenv.config();
const SECRET_KEY =process.env.SECRET_KEY;

module.exports = {
  up: (queryInterface, Sequelize) => {
    let password = Base64.stringify(hmacSHA512(sha256('admin123').toString(), SECRET_KEY));
    return queryInterface.bulkInsert('User', [
      {
        username: 'admin',
        full_name: 'Selina',
        password: password,
        email: 'selina@gmail.com',
        role_id: 1,
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('User', null, {});
  }
};
