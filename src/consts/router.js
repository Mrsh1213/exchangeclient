import {Dashboard, Profile} from "../pages/Dashboard"

export const dashboardRouter = [
    {
        id: 1,
        path: "/dashboard",
        component: Dashboard,
        exact: true
    },
    {
        id: 2,
        path: "/dashboard/profile",
        children: [
            {
                id: 1,
                path: "/dashboard/profile/setting",
                component: Profile.Setting,
            }
        ]
    }
]