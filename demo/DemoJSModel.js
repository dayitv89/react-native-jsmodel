//
// Copyright © 2017-Present, Gaurav D. Sharma
// All rights reserved.
//
'use strict';

import Parent from './Models/Parent';

const json = {
              name: 'Level 1',
              age: 12,
              common: {
                name: 'Level 2',
                age: 19,
                new_name: 'key name to change',
                update_key: 'update data',
              },
              orignal: {
                name: 'Orignal Name',
              },
              root: {
                rootKey: 'L2: rootValue',
              },
            };

const modelObj = new Parent(json);
modelObj.print();
modelObj.common.show();
console.log(modelObj.common.name);
console.log(JSON.stringify(modelObj, null, 2));
