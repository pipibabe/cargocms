describe('about Format Service operation.', function() {
  it('gen format', async (done) => {
    try {
      const result = FormatService.getQueryObj({ draw: '1',
        columns:[
           { data: 'id', name: '' },
           { data: 'username', name: '' },
           { data: 'displayName', name: '', "searchable": "false"},
           { data: 'email', name: '' },
           { data: 'lastLogin', name: '', "searchable": "false"},
           { data: '5', name: '', "searchable": "false"}
        ],
        order: [ { column: '0', dir: 'asc' } ],
        start: '0',
        length: '10',
        search: { value: 'userX', regex: 'false' },
        _: '1470989140227'
      });
      sails.log.debug(JSON.stringify(result, null, 2));
      result.where.should.be.Object;
      result.where.$or.should.be.Array;
      result.where.$or[0].id.$like.should.be.String;
      result.where.$or[0].id.$like.should.be.String;
      result.order[0].should.be.Array;
      result.order[0][0].should.be.Array;
      done();
    } catch (e) {
      done(e)
    }
  });
  it('user format query for find',async (done) => {
    try {
      const query = FormatService.getQueryObj({ draw: '1',
        columns:[
           { data: 'id', name: '' },
           { data: 'username', name: '' },
           { data: 'displayName', name: '', "searchable": "false"},
           { data: 'email', name: '' },
           { data: 'lastLogin', name: '', "searchable": "false"},
           { data: '5', name: '', "searchable": "false"}
        ],
        order: [ { column: '0', dir: 'asc' } ],
        start: '0',
        length: '10',
        search: { value: 'user', regex: 'false' },
        _: '1470989140227'
      });

      let users = await User.findAndCountAll(query)
      sails.log.debug(JSON.stringify(users, null, 2));
      done();

    } catch (e) {
      done(e)
    }

  })
});
