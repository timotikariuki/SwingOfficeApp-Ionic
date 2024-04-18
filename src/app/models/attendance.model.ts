export class AttendanceModel {


    constructor(
        public AttendanceID: number = null,
        public ClassID: number = null,
        public ContactID: number = null,
        public CourseEditionID: number = null,
        public CourseID: number = null,
        public EditionCode: string = '',
        public EditionName: string = '',
        public HasAttended: boolean = false,
        public HasNotifiedFault: boolean = false,
        public IsRegularTaxi: boolean = false,
        public IsReschedule: boolean = false,
        public IsRescheduledYet: boolean = false,
        public IsTaxi: boolean = false,
        public Name: string = '',
        public Photo: string = '',
        public StartHour: string = '',
        public Surname: string = '',

    ) {}

}