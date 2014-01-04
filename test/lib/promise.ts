import sinon = require('sinon');
import sinonChai = require('../sinon-chai');
var expect = sinonChai.expect;
import promise = require('../../lib/promise');


var Deferred = promise.Deferred;
var when = promise.when;

//ReSharper disable WrongExpressionStatement
describe('Deferred Object', () => {

	var d: promise.Deferred;
	var d1: number;
	var d2: number;
	var handlers = [() => { d1 = 1; }, () => { d2 = 2; }];
	beforeEach(() => {
		d = new Deferred();
		d1 = null;
		d2 = null;
	});

	describe('When deferred.notify is called', () => {

		it('any progressCallbacks are called in the order they were added', done => {
			var results = [];
			d.progress(() => {
				results.push('foo');
			});
			d.progress(() => {
				results.push('bar');
			});
			d.progress(() => {
				expect(results).to.deep.equal(['foo', 'bar']);
				done();
			});
			d.notify();
		});

		it('each callback is passed the args from the .notify()', done => {
			d.progress(r1 => {
				expect(r1).to.equal('foo');
			});
			d.progress((r1, r2) => {
				expect(r1).to.equal('foo');
				expect(r2).to.equal('bar');
				done();
			});
			d.notify('foo', 'bar');
		});

		it('any calls to .notify() after resolved or rejected are ignored', () => {
			var fn = sinon.spy();
			d.progress(fn);
			d.resolve();
			d.notify();
			expect(fn).to.not.have.been.called;
		});

		it('progressCallbacks added after resolved are executed immediately', () => {
			d.notify('foo');
			d.resolve();
			var fn = sinon.spy();
			d.progress(fn);
			expect(fn).to.have.been.calledOnce.and.calledWithExactly('foo');
		});

		it('progressCallbacks added after rejected are executed immediately', () => {
			d.notify('foo');
			d.reject();
			var fn = sinon.spy();
			d.progress(fn);
			expect(fn).to.have.been.calledOnce.and.calledWithExactly('foo');
		});

	});

	describe('then', () => {

		var f1: number;
		var f2: number;
		var p1: number;
		var p2: number;
		beforeEach(() => {
			f1 = null;
			f2 = null;
			p1 = null;
			p2 = null;
			d
			    .then(handlers[0], () => { f1 = 1; }, r1 => { p1 = r1; })
			    .then(handlers[1], () => { f2 = 2; }, r1 => { p2 = r1; })
			;
		});

		it('calls done handlers when Deferred is resolved', () => {
			d.resolve();
			expect(d1).to.equal(1);
			expect(d2).to.equal(2);
			expect(f1).to.equal(null);
			expect(f2).to.equal(null);
			expect(p1).to.equal(null);
			expect(p2).to.equal(null);
		});

		it('calls fail handlers when Deferred is rejected', () => {
			d.reject();
			expect(d1).to.be.null;
			expect(d2).to.be.null;
			expect(f1).to.equal(1);
			expect(f2).to.equal(2);
			expect(p1).to.equal(null);
			expect(p2).to.equal(null);
		});

		it('calls progress handlers when Deferred is still in progress', () => {
			d.notify('foo');
			expect(d1).to.be.null;
			expect(d2).to.be.null;
			expect(f1).to.equal(null);
			expect(f2).to.equal(null);
			expect(p1).to.equal('foo');
			expect(p2).to.equal('foo');
		});

	});

	describe('done', () => {

		beforeEach(() => {
			d.done.apply(d, handlers);
		});

		it('calls handlers when Deferred is resolved', () => {
			d.resolve();
			expect(d1).to.equal(1);
			expect(d2).to.equal(2);
		});

		it('does not call handlers when Deferred is rejected', () => {
			d.reject();
			expect(d1).to.be.null;
			expect(d2).to.be.null;
		});

	});

	describe('fail', () => {

		beforeEach(() => {
			d.fail.apply(d, handlers);
		});

		it('calls handlers when Deferred is rejected', () => {
			d.reject();
			expect(d1).to.equal(1);
			expect(d2).to.equal(2);
		});

		it('does not call handlers when Deferred is resolved', () => {
			d.resolve();
			expect(d1).to.be.null;
			expect(d2).to.be.null;
		});

	});

	describe('always', () => {

		beforeEach(() => {
			d.always.apply(d, handlers);
		});

		it('calls handlers when Deferred is resolved', () => {
			d.resolve();
			expect(d1).to.equal(1);
			expect(d2).to.equal(2);
		});

		it('calls handlers when Deferred is rejected', () => {
			d.reject();
			expect(d1).to.equal(1);
			expect(d2).to.equal(2);
		});

	});

});

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

		var d1: promise.Deferred;
		var d2: promise.Deferred;
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
