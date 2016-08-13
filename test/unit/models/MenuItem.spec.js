describe.only('about MenuItem model operation.', function() {
  it('create tree MenuItems should success.', async (done) => {
    try {
      let newMenuItem = { icon: 'wrench', href: '#', title: '資料維護'}
      let createdMenuItem = await MenuItem.create(newMenuItem);

      let subItems = [
        { href: '/admin/user', title: '會員資料' },
        { href: '/admin/post', title: '內容資料' }
      ]
      let promises = subItems.map(subItem => MenuItem.create(subItem))
      let createdSubMenuItems = await Promise.all(promises);


      await createdMenuItem.addSubMenuItems(createdSubMenuItems);

      let menuItems = await MenuItem.findAllWithSubMenu();
      console.log(JSON.stringify(menuItems, null, 2));
      done();
    } catch (e) {
      done(e)
    }
    // {
    //   "id": 1,
    //   "icon": "wrench",
    //   "href": "#",
    //   "title": "資料維護",
    //   "ParentMenuItemId": null,
    //   "SubMenuItems": [
    //     {
    //       "id": 2,
    //       "icon": null,
    //       "href": "/admin/user",
    //       "title": "會員資料",
    //       "ParentMenuItemId": 1
    //     }
    //   ]
    // }
  });


});
