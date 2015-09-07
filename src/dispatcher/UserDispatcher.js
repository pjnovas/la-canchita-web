import { Dispatcher } from "flux";

const instance: Dispatcher = new Dispatcher();
export default instance;

// So we can conveniently do, `import {dispatch} from './GroupDispatcher';`
export const dispatch = instance.dispatch.bind(instance);
