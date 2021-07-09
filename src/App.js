
import React from 'react';

import { useData } from './Data/useData';
import DataSelect from "./shared/uiElements/DataSelectors"
import { DateSelectorButtonGroup } from "./shared/uiElements/DateSelector"
import StackedBarChart from "./Chart/StackedBarChart"
import { dataSetSelecots, dateSelector } from "./Data/SelectorData"
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { ReportHeader } from "./PDF_Generator/Components/ReportHeader"
import { ReportBody } from "./PDF_Generator/Components/ReportBody"
import { GeneratePDF } from "./PDF_Generator/Generate_PDF"

import "./App.css"




const App = () => {
  const data = useData();
  const [currentSensor, setcurrentSensor] = React.useState(dataSetSelecots[0].value);
  const [currentDate, setCurrentDate] = React.useState({ startDate: dateSelector[0].days, endDate: undefined });
  const [display, setDisplay] = React.useState(false)

  const clickHandler = (event) => {

    setDisplay(!display);
  };

  if (!data) {
    return <div>loading</div>
  }


  return (
    <React.Fragment >
      <Grid container spacing={3} >
        <Grid item md={1}></Grid>
         <Grid item md={9}  id="divToPrint" >
          <ReportHeader display={display}  />
          <DateSelectorButtonGroup currentDate={currentDate} setCurrentDate={setCurrentDate} dateSelector={dateSelector} display={display} />
          <ReportBody display={display}>Graph Title</ReportBody>
         
          <StackedBarChart data={data} date={currentDate} sensors={currentSensor} />
        </Grid>
        <Grid item md={2} >
          <DataSelect currentSensor={currentSensor} dataSetSelecots={dataSetSelecots} setcurrentSensor={setcurrentSensor} display={display} setDisplay={setDisplay} />
          <Button variant="outlined" color="primary" onClick={clickHandler}>
            {!display ? "View PDF Report" : "Back"}
          </Button>
          <GeneratePDF display={display}  />
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

