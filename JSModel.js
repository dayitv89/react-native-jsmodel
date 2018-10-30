//
// Copyright © 2017-Present, Gaurav D. Sharma
// All rights reserved.
//
'use strict';

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
		return new this.constructor(JSON.parse(this.toJSON()));
	}

	toJSON() {
		return JSON.stringify(this);
	}
}
