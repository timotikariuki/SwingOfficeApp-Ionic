export class VideoModel {

    constructor(
        public ID: number = null,
        public ClassName: string = '',
        public CourseCode: string = '',
        public CourseName: string = '',
        public EditionCode: string = '',
        public LessonCode: string = '',
        public Published: boolean = true,
        public Video: string = '',
    ){}
}
