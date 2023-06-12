import {TabActionParameters} from './types';

export abstract class TabAction<T extends TabActionParameters> {
	constructor(protected readonly _parameters: T) {}

	abstract run(): Promise<void>;
}
