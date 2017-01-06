// import product from './product/index.js';

module.exports.init = async function(){
  // await product.init();
  try {
    const {environment} = sails.config;

    sails.log.debug('>>>> config/init/motorworld >>>>');

    let newMenuItems = [
      { icon: 'home', href: '/admin/dashboard', title: '控制台', sequence: 0},
      { icon: 'wrench', href: '#', title: '資料維護', sequence: 1},

      { href: '/admin/user', title: '會員資料', sequence: 20, ParentMenuItemId: 2},
      { href: '/admin/message', title: '訊息', sequence: 140, ParentMenuItemId: 2},
      { href: '/admin/contact', title: '聯繫訊息', sequence: 150, ParentMenuItemId: 2},

    ]

    let title = newMenuItems.map(item => item.title)
    let findMenuItems = await MenuItem.findAll({where:{title}})
    let findTitle = findMenuItems.map(item => item.title)

    let createMenuItems = title.reduce((result, title, index) => {
      if(findTitle.indexOf(title) == -1){
        result.push(newMenuItems[index])
        return result
      }
      return result
    }, [])


    await MenuItem.bulkCreate(createMenuItems);

  } catch (e) {
    console.error(e);

  }
}
