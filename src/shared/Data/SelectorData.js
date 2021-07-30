export const dataSetSelector = [
    { key: "Temperature", value: ["Temperature_2", "Temperature_137522"] },
    { key: "Co2 Levels", value: ["CarbonDioxide_2", "CarbonDioxide_137522"] },
    { key: "Humidity", value: ["Humitidy_2", "Humitidy_137522"] },
    { key: "VPD", value: ["Vpd_2", "Vpd_137522"] },
    { key: "All", value: ["temperature", "co2", "humitidy", "vpd"] }
]
export const dateSelector = [
    { key: "12 hours",  days: 12, type:'hours' },
    { key: "1 day", days: 1, type:'days' },
    { key: "7 days", days: 7 ,type:'days'},
    { key: "14 days", days: 14,type:'days' },
    { key: "30 days", days: 30,type:'days' },
    { key: "custome date", days: 0 ,type:'custom'},
]