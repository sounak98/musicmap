const request = require('supertest')
const dotenv = require('dotenv');
let { app } = require('../dist/index'); 

dotenv.config();

let httpServer;

var address = '0xb2822fecc23ed5e5eef912c24669263aa780fd3ea3ebbaab099085b21c44bfa3';
var account = '0x751b934e7496e437503d74d0679a45e49c0b7071';
var creator = 'Amine Larhrib';
var coinType = 'CRD';

before(function () {
  //start the server
  httpServer = app.listen(process.env.HTTP_SERVER_PORT, () => {
    console.log(`Server started at port ${process.env.HTTP_SERVER_PORT}`);
  })
});

after(function () {
  //stop the server
  httpServer.close();
  //exit this process
  process.exit(0);
})

describe('running tests for API', function () {

  // increase timeout limit
  this.timeout(5000);

  it('stores new address', function(done) {
    request(httpServer)
      .post('/addresses')
      .send({
        "creator": creator,
        "coinType": coinType,
        "address": address,
        "account": account
      })
      .expect(201, {
            "creator": creator,
            "coinType": coinType,
            "address": address,
            "account": account,
            "success": true
        }, done);
  })

  it('searches ACTIVE address and returns true', function(done) {
    request(httpServer)
      .get('/addresses?coinType='+coinType+'&account='+account+'&address='+address)
      .expect(200, {
        "confidence": "100",
        "success": true,
        "address": address,
        "account": account,
        "coinType": coinType
    }, done);
  })

  it('Deactivates ACTIVE address', function(done) {
    request(httpServer)
      .delete('/addresses?coinType='+coinType+'&account='+account+'&address='+address+'&creator='+creator)
      .expect(200, {
            "creator": creator,
            "coinType": coinType,
            "address": address,
            "account": account,
            "success": true
        }, done);
  })

  it('searches INACTIVE Address and returns false', function(done) {
    request(httpServer)
      .get('/addresses?coinType='+coinType+'&account='+account+'&address='+address)
      .expect(404, {
        "success": false,
        "confidence": 0,
        "address": address,
        "account": account,
        "coinType": coinType
    }, done);
  })

  it('cannot Deactivate already INACTIVE address', function(done) {
    request(httpServer)
      .delete('/addresses?coinType='+coinType+'&account='+account+'&address='+address+'&creator='+creator)
      .expect(500, /\"success\":false/ig, done);
  })

  it('activates an INACTIVE address', function(done) {
    request(httpServer)
      .post('/addresses')
      .send({
        "creator": creator,
        "coinType": coinType,
        "address": address,
        "account": account
      })
      .expect(201, {
            "creator": creator,
            "coinType": coinType,
            "address": address,
            "account": account,
            "success": true
        }, done);
  })

  it('cannot activate already ACTIVE address', function(done) {
    request(httpServer)
      .post('/addresses')
      .send({
        "creator": creator,
        "coinType": coinType,
        "address": address,
        "account": account
      })
      .expect(500, /\"success\":false/ig, done);
  })
})
