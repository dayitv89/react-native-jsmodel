# react-native-jsmodel: JSModel

![version](https://img.shields.io/badge/version-0.0.4-green.svg)

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
		return 'This message added by JSModel: ' + this.errorMessage;
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
- Just inherit all models from `JSModel` that need to implement some methods, otherwise no need to create class. e.g. `common` & `root` is implemented but `orignal` is not implemented.
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
		update_key: 'update data'
	},
	orignal: {
		name: 'Orignal Name'
	},
	root: {
		rootKey: 'L2: rootValue'
	}
};

const modelObj = new Parent(json);
modelObj.print();
modelObj.common.show();
console.log(modelObj.common.name);
console.log(JSON.stringify(modelObj, null, 2));
```

### Implementation by bare minimum changes using `keyMapper`

```js
const json = {
	first_name: 'James',
	last_name: 'Bond'
};

export default class MockModel extends JSModel {
	constructor(json) {
		super(json);
		if (this.validate(json)) {
			this.keyMapper({ first_name: 'firstName', last_name: 'lastName' });
		}
	}

	name() {
		return this.firstName + ' ' + this.lastName;
	}
}

const modelObj = new MockModel(json);
console.log(modelObj.firstName); // James
console.log(modelObj.name()); // James Bond
console.log(modelObj.first_name); // undefined
console.log(modelObj.toJSON()); // {"first_name":"James","last_name":"Bond"}
```

To test this demo code run: `$ npm i && npm start`

### Implementation (recommend)

```js
const json = {
	first_name: 'James',
	last_name: 'Bond',
	address: [
		{
			name: 'home',
			lane: '22/A',
			street: 'Bake Street',
			landmark: 'Near Hey NY restaurant',
			city: 'London'
		},
		{
			name: 'office',
			lane: '3rd Floor',
			street: 'Eye HeadRoom',
			landmark: 'Near Denmark Hotel',
			city: 'London'
		}
	]
};

class AddressModel extends JSModel {
	constructor(json) {
		super();
		if (this.validate(json)) {
			this.name = json.name;
			this.lane = json.lane;
			this.street = json.street;
			this.landmark = json.landmark;
			this.city = json.city;
		}
	}

	isNames(k: string): boolean {
		return this.name == k;
	}
}

class UserModel extends JSModel {
	constructor(json) {
		super();
		if (this.validate(json)) {
			this.firstName = json.first_name;
			this.lastName = json.last_name;
			this.address = json.address.map(i => new AddressModel(i));
		}
	}

	name() {
		return this.firstName + ' ' + this.lastName;
	}

	findAddressByName(name: string = 'home'): Array {
		return this.address.filter(i => i.isNames(name));
	}
}

const user = new UserModel(json);
console.log(user.firstName); // James
console.log(user.name()); // James Bond
console.log(user.first_name); // undefined
console.log(user.toJSON()); // {"first_name":"James","last_name":"Bond"}
console.log(user.findAddressByName('home')); // {name: "home", lane: "22/A", street: "Bake Street", landmark: "Near Hey NY restaurant", city: "London"}
```

### Checklist

- [x] Basic model
- [x] Object Cloning
- [x] keyMapper
- [x] toJSON converted all data as JSON string
- [x] Array parsing can possible as `json.arr.map(i => new ExtendsFromJSModel(i))`;
- [x] Object parsing as `new ExtendsFromJSModel(json)`
- [x] Example added
- [ ] Advance Model with type check using `prop-types`
- [ ] Test cases for model (jest/mocha/ ** or something better**)
- [ ] travis-ci setup

### Feedbacks

- I love to hear your valuable feedbacks, suggestions & issues. Please raise a issue on the repo or email me (as subject: 'jsmodel#issue &lt;topic&gt;') @ `er.gauravds@gmail.com`.

❤️ Voila! Happy coding...
