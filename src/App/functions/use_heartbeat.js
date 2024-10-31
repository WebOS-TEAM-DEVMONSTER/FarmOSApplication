import LS2Request from '@enact/webos/LS2Request';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../global_provider';

const baseUrl = "luna://com.devmonster.farmos.farmer.service";
var webOSBridge = new LS2Request();

export const useHeartBeat = (farmId) => {
  const {
    setTemperature,
    setHumidity,
    setPhOfSoil,
    setEcOfSoil,
    setMoistureOfSoil,
    setEvaluation,
  } = useContext(GlobalContext);

  useEffect(() => {
    if (!farmId) return;

    // Call heartBeat (serviceOn)
    const callHeartBeat = () => {
      const params = { "farmId": farmId };
      webOSBridge.send({
        "service": baseUrl,
        "method": "serviceOn",
        "parameters": params,
        "onSuccess": (response) => console.log("serviceOnSuccess", response),
        "onFailure": (response) => console.log("serviceOnFailure", response.message),
        "subscribe": true,
      });
    };

    // Call heartBeat2 (heartbeat subscription for data updates)
    const callHeartBeat2 = () => {
      webOSBridge.send({
        "service": baseUrl,
        "method": "heartbeat",
        "onSuccess": (response) => {
          console.log("serviceOnSuccess", response.message);
          setTemperature(response.message.temperature);
          setHumidity(response.message.humidity);
          setPhOfSoil(response.message.phOfSoil);
          setEcOfSoil(response.message.ecOfSoil);
          setMoistureOfSoil(response.message.moistureOfSoil);
          setEvaluation(response.message.imageEvaluation);
        },
        "onFailure": (response) => console.log("serviceOnFailure", response.message),
        "subscribe": true,
      });
    };

    // Call start heartbeats
    callHeartBeat();
    callHeartBeat2();

    // Cleanup subscription on unmount
    return () => {
      webOSBridge.send({
        "service": baseUrl,
        "method": "serviceOff",
        "onSuccess": (response) => console.log("serviceOffSuccess", response),
        "onFailure": (response) => console.log("serviceOffFailure", response.message),
      });
    };
  }, [farmId, setTemperature, setHumidity, setPhOfSoil, setEcOfSoil, setMoistureOfSoil, setEvaluation]);
};
