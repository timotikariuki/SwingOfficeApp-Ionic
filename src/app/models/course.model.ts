export class CourseModel {

    constructor(
        public AbilityID: number = null,
        public CourseID: number = null,
        public CourseCode: string = '',
        public Name: string = '',

        public token: string = '',
        public school: string = ''
    ) {}

}
