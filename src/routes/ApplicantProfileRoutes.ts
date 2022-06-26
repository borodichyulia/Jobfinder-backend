import { ApplicantProfileController } from '../controller/ApplicantProfileController';

const applicantProfile = new ApplicantProfileController();
export const ApplicantProfileRoutes = [
  {
    method: 'post',
    route: '/applicant',
    controller: ApplicantProfileController,
    action: applicantProfile.add,
  },
];
