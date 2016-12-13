Cargo CMS
==========

Installation
-------------

Mac
```
brew install imagemagick
brew install graphicsmagick
```

Linux
```
apt-get install graphicsmagick imagemagick
```

```
gem install sass compass
npm -g install babel-cli

npm install
```

Run
----

```
npm run build

npm start
```

Ports
-------

* 5001 development sails server
* 5002 development react admin dev server
* 5011 production sails server

References
-----------

* [SB Admin React](http://startreact.com/themes/sb-admin-react-3/)
* [ng-admin](http://ng-admin-book.marmelab.com/)
* [react-admin](https://github.com/marmelab/react-admin)
* [AdminLTE - Free Premium Admin control Panel Theme](https://github.com/almasaeed2010/AdminLTE)
* [StrapUI](http://www.strapui.com/)

Issues
------

EJS JS/CSS Injection Issues

http://stackoverflow.com/questions/6609238/is-there-a-way-to-add-css-js-later-using-ejs-with-nodejs-express

## use Cloud front

need to set `cors.origin`

ex:

cors.origin: 'http://cargo.trunksys.com, https://cargo.trunksys.com',

## Project Layout

### View Usages

```
// date only
<%=: row.createdAt | formatDate %>

// date time
<%=| row.createdAt | formatDateTime %>
```

### Controller

```
// 標準前台功能
controllers/*Controller.js

// 標準 API 功能
controllers/api/*Controller.js

// 後台功能
controllers/admin/*Controller.js

// 站台專屬客製前台功能以 labfnp 為例
controllers/labfnp/*Controller.js

// 站台專屬客製 API 功能
controllers/api/labfnp/*Controller.js
```
