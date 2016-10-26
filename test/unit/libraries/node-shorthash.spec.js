import sh from "shorthash"

describe.only('short hash.', () => {

  it('test', (done) => {
    console.log(sh.unique('e47f8519-Meet-22019020'));

    done();
  });


});
