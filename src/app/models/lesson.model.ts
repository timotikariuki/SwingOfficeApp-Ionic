export class LessonModel {

    constructor(
        public LessonID: number = null,
        public CourseCode: string = '',
        public LessonCode: string = '',
        public LessonName: string = '',
        public isChecked: boolean = false,
        public Photo: string = '',
        public Info: string = '',
        public Complexity: string = '',
        public DisciplineID: string = '',
        public CourseID: number = null,
        public Video: string = ''
    ) {}
}
