import { IBannerCourse } from './Wp1React';

export default class MockupBannerCourseHttpClient {

    private static _coursess: IBannerCourse[] = [
        {Title:'CRN-COURSE TITLE-COURSE #1 ***', Id:'1'},
        {Title:'CRN-COURSE TITLE-COURSE #2 ***', Id:'2'},
        {Title:'CRN-COURSE TITLE-COURSE #3 ***', Id:'3'}];

        public static get():Promise<IBannerCourse[]>{
            return new Promise<IBannerCourse[]>((resolve) => {resolve(MockupBannerCourseHttpClient._coursess);
            });
        }
}