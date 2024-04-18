import { VideoModel } from "./video.model";

export class VideosListModel {

    constructor(
        public CourseCode: string = '',
        public CourseName: string = '',
        public Videos: VideoModel[] = [new VideoModel()]
    ) {}
}
