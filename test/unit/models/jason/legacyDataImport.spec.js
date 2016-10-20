var mysql      = require('mysql');


describe.only('jason legacy data', function() {
  var connection = null;
  before((done) => {
    connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'jason_auto_old'
    });
    connection.connect();

    done();
  })

  it('import product group should be success.',  (done) => {
    connection.query('SELECT DISTINCT c_title, c_sort FROM `tb_goods` a, `tb_class` b WHERE a.c_id = b.c_id ORDER BY `b`.`c_title` ASC', function(err, rows, fields) {
      if (err) throw err;

      let productRows = rows.map((row, index) => {
        let newGroup = Group.build();
        newGroup.title = row.c_title
        newGroup.sequence = row.c_sort
        newGroup.type = 'product'
        return newGroup.save();
      });
      console.log('The length is: ', productRows.length);
      Promise.all(productRows)
      .then(() => {
        done();
      }).catch(function(reason) {
        console.log(reason.stack);
        done();
      });
    });

  });

  it('import part group should be success.',  (done) => {
    connection.query('SELECT DISTINCT c_title, c_sort FROM `tb_part` a, `tb_class` b WHERE a.c_id = b.c_id ORDER BY `b`.`c_title` ASC', function(err, rows, fields) {
      if (err) throw err;

      let partRows = rows.map((row, index) => {
        let newGroup = Group.build();
        newGroup.title = row.c_title
        newGroup.sequence = row.c_sort
        newGroup.type = 'part'
        return newGroup.save();
      });
      console.log('The length is: ', partRows.length);
      Promise.all(partRows)
      .then(() => {
        done();
      }).catch(function(reason) {
        console.log(reason.stack);
        done();
      });
    });

  });

  it('import group should be success.',  (done) => {
    connection.query('SELECT DISTINCT c_title, c_sort FROM `tb_performance` a, `tb_class` b WHERE a.c_id = b.c_id ORDER BY `b`.`c_title` ASC', function(err, rows, fields) {
      if (err) throw err;

      let performanceRows = rows.map((row, index) => {
        let newGroup = Group.build();
        newGroup.title = row.c_title
        newGroup.sequence = row.c_sort
        newGroup.type = 'part'
        return newGroup.save();
      });
      console.log('The length is: ', performanceRows.length);
      Promise.all(performanceRows)
      .then(() => {
        done();
      }).catch(function(reason) {
        console.log(reason.stack);
        done();
      });
    });

  });

  it('import product should be success.', async (done) => {
    connection.query('SELECT p_title, p_type, p_type2, p_note, p_content, c_title FROM `tb_goods` a, `tb_class` b WHERE a.c_id = b.c_id', function(err, rows, fields) {
      if (err) throw err;
      console.log('The length is: ', rows.length);
      let createRows = rows.map(async (e) => {
        let group = await Group.findOne({
          where: {
            title: e.c_title
          }
        });
        return Post.createItem({
          title: e.p_title,
          modelName: e.p_type,
          specification: e.p_type2,
          introduction: e.p_note,
          groupId: group.id,
          itemType: Product,
          content: e.p_content,
        })
      });
      Promise.all(createRows)
      .then(() => {
        done();
      }).catch(function(reason) {
        console.log(reason.stack);
        done();
      });

    });
  });

  it('import part should be success.', async (done) => {
    connection.query('SELECT p_title, p_type, p_type2, p_note, p_content, c_title FROM `tb_part` a, `tb_class` b WHERE a.c_id = b.c_id', function(err, rows, fields) {
      if (err) throw err;
      console.log('The length is: ', rows.length);
      let createRows = rows.map(async (e) => {
        let group = await Group.findOne({
          where: {
            title: e.c_title
          }
        });
        return Post.createItem({
          title: e.p_title,
          modelName: e.p_type,
          specification: e.p_type2,
          introduction: e.p_note,
          groupId: group.id,
          itemType: Part,
          content: e.p_content,
        })
      });
      Promise.all(createRows)
      .then(() => {
        done();
      }).catch(function(reason) {
        console.log(reason.stack);
        done();
      });

    });
  });

  it('import performance should be success.', async (done) => {
    connection.query('SELECT p_title, p_type, p_note, p_content, c_title FROM `tb_performance` a, `tb_class` b WHERE a.c_id = b.c_id', function(err, rows, fields) {
      if (err) throw err;
      console.log('The length is: ', rows.length);
      let createRows = rows.map(async (e) => {
        let group = await Group.findOne({
          where: {
            title: e.c_title
          }
        });
        return Post.createPerformance({
          title: e.p_title,
          location: e.p_type,
          introduction: e.p_note,
          groupId: group.id,
          itemType: Performance,
          content: e.p_content,
        })
      });
      Promise.all(createRows)
      .then(() => {
        done();
      }).catch(function(reason) {
        console.log(reason.stack);
        done();
      });

    });
  });

  it('import file should be success.', async (done) => {
    connection.query('SELECT * from tb_file', function(err, rows, fields) {
      if (err) throw err;
      console.log('The length is: ', rows.length);

      done();
    });
  });




  after((done) => {
    connection.end();
    done();
  })
});
