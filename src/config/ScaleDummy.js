// Jumlah data, atau jumlah kolom
//const seriesCount = 5;

export default function ScaleDummy(randomIndex,randomBuffer,config){
    randomIndex -= 1;
    
    return [
        randomBuffer[0].map(
            (value)=>(
                (parseFloat(value)-parseFloat(config[randomIndex].V1min))/(parseFloat(config[randomIndex].V1max)-parseFloat(config[randomIndex].V1min))*100
            ).toFixed(2)
        ),
        //randomBuffer[0].map((value)=>value),  
        randomBuffer[1].map(
            (value)=>(
                (parseFloat(value)-parseFloat(config[randomIndex].V2min))/(parseFloat(config[randomIndex].V2max)-parseFloat(config[randomIndex].V2min))*100
            ).toFixed(2)
        ),
        randomBuffer[2].map(
            (value)=>(
                (parseFloat(value)-parseFloat(config[randomIndex].V3min))/(parseFloat(config[randomIndex].V3max)-parseFloat(config[randomIndex].V3min))*100
            ).toFixed(2)
        ),
        randomBuffer[3].map(
            (value)=>(
                (parseFloat(value)-parseFloat(config[randomIndex].V4min))/(parseFloat(config[randomIndex].V4max)-parseFloat(config[randomIndex].V4min))*100
            ).toFixed(2)
        ),
        randomBuffer[4].map(
            (value)=>(
                (parseFloat(value)-parseFloat(config[randomIndex].Imin))/(parseFloat(config[randomIndex].Imax)-parseFloat(config[randomIndex].Imin))*100
            ).toFixed(2)
        )
    ];
}


