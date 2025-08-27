import { useState, useEffect } from "react";
import { PumpCard } from "@/components/PumpCard";
import { AlertPanel } from "@/components/AlertPanel";
import { Button } from "@/components/ui/button";
import { Plus, Activity, Shield, Zap } from "lucide-react";
import { usePumpData } from "@/hooks/usePumpData";

export interface Pump {
  id: string;
  name: string;
  type: "centrifugal" | "gear";
  location: string;
  status: "healthy" | "warning" | "critical" | "offline";
}

const Dashboard = () => {
  const [pumps, setPumps] = useState<Pump[]>([
    {
      id: "pump-001",
      name: "Bomba Principal A",
      type: "centrifugal",
      location: "Linha de Produção 1",
      status: "healthy",
    },
    {
      id: "pump-002", 
      name: "Bomba Secundária B",
      type: "gear",
      location: "Linha de Produção 2", 
      status: "warning",
    },
    {
      id: "pump-003",
      name: "Bomba de Resfriamento C",
      type: "centrifugal",
      location: "Sistema de Refrigeração",
      status: "healthy",
    },
  ]);

  const pumpData = usePumpData(pumps);

  const addNewPump = () => {
    const newPump: Pump = {
      id: `pump-${String(pumps.length + 1).padStart(3, '0')}`,
      name: `Nova Bomba ${String.fromCharCode(65 + pumps.length)}`,
      type: "centrifugal",
      location: "Nova Localização",
      status: "healthy",
    };
    setPumps([...pumps, newPump]);
  };

  const healthyCount = pumps.filter(p => p.status === 'healthy').length;
  const warningCount = pumps.filter(p => p.status === 'warning').length;
  const criticalCount = pumps.filter(p => p.status === 'critical').length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Smart Pump Guardian</h1>
                <p className="text-sm text-muted-foreground">Sistema de Monitoramento Inteligente</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-status-healthy rounded-full"></div>
                  <span className="text-foreground">{healthyCount} Saudáveis</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-status-warning rounded-full"></div>
                  <span className="text-foreground">{warningCount} Atenção</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-status-critical rounded-full"></div>
                  <span className="text-foreground">{criticalCount} Críticas</span>
                </div>
              </div>
              <Button onClick={addNewPump} className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Nova Bomba
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main monitoring area */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {pumps.map((pump) => (
                <PumpCard 
                  key={pump.id} 
                  pump={pump} 
                  data={pumpData[pump.id]} 
                />
              ))}
            </div>
          </div>

          {/* Alert Panel */}
          <div className="lg:col-span-1">
            <AlertPanel pumps={pumps} pumpData={pumpData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;