export class NextClassesModel {

    constructor(
        public AttendanceID: number = null,
        public ClassID: number = null,
        public DancerID: number = null,
        public HasNotifiedFault: boolean = false,
        public IsOwn: boolean = false,
        public IsTaxi: boolean = false,
        public IsRescheduledYet: boolean = false,
        public IsReschedule: boolean = false,
        public AttendanceReschedule: number = null,
        public CourseEditionID: number = null,
        public DateReschedule: string = '',
        public EditionCode: string = '',
        public EditionName: string = '',
        public ClassName: string = '',
        public AbilityID: number = null,
        public StartHour: string = '',
        public Date: string = '',
        public Hour: string = '',
        public WeekDays: string = '',
        public DanceLevelID: number = null,
        public DanceLevel: string = '',
        public DisciplineID: number = null,
        public Discipline: string = '',
        public CourseTypeID: number = null
    ) {}
}
