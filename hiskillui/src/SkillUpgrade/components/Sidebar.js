import React, { useState } from "react";
import {
 HvVerticalNavigation,
 HvVerticalNavigationTree,
 HvVerticalNavigationActions,
 HvVerticalNavigationAction,
 HvVerticalNavigationHeader,
} from "@hitachivantara/uikit-react-core";
import { User, LogOut } from "@hitachivantara/uikit-react-icons";

export default function Sidebar() {
    const [currentPage, setCurrentPage] = useState("00");
    const handleNavigationChange = (id) => {
        setCurrentPage(id);
    };
    return (
    <div>
        <div style={{ 
            display: "flex",
            height: "100vh",
            width: 220,
            position: "fixed",
            boxShadow: "2px 0 4px rgba(0, 0, 0, 0.1)",
        }}>
            <HvVerticalNavigation collapsedMode="simple" id="sample1" open>
                <HvVerticalNavigationHeader title="SkillUpgrade" />
                <HvVerticalNavigationTree 
                aria-label="Example 1 navigation"
                data={[
                    {
                        id: "00",
                        label: "Home",
                        selected: currentPage === "00",
                        href: "/home",
                    },
                ]}
                onChange={handleNavigationChange}/>
                <HvVerticalNavigationActions>
                    <HvVerticalNavigationAction icon={<User />} label="Profile" />
                    <HvVerticalNavigationAction icon={<LogOut />} label="Logout" />
                    </HvVerticalNavigationActions>
                    </HvVerticalNavigation>
        </div>
    </div>
    );
}