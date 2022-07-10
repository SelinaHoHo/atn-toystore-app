module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Product', [
      {
        product_name: 'Luffy Paradigm',
        quantity: '10',
        price: '200',
        image: 'https://www.vietnampctopone.com/uploads/product/mo-hinh-luffy-gear-4-pop-xxl-khong-lo-39cm-V1OQWHTob2.jpg',
        user_id: 1,
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('User', null, {});
  }
};
