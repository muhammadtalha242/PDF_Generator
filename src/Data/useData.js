import { useState, useEffect } from 'react';
import { csv, max, min, mean } from 'd3';
import {VPD_Calculator, normalize_data} from "../util/utility"

import csvData from './2021_week19_climate_data.csv';



export const useData = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    // const row = (d) => {
    //   d.Population = +d['2020'];
    //   return d;
    // };
    // csv(csvURL, row).then((data) => {
    //   setData(data.slice(0, 10));
    // });

    // csv(csvData).then(d => {
    //   console.log(d)
    // })

    // const columns = ["Temperature_137522","Temperature_2","Humitidy_137522","Humitidy_2","CarbonDioxide_137522","CarbonDioxide_2"]
    
    async function fetchData() {
      const row = (d) => {
        d.Date = new Date(d.Date);
        d.Temperature_2 = +[d.Temperature_2]
        d.Temperature_137522 =+[d.Temperature_137522]
        d.Humitidy_137522 = +[d.Humitidy_137522]
        d.Humitidy_2 = +[d.Humitidy_2]
        d.CarbonDioxide_137522 = +[d.CarbonDioxide_137522]
        d.CarbonDioxide_2 = +[d.CarbonDioxide_2]

        d.Vpd_2 = VPD_Calculator(d.Temperature_2, d.Humitidy_2)
        d.Vpd_137522 = VPD_Calculator(d.Temperature_137522,d.Humitidy_137522)
        // x, mini, maxi
        d.avg_temp = (d.Temperature_137522 + d.Temperature_2)/2
        d.avg_co2 = (d.CarbonDioxide_137522 + d.CarbonDioxide_2)/2
        d.avg_humitidy = (d.Humitidy_137522 + d.Humitidy_2)/2
        d.avg_vpd = (d.Vpd_137522 + d.Vpd_2)/2

        
        // normalize_data()
        
        // zi = (xi – min(x)) / (max(x) – min(x)) * 100

        // Object.keys(d).forEach(key => {
        //   if (key.includes("Date")) {
        //   } else{
        //     d[key] = +d[key]
        //   }
        // })



        return d;
      };

      
      const outputCSV = await csv(csvData, row)


      
      setData(outputCSV);


    }
    fetchData()

  }, []);

  return data;
};
