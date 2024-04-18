import { DatesModel } from "./dates.model";

export class AsistenciaModel {

    constructor(
        public ClassDates: DatesModel[] = [new DatesModel()],
        public CourseEditionID: number = null,
        public EditionCode: string = '',
        public EditionName: string = '',
        public Students: number = null
    ) {}

}
