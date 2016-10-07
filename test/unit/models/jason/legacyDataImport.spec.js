var mysql      = require('mysql');


describe.only('jason legacy data', function() {
  var connection = null;
  before((done) => {
    connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'root',
      database : 'jason_auto_old'
    });
    connection.connect();

    done();
  })

  it('import group should be success.',  (done) => {
    connection.query('SELECT * from tb_class', function(err, rows, fields) {
      if (err) throw err;

      console.log('The length is: ', rows.length);

      let createRows = rows.map((row, index) => {
        let newGroup = Group.build();
        newGroup.title = row.c_title
        newGroup.sourceId = row.c_id
        newGroup.save();
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

  it('import product should be success.', async (done) => {
    connection.query('SELECT * from tb_goods', function(err, rows, fields) {
      if (err) throw err;
      console.log('The length is: ', rows.length);

      done();
    });
  });

  it('import part should be success.', async (done) => {
    connection.query('SELECT * from tb_part', function(err, rows, fields) {
      if (err) throw err;
      console.log('The length is: ', rows.length);

      done();
    });
  });

  it('import performance should be success.', async (done) => {
    connection.query('SELECT * from tb_performance', function(err, rows, fields) {
      if (err) throw err;
      console.log('The length is: ', rows.length);

      done();
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
