import { ContactModel } from "./contact.model";
import { AsistenciaModel } from "./asistencia.model";
import { NewsModel } from "./news.model";
import { CourseModel } from "./course.model";
import { NextClassesModel } from "./next-classes.model";
import { VideosListModel } from "./videos-list.model";
import { PaymentModel } from "./payment.model";
import { PaymentsModel } from "./payments.model";

export class DataUserModel {

  constructor(
        public error: boolean = false,
        public isloggedin: boolean = true,
        public contact: ContactModel = new ContactModel(),
        public isteacher: boolean = true,
        public assistance: AsistenciaModel[] = [new AsistenciaModel()],
        public news: NewsModel[] = [new NewsModel()],
        public courses: CourseModel[] = [new CourseModel()],
        public payments: PaymentsModel = new PaymentsModel(),
        public studentCourses: number[] = [],
        public nextClasses: NextClassesModel[] = [new NextClassesModel()],
        public videosList: VideosListModel[] = [new VideosListModel()]
  ) {}

}
