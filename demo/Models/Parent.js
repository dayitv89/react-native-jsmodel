//
// Copyright © 2017-Present, Gaurav D. Sharma
// All rights reserved.
//
'use strict';

import JSModel from '../../JSModel';
import Common from './Common';
import Root from './Root';

export default class Parent extends JSModel {

  constructor(json) {
    super(json);
    if (this.validate(json)) {
      this.common = new Common(json.common);
      this.root = new Root(json.root);
    }
  }

  print() {
    console.log(this.name);
    console.log(this.age);
    this.common.show();
    this.root.display();
  }

}
