import React from 'react';
import { HvTypography } from "@hitachivantara/uikit-react-core";

export default function HomePage() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: '100vh',
        //paddingLeft: '125px',
      }}
    >
      <div style={{ width: 400 }}>
        <HvTypography variant="title1">Welcome!!!</HvTypography>
      </div>
    </div>
  );
}
