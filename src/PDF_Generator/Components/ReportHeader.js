// import React from "react";

// export const ReportHeader = ({display})=>{


//     if (display) {
//         return <div>displaying</div>;
//       }
//       return <React.Fragment></React.Fragment>

// }

import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "white",
    width: "100%",
    position:"inherit"

  },
  logo:{
    maxWidth:"170px"
  }
}))

export default function ReportHeader({ display }) {
  const { header, logo } = useStyles();
  const displayDesktop = () => {
    return <Toolbar>{scimeticLogo}</Toolbar>;
  };
  const scimeticLogo = (
    <Typography variant="h6" component="h1">
      <img src="https://www.scimetic.com/wp-content/uploads/2021/02/website_logo_transparent_background.png" alt="logo" className={logo} />
    </Typography>
  );


  if (display) {
    return (
      <header >
        <AppBar className={header}>{displayDesktop()}</AppBar>
      </header>
    );
  }
  return <React.Fragment></React.Fragment>


}
