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

  it('import group should be success.', async (done) => {
    connection.query('SELECT * from tb_class', function(err, rows, fields) {
      if (err) throw err;
      console.log('The length is: ', rows.length);

      done();
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

  it('import file to image should be success.', async (done) => {
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
