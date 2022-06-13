import { UserController } from "../controller/UserController"
import { ResumeController } from "../controller/ResumeController"


const resume= new ResumeController;
export const Routes = [{
    method: "get",
    route: "/resumes",
    controller: ResumeController,
    action: resume.findBySpecialization
}, {
    method: "post",
    route: "/resumes",
    controller: ResumeController,
    action: resume.add
}
]