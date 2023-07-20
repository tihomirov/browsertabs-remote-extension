import {useContext} from 'react';

import {RootStore, StoreContext} from '../stores';

export const useStores = (): RootStore => useContext(StoreContext);
