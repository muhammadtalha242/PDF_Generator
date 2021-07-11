import moment from 'moment';

const currentTimeStamp= new Date().getTime();
const daysOffSet = 40;
const dayMilliseconds = daysOffSet*24*60*60*1000;

export const dateIsBetween= (currentObjectDate, givenDate)=>{
    const {startDate, endDate}= givenDate

    if(typeof startDate.getMonth === 'function' ){
        return moment(currentObjectDate).isBetween(startDate, endDate)
    }else{
        const sDate =  new Date(currentTimeStamp - (startDate * dayMilliseconds))
        return moment(currentObjectDate).isBetween(sDate, endDate)
    }
    
   
}

const SVP=(temp)=>{
    //SVP = 610.78 x e^(T / (T +238.3) x 17.2694))
    return 610.78 * Math.E**( temp / (temp +238.3) * 17.2694)
}

export const VPD_Calculator=(temp, humidity)=>{
    // SVP x (1 – RH/100) = VPD
       const result = SVP(temp) *(1 - (humidity)/100) /1000
       return Math.round(result * 100) /100

}

export const normalize_data=(x, mini, maxi)=>{
    //zi = (xi – min(x)) / (max(x) – min(x)) * 100

    return (x - mini) / ((maxi - mini) )
}


