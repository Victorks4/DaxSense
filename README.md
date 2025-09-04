# 🚀 DaxSense - Sistema de Monitoramento de Bombas

<div align="center">

![DaxSense Logo](https://img.shields.io/badge/DaxSense-Monitoring%20System-blue?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)

</div>

## 📋 Descrição

O **DaxSense** é uma aplicação web moderna para monitoramento em tempo real de bombas industriais. Desenvolvido com React e TypeScript, oferece uma interface intuitiva para acompanhar o status, performance e saúde de bombas centrífugas e de engrenagem em sistemas industriais.

## ✨ Funcionalidades Principais

### 🔍 Monitoramento em Tempo Real
- **Dados de Sensores**: Temperatura, vibração, ruído, pressão e vazão
- **Atualização Automática**: Dados atualizados a cada 2 segundos
- **Status Visual**: Indicadores coloridos para diferentes estados (Operacional, Atenção, Crítico, Offline)

### 📊 Visualização de Dados
- **Gráficos de Tendência**: Análise temporal dos parâmetros de operação
- **Cards Informativos**: Exibição clara de métricas importantes
- **Alertas Inteligentes**: Sistema de notificações para condições críticas

### ⚙️ Controle de Operação
- **Ligar/Desligar Bombas**: Controle remoto das bombas
- **Edição de Configurações**: Modificação de parâmetros das bombas
- **Adição de Novas Bombas**: Interface para expandir o sistema

### 🎨 Interface Moderna
- **Design Responsivo**: Adaptável a diferentes tamanhos de tela
- **Tema Escuro/Claro**: Alternância entre modos de visualização
- **Componentes Reutilizáveis**: UI consistente e profissional

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18.3.1** - Biblioteca JavaScript para interfaces
- **TypeScript 5.8.3** - Tipagem estática para JavaScript
- **Vite 5.4.19** - Build tool e dev server
- **React Router DOM 6.30.1** - Roteamento da aplicação
- **TanStack Query 5.83.0** - Gerenciamento de estado e cache

### UI/UX
- **Tailwind CSS 3.4.17** - Framework CSS utilitário
- **Radix UI** - Componentes acessíveis e customizáveis
- **Lucide React** - Ícones modernos
- **Recharts 2.15.4** - Biblioteca de gráficos
- **Sonner 1.7.4** - Sistema de notificações

### Desenvolvimento
- **ESLint 9.32.0** - Linting de código
- **PostCSS 8.5.6** - Processamento CSS
- **Autoprefixer 10.4.21** - Prefixos CSS automáticos

### Deploy
- **Firebase Hosting** - Hospedagem e deploy automático

## 🚀 Instalação e Uso

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/DaxSense.git
cd DaxSense
```

### 2. Instale as dependências
```bash
npm install
# ou
yarn install
```

### 3. Execute em modo de desenvolvimento
```bash
npm run dev
# ou
yarn dev
```

A aplicação estará disponível em `http://localhost:5173`

### 4. Build para produção
```bash
npm run build
# ou
yarn build
```

### 5. Deploy no Firebase (opcional)
```bash
npm run firebase:deploy
```

## 📁 Estrutura do Projeto

```
DaxSense/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── ui/             # Componentes de UI base
│   │   ├── PumpCard.tsx    # Card de bomba individual
│   │   ├── AlertPanel.tsx  # Painel de alertas
│   │   └── TrendChart.tsx  # Gráficos de tendência
│   ├── hooks/              # Custom hooks
│   │   ├── usePumpData.ts  # Hook para dados das bombas
│   │   └── useTheme.ts     # Hook para tema
│   ├── pages/              # Páginas da aplicação
│   │   ├── Dashboard.tsx   # Página principal
│   │   └── NotFound.tsx    # Página 404
│   ├── lib/                # Utilitários
│   └── App.tsx             # Componente raiz
├── public/                 # Arquivos estáticos
├── supabase/              # Configuração Supabase
└── package.json           # Dependências e scripts
```

## 🔧 Configuração

### Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz do projeto:

```env
VITE_SUPABASE_URL=sua_url_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_supabase
```

### Firebase (para deploy)
1. Instale o Firebase CLI: `npm install -g firebase-tools`
2. Faça login: `firebase login`
3. Configure o projeto: `firebase init`

## 📈 Funcionalidades Detalhadas

### Monitoramento de Bombas
- **Temperatura**: Monitoramento de temperatura operacional
- **Vibração**: Análise de vibrações mecânicas
- **Ruído**: Medição de níveis de ruído
- **Pressão**: Controle de pressão do sistema
- **Vazão**: Monitoramento de fluxo (L/min)

### Estados das Bombas
- 🟢 **Operacional**: Funcionamento normal
- 🟡 **Atenção**: Parâmetros próximos aos limites
- 🔴 **Crítico**: Valores fora dos limites seguros
- ⚫ **Offline**: Bomba desligada

### Interface Responsiva
- **Desktop**: Layout completo com todos os recursos
- **Tablet**: Adaptação para telas médias
- **Mobile**: Interface otimizada para smartphones

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.


## 🙏 Agradecimentos

- Comunidade React
- Equipe do Vite
- Contribuidores do Tailwind CSS
- Desenvolvedores do Radix UI

---

<div align="center">

**⭐ Se este projeto te ajudou, considere dar uma estrela!**

</div>
