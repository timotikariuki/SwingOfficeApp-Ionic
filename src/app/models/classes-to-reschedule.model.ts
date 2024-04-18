export class ClassesToRescheduleModel {

    constructor(
        public ClassDay: string = '',
        public ClassID: number = null,
        public CourseEditionID: number = null,
        public CourseTypeID: number = null,
        public DanceLevel: string = '',
        public DanceLevelID: number = null,
        public Discipline: string = '',
        public DisciplineID: number = null,
        public EditionID: number = null,
        public EditionName: string = '',
        public EndHour: string = '',
        public SchedulerID: number = null,
        public StartHour: string = '',
        public Teacher1: string = '',
        public Teacher2: string = '',
        public WeekDays: string = ''
    ) {}

}



