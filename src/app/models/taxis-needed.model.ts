export class TaxisNeededModel {

    constructor(
        public Alumnos: number = null,
        public ClaseID: number = null,
        public ClassStartHour: string = '',
        public CourseEditionID: number = null,
        public DanceLevelID: number = null,
        public DancerID: number = null,
        public DisciplineID: number = null,
        public EditionName: string = '',
        public ExtraFollowers: number = null,
        public ExtraLeaders: number = null,
        public Followers: number = null,
        public Leaders: number = null,
        public LevelOrder: number = null,
        public MaxLevelOrder: number = null,
        public TaxiFollowersNeeded: number = null,
        public TaxiLeadersNeeded: number = null
    ) {}
}