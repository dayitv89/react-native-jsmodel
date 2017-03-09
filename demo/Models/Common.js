//
// Copyright © 2017-Present, Gaurav D. Sharma
// All rights reserved.
//
'use strict';

import JSModel from '../../JSModel';

export default class Common extends JSModel {

  constructor(json) {
    super(json);
    if (this.validate(json)) {
      this.keyMapper({ newName: 'new_name', updateKey: 'update_key' });
    }
  }

  show() {
    console.log(this.name);
    console.log(this.age);
  }

}
