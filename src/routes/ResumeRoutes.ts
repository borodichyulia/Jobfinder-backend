import { ResumeController } from '../controller/ResumeController';

const resume = new ResumeController();
export const ResumeRoutes = [
  {
    method: 'get',
    route: '/resumes',
    controller: ResumeController,
    action: resume.findBySpecialization,
  },
  {
    method: 'post',
    route: '/resumes',
    controller: ResumeController,
    action: resume.add,
  },
  {
    method: 'delete',
    route: '/resumes/:id',
    controller: ResumeController,
    action: resume.remove,
  },
  {
    method: 'post',
    route: '/resumesAddVacancy/:id',
    controller: ResumeController,
    action: resume.applyVacancy,
  },
];
