require("../../bootstrap.test.js")
import {login, logout, startLogging} from "../../util/e2eHelper.js"

describe('test browser admin pages', function() {
  this.timeout(10000000);

  before(async (done)=>{
    try {
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

  it.only('loading 104 page of user',async (done) => {
    try {
      await browser.url('/admin/#/admin/user');
      await browser.pause(1000);
      await browser.click('#main-table_paginate > ul > li:nth-child(3) > a');
      await browser.pause(100);
      await browser.click('#main-table_paginate > ul > li:nth-child(4) > a');
      await browser.pause(100);
      await browser.click('#main-table_paginate > ul > li:nth-child(5) > a');
      for(var i=0;i<100;i++) {
        await browser.pause(100);
        await browser.click('#main-table_paginate > ul > li:nth-child(6) > a');
      }
      await browser.screenshot();

      done();
    } catch (e) {
      console.error(e.stack);
      done(e);
    }
  });

  it('loading 104 page of recipe',async (done) => {
    try {
      await browser.url('/admin/#/admin/labfnp/recipe');
      await browser.pause(1000);
      await browser.click('#main-table_paginate > ul > li:nth-child(3) > a');
      await browser.pause(100);
      await browser.click('#main-table_paginate > ul > li:nth-child(4) > a');
      await browser.pause(100);
      await browser.click('#main-table_paginate > ul > li:nth-child(5) > a');
      for(var i=0;i<100;i++) {
        await browser.pause(100);
        await browser.click('#main-table_paginate > ul > li:nth-child(6) > a');
      }
      await browser.screenshot();

      done();
    } catch (e) {
      console.error(e.stack);
      done(e);
    }
  });

  it('loading 104 page of feeling',async (done) => {
    try {
      await browser.url('/admin/#/admin/labfnp/feeling');
      await browser.pause(1000);
      await browser.click('#main-table_paginate > ul > li:nth-child(3) > a');
      await browser.pause(100);
      await browser.click('#main-table_paginate > ul > li:nth-child(4) > a');
      await browser.pause(100);
      await browser.click('#main-table_paginate > ul > li:nth-child(5) > a');
      for(var i=0;i<100;i++) {
        await browser.pause(100);
        await browser.click('#main-table_paginate > ul > li:nth-child(6) > a');
      }
      await browser.screenshot();

      done();
    } catch (e) {
      console.error(e.stack);
      done(e);
    }
  });

});
