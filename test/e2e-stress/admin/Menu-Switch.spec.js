require("../../bootstrap.test.js")
let user = require('../../../config/init/fakeusers');
import {login, logout, startLogging, stopLogging} from "../../util/e2eHelper.js"

describe('test browser admin pages', function() {
  this.timeout(10000000);

  before(async (done)=>{
    try {
      console.log("=== admin login ===");
      await login("admin");
      // 開啟分頁之後，PID會變化...
      startLogging("menu-switch-");
      done();
    } catch (e) {
      done(e);
    }
  })
  after(async (done)=>{
    try {
      await logout();
      stopLogging();
      done();
    } catch (e) {
      done(e);
    }
  })

  it('loading different pages',async (done) => {
    try {
      for (let value of [...Array(3)]) {

        await browser.url('/admin/#/admin/user');
        await browser.pause(400);

        await browser.url('/admin/#/admin/post');
        await browser.pause(400);

        await browser.url('/admin/#/admin/event');
        await browser.pause(400);

        await browser.url('/admin/#/admin/labfnp/recipe');
        await browser.pause(400);

        await browser.url('/admin/#/admin/labfnp/scent');
        await browser.pause(400);

        await browser.url('/admin/#/admin/labfnp/scentnote');
        await browser.pause(400);

        await browser.url('/admin/#/admin/labfnp/feeling');
        await browser.pause(400);

        await browser.url('/admin/#/admin/quote');
        await browser.pause(400);

        /* allpay, eventallpay not work on test env
        await browser.url('/admin/#/admin/allpay');
        await browser.pause(400);

        await browser.url('/admin/#/admin/eventallpay');
        await browser.pause(400);
        */

        await browser.url('/admin/#/admin/facebook/feed');
        await browser.pause(400);

        await browser.url('/admin/#/admin/message');
        await browser.pause(400);

        await browser.url('/admin/#/admin/contact');
        await browser.pause(400);
      }

      done();

    } catch (e) {
      console.error(e.stack);
      done(e);
    }
  });

});
