import { CompanyProfileController } from "../controller/CompanyProfileController"


const companyProfile = new CompanyProfileController;
export const CompanyProfileRoutes = [
    {
    method: "get",
    route: "/company",
    controller: CompanyProfileController,
    action: companyProfile.findByName
}, 
{
    method: "post",
    route: "/company",
    controller: CompanyProfileController,
    action: companyProfile.add
 },
{
    method: "delete",
    route: "/company/:id",
    controller: CompanyProfileController,
    action: companyProfile.remove
},
]