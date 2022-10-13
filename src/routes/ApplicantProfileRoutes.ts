import { ApplicantProfileController } from '../controller/ApplicantProfileController';

const applicantProfile = new ApplicantProfileController();
export const ApplicantProfileRoutes = [
  {
    method: 'post',
    route: '/applicant',
    controller: ApplicantProfileController,
    action: applicantProfile.add,
  },
  {
    method: 'get',
    route: '/applicant',
    controller: ApplicantProfileController,
    action: applicantProfile.viewApplicant,
  },
  {
    method: 'put',
    route: '/applicant/:applicantId',
    controller: ApplicantProfileController,
    action: applicantProfile.updateApplicantProfile,
  },
  {
    method: 'delete',
    route: '/applicant/:id',
    controller: ApplicantProfileController,
    action: applicantProfile.remove,
  },
];
