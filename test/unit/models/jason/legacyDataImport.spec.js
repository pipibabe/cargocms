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

  it('import group should be success.',  (done) => {
    connection.query('SELECT DISTINCT c_title, c_id, c_sort, c_belong FROM `tb_class` WHERE c_belong != 0', function(err, rows, fields) {
      if (err) throw err;

      let productRows = rows.map((row, index) => {
        let newGroup = Group.build();
        newGroup.title = row.c_title
        newGroup.sequence = row.c_sort
        switch (row.c_belong) {
          case 1:
            newGroup.type = 'product';
            break;
          case 3:
            newGroup.type = 'part';
            break;
          case 7:
            newGroup.type = 'performance';
            break;
          default:
        }
        newGroup.id = row.c_id
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

  it('import product should be success.', async (done) => {
    connection.query('SELECT p_id, p_title, p_type, p_type2, p_note, p_content, c_id FROM `tb_goods`', function(err, rows, fields) {
      if (err) throw err;
      console.log('The length is: ', rows.length);
      let createRows = rows.map(async (e) => {
        return Post.createItem({
          title: e.p_title,
          modelName: e.p_type,
          specification: e.p_type2,
          introduction: e.p_note,
          groupId: e.c_id,
          itemType: Product,
          content: e.p_content,
          id: e.p_id,
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
    connection.query('SELECT p_id, p_title, p_type, p_type2, p_note, p_content, c_id FROM `tb_part`', function(err, rows, fields) {
      if (err) throw err;
      console.log('The length is: ', rows.length);
      let createRows = rows.map(async (e) => {
        return Post.createItem({
          title: e.p_title,
          modelName: e.p_type,
          specification: e.p_type2,
          introduction: e.p_note,
          groupId: e.c_id,
          itemType: Part,
          content: e.p_content,
          id: e.p_id,
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
    connection.query('SELECT p_id, p_title, p_type, p_note, p_content, c_id FROM `tb_performance`', function(err, rows, fields) {
      if (err) throw err;
      console.log('The length is: ', rows.length);
      let createRows = rows.map(async (e) => {
        return Post.createPerformance({
          title: e.p_title,
          location: e.p_type,
          introduction: e.p_note,
          groupId: e.c_id,
          itemType: Performance,
          content: e.p_content,
          id: e.p_id,
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

  it('import product file should be success.', async (done) => {
    connection.query('SELECT f_id, f_name, f_belong, belong_id, f_type, f_size FROM `tb_file` WHERE f_belong in ("goods", "goods_pdf", "part", "part_pdf", "performance")', function(err, rows, fields) {
      if (err) throw err;
      console.log('The length is: ', rows.length);
      const imageTypes = ["goods", "part", "performance"];
      let createRows = rows.map(async (e) => {
        let fileType = (imageTypes.indexOf(e.f_belong) > -1) ? Image : File;
        let newFile = fileType.build();
        newFile.filePath = e.f_name;
        newFile.type = e.f_type;
        newFile.size = e.f_size;
        newFile.id = e.f_id;
        if (["goods", "goods_pdf"].indexOf(e.f_belong) > -1) {
          let belongsToItem = await Product.findOne({ where: { id: e.belong_id } });
          if(belongsToItem)
            newFile.ProductId = e.belong_id;
        } else if (["part", "part_pdf"].indexOf(e.f_belong) > -1) {
          let belongsToItem = await Part.findOne({ where: { id: e.belong_id } });
          if(belongsToItem)
            newFile.PartId = e.belong_id;
        } else {
          let belongsToItem = await Performance.findOne({ where: { id: e.belong_id } });
          if(belongsToItem)
            newFile.PerformanceId = e.belong_id;
        }
        return newFile.save();
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

  after((done) => {
    connection.end();
    done();
  })
});
