declare module "promise-ts" {
	export = PromiseTs;
}

declare module PromiseTs {

	export class Deferred {
		private doneCallbacks;
		private failCallbacks;
		private progressCallbacks;
		private _promise;
		private _state;
		private _result;
		private _notifyContext;
		private _notifyArgs;
		constructor();
		public promise: Promise;
		public state: string;
		public rejected: boolean;
		public resolved: boolean;
		public resolve(...args: any[]): Deferred;
		public resolveWith(context: any, ...args: any[]): Deferred;
		public reject(...args: any[]): Deferred;
		public rejectWith(context: any, ...args: any[]): Deferred;
		public progress(...callbacks: Function[]): Deferred;
		public notify(...args: any[]): Deferred;
		public notifyWith(context: any, ...args: any[]): Deferred;
		private checkStatus();
		public then(doneFilter: Function, failFilter?: Function, progressFilter?: Function): Deferred;
		private wrap(d, f, method);
		public done(...callbacks: Function[]): Deferred;
		public fail(...callbacks: Function[]): Deferred;
		public always(...callbacks: Function[]): Deferred;
	}

	export class Promise {
		private deferred;
		constructor(deferred: Deferred);
		public then(doneFilter: Function, failFilter?: Function, progressFilter?: Function): Promise;
		public done(...callbacks: Function[]): Promise;
		public fail(...callbacks: Function[]): Promise;
		public always(...callbacks: Function[]): Promise;
		public resolved: boolean;
		public rejected: boolean;
	}

	export var when: IWhen;
}

interface IWhen {
	(deferred: PromiseTs.Deferred): PromiseTs.Promise;
	(promise: PromiseTs.Promise): PromiseTs.Promise;
	(object: any): PromiseTs.Promise;
	(...args: PromiseTs.Deferred[]): PromiseTs.Promise;
}
