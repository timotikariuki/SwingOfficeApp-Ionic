export class VideoLessonModel {

    constructor(
        // Video
        public VideoID: number = 0,
        public VideoName: string = '',
        public Video: string = '',
        public Published: boolean = true,
        // Lesson
        public LessonID: number = 0,
        public LessonCode: string = '',
        public LessonName: string = '',
        public Photo: string = '',
        public Info: string = '',
        public Complexity: string = '',
        public DisciplineID: number = null,
        public CourseID: number = null,

        public Token: string = '',
        public school: string = '',
        public ContactID: string = '',
        public CourseEditionID: number = null,
        public ClassName: string = '',

        // Media
        public Type: string = 'create', //    create || update
        public Ext: string = '.MOV',
        public MediaName: string = ''
    ) {}
}
