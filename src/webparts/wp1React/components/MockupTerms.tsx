import { ITerm } from './Wp1React';

export default class MockupTermsHttpClient {

    private static _terms: ITerm[] = [
        {Title:'Fall ***', Id:'1'},
        {Title:'Winter ***', Id:'2'},
        {Title:'Summer ***', Id:'3'}];

        public static get():Promise<ITerm[]>{
            return new Promise<ITerm[]>((resolve) => {resolve(MockupTermsHttpClient._terms);
            });
        }
}