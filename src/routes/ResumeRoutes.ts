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
    route: '/resumes/:id',
    controller: ResumeController,
    action: resume.applyVacancy,
  },
  {
    method: 'put',
    route: '/resume/:resumeId',
    controller: ResumeController,
    action: resume.updateResume,
  },
];
