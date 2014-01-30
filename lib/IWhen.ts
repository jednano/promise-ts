import Deferred = require('./Deferred');
import Promise = require('./Promise');


interface IWhen {
	(deferred: Deferred): Promise;
	(promise: Promise): Promise;
	(object: any): Promise;
	(...args: Deferred[]): Promise;
}

export = IWhen;