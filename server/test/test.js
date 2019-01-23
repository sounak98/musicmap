const request = require('supertest')
const dotenv = require('dotenv');
let { app } = require('../dist/index');

dotenv.config();

let httpServer;

// var httpServer = 'http://localhost:4000';

var address = '0xb2822fecc23ed5e5eef912c24669263aa780fd3ea3ebbaab099085b21c44bfa3';
var account = '0x751b934e7496e437503d74d0679a45e49c0b7071';
var creator = 'Amine Larhrib';
var coinType = 'CRD';

var username = 'test';
var password = 'password';
var newPassword = 'helloworld';
var email = 'test@test.com';
var genericUsername = 'test1';
var genericEmail = 'test1@test.com';

let token;

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
  this.timeout(10000);

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

  it('CAN sign up a new user', function(done) {
    request(httpServer)
      .post('/signup')
      .send({ username, email, password})
      .set("Content-Type", "application/x-www-form-urlencoded")
      .expect(200, done);
  })

  it ('CAN login with the created user', function(done) {
    request(httpServer)
      .post('/login')
      .send({ email, password })
      .set("Content-Type", "application/x-www-form-urlencoded")
      .expect(200)
      .then(res => {
        token = res.body.token;
        done();
      });
  })

  it ('CANNOT login with wrong credentials', function(done) {
    request(httpServer)
      .post('/login')
      .send({ genericEmail, password })
      .set("Content-Type", "application/x-www-form-urlencoded")
      .expect(401, done);
  })

  it ('CAN change the user password', function(done) {
    request(httpServer)
      .post('/changePassword')
      .send({ password: newPassword })
      .set("Content-Type", "application/x-www-form-urlencoded")
      .set("Authorization", "Bearer " + token)
      .expect(200, done);
  })

  it ('CAN login with new credentials', function(done) {
    request(httpServer)
      .post('/login')
      .send({ email, password: newPassword })
      .set("Content-Type", "application/x-www-form-urlencoded")
      .expect(200, done);
  })

  it ('CANNOT login with old credentials', function(done) {
    request(httpServer)
      .post('/login')
      .send({ email, password })
      .set("Content-Type", "application/x-www-form-urlencoded")
      .expect(401, done);
  })

  it ('CAN check the availability of an unused username', function(done) {
    request(httpServer)
      .get('/available?username=' + genericUsername)
      .expect(200)
      .expect(res => {
        return res.body.message;
      })
      .end(done);
  })

  it ('CAN check the availability of an used username', function(done) {
    request(httpServer)
      .get('/available?username=' + genericUsername)
      .expect(200)
      .expect(res => {
        return !res.body.message;
      })
      .end(done);
  })

  it ('CAN access the protected route using the token', function(done) {
    request(httpServer)
      .get('/protected')
      .set("Authorization", "Bearer " + token)
      .expect(200, done);
  })

  it ('CANNOT access the protected route without the token', function(done) {
    request(httpServer)
      .get('/protected')
      .expect(401, done);
  })

  it ('CAN delete the created user', function(done) {
    request(httpServer)
      .get('/remove')
      .set("Authorization", "Bearer " + token)
      .expect(200, done);
  })
})
