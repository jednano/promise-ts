import Deferred = require('./Deferred');


class Promise {

	constructor(private deferred: Deferred) {
	}

	then(doneFilter: Function, failFilter?: Function, progressFilter?: Function): Promise {
		return this.deferred.then(doneFilter, failFilter, progressFilter).promise;
	}

	done(...callbacks: Function[]): Promise {
		return (<Deferred>this.deferred.done.apply(this.deferred, callbacks)).promise;
	}

	fail(...callbacks: Function[]): Promise {
		return (<Deferred>this.deferred.fail.apply(this.deferred, callbacks)).promise;
	}

	always(...callbacks: Function[]): Promise {
		return (<Deferred>this.deferred.always.apply(this.deferred, callbacks)).promise;
	}

	get resolved(): boolean {
		return this.deferred.resolved;
	}

	get rejected(): boolean {
		return this.deferred.rejected;
	}

}

export = Promise;
