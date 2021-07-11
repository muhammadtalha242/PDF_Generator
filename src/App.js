
import React from 'react';

import { useData } from './shared/Data/useData';
import DataSelect from "./shared/uiElements/DataSelectors"
import { DateSelectorButtonGroup } from "./shared/uiElements/DateSelector"
import StackedBarChart from "./Chart/StackedBarChart"
import { dataSetSelecots, dateSelector } from "./shared/Data/SelectorData"
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ReportHeader from "./PDF_Generator/Components/ReportHeader"
import { ReportBody } from "./PDF_Generator/Components/ReportBody"
import { GeneratePDF } from "./PDF_Generator/Generate_PDF"
import LoadingSpinner from "./shared/uiElements/LoadingSpinner"
import "./App.css"




const App = () => {
  const data = useData();
  const [currentSensor, setcurrentSensor] = React.useState(dataSetSelecots[0].value);
  const [currentDate, setCurrentDate] = React.useState({ startDate: dateSelector[3].days, endDate: undefined });
  const [display, setDisplay] = React.useState(false)

  const clickHandler = () => {

    setDisplay(!display);

  };

  
  if (!data) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    )
  }


  return (
    <React.Fragment >

      <Grid container  >
        <Grid item md={1} style={{  marginLeft:"10%"}} ></Grid>
        <div >
          <Grid item md={9} style={{  maxWidth:"100%" }} id="divToPrint" >
            <ReportHeader display={display} />
            <DateSelectorButtonGroup currentDate={currentDate} setCurrentDate={setCurrentDate} dateSelector={dateSelector} display={display} />
            <ReportBody display={display}>

              <StackedBarChart data={data} date={currentDate} sensors={currentSensor} />
              <h3> Graph Name & description  </h3>
              
            </ReportBody>
          </Grid>
        </div>
        <Grid item md={2} style={{  marginLeft:"4%"}}>
          <DataSelect currentSensor={currentSensor} dataSetSelecots={dataSetSelecots} setcurrentSensor={setcurrentSensor} display={display} setDisplay={setDisplay} />
          <Button variant="outlined" color="primary" onClick={clickHandler}>
            {!display ? "View PDF Report" : "Back"}
          </Button>
          <GeneratePDF display={display} />

        </Grid>

      </Grid>





    </React.Fragment>
  );

  // else {
  //   return (<PDFViewer>
  //         <DataSelect currentSensor={currentSensor} dataSetSelecots={dataSetSelecots} setcurrentSensor={setcurrentSensor} display={display} setDisplay={setDisplay} />

  //     <MyDocument />
  //   </PDFViewer>)
  // }
}


export default App;

