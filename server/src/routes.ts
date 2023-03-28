import { WorkPerformedController } from "./controller/WorkPerformedController"

export const Routes = [
    {
        method: "get",
        route: "/work-performed",
        controller: WorkPerformedController,
        action: "all"
    },
    // {
    //     method: "get",
    //     route: "/users/:id",
    //     controller: UserController,
    //     action: "one"
    // }, 
    // {
    //     method: "post",
    //     route: "/users",
    //     controller: UserController,
    //     action: "save"
    // }, 
    // {
    //     method: "delete",
    //     route: "/users/:id",
    //     controller: UserController,
    //     action: "remove"
    // }
];