import { useState, useEffect } from 'react';
import { csv, min, max } from 'd3';
import { VPD_Calculator, normalize_data } from "../util/utility"

import csvData from '../Data/2021_week19_climate_data.csv';


// Data URL
//const csvURL =
//'https://gist.githubusercontent.com/muhammadtalha242/f960d2b81ab04f7e5bac5d00cecb4b1a/raw/worldPop.csv';



export const useData = () => {
  const [data, setData] = useState(null);
  useEffect(() => {

    const row = (d) => {
      d.Date = new Date(d.Date);
      d.Temperature_2 = +[d.Temperature_2]
      d.Temperature_137522 = +[d.Temperature_137522]
      d.Humitidy_137522 = +[d.Humitidy_137522]
      d.Humitidy_2 = +[d.Humitidy_2]
      d.CarbonDioxide_137522 = +[d.CarbonDioxide_137522]
      d.CarbonDioxide_2 = +[d.CarbonDioxide_2]
    
      //Creating VPD columns in dataset by using existing columns
      d.Vpd_2 = VPD_Calculator(d.Temperature_2, d.Humitidy_2)
      d.Vpd_137522 = VPD_Calculator(d.Temperature_137522, d.Humitidy_137522)

      //Average
      d.avg_temp = (d.Temperature_137522 + d.Temperature_2) / 2
      d.avg_co2 = (d.CarbonDioxide_137522 + d.CarbonDioxide_2) / 2
      d.avg_humitidy = (d.Humitidy_137522 + d.Humitidy_2) / 2
      d.avg_vpd = (d.Vpd_137522 + d.Vpd_2) / 2


      return d;
    };

    csv(csvData, row).then((data) => {
      const temp_min = min(data, (x) => x.avg_temp);
      const temp_max = max(data, (x) => x.avg_temp);
      const co2_min = min(data, (x) => x.avg_co2);
      const co2_max = max(data, (x) => x.avg_co2);
      const humitidy_min = min(data, (x) => x.avg_humitidy);
      const humitidy_max = max(data, (x) => x.avg_humitidy);
      const vpd_min = min(data, (x) => x.avg_vpd);
      const vpd_max = max(data, (x) => x.avg_vpd);
      
      data.forEach((d) => {
        d.temperature = normalize_data(d.avg_temp, temp_min, temp_max)
        d.co2 = normalize_data(d.avg_co2, co2_min, co2_max)
        d.humitidy = normalize_data(d.avg_humitidy, humitidy_min, humitidy_max)
        d.vpd = normalize_data(d.avg_vpd, vpd_min,vpd_max)
      })
      setData(data);
    })

  }, []);

  return data;
};

