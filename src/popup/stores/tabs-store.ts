import {makeObservable} from 'mobx';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class TabsStore {
	constructor() {
		makeObservable(this);
	}
}
