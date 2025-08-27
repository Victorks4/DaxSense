import { useState, useEffect } from "react";
import { Pump } from "@/pages/Dashboard";

export interface PumpSensorData {
  temperature: number;
  vibration: number;
  noise: number;
  pressure: number;
  timestamp: Date;
}

export const usePumpData = (pumps: Pump[]) => {
  const [pumpData, setPumpData] = useState<Record<string, PumpSensorData>>({});

  // Generate realistic sensor data with some variation
  const generateSensorData = (pumpId: string, pumpType: string): PumpSensorData => {
    const baseData = {
      centrifugal: {
        temperature: { base: 45, variation: 15 },
        vibration: { base: 2.5, variation: 1.5 },
        noise: { base: 65, variation: 10 },
        pressure: { base: 5, variation: 1.5 }
      },
      gear: {
        temperature: { base: 50, variation: 20 },
        vibration: { base: 3, variation: 2 },
        noise: { base: 70, variation: 12 },
        pressure: { base: 4, variation: 2 }
      }
    };

    const config = baseData[pumpType as keyof typeof baseData] || baseData.centrifugal;
    
    // Add some randomness with time-based cycling for realistic patterns
    const time = Date.now() / 10000;
    const pumpSeed = parseInt(pumpId.slice(-3)) || 1;
    
    return {
      temperature: config.temperature.base + 
        Math.sin(time + pumpSeed) * config.temperature.variation * 0.3 +
        (Math.random() - 0.5) * config.temperature.variation * 0.4,
      vibration: Math.max(0, config.vibration.base + 
        Math.sin(time * 2 + pumpSeed) * config.vibration.variation * 0.2 +
        (Math.random() - 0.5) * config.vibration.variation * 0.3),
      noise: config.noise.base + 
        Math.sin(time * 1.5 + pumpSeed) * config.noise.variation * 0.25 +
        (Math.random() - 0.5) * config.noise.variation * 0.3,
      pressure: Math.max(0, config.pressure.base + 
        Math.sin(time * 0.8 + pumpSeed) * config.pressure.variation * 0.2 +
        (Math.random() - 0.5) * config.pressure.variation * 0.4),
      timestamp: new Date()
    };
  };

  useEffect(() => {
    const updateData = () => {
      const newData: Record<string, PumpSensorData> = {};
      
      pumps.forEach(pump => {
        if (pump.status !== 'offline') {
          newData[pump.id] = generateSensorData(pump.id, pump.type);
        }
      });
      
      setPumpData(newData);
    };

    // Initial data
    updateData();

    // Update every 2 seconds for real-time simulation
    const interval = setInterval(updateData, 2000);

    return () => clearInterval(interval);
  }, [pumps]);

  return pumpData;
};