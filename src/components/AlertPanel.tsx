import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  Mail,
  Download
} from "lucide-react";
import { Pump } from "@/pages/Dashboard";
import { PumpSensorData } from "@/hooks/usePumpData";
import { useToast } from "@/hooks/use-toast";

interface AlertPanelProps {
  pumps: Pump[];
  pumpData: Record<string, PumpSensorData>;
}

export const AlertPanel = ({ pumps, pumpData }: AlertPanelProps) => {
  const { toast } = useToast();

  // Generate alerts based on pump data
  const generateAlerts = () => {
    const alerts: any[] = [];
    
    pumps.forEach(pump => {
      const data = pumpData[pump.id];
      if (!data) return;

      // Temperature alerts
      if (data.temperature > 80) {
        alerts.push({
          id: `temp-${pump.id}`,
          type: "critical",
          pump: pump.name,
          message: `Temperatura crítica: ${data.temperature.toFixed(1)}°C`,
          time: new Date(),
          parameter: "temperature"
        });
      } else if (data.temperature > 70) {
        alerts.push({
          id: `temp-${pump.id}`,
          type: "warning", 
          pump: pump.name,
          message: `Temperatura elevada: ${data.temperature.toFixed(1)}°C`,
          time: new Date(),
          parameter: "temperature"
        });
      }

      // Vibration alerts  
      if (data.vibration > 5) {
        alerts.push({
          id: `vib-${pump.id}`,
          type: "critical",
          pump: pump.name,
          message: `Vibração excessiva: ${data.vibration.toFixed(2)} mm/s`,
          time: new Date(),
          parameter: "vibration"
        });
      } else if (data.vibration > 4) {
        alerts.push({
          id: `vib-${pump.id}`,
          type: "warning",
          pump: pump.name, 
          message: `Vibração elevada: ${data.vibration.toFixed(2)} mm/s`,
          time: new Date(),
          parameter: "vibration"
        });
      }

      // Pressure alerts
      if (data.pressure < 2 || data.pressure > 8) {
        alerts.push({
          id: `press-${pump.id}`,
          type: "critical",
          pump: pump.name,
          message: `Pressão fora do padrão: ${data.pressure.toFixed(1)} bar`,
          time: new Date(),
          parameter: "pressure"
        });
      }

      // Noise alerts
      if (data.noise > 85) {
        alerts.push({
          id: `noise-${pump.id}`,
          type: "warning",
          pump: pump.name,
          message: `Ruído elevado: ${data.noise.toFixed(1)} dB`,
          time: new Date(),
          parameter: "noise"
        });
      }
    });

    return alerts.sort((a, b) => {
      if (a.type === "critical" && b.type !== "critical") return -1;
      if (b.type === "critical" && a.type !== "critical") return 1;
      return 0;
    });
  };

  const alerts = generateAlerts();

  const sendMaintenanceReport = () => {
    toast({
      title: "Relatório Enviado",
      description: "Relatório de alertas enviado para a equipe de manutenção.",
    });
  };

  const exportData = () => {
    toast({
      title: "Exportação Iniciada", 
      description: "Dados históricos sendo preparados para download.",
    });
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical": return <AlertTriangle className="w-4 h-4 text-status-critical" />;
      case "warning": return <AlertCircle className="w-4 h-4 text-status-warning" />;
      default: return <CheckCircle className="w-4 h-4 text-status-healthy" />;
    }
  };

  const getAlertBadgeColor = (type: string) => {
    switch (type) {
      case "critical": return "bg-status-critical text-white";
      case "warning": return "bg-status-warning text-black";
      default: return "bg-status-healthy text-white";
    }
  };

  return (
    <div className="space-y-6">
      {/* Alert Summary */}
      <Card className="bg-card border-border shadow-lg">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Central de Alertas</h3>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Alertas Críticos</span>
              <Badge className="bg-status-critical text-white">
                {alerts.filter(a => a.type === "critical").length}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Alertas de Atenção</span>
              <Badge className="bg-status-warning text-black">
                {alerts.filter(a => a.type === "warning").length}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Sistema Operacional</span>
              <Badge className="bg-status-healthy text-white">
                {pumps.filter(p => p.status === "healthy").length}
              </Badge>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={sendMaintenanceReport}
              className="flex-1 text-xs"
            >
              <Mail className="w-3 h-3 mr-1" />
              Enviar Relatório
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={exportData}
              className="flex-1 text-xs"
            >
              <Download className="w-3 h-3 mr-1" />
              Exportar
            </Button>
          </div>
        </div>
      </Card>

      {/* Recent Alerts */}
      <Card className="bg-card border-border shadow-lg">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Alertas Recentes</h3>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {alerts.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="w-8 h-8 text-status-healthy mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Todos os sistemas operando normalmente</p>
              </div>
            ) : (
              alerts.map((alert) => (
                <div 
                  key={alert.id}
                  className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg border border-border/50"
                >
                  {getAlertIcon(alert.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-foreground truncate">
                        {alert.pump}
                      </span>
                      <Badge className={`text-xs ${getAlertBadgeColor(alert.type)}`}>
                        {alert.type === "critical" ? "CRÍTICO" : "ATENÇÃO"}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2 break-words">
                      {alert.message}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>Agora</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};