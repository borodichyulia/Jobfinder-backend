import { UserController } from "../controller/UserController"


const user = new UserController;
export const UserRoutes = [{
    method: "post",
    route: "/users",
    controller: UserController,
    action: user.registration
},
 {
    method: "get",
    route: "/users/activate/:link",
    controller: UserController,
    action: user.activate
}, 
// {
//     method: "delete",
//     route: "/resumes/:id",
//     controller: UserController,
//     action: user.remove
// },
]