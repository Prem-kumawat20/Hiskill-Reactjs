import React, { useState } from 'react';

import {

    HvVerticalNavigation,

    HvVerticalNavigationTree,

    HvVerticalNavigationActions,

    HvVerticalNavigationAction,

    HvVerticalNavigationHeader

} from "@hitachivantara/uikit-react-core";

import { User, LogOut } from "@hitachivantara/uikit-react-icons";




export default function SideNav() {

    const [currentPage, setCurrentPage] = useState('00');




    const handleNavigationChange = (id) => {

        setCurrentPage(id);

    };




    return (


        <div
            style={{
                display: 'flex',
                height: '100vh',
                width: 220,
                position: 'fixed',
                boxShadow: '2px 0 4px rgba(0, 0, 0, 0.1)'
            }}
        >
            <HvVerticalNavigation
                id='sample1'
                open
            >
                <HvVerticalNavigationHeader title="HiSkill" />
                <HvVerticalNavigationTree
                    aria-label="Example 1 navigation"
                    data={[
                        {
                            id: '00',
                            label: 'Home Page',
                            selected: currentPage === '00',
                            href: '/home',
                        },
                        {
                            id: '01',
                            label: 'Skills Dashboard',
                            selected: currentPage === '01',
                            href: '/skills',
                        },
                        {
                            id: '02',
                            label: 'Certifications Dashboard',
                            selected: currentPage === '02',
                            href: '/certificates',
                        }

                    ]}
                    onChange={handleNavigationChange}
                    //selected="00"
                />
                <HvVerticalNavigationActions>
                    <HvVerticalNavigationAction
                        icon={<User />}
                        label="Profile"
                    />
                    <HvVerticalNavigationAction
                        icon={<LogOut />}
                        label="Logout"
                    />
                </HvVerticalNavigationActions>
            </HvVerticalNavigation>
        </div>
    );
}