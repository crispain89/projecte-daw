const request = require('supertest')
const app = require('../app')

test('GET /usuarios',() =>{
    request(app)
    .get('/api/usuarios')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
        if (err) throw err;
    });
})