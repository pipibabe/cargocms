Cargo CMS
==========

Installation
-------------
1. Please install [NVM](https://github.com/creationix/nvm) first, in order to get NPM.

  ```
  curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash
  ```
  
2. Then install Node by following commands: 

  ```
  nvm install v6.9.1
  
  // set this version to default
  nvm alias default 6.9.1
  ```

- Mac
  
  ```
  brew install imagemagick
  brew install graphicsmagick
  brew install ruby
  gem install sass compass
  npm -g install babel-cli
  npm install
  ```

- Linux
  
  ```
  apt-get install ruby graphicsmagick imagemagick
  gem install sass compass
  npm -g install babel-cli
  npm install
  ```


Run
----


```
npm run build && npm start

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
* [creationix/nvm: Node Version Manager - Simple bash script to manage multiple active node.js versions](https://github.com/creationix/nvm)
* [安裝 Ruby](https://www.ruby-lang.org/zh_tw/documentation/installation/)

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
// 標準前台 route 對應功能
controllers/*Controller.js

// 後台功能 route 對應功能
controllers/admin/*Controller.js

// 標準 API 功能
controllers/api/*Controller.js

// 站台專屬客製前台功能以 labfnp 為例
controllers/labfnp/*Controller.js

// 站台專屬客製 API 功能
controllers/api/labfnp/*Controller.js
```
