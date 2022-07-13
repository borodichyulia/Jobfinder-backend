import { CompanyProfileController } from '../controller/CompanyProfileController';

const companyProfile = new CompanyProfileController();
export const CompanyProfileRoutes = [
  {
    method: 'get',
    route: '/company',
    controller: CompanyProfileController,
    action: companyProfile.findByName,
  },
  {
    method: 'post',
    route: '/company',
    controller: CompanyProfileController,
    action: companyProfile.add,
  },
  {
    method: 'delete',
    route: '/company/:id',
    controller: CompanyProfileController,
    action: companyProfile.remove,
  },
  {
    method: 'get',
    route: '/companyView',
    controller: CompanyProfileController,
    action: companyProfile.viewCompany,
  },
  {
    method: 'put',
    route: '/company/:companyId',
    controller: CompanyProfileController,
    action: companyProfile.updateCompanyProfile,
  },
];
