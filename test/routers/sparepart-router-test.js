var should = require('should');
var request = require('supertest');
var uri = `${process.env.IP}:${process.env.PORT}`;

function getData() {
    var Sparepart = require('dl-models').core.Sparepart;
    var Uom = require('dl-models').core.Uom;

    var sparepart = new Sparepart();
    
    var uom = new Uom({
        unit: 'Meter'
    });

    var now = new Date();
    var stamp = now / 1000 | 0;
    var code = stamp.toString(36);

    sparepart.code = code;
    sparepart.name = `name[${code}]`;
    sparepart.description = `description [${code}]`;
    sparepart.uom = uom;
    
    return sparepart;
}

it('#01. Should be able to get list', function (done) {
    request(uri)
        .get('/v1/core/spareparts')
        .expect(200)
        .end(function (err, response) {
            if (err)
                done(err);
            else {
                var result = response.body;
                result.should.have.property("apiVersion");
                result.should.have.property('data');
                result.data.should.instanceOf(Array);
                done();
            }
        });
})

it('#02. should success when create new data', function (done) {
    var data = getData();
    
    request(uri).post('/v1/core/spareparts')
        .send(data)
        .end(function (err, res) {
            if (err) {
                done(err);
            } else {
                done();

            }
        });
});

var createdData;
var createdId;
it(`#03. should success when update created data`, function (done) {
    request(uri).put('/v1/core/spareparts')
        .send({ name: 'Manny', code: 'cat' })
        .end(function (err, res) {
            if (err) {
                done(err);
            } else {
                done();
            }
        });
});

it("#04. should success when delete data", function(done) {
    request(uri).del('/v1/core/spareparts/:id')
    .query({_id:createdId})
    .end(function (err, res) {
            if (err) {
                done(err);
            } else {
                done();
            }
        });
});