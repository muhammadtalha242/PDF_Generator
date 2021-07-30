
import React from 'react';

import { useData } from './shared/hooks/useData';
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
import { useGraphData } from './shared/hooks/useGraphData'
import Card from './shared/uiElements/Card'
import "./App.css"




const App = () => {
  const data = useData();
  const [display, setDisplay] = React.useState(false)
  const [graphData, dateChangeHandler, sensorChangeHandler, setGraphData] = useGraphData(data);

  const clickHandler = () => {

    setDisplay(!display);

  };

  React.useEffect(() => {
    if (data)
      setGraphData(data)
  }, [data, setGraphData])

  if (!data) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    )
  }

  const { outputData, selectedSensors, dateRange } = graphData;
  console.log("APP =>> outputData, selectedSensors, dateRange: ", outputData, selectedSensors, dateRange)
  return (
    <React.Fragment >

      <Grid container  >
        <Grid item md={1} style={{ marginLeft: "10%" }} ></Grid>
        <div >
          <Grid item md={9} style={{ maxWidth: "100%" }} id="divToPrint" >
            <ReportHeader display={display} />
            <DateSelectorButtonGroup dateChangeHandler={dateChangeHandler} dateSelector={dateSelector} display={display} />
            {outputData === undefined || outputData.length === 0 ? (
              <div className="center">
                <Card>
                  <h2>NO data found, Select different date range!</h2>
                </Card>
              </div>) :
                  (<ReportBody display={display}>

                <StackedBarChart graphData={graphData} />

                <h3> Graph Name & description  </h3>
              </ReportBody>
                )}
          </Grid>
        </div>
        <Grid item md={2} style={{ marginLeft: "4%" }}>
          <DataSelect dataSetSelecots={dataSetSelecots} sensorChangeHandler={sensorChangeHandler} />
          <Button variant="outlined" color="primary" onClick={clickHandler}>
            {!display ? "View PDF" : "Back"}
          </Button>
          <GeneratePDF display={display} />

        </Grid>

      </Grid>





    </React.Fragment>
  );
}


export default App;

