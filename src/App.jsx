import { useState, useEffect } from "react";
import {
  Camera,
  Upload,
  Check,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  AlertTriangle,
  Clock,
  LogOut,
  Search,
  TrendingUp,
  MapPin,
  User,
  Lock,
  BarChart3,
  Building2,
  Bell,
  Eye,
  Gauge,
  History as HistoryIcon,
  Sparkles,
  X,
} from "lucide-react";

/* ---------------------------------------------------------------- */
/* Mock data                                                         */
/* ---------------------------------------------------------------- */

const UNITS = [
  { id: 1, name: "Posto Central", status: "ok", last: "11/07", sla: 5, inc: 0 },
  { id: 2, name: "Posto Nova Marambaia", status: "ok", last: "11/07", sla: 5, inc: 0 },
  { id: 3, name: "Auto Posto Rio Guamá", status: "ok", last: "10/07", sla: 4, inc: 1 },
  { id: 4, name: "Posto BR-316 Km 5", status: "ok", last: "10/07", sla: 4, inc: 0 },
  { id: 5, name: "Posto Icoaraci", status: "ok", last: "09/07", sla: 3, inc: 0 },
  { id: 6, name: "Posto Ananindeua", status: "ok", last: "09/07", sla: 3, inc: 0 },
  { id: 7, name: "Posto Val-de-Cans", status: "ok", last: "08/07", sla: 2, inc: 0 },
  { id: 8, name: "Posto Marco", status: "ok", last: "08/07", sla: 2, inc: 1 },
  { id: 9, name: "Posto Pedreira", status: "ok", last: "11/07", sla: 6, inc: 0 },
  { id: 10, name: "Posto Guajará", status: "ok", last: "10/07", sla: 5, inc: 0 },
  { id: 11, name: "Posto Sacramenta", status: "ok", last: "09/07", sla: 4, inc: 0 },
  { id: 12, name: "Posto Cremação", status: "ok", last: "11/07", sla: 6, inc: 0 },
  { id: 13, name: "Posto Umarizal", status: "ok", last: "08/07", sla: 3, inc: 0 },
  { id: 14, name: "Posto Batista Campos", status: "ok", last: "10/07", sla: 5, inc: 0 },
  { id: 15, name: "Posto Jurunas", status: "ok", last: "09/07", sla: 4, inc: 0 },
  { id: 16, name: "Posto Condor", status: "ok", last: "11/07", sla: 6, inc: 0 },
  { id: 17, name: "Posto São Brás", status: "ok", last: "10/07", sla: 5, inc: 0 },
  { id: 18, name: "Posto Telégrafo", status: "ok", last: "08/07", sla: 3, inc: 0 },
  { id: 19, name: "Posto Canudos", status: "ok", last: "09/07", sla: 4, inc: 0 },
  { id: 20, name: "Posto Souza", status: "ok", last: "11/07", sla: 6, inc: 0 },
  { id: 21, name: "Posto Tapanã", status: "ok", last: "10/07", sla: 5, inc: 0 },
  { id: 22, name: "Posto Coqueiro", status: "ok", last: "09/07", sla: 4, inc: 0 },
  { id: 23, name: "Posto Águas Lindas", status: "ok", last: "08/07", sla: 3, inc: 0 },
  { id: 24, name: "Posto Mangueirão", status: "ok", last: "11/07", sla: 6, inc: 0 },
  { id: 25, name: "Posto Curió-Utinga", status: "atencao", last: "04/07", sla: 1, inc: 0 },
  { id: 26, name: "Posto Barreiro", status: "atencao", last: "03/07", sla: 1, inc: 0 },
  { id: 27, name: "Posto Fátima", status: "atencao", last: "02/07", sla: 2, inc: 0 },
  { id: 28, name: "Posto Providência", status: "atencao", last: "01/07", sla: 2, inc: 0 },
  { id: 29, name: "Posto Terra Firme", status: "atrasado", last: "26/06", sla: -3, inc: 0 },
  { id: 30, name: "Posto Guanabara", status: "atrasado", last: "24/06", sla: -6, inc: 0 },
];

const WEEK_TREND = [
  { d: "Seg", v: 4 },
  { d: "Ter", v: 5 },
  { d: "Qua", v: 3 },
  { d: "Qui", v: 6 },
  { d: "Sex", v: 4 },
  { d: "Sáb", v: 1 },
  { d: "Dom", v: 1 },
];

const TECH_NAME = "Carlos Mendes";

const TECH_HISTORY_SEED = [
  { id: 1, date: "04/07/2026", time: "09:14", tech: TECH_NAME, status: "ok" },
  { id: 2, date: "27/06/2026", time: "08:52", tech: TECH_NAME, status: "ok" },
  { id: 3, date: "20/06/2026", time: "09:30", tech: "Juliana Reis", status: "inconsistencia" },
  { id: 4, date: "13/06/2026", time: "09:05", tech: TECH_NAME, status: "ok" },
];

/* ---------------------------------------------------------------- */
/* Global styles / atoms                                             */
/* ---------------------------------------------------------------- */

function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
      .font-display, .font-display * { font-family: 'Manrope', ui-sans-serif, system-ui, sans-serif; }
      .font-data { font-family: 'JetBrains Mono', ui-monospace, monospace; }
      @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      .animate-in { animation: fadeSlideIn 0.35s ease both; }
      @keyframes flashPop { 0% { opacity: 0.9; } 100% { opacity: 0; } }
      .flash-pop { animation: flashPop 0.5s ease-out forwards; }
      @keyframes spinSlow { to { transform: rotate(360deg); } }
      .spin-slow { animation: spinSlow 1.1s linear infinite; }
      @keyframes progressFill { from { width: 0%; } to { width: 100%; } }
      .progress-fill { animation: progressFill 2.3s ease-in-out forwards; }
      @keyframes pulseGlow {
        0%, 100% { box-shadow: 0 0 0 0 rgba(45,212,191,0.35); }
        50% { box-shadow: 0 0 0 6px rgba(45,212,191,0); }
      }
      .pulse-glow { animation: pulseGlow 0.7s ease-in-out 2; }
      ::-webkit-scrollbar { width: 8px; height: 8px; }
      ::-webkit-scrollbar-thumb { background: rgba(148,163,184,0.25); border-radius: 999px; }
      select { color-scheme: dark; }
    `}</style>
  );
}

function GradientButton({ children, onClick, className = "", type = "button", disabled, icon: Icon }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold text-white bg-gradient-to-r from-teal-400 via-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/20 transition-all hover:shadow-xl hover:shadow-indigo-500/30 hover:brightness-110 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {Icon && <Icon size={18} strokeWidth={2.25} />}
      {children}
    </button>
  );
}

function GhostButton({ children, onClick, className = "", icon: Icon }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-medium text-slate-300 border border-slate-700 bg-slate-800/40 transition-all hover:bg-slate-800 hover:text-white active:scale-[0.98] ${className}`}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-slate-700/50 bg-slate-800/40 backdrop-blur-sm ${className}`}>
      {children}
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    ok: { label: "OK", cls: "bg-green-500/20 text-green-400 border-green-500/30" },
    concluida: { label: "Concluída", cls: "bg-green-500/20 text-green-400 border-green-500/30" },
    pendente: { label: "Pendente", cls: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
    atencao: { label: "Atenção", cls: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
    atrasado: { label: "Atrasado", cls: "bg-red-500/20 text-red-400 border-red-500/30" },
    inconsistencia: { label: "Inconsistência", cls: "bg-red-500/20 text-red-400 border-red-500/30" },
  };
  const s = map[status] || map.ok;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${s.cls}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {s.label}
    </span>
  );
}

function LogoMark({ size = 40 }) {
  return (
    <div
      className="flex items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 via-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/30 shrink-0"
      style={{ width: size, height: size }}
    >
      <Gauge size={Math.round(size * 0.55)} className="text-white" strokeWidth={2.25} />
    </div>
  );
}

function DemoTag({ className = "" }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900/60 px-2.5 py-1 text-xs font-medium text-slate-400 ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
      Ambiente de demonstração
    </span>
  );
}

/* ---------------------------------------------------------------- */
/* Login                                                              */
/* ---------------------------------------------------------------- */

function LoginScreen({ onLogin }) {
  const [unit, setUnit] = useState("Posto Nova Marambaia");
  const [user, setUser] = useState("tecnico.demo");
  const [pass, setPass] = useState("••••••••");

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-slate-900 px-4 py-10">
      <div className="pointer-events-none absolute -top-32 -left-24 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 w-96 h-96 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative w-full max-w-sm animate-in">
        <div className="flex flex-col items-center mb-8">
          <LogoMark size={56} />
          <h1 className="mt-4 text-xl font-bold text-white tracking-tight text-center">
            Central de Aferições
          </h1>
          <p className="mt-1 text-sm text-slate-400 text-center">
            Gestão digital de bombas de combustível
          </p>
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Unidade / Posto</label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900/70 py-2.5 pl-9 pr-3 text-sm text-white outline-none focus:border-teal-400 transition-colors appearance-none"
                >
                  {UNITS.slice(0, 14).map((u) => (
                    <option key={u.id} value={u.name}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Usuário</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900/70 py-2.5 pl-9 pr-3 text-sm text-white outline-none focus:border-teal-400 transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Senha</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900/70 py-2.5 pl-9 pr-3 text-sm text-white outline-none focus:border-teal-400 transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-2.5">
            <GradientButton className="w-full" onClick={() => onLogin("tecnico", unit)}>
              Entrar como Técnico
            </GradientButton>
            <GhostButton className="w-full" onClick={() => onLogin("admin", unit)}>
              Entrar como Administrador
            </GhostButton>
          </div>
        </Card>

        <p className="mt-6 text-center text-xs text-slate-500">
          Protótipo para demonstração — login e dados fictícios.
        </p>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Tech flow                                                          */
/* ---------------------------------------------------------------- */

function TechHeader({ title, subtitle, onBack, onLogout }) {
  return (
    <div className="sticky top-0 z-10 border-b border-slate-800 bg-slate-900/85 backdrop-blur-md px-4 py-3.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          {onBack && (
            <button
              onClick={onBack}
              className="shrink-0 p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
          )}
          <div className="min-w-0">
            <h1 className="text-base font-semibold text-white truncate">{title}</h1>
            {subtitle && <p className="text-xs text-slate-500 truncate">{subtitle}</p>}
          </div>
        </div>
        {onLogout && (
          <button
            onClick={onLogout}
            className="shrink-0 p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-red-400 transition-colors"
          >
            <LogOut size={18} />
          </button>
        )}
      </div>
    </div>
  );
}

function TechHome({ unitName, weekStatus, lastEntry, onNova, onHistorico, onLogout }) {
  return (
    <div className="min-h-screen bg-slate-900">
      <TechHeader title={unitName} subtitle="Painel do técnico" onLogout={onLogout} />
      <div className="px-4 py-6 max-w-md mx-auto animate-in">
        <DemoTag className="mb-5" />

        <Card className="p-5 mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-slate-400">Aferição desta semana</span>
            <StatusBadge status={weekStatus === "concluida" ? "concluida" : "pendente"} />
          </div>
          <p className="text-xs text-slate-500">
            {weekStatus === "concluida" ? "Registro enviado com sucesso." : "Ainda não realizada — inicie abaixo."}
          </p>
        </Card>

        <button
          onClick={onNova}
          className="w-full rounded-2xl bg-gradient-to-br from-teal-400 via-indigo-500 to-violet-500 p-5 text-left shadow-xl shadow-indigo-500/20 transition-transform active:scale-[0.98] mb-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-bold text-lg">Nova Aferição</p>
              <p className="text-white/80 text-xs mt-0.5">Fotografar ficha e enviar</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Camera size={22} className="text-white" />
            </div>
          </div>
        </button>

        <button
          onClick={onHistorico}
          className="w-full flex items-center justify-between rounded-2xl border border-slate-700/60 bg-slate-800/40 p-4 hover:bg-slate-800 transition-colors"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-slate-700/60 flex items-center justify-center shrink-0">
              <HistoryIcon size={18} className="text-slate-300" />
            </div>
            <div className="text-left min-w-0">
              <p className="text-sm font-medium text-white">Histórico de Aferições</p>
              <p className="text-xs text-slate-500 truncate">
                {lastEntry ? `Última: ${lastEntry.date} às ${lastEntry.time}` : "Nenhum registro ainda"}
              </p>
            </div>
          </div>
          <ChevronRight size={18} className="text-slate-500 shrink-0" />
        </button>
      </div>
    </div>
  );
}

function CaptureScreen({ onBack, onCaptured }) {
  const [flashing, setFlashing] = useState(false);

  const capture = () => {
    setFlashing(true);
    setTimeout(() => {
      onCaptured();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-900 relative">
      <TechHeader title="Nova Aferição" subtitle="Etapa 1 de 3 — Captura" onBack={onBack} />
      {flashing && <div className="fixed inset-0 bg-white z-50 flash-pop pointer-events-none" />}
      <div className="px-4 py-6 max-w-md mx-auto animate-in">
        <p className="text-sm text-slate-400 mb-4">
          Posicione a ficha dentro da moldura e certifique-se de boa iluminação.
        </p>

        <div
          className="relative rounded-2xl border-2 border-dashed border-slate-600 bg-slate-800/40 flex items-center justify-center mb-6 overflow-hidden"
          style={{ aspectRatio: "3 / 4" }}
        >
          <div className="absolute inset-6 rounded-xl border-2 border-teal-400/50" />
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-teal-400 rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-teal-400 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-teal-400 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-teal-400 rounded-br-lg" />
          <div className="flex flex-col items-center gap-2 text-slate-500">
            <Camera size={40} strokeWidth={1.5} />
            <span className="text-xs">Ficha de aferição</span>
          </div>
        </div>

        <div className="space-y-2.5">
          <GradientButton className="w-full" icon={Camera} onClick={capture}>
            Tirar Foto
          </GradientButton>
          <GhostButton className="w-full" icon={Upload} onClick={capture}>
            Selecionar da Galeria
          </GhostButton>
        </div>
      </div>
    </div>
  );
}

function OcrLoadingScreen({ onDone }) {
  const [step, setStep] = useState(0);
  const messages = ["Detectando ficha...", "Lendo campos manuscritos...", "Extraindo dados..."];

  useEffect(() => {
    const interval = setInterval(() => setStep((s) => (s + 1) % messages.length), 800);
    const timeout = setTimeout(onDone, 2300);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center px-6">
      <div className="relative w-20 h-20 mb-6">
        <div className="absolute inset-0 rounded-full border-4 border-slate-700" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-teal-400 border-r-indigo-500 spin-slow" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles size={24} className="text-violet-400" />
        </div>
      </div>
      <p className="text-white font-medium mb-1 text-center">{messages[step]}</p>
      <p className="text-slate-500 text-sm mb-6 text-center">A IA está lendo os dados da ficha</p>
      <div className="w-full max-w-xs h-1.5 rounded-full bg-slate-800 overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-teal-400 via-indigo-500 to-violet-500 progress-fill" />
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-1.5">
        <label className="text-xs font-medium text-slate-400">{label}</label>
        <span title="Extraído automaticamente pela IA">
          <Sparkles size={11} className="text-cyan-400" />
        </span>
      </div>
      {children}
    </div>
  );
}

function inputCls(extra = "") {
  return `w-full rounded-lg border border-slate-700 bg-slate-900/70 py-2.5 px-3 text-sm text-white font-data outline-none focus:border-teal-400 transition-colors ${extra}`;
}

function FichaMini() {
  return (
    <div className="w-8 h-10 flex flex-col gap-0.5 p-1.5">
      <div className="h-1 w-full bg-slate-300 rounded-sm" />
      <div className="h-1 w-4/5 bg-slate-300 rounded-sm" />
      <div className="h-1 w-full bg-slate-200 rounded-sm" />
      <div className="h-1 w-3/5 bg-slate-200 rounded-sm" />
      <div className="h-1 w-full bg-slate-200 rounded-sm" />
    </div>
  );
}

function FichaModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xs bg-white rounded-xl p-5 shadow-2xl animate-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
            Ficha de Aferição — Original
          </span>
          <button onClick={onClose}>
            <X size={16} className="text-slate-400" />
          </button>
        </div>
        <div className="space-y-2">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="h-2 rounded-sm bg-slate-200" style={{ width: `${60 + ((i * 13) % 35)}%` }} />
          ))}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-1.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-6 rounded-sm border border-slate-200" />
          ))}
        </div>
        <p className="mt-4 text-xs text-slate-400 text-center">Imagem ilustrativa — protótipo</p>
      </div>
    </div>
  );
}

function ValidationScreen({ data, setData, onBack, onConfirm, techName }) {
  const [showFicha, setShowFicha] = useState(false);
  const [pulse, setPulse] = useState(false);

  const aferido = parseFloat(data.volumeAferido) || 0;
  const padrao = parseFloat(data.volumePadrao) || 0;
  const erro = padrao ? ((aferido - padrao) / padrao) * 100 : 0;
  const erroAbs = Math.abs(erro);
  const erroColor = erroAbs < 1 ? "text-green-400" : erroAbs < 2 ? "text-amber-400" : "text-red-400";

  const highlightFields = () => {
    setPulse(true);
    setTimeout(() => setPulse(false), 1400);
  };

  const update = (field) => (e) => setData((d) => ({ ...d, [field]: e.target.value }));

  return (
    <div className="min-h-screen bg-slate-900">
      <TechHeader title="Validar Dados" subtitle="Etapa 2 de 3 — Confirmação" onBack={onBack} />
      <div className="px-4 py-6 max-w-md mx-auto animate-in">
        <button
          onClick={() => setShowFicha(true)}
          className="w-full flex items-center gap-3 rounded-xl border border-slate-700/60 bg-slate-800/40 p-3 mb-5 hover:bg-slate-800 transition-colors"
        >
          <div className="w-12 h-14 rounded-md bg-white/95 flex items-center justify-center shrink-0 shadow">
            <FichaMini />
          </div>
          <div className="flex-1 text-left min-w-0">
            <p className="text-sm font-medium text-white truncate">Ficha_Afericao_0847.jpg</p>
            <p className="text-xs text-slate-500">Toque para ver a ficha original</p>
          </div>
          <Eye size={17} className="text-slate-400 shrink-0" />
        </button>

        <Card className={`p-5 space-y-4 mb-5 transition-shadow ${pulse ? "pulse-glow" : ""}`}>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Bomba">
              <input className={inputCls()} value={data.bomba} onChange={update("bomba")} />
            </Field>
            <Field label="Bico">
              <input className={inputCls()} value={data.bico} onChange={update("bico")} />
            </Field>
          </div>

          <Field label="Produto">
            <select className={inputCls("appearance-none")} value={data.produto} onChange={update("produto")}>
              <option>Gasolina Comum</option>
              <option>Gasolina Aditivada</option>
              <option>Etanol</option>
              <option>Diesel S10</option>
              <option>Diesel S500</option>
            </select>
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Volume Aferido (L)">
              <input
                className={inputCls()}
                value={data.volumeAferido}
                onChange={update("volumeAferido")}
                inputMode="decimal"
              />
            </Field>
            <Field label="Volume Padrão (L)">
              <input
                className={inputCls()}
                value={data.volumePadrao}
                onChange={update("volumePadrao")}
                inputMode="decimal"
              />
            </Field>
          </div>

          <div className="rounded-lg border border-slate-700/60 bg-slate-900/50 px-3 py-2.5 flex items-center justify-between">
            <span className="text-xs text-slate-400">Erro calculado</span>
            <span className={`font-data font-semibold text-sm ${erroColor}`}>
              {erro > 0 ? "+" : ""}
              {erro.toFixed(2)}%
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Data">
              <input className={inputCls()} value={data.data} onChange={update("data")} />
            </Field>
            <Field label="Hora">
              <input className={inputCls()} value={data.hora} onChange={update("hora")} />
            </Field>
          </div>

          <Field label="Técnico Responsável">
            <input className={inputCls("opacity-70")} value={techName} readOnly />
          </Field>
        </Card>

        <div className="space-y-2.5">
          <GradientButton className="w-full" icon={Check} onClick={() => onConfirm(erro)}>
            Confirmar e Enviar
          </GradientButton>
          <GhostButton className="w-full" onClick={highlightFields}>
            Corrigir manualmente
          </GhostButton>
        </div>
      </div>

      {showFicha && <FichaModal onClose={() => setShowFicha(false)} />}
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-white font-data text-sm mt-0.5 truncate">{value}</p>
    </div>
  );
}

function ConfirmationScreen({ data, erro, onHistorico, onNova }) {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center px-6 py-10">
      <div className="w-full max-w-sm text-center animate-in">
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-teal-400 via-indigo-500 to-violet-500 flex items-center justify-center mb-5 shadow-xl shadow-indigo-500/30">
          <Check size={30} className="text-white" strokeWidth={3} />
        </div>
        <h2 className="text-white text-lg font-bold mb-1">Aferição registrada com sucesso</h2>
        <p className="text-slate-400 text-sm mb-6">Os dados foram enviados à central de monitoramento.</p>

        <Card className="p-4 text-left mb-6">
          <div className="grid grid-cols-2 gap-3">
            <SummaryRow label="Bomba / Bico" value={`${data.bomba} / ${data.bico}`} />
            <SummaryRow label="Produto" value={data.produto} />
            <SummaryRow label="Volume aferido" value={`${data.volumeAferido} L`} />
            <SummaryRow label="Erro" value={`${erro > 0 ? "+" : ""}${erro.toFixed(2)}%`} />
            <SummaryRow label="Data / Hora" value={`${data.data} ${data.hora}`} />
          </div>
        </Card>

        <div className="space-y-2.5">
          <GradientButton className="w-full" onClick={onHistorico}>
            Ver Histórico
          </GradientButton>
          <GhostButton className="w-full" onClick={onNova}>
            Nova Aferição
          </GhostButton>
        </div>
      </div>
    </div>
  );
}

function TechHistoryScreen({ history, onBack }) {
  return (
    <div className="min-h-screen bg-slate-900">
      <TechHeader title="Histórico de Aferições" onBack={onBack} />
      <div className="px-4 py-6 max-w-md mx-auto animate-in space-y-3">
        {history.map((h) => (
          <Card key={h.id} className="p-4 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {h.date} · {h.time}
              </p>
              <p className="text-xs text-slate-500 truncate">{h.tech}</p>
            </div>
            <StatusBadge status={h.status} />
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Admin flow                                                         */
/* ---------------------------------------------------------------- */

const ADMIN_NAV = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "unidades", label: "Unidades", icon: Building2 },
  { id: "alertas", label: "Alertas", icon: Bell },
];

function AdminShell({ active, onNavigate, onLogout, children }) {
  return (
    <div className="min-h-screen bg-slate-900 md:flex">
      <aside
        className="hidden md:flex md:w-60 md:flex-col md:fixed md:inset-y-0 border-r border-slate-800"
        style={{ backgroundColor: "#0B0F19" }}
      >
        <div className="flex items-center gap-2.5 px-5 py-5">
          <LogoMark size={34} />
          <p className="text-sm font-bold text-white leading-tight">
            Central de
            <br />
            Aferições
          </p>
        </div>
        <nav className="flex-1 px-3 space-y-1 mt-2">
          {ADMIN_NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active === item.id
                  ? "bg-gradient-to-r from-teal-400/20 to-violet-500/20 text-white border border-teal-400/30"
                  : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
              }`}
            >
              <item.icon size={17} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="px-3 pb-5">
          <DemoTag className="mb-3 w-full justify-center" />
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-slate-800/60 hover:text-red-400 transition-colors"
          >
            <LogOut size={17} /> Sair
          </button>
        </div>
      </aside>

      <div className="md:hidden sticky top-0 z-10 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <LogoMark size={30} />
            <span className="text-sm font-bold text-white">Painel Admin</span>
          </div>
          <button onClick={onLogout} className="p-1.5 rounded-lg text-slate-400 hover:text-red-400">
            <LogOut size={18} />
          </button>
        </div>
        <div className="flex gap-1 px-3 pb-2 overflow-x-auto">
          {ADMIN_NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium whitespace-nowrap transition-colors ${
                active === item.id
                  ? "bg-gradient-to-r from-teal-400 to-violet-500 text-white"
                  : "text-slate-400 bg-slate-800/50"
              }`}
            >
              <item.icon size={14} /> {item.label}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 md:ml-60 px-4 md:px-8 py-6 md:py-8">{children}</main>
    </div>
  );
}

function KpiCard({ icon: Icon, label, value, tone = "default" }) {
  const toneCls = {
    default: "text-white",
    green: "text-green-400",
    amber: "text-amber-400",
    red: "text-red-400",
  }[tone];
  return (
    <Card className="p-4">
      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-teal-400/20 to-violet-500/20 flex items-center justify-center mb-3">
        <Icon size={16} className="text-teal-400" />
      </div>
      <p className={`text-2xl font-bold font-data ${toneCls}`}>{value}</p>
      <p className="text-xs text-slate-500 mt-1">{label}</p>
    </Card>
  );
}

function AdminDashboard({ units }) {
  const ok = units.filter((u) => u.status === "ok").length;
  const pendentes = units.filter((u) => u.status !== "ok").length;
  const inconsistencias = units.reduce((s, u) => s + u.inc, 0);
  const dotColor = { ok: "bg-green-500", atencao: "bg-amber-500", atrasado: "bg-red-500" };
  const maxTrend = Math.max(...WEEK_TREND.map((d) => d.v));

  return (
    <div className="animate-in max-w-6xl">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-white">Dashboard Geral da Rede</h2>
        <p className="text-sm text-slate-500">Visão consolidada das {units.length} unidades</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <KpiCard icon={CheckCircle2} label="Aferiram esta semana" value={`${ok}/${units.length}`} tone="green" />
        <KpiCard icon={Clock} label="Unidades pendentes" value={pendentes} tone="amber" />
        <KpiCard icon={Gauge} label="SLA médio" value="3.2 dias" />
        <KpiCard icon={AlertTriangle} label="Inconsistências" value={inconsistencias} tone="red" />
      </div>

      <Card className="p-5 mb-6">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h3 className="text-sm font-semibold text-white">Status por unidade</h3>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              OK
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Atenção
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              Atrasado
            </span>
          </div>
        </div>
        <div className="grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-10 gap-2">
          {units.map((u) => (
            <div
              key={u.id}
              title={`${u.name} — ${u.status === "ok" ? "Em dia" : u.status === "atencao" ? "SLA próximo" : "Atrasado"}`}
              className={`aspect-square rounded-md ${dotColor[u.status]} opacity-80 hover:opacity-100 transition-opacity cursor-default`}
            />
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <h3 className="text-sm font-semibold text-white mb-5 flex items-center gap-2">
          <TrendingUp size={15} className="text-teal-400" /> Tendência semanal de aferições
        </h3>
        <div className="flex items-end justify-between gap-2 h-32">
          {WEEK_TREND.map((d) => (
            <div key={d.d} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex items-end justify-center h-24">
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-indigo-500 to-teal-400"
                  style={{ height: `${(d.v / maxTrend) * 100}%` }}
                />
              </div>
              <span className="text-xs text-slate-500">{d.d}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function AdminUnits({ units }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("todos");

  const filtered = units.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "todos" || u.status === filter;
    return matchesSearch && matchesFilter;
  });

  const slaLabel = (u) => (u.sla >= 0 ? `${u.sla}d restantes` : `${Math.abs(u.sla)}d vencido`);

  return (
    <div className="animate-in max-w-6xl">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-white">Unidades</h2>
        <p className="text-sm text-slate-500">
          {filtered.length} de {units.length} unidades
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar unidade..."
            className="w-full rounded-lg border border-slate-700 bg-slate-800/50 py-2.5 pl-9 pr-3 text-sm text-white outline-none focus:border-teal-400 transition-colors"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-800/50 py-2.5 px-3 text-sm text-white outline-none focus:border-teal-400 transition-colors appearance-none"
        >
          <option value="todos">Todos os status</option>
          <option value="ok">Concluídas</option>
          <option value="atencao">Atenção</option>
          <option value="atrasado">Atrasadas</option>
        </select>
      </div>

      <Card className="hidden md:block overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700/60 text-left text-xs text-slate-500">
              <th className="px-4 py-3 font-medium">Posto</th>
              <th className="px-4 py-3 font-medium">Última aferição</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">SLA</th>
              <th className="px-4 py-3 font-medium">Inconsistências</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr
                key={u.id}
                className={`border-b border-slate-800/60 border-l-4 ${
                  u.status === "ok"
                    ? "border-l-green-500"
                    : u.status === "atencao"
                    ? "border-l-amber-500"
                    : "border-l-red-500"
                }`}
              >
                <td className="px-4 py-3 text-white font-medium">{u.name}</td>
                <td className="px-4 py-3 text-slate-400 font-data">{u.last}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={u.status} />
                </td>
                <td className="px-4 py-3 font-data text-slate-300">{slaLabel(u)}</td>
                <td className="px-4 py-3 font-data text-slate-300">{u.inc || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="text-sm text-slate-500 text-center py-10">Nenhuma unidade encontrada.</p>
        )}
      </Card>

      <div className="md:hidden space-y-2.5">
        {filtered.map((u) => (
          <Card
            key={u.id}
            className={`p-4 border-l-4 ${
              u.status === "ok" ? "border-l-green-500" : u.status === "atencao" ? "border-l-amber-500" : "border-l-red-500"
            }`}
          >
            <div className="flex items-center justify-between mb-2 gap-2">
              <p className="text-sm font-semibold text-white truncate">{u.name}</p>
              <StatusBadge status={u.status} />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500 font-data">
              <span>Última: {u.last}</span>
              <span>{slaLabel(u)}</span>
            </div>
          </Card>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-slate-500 text-center py-10">Nenhuma unidade encontrada.</p>
        )}
      </div>
    </div>
  );
}

function AdminAlerts({ units, notified, onNotify }) {
  const alerts = [...units].filter((u) => u.status !== "ok").sort((a, b) => a.sla - b.sla);

  return (
    <div className="animate-in max-w-3xl">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-white">Alertas de SLA</h2>
        <p className="text-sm text-slate-500">{alerts.length} unidades requerem atenção</p>
      </div>

      <div className="space-y-3">
        {alerts.map((u) => {
          const late = u.status === "atrasado";
          const isNotified = !!notified[u.id];
          return (
            <Card
              key={u.id}
              className={`p-4 flex items-center gap-4 border-l-4 ${late ? "border-l-red-500" : "border-l-amber-500"}`}
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                  late ? "bg-red-500/20" : "bg-amber-500/20"
                }`}
              >
                <AlertTriangle size={18} className={late ? "text-red-400" : "text-amber-400"} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{u.name}</p>
                <p className="text-xs text-slate-500">
                  {late ? `${Math.abs(u.sla)} dias em atraso` : `SLA vence em ${u.sla} dia${u.sla === 1 ? "" : "s"}`}
                </p>
              </div>
              <button
                onClick={() => onNotify(u.id)}
                disabled={isNotified}
                className={`shrink-0 flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium border transition-colors ${
                  isNotified
                    ? "border-green-500/30 bg-green-500/10 text-green-400 cursor-default"
                    : "border-slate-700 bg-slate-800/40 text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {isNotified ? <Check size={14} /> : <Bell size={14} />}
                {isNotified ? "Notificado" : "Notificar unidade"}
              </button>
            </Card>
          );
        })}
        {alerts.length === 0 && <p className="text-sm text-slate-500 text-center py-10">Nenhum alerta no momento.</p>}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* App                                                                */
/* ---------------------------------------------------------------- */

export default function App() {
  const [screen, setScreen] = useState("login");
  const [unitName, setUnitName] = useState("Posto Nova Marambaia");
  const [weekStatus, setWeekStatus] = useState("pendente");
  const [history, setHistory] = useState(TECH_HISTORY_SEED);
  const [ocrData, setOcrData] = useState(null);
  const [lastErro, setLastErro] = useState(0);
  const [adminActive, setAdminActive] = useState("dashboard");
  const [notified, setNotified] = useState({});

  const handleLogin = (selectedRole, selectedUnit) => {
    if (selectedRole === "tecnico") {
      setUnitName(selectedUnit);
      setScreen("techHome");
    } else {
      setAdminActive("dashboard");
      setScreen("adminDashboard");
    }
  };

  const handleLogout = () => {
    setScreen("login");
  };

  const startCapture = () => {
    setOcrData(null);
    setScreen("capture");
  };

  const handleCaptured = () => setScreen("ocrLoading");

  const handleOcrDone = () => {
    const now = new Date();
    setOcrData({
      bomba: "Bomba 03",
      bico: "Bico 2",
      produto: "Gasolina Comum",
      volumeAferido: "19.86",
      volumePadrao: "20.00",
      data: now.toLocaleDateString("pt-BR"),
      hora: now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    });
    setScreen("validation");
  };

  const handleConfirm = (erro) => {
    setLastErro(erro);
    setWeekStatus("concluida");
    setHistory((h) => [
      {
        id: Date.now(),
        date: ocrData.data,
        time: ocrData.hora,
        tech: TECH_NAME,
        status: Math.abs(erro) < 1 ? "ok" : "inconsistencia",
      },
      ...h,
    ]);
    setScreen("confirmation");
  };

  const handleNotify = (id) => setNotified((n) => ({ ...n, [id]: true }));

  const handleAdminNavigate = (id) => {
    setAdminActive(id);
    setScreen(id === "dashboard" ? "adminDashboard" : id === "unidades" ? "adminUnits" : "adminAlerts");
  };

  return (
    <div className="font-display">
      <GlobalStyles />

      {screen === "login" && <LoginScreen onLogin={handleLogin} />}

      {screen === "techHome" && (
        <TechHome
          unitName={unitName}
          weekStatus={weekStatus}
          lastEntry={history[0]}
          onNova={startCapture}
          onHistorico={() => setScreen("techHistory")}
          onLogout={handleLogout}
        />
      )}

      {screen === "capture" && <CaptureScreen onBack={() => setScreen("techHome")} onCaptured={handleCaptured} />}

      {screen === "ocrLoading" && <OcrLoadingScreen onDone={handleOcrDone} />}

      {screen === "validation" && ocrData && (
        <ValidationScreen
          data={ocrData}
          setData={setOcrData}
          onBack={() => setScreen("capture")}
          onConfirm={handleConfirm}
          techName={TECH_NAME}
        />
      )}

      {screen === "confirmation" && ocrData && (
        <ConfirmationScreen data={ocrData} erro={lastErro} onHistorico={() => setScreen("techHistory")} onNova={startCapture} />
      )}

      {screen === "techHistory" && <TechHistoryScreen history={history} onBack={() => setScreen("techHome")} />}

      {(screen === "adminDashboard" || screen === "adminUnits" || screen === "adminAlerts") && (
        <AdminShell active={adminActive} onNavigate={handleAdminNavigate} onLogout={handleLogout}>
          {screen === "adminDashboard" && <AdminDashboard units={UNITS} />}
          {screen === "adminUnits" && <AdminUnits units={UNITS} />}
          {screen === "adminAlerts" && <AdminAlerts units={UNITS} notified={notified} onNotify={handleNotify} />}
        </AdminShell>
      )}
    </div>
  );
}
