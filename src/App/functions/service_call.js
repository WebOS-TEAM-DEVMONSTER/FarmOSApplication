import LS2Request from '@enact/webos/LS2Request';
import { useContext } from 'react';
import { GlobalContext } from '../../global_provider';
const baseUrl = "luna://com.devmonster.farmos.farmer.service"
var webOSBridge = new LS2Request();


 const callHeartBeat = (farmId) => {
   var params = {
      "farmId": farmId
   }
   var lsRequest = {
      "service":baseUrl,
      "method":"serviceOn",
      "parameters": params,
      "onSuccess": serviceOnSuccess,
      "onFailure": serviceOnFailure,
      "subscribe": true,
   };
   webOSBridge.send(lsRequest);  
   
   function serviceOnSuccess(response){
      console.log("serviceOnSuccess");
      console.log(response);
   }

   function serviceOnFailure(response){
      console.log("serviceOnFailure");
      console.log(response.message);
   }
   
}



const callHeartBeat2 = (farmId, updateFunctions) => {

   const {
      setTemperature,
      setHumidity,
      setPhOfSoil,
      setEcOfSoil,
      setMoistureOfSoil
    } = updateFunctions;


   var lsRequest = {
      "service":baseUrl,
      "method":"heartbeat",
      "onSuccess": serviceOnSuccess,
      "onFailure": serviceOnFailure,
      "subscribe": true,
   };
   webOSBridge.send(lsRequest);  
   
   function serviceOnSuccess(response){
      console.log("serviceOnSuccess");
      setTemperature(response.message.temperature);
      setHumidity(response.message.humidity);
      setPhOfSoil(response.message.phOfSoil);
      setEcOfSoil(response.message.ecOfSoil);
      setMoistureOfSoil(response.message.moistureOfSoil);
      console.log(response.message);
   }

   function serviceOnFailure(response){
      console.log("serviceOnFailure");
      console.log(response.message);
   }
   
}

const callStopHeartBeat = () => {

   var lsRequest = {
      "service":baseUrl,
      "method":"serviceOff",
      "onSuccess": serviceOffSuccess,
      "onFailure": serviceOffFailure
   };
   webOSBridge.send(lsRequest);  
   
   function serviceOffSuccess(response){
      console.log("serviceOffSuccess");
      console.log(response);
   }

   function serviceOffFailure(response){
      console.log("serviceOffFailure");
      console.log(response);
   }
   
}




export {callHeartBeat, callHeartBeat2, callStopHeartBeat};
