import React, { createContext, useState } from 'react';
import Temperature from './App/pages/components/Temperature';

// GlobalContext 생성
export const GlobalContext = createContext({
    temperature: 0.0,
    setTemperature: () => {},
    humidity: 0.0,
    setHumidity: () => {},
    ecOfSoil: 0.0,
    setEcOfSoil: () => {},
    phOfSoil: 0.0,
    setPhOfSoil: () => {},
    moistureOfSoil: 0.0,
    setMoistureOfSoil: () => {},
    accessToken: '',
    setAccessToken: () => {}
});

// Provider 정의
export function GlobalProvider({ children }) {
    const [temperature, setTemperature] = useState(0.0);
    const [humidity, setHumidity] = useState(0.0);
    const [ecOfSoil, setEcOfSoil] = useState(0.0);
    const [phOfSoil, setPhOfSoil] = useState(0.0);
    const [moistureOfSoil, setMoistureOfSoil] = useState(0.0);
    const [accessToken, setAccessToken] = useState('');

  return (
    <GlobalContext.Provider value={{ 
        temperature, 
        setTemperature, 
        humidity, 
        setHumidity, 
        ecOfSoil, 
        setEcOfSoil, 
        phOfSoil, 
        setPhOfSoil, 
        moistureOfSoil, 
        setMoistureOfSoil,
        accessToken,
        setAccessToken
    }}>
      {children}
    </GlobalContext.Provider>
  );
}