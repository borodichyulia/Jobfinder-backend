import { ApplicantProfileController } from "../controller/ApplicantProfileController"


const applicantProfile = new ApplicantProfileController;
export const ApplicantProfileRoutes = [
//     {
//     method: "get",
//     route: "/company",
//     controller: CompanyProfileController,
//     action: companyProfile.findByName
// }, 
{
    method: "post",
    route: "/applicant",
    controller: ApplicantProfileController,
    action: applicantProfile.add
 },
// {
//     method: "delete",
//     route: "/company/:id",
//     controller: CompanyProfileController,
//     action: companyProfile.remove
// },
]