import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Thermometer, 
  Gauge, 
  Volume2, 
  Droplets, 
  TrendingUp,
  Settings,
  AlertTriangle
} from "lucide-react";
import { Pump } from "@/pages/Dashboard";
import { PumpSensorData } from "@/hooks/usePumpData";
import { TrendChart } from "./TrendChart";

interface PumpCardProps {
  pump: Pump;
  data?: PumpSensorData;
}

export const PumpCard = ({ pump, data }: PumpCardProps) => {
  if (!data) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy": return "bg-status-healthy";
      case "warning": return "bg-status-warning"; 
      case "critical": return "bg-status-critical";
      case "offline": return "bg-status-offline";
      default: return "bg-status-offline";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "healthy": return "Operacional";
      case "warning": return "Atenção";
      case "critical": return "Crítico";
      case "offline": return "Offline";
      default: return "Desconhecido";
    }
  };

  const getParameterStatus = (value: number, min: number, max: number) => {
    if (value < min || value > max) return "critical";
    if (value < min * 1.1 || value > max * 0.9) return "warning";
    return "healthy";
  };

  const tempStatus = getParameterStatus(data.temperature, 20, 80);
  const vibrationStatus = getParameterStatus(data.vibration, 0, 5);
  const noiseStatus = getParameterStatus(data.noise, 30, 85);
  const pressureStatus = getParameterStatus(data.pressure, 2, 8);

  return (
    <Card className="bg-card border-border shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-4 h-4 rounded-full ${getStatusColor(pump.status)}`}></div>
              <h3 className="text-lg font-semibold text-foreground">{pump.name}</h3>
            </div>
            <p className="text-sm text-muted-foreground">{pump.location}</p>
            <Badge variant="outline" className="mt-2 text-xs">
              {pump.type === "centrifugal" ? "Centrífuga" : "Engrenagem"}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Badge 
              className={`${getStatusColor(pump.status)} text-white border-none`}
            >
              {getStatusText(pump.status)}
            </Badge>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Sensor Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Temperature */}
          <div className="bg-secondary/30 rounded-lg p-3 border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <Thermometer className={`w-4 h-4 ${
                tempStatus === "critical" ? "text-status-critical" :
                tempStatus === "warning" ? "text-status-warning" : "text-status-healthy"
              }`} />
              <span className="text-sm font-medium text-foreground">Temperatura</span>
            </div>
            <div className="text-xl font-bold text-foreground">{data.temperature.toFixed(1)}°C</div>
            <div className="text-xs text-muted-foreground">Normal: 20-80°C</div>
          </div>

          {/* Vibration */}
          <div className="bg-secondary/30 rounded-lg p-3 border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <Gauge className={`w-4 h-4 ${
                vibrationStatus === "critical" ? "text-status-critical" :
                vibrationStatus === "warning" ? "text-status-warning" : "text-status-healthy"
              }`} />
              <span className="text-sm font-medium text-foreground">Vibração</span>
            </div>
            <div className="text-xl font-bold text-foreground">{data.vibration.toFixed(2)} mm/s</div>
            <div className="text-xs text-muted-foreground">Normal: 0-5 mm/s</div>
          </div>

          {/* Noise */}
          <div className="bg-secondary/30 rounded-lg p-3 border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <Volume2 className={`w-4 h-4 ${
                noiseStatus === "critical" ? "text-status-critical" :
                noiseStatus === "warning" ? "text-status-warning" : "text-status-healthy"
              }`} />
              <span className="text-sm font-medium text-foreground">Ruído</span>
            </div>
            <div className="text-xl font-bold text-foreground">{data.noise.toFixed(1)} dB</div>
            <div className="text-xs text-muted-foreground">Normal: 30-85 dB</div>
          </div>

          {/* Pressure */}
          <div className="bg-secondary/30 rounded-lg p-3 border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className={`w-4 h-4 ${
                pressureStatus === "critical" ? "text-status-critical" :
                pressureStatus === "warning" ? "text-status-warning" : "text-status-healthy"
              }`} />
              <span className="text-sm font-medium text-foreground">Pressão</span>
            </div>
            <div className="text-xl font-bold text-foreground">{data.pressure.toFixed(1)} bar</div>
            <div className="text-xs text-muted-foreground">Normal: 2-8 bar</div>
          </div>
        </div>

        {/* Alerts */}
        {(tempStatus !== "healthy" || vibrationStatus !== "healthy" || 
          noiseStatus !== "healthy" || pressureStatus !== "healthy") && (
          <div className="bg-status-warning/10 border border-status-warning/30 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2 text-status-warning">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-medium">Parâmetros fora do normal detectados</span>
            </div>
          </div>
        )}

        {/* Trend Chart */}
        <div className="border border-border/50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Tendência (últimas 24h)</span>
          </div>
          <TrendChart pumpId={pump.id} />
        </div>
      </div>
    </Card>
  );
};