import React, { useState, useEffect } from 'react';
import { 
  Sun, Wind, Zap, Leaf, Droplets, 
  Home, Grid, BarChart3, Users, 
  PlayCircle, Award, Calculator, Menu, Trophy, ArrowRight
} from 'lucide-react';

interface Station {
  id: number;
  name: string;
  nameEn: string;
  description: string;
  descEn: string;
  focus: string;
  focusEn: string;
  info: string;
  infoEn: string;
  icon: React.ReactNode;
  color: string;
  progress: string;
}

const STATIONS: Station[] = [
  {
    id: 1,
    name: 'Tenaga Solar',
    nameEn: 'Solar Energy',
    description: 'Ketahui bagaimana panel fotovoltaik menukar cahaya matahari kepada tenaga elektrik bersih untuk kegunaan harian.',
    descEn: 'Discover how photovoltaic panels convert sunlight into clean electricity for everyday use.',
    focus: 'Cahaya kepada elektrik',
    focusEn: 'Light to electricity',
    info: 'Sumber boleh baharu',
    infoEn: 'Renewable source',
    icon: <Sun className="w-8 h-8 text-yellow-400" />,
    color: 'bg-lime-400',
    progress: '1/5'
  },
  {
    id: 2,
    name: 'Tenaga Angin',
    nameEn: 'Wind Energy',
    description: 'Turbin angin menangkap tenaga kinetik dari angin dan menukarkannya kepada kuasa elektrik yang mampan.',
    descEn: 'Wind turbines capture kinetic energy from the wind and convert it into sustainable electricity.',
    focus: 'Angin memutarkan turbin',
    focusEn: 'Wind turns the turbine',
    info: 'Tenaga kinetik udara',
    infoEn: 'Air kinetic energy',
    icon: <Wind className="w-8 h-8 text-blue-300" />,
    color: 'bg-blue-500',
    progress: '2/5'
  },
  {
    id: 3,
    name: 'Tenaga Kinetik',
    nameEn: 'Kinetic Energy',
    description: 'Menjana kuasa melalui pergerakan fizikal dan langkah kaki menggunakan lantai piezoelektrik khas.',
    descEn: 'Generating power through physical movement and footsteps using special piezoelectric floors.',
    focus: 'Tenaga daripada pergerakan',
    focusEn: 'Energy from movement',
    info: 'Langkah kaki pintar',
    infoEn: 'Smart footsteps',
    icon: <Zap className="w-8 h-8 text-orange-400" />,
    color: 'bg-orange-500',
    progress: '3/5'
  },
  {
    id: 4,
    name: 'Tenaga Biojisim',
    nameEn: 'Biomass Energy',
    description: 'Proses menukar sisa organik daripada bahan pertanian dan makanan kepada biogas untuk penjanaan tenaga.',
    descEn: 'The process of converting organic waste from agricultural and food materials into biogas for energy generation.',
    focus: 'Sisa organik menjadi tenaga',
    focusEn: 'Organic waste to energy',
    info: 'Kitar semula sisa',
    infoEn: 'Recycling waste',
    icon: <Leaf className="w-8 h-8 text-green-400" />,
    color: 'bg-green-600',
    progress: '4/5'
  },
  {
    id: 5,
    name: 'Tenaga Air',
    nameEn: 'Hydro Energy',
    description: 'Menggunakan aliran air semula jadi untuk memutar turbin hidroelektrik bagi bekalan elektrik yang stabil.',
    descEn: 'Using natural water flow to turn hydroelectric turbines for a stable electricity supply.',
    focus: 'Aliran air menjana kuasa',
    focusEn: 'Water flow generates power',
    info: 'Kuasa hidroelektrik',
    infoEn: 'Hydroelectric power',
    icon: <Droplets className="w-8 h-8 text-blue-400" />,
    color: 'bg-cyan-500',
    progress: '5/5'
  }
];

const App: React.FC = () => {
  const [activeStation, setActiveStation] = useState<Station>(STATIONS[0]);
  const [activeTab, setActiveTab] = useState('Home');
  const [isLoaded, setIsLoaded] = useState(false);
  const [lang, setLang] = useState<'ms' | 'en'>('ms');

  const toggleLang = () => {
    const newLang = lang === 'ms' ? 'en' : 'ms';
    console.log("Language changed to:", newLang);
    setLang(newLang);
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const t = {
    ms: { ranking: 'Ranking', select: 'Pilih Stesen', nav: 'Main Navigation', trail: 'Trail', choose: 'Pilih Stesen Pembelajaran', action: 'Action', activity: 'Aktiviti Pembelajaran', impact: 'Impact', learnImpact: 'Impak Pembelajaran', video: 'Tonton Video Pakar', videoSub: 'Video penerangan pakar', quiz: 'Ambil e-Kuiz', quizSub: '5 soalan setiap sesi', carbon: 'Kira Jejak Karbon', carbonSub: 'Pengiraan terperinci kg CO₂e', info: 'Info Ringkas', focus: 'Focus', progress: 'Progress' },
    en: { ranking: 'Ranking', select: 'Select Station', nav: 'Main Navigation', trail: 'Trail', choose: 'Choose Learning Station', action: 'Action', activity: 'Learning Activities', impact: 'Impact', learnImpact: 'Learning Impact', video: 'Watch Expert Video', videoSub: 'Expert explanation video', quiz: 'Take e-Quiz', quizSub: '5 questions per session', carbon: 'Calculate Carbon Footprint', carbonSub: 'Detailed kg CO₂e calculation', info: 'Quick Info', focus: 'Focus', progress: 'Progress' }
  };

  return (
    <div className={`min-h-screen bg-[#020617] text-white font-sans p-4 md:p-8 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Header Section */}
      <header className="flex justify-between items-center mb-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="bg-[#a3e635] text-black font-bold w-10 h-10 rounded-lg flex items-center justify-center text-xl shadow-[0_0_15px_rgba(163,230,53,0.4)]">E</div>
          <div>
            <h1 className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">IT</h1>
            <h2 className="text-[#a3e635] font-bold leading-tight tracking-tight">DUTA HIJAU</h2>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="bg-[#1e293b]/80 hover:bg-[#334155] px-4 py-2 rounded-full text-[12px] flex items-center gap-2 transition-all border border-white/5">
            <Trophy className="w-3.5 h-3.5 text-yellow-500" />
            <span className="text-[#a3e635] font-bold">{t[lang].ranking}</span>
          </button>
          
          {/* UPDATED: Language Switcher Button */}
          <button 
            onClick={toggleLang}
            className="bg-[#a3e635] text-black hover:bg-white px-4 py-2 rounded-full text-[12px] font-bold border border-white/5 transition-all transform active:scale-95"
          >
            {lang === 'ms' ? 'EN' : 'BM'}
          </button>

          <button className="bg-[#1e293b]/80 hover:bg-[#334155] px-4 py-2 rounded-full text-[12px] flex items-center gap-2 border border-white/5">
            <Menu className="w-4 h-4" />
            <span className="font-bold">{t[lang].select}</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-6">
        
        {/* Navigation */}
        <section className="bg-[#0f172a]/50 backdrop-blur-md p-4 rounded-3xl border border-white/5">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4 ml-2">{t[lang].nav}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { id: 'Home', icon: Home, label: 'Home' },
              { id: 'Hab', icon: Grid, label: 'Hab' },
              { id: 'Stat', icon: BarChart3, label: 'Stat' },
              { id: 'Team', icon: Users, label: 'Team' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-300 ${
                  activeTab === item.id ? 'bg-lime-400 text-black shadow-[0_0_20px_rgba(163,230,53,0.3)]' : 'bg-[#1e293b]/50 text-gray-400 hover:bg-[#1e293b]'
                }`}
              >
                <item.icon className="w-6 h-6 mb-2" />
                <span className="font-bold text-sm">{item.label}</span>
              </button>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            
            {/* Hero Section */}
            <section className="bg-[#0f172a] p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden min-h-[420px] flex flex-col justify-center border border-white/5 group">
              <div className="absolute top-10 left-10 flex gap-2">
                <span className="bg-white/5 backdrop-blur-sm text-[#a3e635] text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest border border-lime-400/30">
                  {lang === 'ms' ? 'Stesen Semasa' : 'Current Station'} • Stesen 0{activeStation.id}
                </span>
              </div>
              
              <div className="relative z-10 space-y-6">
                {/* UPDATED: Dynamic Title and Description */}
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter transition-all duration-700">
                  {lang === 'ms' ? activeStation.name : activeStation.nameEn}
                </h2>
                <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
                  {lang === 'ms' ? activeStation.description : activeStation.descEn}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                  <div className="bg-[#1e293b]/40 backdrop-blur-sm p-5 rounded-2xl border border-white/5">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{t[lang].info}</p>
                    <p className="font-bold text-sm">{lang === 'ms' ? activeStation.info : activeStation.infoEn}</p>
                  </div>
                  <div className="bg-[#1e293b]/40 backdrop-blur-sm p-5 rounded-2xl border border-white/5">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{t[lang].focus}</p>
                    <p className="font-bold text-sm">{lang === 'ms' ? activeStation.focus : activeStation.focusEn}</p>
                  </div>
                  <div className="bg-[#1e293b]/40 backdrop-blur-sm p-5 rounded-2xl border border-white/5">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{t[lang].progress}</p>
                    <p className="font-bold text-sm text-[#a3e635]">{activeStation.progress} {lang === 'ms' ? 'stesen' : 'station'}</p>
                  </div>
                </div>
              </div>
              {/* ... background decoration ... */}
            </section>

            {}
            <section className="bg-[#0f172a]/50 backdrop-blur-md p-6 rounded-[2.5rem] border border-white/5">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4 ml-2">Trail</p>
              <h3 className="text-2xl font-black mb-6 ml-2 tracking-tight">Pilih Stesen Pembelajaran</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {STATIONS.map((station) => (
                  <button
                    key={station.id}
                    onClick={() => setActiveStation(station)}
                    className={`relative p-5 rounded-3xl flex flex-col items-start gap-4 transition-all duration-500 border overflow-hidden group ${
                      activeStation.id === station.id 
                      ? 'bg-[#a3e635] text-black border-[#a3e635] shadow-[0_0_25px_rgba(163,230,53,0.15)]' 
                      : 'bg-[#1e293b]/30 text-white border-transparent hover:border-white/10'
                    }`}
                  >
                    <span className="absolute top-3 right-4 text-[10px] font-black opacity-30">0{station.id}</span>
                    <div className={`${activeStation.id === station.id ? 'text-black' : 'text-white'} transition-transform duration-300 group-hover:scale-110`}>
                      {station.icon}
                    </div>
                    <div className="text-left">
                      <p className="font-black text-[11px] leading-tight mb-1 uppercase tracking-tight">{station.name}</p>
                      <p className={`text-[9px] leading-tight font-medium opacity-60 ${activeStation.id === station.id ? 'text-black' : 'text-gray-400'}`}>
                        {station.focus}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </div>

          {}
          <div className="space-y-6">
            
            <section className="bg-[#0f172a]/80 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/5">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Action</p>
              <h3 className="text-2xl font-black mb-6 tracking-tight">Aktiviti Pembelajaran</h3>
              
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-5 rounded-[2rem] bg-[#1e293b]/40 hover:bg-[#1e293b]/80 border border-white/5 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-500/20 p-3 rounded-2xl group-hover:scale-110 transition-transform">
                      <PlayCircle className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-sm">Tonton Video Pakar</p>
                      <p className="text-[10px] text-gray-500 italic">Video penerangan pakar</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-600 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                </button>

                <button className="w-full flex items-center justify-between p-5 rounded-[2rem] bg-[#a3e635] text-black hover:brightness-110 transition-all shadow-lg group">
                  <div className="flex items-center gap-4">
                    <div className="bg-black/10 p-3 rounded-2xl">
                      <Award className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <p className="font-black text-sm">Ambil e-Kuiz</p>
                      <p className="text-[10px] font-bold opacity-70">5 soalan setiap sesi</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-black/40" />
                </button>

                <button className="w-full flex items-center justify-between p-5 rounded-[2rem] bg-[#1e293b]/40 hover:bg-[#1e293b]/80 border border-white/5 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="bg-orange-500/20 p-3 rounded-2xl group-hover:scale-110 transition-transform">
                      <Calculator className="w-6 h-6 text-orange-400" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-sm">Kira Jejak Karbon</p>
                      <p className="text-[10px] text-gray-500 italic">Pengiraan terperinci kg CO₂e</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-600 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                </button>
              </div>
            </section>

            {}
            <section className="bg-[#0f172a]/80 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/5">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Impact</p>
              <h3 className="text-2xl font-black mb-6 tracking-tight">Impak Pembelajaran</h3>
              
              <div className="space-y-6">
                {[
                  { label: 'Station visit', value: 80 },
                  { label: 'Quiz awareness', value: 45 },
                  { label: 'Carbon action', value: 60 }
                ].map((stat) => (
                  <div key={stat.label} className="group">
                    <div className="flex justify-between text-[10px] font-black mb-2 uppercase tracking-widest group-hover:text-lime-400 transition-colors">
                      <span className="text-gray-500 group-hover:text-gray-400">{stat.label}</span>
                      <span>{stat.value}%</span>
                    </div>
                    <div className="h-2 w-full bg-[#1e293b] rounded-full overflow-hidden p-[1px] border border-white/5">
                      <div 
                        className="h-full bg-[#a3e635] rounded-full transition-all duration-1500 ease-out shadow-[0_0_10px_rgba(163,230,53,0.5)]"
                        style={{ width: isLoaded ? `${stat.value}%` : '0%' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

        </div>
      </main>

      <footer className="max-w-7xl mx-auto mt-12 mb-8 flex flex-col items-center gap-4 border-t border-white/5 pt-8">
        <p className="text-gray-600 text-[10px] uppercase tracking-[0.3em] font-black">
          &copy; 2026 Duta Hijau - Platform Kelestarian Tenaga
        </p>
      </footer>
    </div>
  );
}

export default App;