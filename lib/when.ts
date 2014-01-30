import Deferred = require('./Deferred');
import Promise = require('./Promise');
import IWhen = require('./IWhen');


var when: IWhen = (...args: any[]): Promise => {
	if (args.length === 1) {
		var arg = args[0];
		if (arg instanceof Deferred) {
			return (<Deferred>arg).promise;
		}
		if (arg instanceof Promise) {
			return arg;
		}
	}
	var done = new Deferred();
	if (args.length === 1) {
		done.resolve(args[0]);
		return done.promise;
	}
	var pending = args.length;
	var results = [];
	var onDone = (...resultArgs: any[]) => {
		results.push(resultArgs);
		if (--pending === 0) {
			done.resolve.apply(done, results);
		}
	};
	var onFail = () => {
		done.reject();
	};
	args.forEach(a => {
		(<Deferred>a).then(onDone, onFail);
	});
	return done.promise;
};

export = when;
