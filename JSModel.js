//
// Copyright © 2017-Present, Gaurav D. Sharma
// All rights reserved.
//
'use strict';

require('./JSONPruned');

export default class JSONModel {
	constructor(json = {}) {
		if (this.validate(json)) {
			Object.assign(this, json);
			this.loadExtra(json);
		}
	}

	validate(json) {
		return typeof json !== 'undefined';
	}

	/// this method use in case you want to hack(prototype) your model and want to introduced new keys
	loadExtra(json = {}) {}

	// id => appID, first_name => firstName
	// pass args as `{id: 'appID', first_name: 'firstName'}`
	keyMapper(hash) {
		for (const key in hash) {
			this[hash[key]] = this[key];
			delete this[key];
		}
	}

	clone() {
		return Object.assign(Object.create(this), this);
	}

	toJSON() {
		return JSON.pruned(this);
	}
}
