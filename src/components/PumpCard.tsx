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
  onTurnOn?: (pumpId: string) => void;
  onEdit?: (pump: Pump) => void;
}

export const PumpCard = ({ pump, data, onTurnOn, onEdit }: PumpCardProps) => {
  if (!data) return null;

  // Renderização especial para bombas offline
  if (pump.status === "offline") {
    return (
      <Card className="bg-card border-border shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="p-6">
          {/* Header para bomba offline */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                <h3 className="text-lg font-semibold text-foreground">{pump.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{pump.location}</p>
              <Badge variant="outline" className="mt-2 text-xs">
                {pump.type === "centrifugal" ? "Centrífuga" : "Engrenagem"}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-gray-400 text-white border-none">
                Desligada
              </Badge>
            </div>
          </div>

          {/* Conteúdo para bomba desligada */}
          <div className="text-center py-8">
            <div className="mb-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Settings className="w-8 h-8 text-gray-400" />
              </div>
              <h4 className="text-lg font-medium text-gray-600 mb-2">Bomba Desligada</h4>
              <p className="text-sm text-gray-500 mb-4">
                Esta bomba foi desligada remotamente e não está operando no momento.
              </p>
            </div>
            {onTurnOn && (
              <Button 
                onClick={() => onTurnOn(pump.id)}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <span className="mr-2">🔌</span>
                Ligar Bomba
              </Button>
            )}
          </div>
        </div>
      </Card>
    );
  }

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
            {onEdit && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onEdit(pump)}
              >
                <Settings className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Sensor Grid */}
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
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
            <div className="text-xl font-bold text-foreground">{data.pressure.toFixed(1)} Kgf</div>
            <div className="text-xs text-muted-foreground">Normal: 2-8 Kgf</div>
          </div>

          {/* Flow Rate */}
          <div className="bg-secondary/30 rounded-lg p-3 border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="w-4 h-4 text-status-healthy" />
              <span className="text-sm font-medium text-foreground">Vazão</span>
            </div>
            <div className="text-xl font-bold text-foreground">{data.flowRate.toFixed(1)} L/min</div>
            <div className="text-xs text-muted-foreground">Normal: 100-200 L/min</div>
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