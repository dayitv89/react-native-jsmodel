import JSModel from 'react-native-jsmodel';

export default class MockModel extends JSModel {
	message() {
		return 'This message added by JSModel: ' + this.error.message;
	}
}
