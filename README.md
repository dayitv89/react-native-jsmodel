# react-native-jsmodel: JSModel
![version](https://img.shields.io/badge/version-0.0.1-green.svg)

### Preface
Are you coming from iOS native development background, newbies to JavaScript & react-native.
Thinking of model based approach for development, and missing [`JSONModel`](https://github.com/jsonmodel/jsonmodel)(Objective-C) and [`ObjectMapper`](https://github.com/Hearst-DD/ObjectMapper)(swift).
This approach is quite same as them or even more better. No need to add more dynamic keys.

### Features
- No need to add keys in name.
- No need to implement nested child unless until you would interested to implement some methods on that child element.
- keyMapper to rename the field names.
- ease to implement and use.

### Installation
- Run this command `$ npm install react-native-jsmodel --save`

### Implementation
- import in js file as `import JSModel from 'react-native-jsmodel';` [see example](https://github.com/dayitv89/react-native-jsmodel/blob/master/RNTestJSModel/MockModel.js)

```JavaScript
import JSModel from 'react-native-jsmodel';

export default class MockModel extends JSModel {
	message() {
		return 'This message added by JSModel: ' + this.error.message;
	}
}
```

- Make object of your model as `const model = new MockModel(Mock);` [see example](https://github.com/dayitv89/react-native-jsmodel/blob/master/RNTestJSModel/index.ios.js#L14)

```JavaScript
import React from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import MockModel from './MockModel';
import Mock from './Mock.json';

export default class TestJSModel extends React.Component {
	render() {
		const model = new MockModel(Mock);
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>
					{model.message()}
				</Text>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF'
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10
	}
});

AppRegistry.registerComponent('TestJSModel', () => TestJSModel);
```

##### In detail:
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

### Checklist
- [x] Basic model
- [x] Object Cloning
- [x] keyMapper
- [ ] Array parsing using static method as `JSModel.parseArray(ClassName, jsonArray)`
- [ ] accessor & mutator concept for props.
- [ ] Advance Model with type check using `prop-types`
- [ ] Test cases for model (jest/mocha/ ** or something better**)
- [ ] travis-ci setup

### Feedbacks
- I love to hear your valuable feedbacks, suggestions & issues. Please raise a issue on the repo or email me (as subject: 'jsmodel#issue &lt;topic&gt;') @ `er.gauravds@gmail.com`.

❤️ Voila! Happy coding...
