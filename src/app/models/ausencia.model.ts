export class AusenciaModel {

    constructor(
        public AbilityID: number = null,
        public AttendanceID: number = null,
        public AtendanceReschedule: number = null,
        public ClassID: number = null,
        public ClassName: string = '',
        public CourseEditionID: number = null,
        public CourseTypeID: number = null,
        public DanceLevel: string = '',
        public DanceLevelID: number = null,
        public DancerID: number = null,
        public Date: string = '',
        public DateReschedule: string = null,
        public Discipline: string = '',
        public DisciplineID: number = null,
        public EditionCode: string = '',
        public EditionName: string = '',
        public HasNotifiedFault: boolean = false,
        public Hour: string = '',
        public IsOwn: boolean = false,
        public IsReschedule: boolean = false,
        public IsRescheduledYet: boolean = false,
        public IsTaxi: boolean = false,
        public StartHour: string = '',
        public WeekDays: string = ''
    ) {}

}



