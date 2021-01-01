import {Dashboard, Profile, HelpDesk} from "../pages/Dashboard"
import {FaWallet} from "react-icons/fa";
import {FiRefreshCcw} from "react-icons/fi";
import {GoVerified} from "react-icons/go";
import {MdDashboard, MdHelp, MdPerson, MdSettings, MdTransform} from "react-icons/md";

export const dashboardRouter = [
    {
        id: 1,
        title: "Dashboard",
        icon: MdDashboard,
        path: "/dashboard",
        component: Dashboard,
        exact: true
    },
    {
        id: 2,
        title: "Wallet",
        icon: FaWallet,
        path: "/dashboard/wallet",
        component: Dashboard,
        exact: true
    },
    {
        id: 3,
        title: "History",
        icon: MdTransform,
        path: "/dashboard/history",
        children: [
            {
                id: 31,
                title: "Transactions",
                icon: FiRefreshCcw,
                path: "/dashboard/history/transactions",
                component: Profile.Setting,
            }
        ]
    },
    {
        id: 5,
        title: "Profile",
        icon: MdPerson,
        path: "/dashboard/profile",
        children: [
            {
                id: 51,
                title: "Settings",
                icon: MdSettings,
                path: "/dashboard/profile/setting",
                component: Profile.Setting,
            }, {
                id: 52,
                title: "Verification",
                icon: GoVerified,
                path: "/dashboard/profile/verification",
                component: Profile.Verification,
            }
        ]
    },
    {
        id: 6,
        title: "HelpDesk",
        icon: MdHelp,
        path: "/dashboard/helpDesk",
        component: HelpDesk,
        exact: true
    }
]