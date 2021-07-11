// import React from "react";

// export const ReportHeader = ({display})=>{


//     if (display) {
//         return <div>displaying</div>;
//       }
//       return <React.Fragment></React.Fragment>

// }

import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";
import React from "react";
import logo from "./logo.png"
const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "white",
    width: "100%",
    position:"inherit"

  },
  logoStyle:{
    maxWidth:"170px"
  }
}))

export default function ReportHeader({ display }) {
  const { header, logoStyle } = useStyles();
  const displayDesktop = () => {
    return <Toolbar>{scimeticLogo}</Toolbar>;
  };
  const scimeticLogo = (
    <Typography variant="h6" component="h1">
      <img src={logo} alt="logo" className={logoStyle} />
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
