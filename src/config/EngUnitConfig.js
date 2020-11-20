import {localDataset} from '../components/WebSocketFetcher'
// Jumlah data, atau jumlah kolom
//const seriesCount = 5;

export var EngUnitConfig = [
    {
        id:localDataset[0].id, name:localDataset[0].name,
        V1min:0, V1max:15,
        V2min:0, V2max:15,
        V3min:0, V3max:15,
        V4min:0, V4max:15,
        Imin:0,Imax:15
    },
    {
        id:localDataset[1].id, name:localDataset[1].name,
        V1min:0, V1max:12,
        V2min:0, V2max:12,
        V3min:0, V3max:12,
        V4min:0, V4max:12,
        Imin:0,Imax:12
    },
    {
        id:localDataset[2].id, name:localDataset[2].name,
        V1min:0, V1max:5,
        V2min:0, V2max:5,
        V3min:0, V3max:5,
        V4min:0, V4max:5,
        Imin:0,Imax:15
    },
    {
        id:4, name:'Dummy',
        V1min:0, V1max:12,
        V2min:0, V2max:12,
        V3min:0, V3max:12,
        V4min:8, V4max:12,
        Imin:0,Imax:12
    }
];

export default function scaleEU(dataset,config){
    var scaled = dataset;
    for(var deviceNo=0;deviceNo<dataset.length;deviceNo++){
        scaled[deviceNo].voltage1 = (scaled[deviceNo].voltage1/(config[deviceNo].V1max-config[deviceNo].V1min))+config[deviceNo].V1min;
        scaled[deviceNo].voltage2 = (scaled[deviceNo].voltage2/(config[deviceNo].V2max-config[deviceNo].V2min))+config[deviceNo].V2min;
        scaled[deviceNo].voltage3 = (scaled[deviceNo].voltage3/(config[deviceNo].V3max-config[deviceNo].V3min))+config[deviceNo].V3min;
        scaled[deviceNo].voltage4 = (scaled[deviceNo].voltage4/(config[deviceNo].V4max-config[deviceNo].V4min))+config[deviceNo].V4min;
        scaled[deviceNo].arus = (scaled[deviceNo].arus/(config[deviceNo].Imax-config[deviceNo].Imin))+config[deviceNo].Imin;
    }    
    return scaled;
}