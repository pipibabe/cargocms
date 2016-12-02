require("../../bootstrap.test.js")
let user = require('../../../config/init/fakeusers');
import {login, logout, startLogging} from "../../util/e2eHelper.js"

describe('test browser admin pages', function() {
  this.timeout(10000000);

  before(async (done)=>{
    try {
      // add fake user data
      await user.init();

      console.log("=== admin login ===");
      await login("admin");
      // 開啟分頁之後，PID會變化...
      startLogging();
      done();
    } catch (e) {
      done(e);
    }
  })
  after(async (done)=>{
    try {
      await logout();
      done();
    } catch (e) {
      done(e);
    }
  })

  it('loading 80 page of user',async (done) => {
    try {
      await browser.url('/admin/#/admin/user');
      // test different page
      // await browser.url('/admin/#/admin/labfnp/feeling');
      // await browser.url('/admin/#/admin/labfnp/recipe');
      await browser.pause(1000);
      await browser.click('#main-table_paginate > ul > li:nth-child(3) > a');
      await browser.pause(100);
      await browser.click('#main-table_paginate > ul > li:nth-child(4) > a');
      await browser.pause(100);
      await browser.click('#main-table_paginate > ul > li:nth-child(5) > a');
      for(var i=0;i<74;i++) {
        await browser.pause(100);
        await browser.click('#main-table_paginate > ul > li:nth-child(6) > a');
      }
      await browser.pause(100);
      await browser.click('#main-table_paginate > ul > li:nth-child(7) > a');
      await browser.pause(100);
      await browser.click('#main-table_paginate > ul > li:nth-child(8) > a');
      await browser.pause(1000);
      await browser.screenshot();

      done();
    } catch (e) {
      console.error(e.stack);
      done(e);
    }
  });

});
