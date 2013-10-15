var test = require('tape'),
    moduload = require('../moduload');

test('load gedi', function (t) {
    t.plan(1);
    moduload('gedi', '0.9.6', './modules', function(error, Gedi){
        var model = new Gedi({things:'stuff'});

        t.equal(model.get('[things]'), 'stuff');
        t.end();
    });
});

test('load gedi bad version', function (t) {
    t.plan(1);
    moduload('gedi', '0.0.0', './modules', function(error, Gedi){
        t.ok(error);
        t.end();
    });
});