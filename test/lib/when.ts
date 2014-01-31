import sinonChai = require('../sinon-chai');
var expect = sinonChai.expect;
import Deferred = require('../../lib/Deferred');
import when = require('../../lib/when');


//ReSharper disable WrongExpressionStatement
describe('when function', () => {

	describe('single Object passed-in', () => {

		it('if Deferred, its Promise object is returned', () => {
			var d = new Deferred();
			expect(d.promise).to.equal(when(d));
		});

		it('if non-Deferred, non-Promise, doneCallbacks are executed immediately', done => {
			when('foo').done(r1 => {
				expect(r1).to.equal('foo');
				done();
			});
		});

	});

	describe('multiple-Deferreds passed-in', () => {

		var d1;
		var d2;
		beforeEach(() => {
			d1 = new Deferred();
			d2 = new Deferred();
		});

		it('resolves master Deferred when all Deferreds resolve', done => {
			when(d1, d2).done(() => {
				done();
			});
			d1.resolve();
			d2.resolve();
		});

		it('failCallbacks are immediately fired if one Deferred is rejected', done => {
			when(d1, d2).fail(() => {
				done();
			});
			d1.resolve();
			d2.reject();
		});

	});

});
