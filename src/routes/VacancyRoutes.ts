import { VacancyController } from '../controller/VacancyController';

const vacancy = new VacancyController();
export const VacancyRoutes = [
  {
    method: 'get',
    route: '/vacancies',
    controller: VacancyController,
    action: vacancy.findBySpecialization,
  },
  {
    method: 'post',
    route: '/vacancies',
    controller: VacancyController,
    action: vacancy.add,
  },
  {
    method: 'delete',
    route: '/vacancies/:id',
    controller: VacancyController,
    action: vacancy.remove,
  },
  {
    method: 'put',
    route: '/vacancies/:vacancyId',
    controller: VacancyController,
    action: vacancy.updateVacancy,
  },
];
