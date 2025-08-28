import { useState, useEffect } from "react";
import { PumpCard } from "@/components/PumpCard";
import { AlertPanel } from "@/components/AlertPanel";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Activity, Shield, Zap, Power } from "lucide-react";
import { usePumpData } from "@/hooks/usePumpData";

export interface Pump {
  id: string;
  name: string;
  type: "centrifugal" | "gear";
  location: string;
  status: "healthy" | "warning" | "critical" | "offline";
  description?: string;
}

const Dashboard = () => {
  const [pumps, setPumps] = useState<Pump[]>([
    {
      id: "pump-001",
      name: "Bomba Principal A",
      type: "centrifugal",
      location: "Linha de Produção 1",
      status: "healthy",
      description: "Bomba centrífuga responsável pelo bombeamento principal da linha de produção"
    },
    {
      id: "pump-002", 
      name: "Bomba Secundária B",
      type: "gear",
      location: "Linha de Produção 2", 
      status: "warning",
      description: "Bomba de engrenagem para apoio na linha secundária"
    },
    {
      id: "pump-003",
      name: "Bomba de Resfriamento C",
      type: "centrifugal",
      location: "Sistema de Refrigeração",
      status: "healthy",
      description: "Sistema de resfriamento do equipamento principal"
    },
  ]);

  const [selectedPumpToShutdown, setSelectedPumpToShutdown] = useState<Pump | null>(null);
  const [showShutdownDialog, setShowShutdownDialog] = useState(false);
  const [editingPump, setEditingPump] = useState<Pump | null>(null);
  const [editForm, setEditForm] = useState({ name: "", location: "", description: "" });

  const pumpData = usePumpData(pumps);

  const addNewPump = () => {
    const newPump: Pump = {
      id: `pump-${String(pumps.length + 1).padStart(3, '0')}`,
      name: `Nova Bomba ${String.fromCharCode(65 + pumps.length)}`,
      type: "centrifugal",
      location: "Nova Localização",
      status: "healthy",
      description: "Nova bomba adicionada ao sistema"
    };
    setPumps([...pumps, newPump]);
  };

  const handleShutdownRequest = (pump: Pump) => {
    setSelectedPumpToShutdown(pump);
    setShowShutdownDialog(true);
  };

  const confirmShutdown = () => {
    if (selectedPumpToShutdown) {
      setPumps(prevPumps => 
        prevPumps.map(pump => 
          pump.id === selectedPumpToShutdown.id 
            ? { ...pump, status: "offline" as const }
            : pump
        )
      );
      setShowShutdownDialog(false);
      setSelectedPumpToShutdown(null);
    }
  };

  const handleTurnOnPump = (pumpId: string) => {
    setPumps(prevPumps => 
      prevPumps.map(pump => 
        pump.id === pumpId 
          ? { ...pump, status: "healthy" as const }
          : pump
      )
    );
  };

  const handleEditPump = (pump: Pump) => {
    setEditingPump(pump);
    setEditForm({
      name: pump.name,
      location: pump.location,
      description: pump.description || ""
    });
  };

  const handleSaveEdit = () => {
    if (editingPump) {
      setPumps(pumps.map(pump => 
        pump.id === editingPump.id 
          ? { 
              ...pump, 
              name: editForm.name,
              location: editForm.location,
              description: editForm.description
            }
          : pump
      ));
      setEditingPump(null);
      setEditForm({ name: "", location: "", description: "" });
    }
  };

  const handleCancelEdit = () => {
    setEditingPump(null);
    setEditForm({ name: "", location: "", description: "" });
  };

  const cancelShutdown = () => {
    setShowShutdownDialog(false);
    setSelectedPumpToShutdown(null);
  };

  // Filtrar apenas bombas que estão ativas (não offline) para o dropdown de desligamento
  const activePumps = pumps.filter(pump => pump.status !== "offline");

  const healthyCount = pumps.filter(p => p.status === 'healthy').length;
  const warningCount = pumps.filter(p => p.status === 'warning').length;
  const criticalCount = pumps.filter(p => p.status === 'critical').length;
  const offlineCount = pumps.filter(p => p.status === 'offline').length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">DaxSense</h1>
                <p className="text-sm text-muted-foreground">Sensoriamento avançado para operações seguras e eficientes.</p>
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
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <span className="text-foreground">{offlineCount} Desligadas</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="destructive" 
                      className="bg-red-600 hover:bg-red-700"
                      disabled={activePumps.length === 0}
                    >
                      <Power className="w-4 h-4 mr-2" />
                      Desligar Bomba
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64">
                    {activePumps.length === 0 ? (
                      <DropdownMenuItem disabled>
                        Nenhuma bomba ativa disponível
                      </DropdownMenuItem>
                    ) : (
                      activePumps.map((pump) => (
                        <DropdownMenuItem
                          key={pump.id}
                          onClick={() => handleShutdownRequest(pump)}
                          className="flex flex-col items-start gap-1 p-3"
                        >
                          <div className="font-medium">{pump.name}</div>
                          <div className="text-xs text-muted-foreground">{pump.location}</div>
                          <div className="flex items-center gap-2 text-xs">
                            <div className={`w-2 h-2 rounded-full ${
                              pump.status === 'healthy' ? 'bg-status-healthy' :
                              pump.status === 'warning' ? 'bg-status-warning' :
                              'bg-status-critical'
                            }`}></div>
                            <span className="capitalize">{pump.status}</span>
                          </div>
                        </DropdownMenuItem>
                      ))
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button onClick={addNewPump} className="bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Bomba
                </Button>
              </div>
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
                  onTurnOn={handleTurnOnPump}
                  onEdit={handleEditPump}
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

      {/* Diálogo de Confirmação de Desligamento */}
      <AlertDialog open={showShutdownDialog} onOpenChange={setShowShutdownDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Desligamento Remoto</AlertDialogTitle>
            <AlertDialogDescription>
              Você está prestes a desligar remotamente a bomba:
              <div className="mt-3 p-3 bg-muted rounded-lg">
                <div className="font-semibold">{selectedPumpToShutdown?.name}</div>
                <div className="text-sm text-muted-foreground">{selectedPumpToShutdown?.location}</div>
              </div>
              <div className="mt-3 text-red-600 font-medium">
                ⚠️ Esta ação irá interromper imediatamente o funcionamento da bomba. 
                Certifique-se de que é seguro prosseguir.
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelShutdown}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmShutdown}
              className="bg-red-600 hover:bg-red-700"
            >
              Confirmar Desligamento
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Diálogo de Edição de Bomba */}
      <Dialog open={!!editingPump} onOpenChange={(open) => !open && handleCancelEdit()}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Bomba</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome da Bomba</Label>
              <Input
                id="name"
                value={editForm.name}
                onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                placeholder="Digite o nome da bomba"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Localização</Label>
              <Input
                id="location"
                value={editForm.location}
                onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                placeholder="Digite a localização da bomba"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={editForm.description}
                onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                placeholder="Digite uma descrição para a bomba"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelEdit}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEdit}>
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;