require("../../bootstrap.test.js")
import {login, logout, startLogging} from "../../util/e2eHelper.js"

describe('test browser admin pages', () => {
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

  it.only('quick switching admin paging',async (done) => {
    try {
      await browser.url('/admin/#/admin/user');
      await browser.pause(1000);
      await browser.url('/admin/#/admin/post');
      await browser.pause(10000);

      done();
    } catch (e) {
      console.error(e.stack);
      done(e);
    }
  });

});
