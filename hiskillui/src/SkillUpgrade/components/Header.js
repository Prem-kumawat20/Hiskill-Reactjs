import React from "react";
import {
    HvGlobalActions,
    HvButton,   
} from "@hitachivantara/uikit-react-core";

export default function Header() {    
}
<HvGlobalActions
  title="Detail Page Title">
  <HvButton variant="secondaryGhost">
    Courses
  </HvButton>
  <o
    aria-label="dropdownMenu-Items"
    dataList={[
      {
        label: 'Java'
      },

    ]}
    id="dropdownItem-1984"
    placement="left"
  />
</HvGlobalActions>