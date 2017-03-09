# JSModel

### Preface
Are you coming from iOS native development background, newbies to JavaScript & react-native.
Thinking of model based approach for development, and missing [`JSONModel`](https://github.com/jsonmodel/jsonmodel)(Objective-C) and [`ObjectMapper`](https://github.com/Hearst-DD/ObjectMapper)(swift).
This approach is quite same as them or even more better. No need to add more dynamic keys.

### Features
- No need to add keys in name.
- No need to implement nested child unless until you would interested to implement some methods on that child element.
- keyMapper to rename the field names.
- ease to implement and use.

### Implementation
- Must inherit root object from `JSModel`. e.g. `class Parent extends JSONModel`.
- Just inherit all models from `JSModel` that need to implement some methods, otherwise no need to create class. e.g.  `common` & `root` is implemented but `orignal` is not implemented.
- In parent model add child object as below.
```js
constructor(json) {
    super(json);
    if (this.validate(json)) {
      this.common = eval('new Common(json.common)');
      this.root = new Root(json.root);
    }
}
```

### [Demo Code](demo/DemoJSModel.js)
```js
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
```

To test this demo code run: `$ npm i && npm start`

### Feedbacks
- I love to hear your valuable feedbacks, suggestions & issues. Please raise a issue on the repo or email me @ `er.gauravds@gmail.com`.

❤️ Voila! Happy coding...
