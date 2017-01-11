
var Sails = require('sails');
describe.only('about Customer model operation.', function() {
  describe('test create customer', function() {
      it('should success.', async (done) => {
          try {
            const customer = await Customer.create({
              name: `customer`,
              email: `customer@gmail.com`,
              firstName: 'customer',
              lastName: 'some',
            });
            customer.should.be.Object;
            customer.name.should.be.equal('customer');
            done();
          } catch (e) {
            done(e)
          }
      });

      it('create customer with null name should fail.', async (done) => {
          try {
            const res = await Customer.create({
              name: null,
              email: `customer@gmail.com`,
              firstName: 'customer',
              lastName: 'some',
            });
            sails.log.info('create customer model spec =>', res);
            done(new Error("should be 'notNull Violation'"));
          } catch (e) {
              sails.log.info('error.type=>', e.errors[0].type);
              const checkError = e.errors[0].type === 'notNull Violation';
              if (checkError) done();
              else done(e);
          }
      });
  });

  describe('test index customer', function() {
      it('should success.', async (done) => {
          try {
            const result = await Customer.findAndCountAll();
            result.rows[0].should.be.Object;
            result.rows[0].id.should.be.equal(1);
            result.count.should.be.equal(1);
            done();
          } catch (e) {
            sails.log.info('!!!error=>', e);
            done(e)
          }
      });
  });

  describe('test update customer', function() {
      it('should success.', async (done) => {
          try {
            const customer = await Customer.findById(1)
            customer.name = 'hello'
            customer.email = 'update@gmail.com'
            await customer.save();

            (await Customer.findById(1)).should.be.Object;
            (await Customer.findById(1)).id.should.be.equal(1);
            (await Customer.findById(1)).name.should.be.equal('hello');
            (await Customer.findById(1)).email.should.be.equal('update@gmail.com');
            done();
          } catch (e) {
            sails.log.info('!!!error=>', e);
            done(e)
          }
      });
  });

  describe('test customer name and email should be unique.', function() {
      before(async (done) => {
        try {
          const customer = await Customer.create({
            name: `customer2`,
            email: `customer2@gmail.com`,
            firstName: 'customer2',
            lastName: 'some2',
          });
          done();
        } catch (e) {
          done(e)
        }
      });
      it('create customer with duplicate name should failed.', async (done) => {
          try {
            const customer = await Customer.findOne()
            await Customer.create({
              name: customer.name,
              email: `lala@gmail.com`,
              firstName: customer.firstName,
              lastName: customer.lastName,
            });
            sails.log.info('create customer model spec =>', res);
            done(new Error("should be 'unique violation'"));
          } catch (e) {
            //   sails.log.info('!!!error=>', e);
              sails.log.info('error.message=>', e.errors[0].message);
              const checkError = e.errors[0].message === 'name must be unique';
              if (checkError) done();
              else done(e);
          }
      });
      it('update customer with duplicate name should failed.', async (done) => {
          try {
            const customer1 = await Customer.findById(1)
            const customer2 = await Customer.findById(2)
            customer2.name = customer1.name
            await customer2.save();
            sails.log.info('create customer model spec =>', res);
            done(new Error("should be 'unique violation'"));
          } catch (e) {
            //   sails.log.info('!!!error=>', e);
              sails.log.info('error.message=>', e.errors[0].message);
              const checkError = e.errors[0].message === 'name must be unique';
              if (checkError) done();
              else done(e);
          }
      });
      it('create customer with duplicate email should failed.', async (done) => {
          try {
            const customer = await Customer.findOne()
            await Customer.create({
              name: `lala`,
              email: customer.email,
              firstName: customer.firstName,
              lastName: customer.lastName,
            });
            sails.log.info('create customer model spec =>', res);
            done(new Error("should be 'unique violation'"));
          } catch (e) {
            //   sails.log.info('!!!error=>', e);
              sails.log.info('error.message=>', e.errors[0].message);
              const checkError = e.errors[0].message === 'email must be unique';
              if (checkError) done();
              else done(e);
          }
      });
      it('update customer with duplicate email should failed.', async (done) => {
          try {
            const customer1 = await Customer.findById(1)
            const customer2 = await Customer.findById(2)
            customer2.email = customer1.email
            await customer2.save();
            sails.log.info('create customer model spec =>', res);
            done(new Error("should be 'unique violation'"));
          } catch (e) {
            //   sails.log.info('!!!error=>', e);
              sails.log.info('error.message=>', e.errors[0].message);
              const checkError = e.errors[0].message === 'email must be unique';
              if (checkError) done();
              else done(e);
          }
      });
      it('create customer with duplicate name and email should failed.', async (done) => {
          try {
            const customer = await Customer.findOne()
            await Customer.create({
              name: customer.name,
              email: customer.email,
              firstName: customer.firstName,
              lastName: customer.lastName,
            });
            sails.log.info('create customer model spec =>', res);
            done(new Error("should be 'unique violation'"));
          } catch (e) {
            //   sails.log.info('!!!error=>', e);
              sails.log.info('error.type=>', e.errors[0].type);
              const checkError = e.errors[0].type === 'unique violation';
              if (checkError) done();
              else done(e);
          }
      });
      it('update customer with duplicate name and email should failed.', async (done) => {
          try {
            const customer1 = await Customer.findById(1)
            const customer2 = await Customer.findById(2)
            customer2.name = customer1.name
            customer2.email = customer1.email
            await customer2.save();
            sails.log.info('create customer model spec =>', res);
            done(new Error("should be 'unique violation'"));
          } catch (e) {
              sails.log.info('!!!error=>', e);
              sails.log.info('error.type=>', e.errors[0].type);
              const checkError = e.errors[0].type === 'unique violation';
              if (checkError) done();
              else done(e);
          }
      });
  });

  describe('test delete customer', function() {
      it('should success.', async (done) => {
          try {
            const customer = await Customer.findOne();
            await Customer.deleteById(customer.id);
            const checkCustomer = await Customer.findById(customer.id);
            (checkCustomer === null).should.be.true;
            done();
          } catch (e) {
            sails.log.info('!!!error=>', e);
            done(e)
          }
      });
  });


});
