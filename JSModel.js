//
// Copyright © 2017-Present, Gaurav D. Sharma
// All rights reserved.
//
'use strict';

export default class JSONModel {
	constructor(json) {
		this.validate(json) && Object.assign(this, json);
	}

	validate(json) {
		return typeof json !== 'undefined';
	}

	keyMapper(hash) {
		for (const key in hash) {
			this[hash[key]] = this[key];
			delete this[key];
		}
	}

	clone() {
		return new this.constructor(JSON.parse(JSON.stringify(this)));
	}
}
