import { useMemo, useState } from "react";

const months = ["Januari", "Februari", "Mac", "April", "Mei", "Jun"];

const stations = [
  {
    id: 1,
    icon: "☀️",
    color: "from-yellow-400/30 via-lime-400/10 to-slate-950",
    title: { ms: "Tenaga Solar", en: "Solar Energy" },
    subtitle: { ms: "Cahaya kepada elektrik", en: "Light to electricity" },
    content: {
      ms: "Ketahui bagaimana panel fotovoltaik menukar cahaya matahari kepada tenaga elektrik bersih untuk kegunaan harian.",
      en: "Learn how photovoltaic panels convert sunlight into clean electrical energy for daily use."
    },
    keyPoint: { ms: "Sumber boleh baharu", en: "Renewable source" }
  },
  {
    id: 2,
    icon: "🌬️",
    color: "from-sky-400/30 via-cyan-400/10 to-slate-950",
    title: { ms: "Tenaga Angin", en: "Wind Energy" },
    subtitle: { ms: "Angin memutarkan turbin", en: "Wind rotates turbines" },
    content: {
      ms: "Terokai bagaimana aliran angin memutarkan bilah turbin untuk menghasilkan tenaga mekanikal dan elektrik.",
      en: "Explore how moving air rotates turbine blades to produce mechanical and electrical energy."
    },
    keyPoint: { ms: "Baik di kawasan lapang", en: "Best in open areas" }
  },
  {
    id: 3,
    icon: "🏃",
    color: "from-emerald-400/30 via-lime-400/10 to-slate-950",
    title: { ms: "Tenaga Kinetik", en: "Kinetic Energy" },
    subtitle: { ms: "Tenaga daripada pergerakan", en: "Energy from motion" },
    content: {
      ms: "Fahami bagaimana pergerakan manusia seperti berjalan, berlari dan mengayuh boleh dikaitkan dengan penjanaan tenaga.",
      en: "Understand how human movement such as walking, running and cycling can be linked to energy generation."
    },
    keyPoint: { ms: "Lebih laju, lebih tenaga", en: "Faster motion, more energy" }
  },
  {
    id: 4,
    icon: "🍃",
    color: "from-green-400/30 via-emerald-400/10 to-slate-950",
    title: { ms: "Tenaga Biojisim", en: "Biomass Energy" },
    subtitle: { ms: "Sisa organik menjadi tenaga", en: "Organic waste to energy" },
    content: {
      ms: "Pelajari bagaimana sisa organik seperti sisa makanan dan tumbuhan boleh ditukar kepada kompos, biogas atau tenaga alternatif.",
      en: "Learn how organic waste such as food and plant residues can be converted into compost, biogas or alternative energy."
    },
    keyPoint: { ms: "Kurangkan sisa", en: "Reduce waste" }
  },
  {
    id: 5,
    icon: "💧",
    color: "from-blue-400/30 via-sky-400/10 to-slate-950",
    title: { ms: "Tenaga Air", en: "Hydro Energy" },
    subtitle: { ms: "Aliran air menjana kuasa", en: "Water flow generates power" },
    content: {
      ms: "Fahami konsep tenaga hidro melalui aliran air yang memutarkan turbin untuk menghasilkan elektrik.",
      en: "Understand hydro energy through water flow that rotates turbines to generate electricity."
    },
    keyPoint: { ms: "Sesuai untuk mikro-hidro", en: "Suitable for micro-hydro" }
  }
];

const quizPool = {
  1: [
    { q: { ms: "Dari manakah tenaga solar berasal?", en: "Where does solar energy come from?" }, a: { ms: ["Matahari", "Bulan"], en: ["Sun", "Moon"] }, c: 0 },
    { q: { ms: "Adakah tenaga solar menghasilkan asap kotor?", en: "Does solar energy produce dirty smoke?" }, a: { ms: ["Ya", "Tidak"], en: ["Yes", "No"] }, c: 1 },
    { q: { ms: "Alat penukar cahaya kepada elektrik ialah?", en: "The tool that converts light to electricity is?" }, a: { ms: ["Kincir", "Panel Solar"], en: ["Windmill", "Solar Panel"] }, c: 1 },
    { q: { ms: "Lokasi terbaik memasang panel solar?", en: "Best location to install solar panels?" }, a: { ms: ["Bawah pokok", "Atas bumbung"], en: ["Under a tree", "On the roof"] }, c: 1 },
    { q: { ms: "Tenaga solar ialah sumber yang...", en: "Solar energy is a resource that is..." }, a: { ms: ["Boleh baharu", "Akan habis"], en: ["Renewable", "Finite"] }, c: 0 }
  ],
  2: [
    { q: { ms: "Apa yang memutarkan bilah turbin?", en: "What rotates turbine blades?" }, a: { ms: ["Angin", "Air"], en: ["Wind", "Water"] }, c: 0 },
    { q: { ms: "Turbin angin menjana...", en: "Wind turbines generate..." }, a: { ms: ["Elektrik", "Haba"], en: ["Electricity", "Heat"] }, c: 0 },
    { q: { ms: "Lokasi sesuai untuk turbin angin?", en: "Suitable location for wind turbines?" }, a: { ms: ["Dalam gua", "Kawasan lapang"], en: ["In a cave", "Open area"] }, c: 1 },
    { q: { ms: "Angin mempunyai tenaga...", en: "Wind has..." }, a: { ms: ["Kinetik", "Kimia"], en: ["Kinetic energy", "Chemical energy"] }, c: 0 },
    { q: { ms: "Pusingan bilah memutarkan apa?", en: "Blade rotation turns what?" }, a: { ms: ["Generator", "Lampu"], en: ["Generator", "Lamp"] }, c: 0 }
  ],
  3: [
    { q: { ms: "Tenaga kinetik terhasil apabila objek...", en: "Kinetic energy is produced when an object..." }, a: { ms: ["Diam", "Bergerak"], en: ["Stays still", "Moves"] }, c: 1 },
    { q: { ms: "Lari atau berjalan, mana lebih tinggi tenaga kinetik?", en: "Running or walking, which has higher kinetic energy?" }, a: { ms: ["Lari", "Berjalan"], en: ["Running", "Walking"] }, c: 0 },
    { q: { ms: "Lantai pintar boleh menjana tenaga daripada...", en: "Smart floors can generate energy from..." }, a: { ms: ["Tapak kaki", "Bunyi burung"], en: ["Footsteps", "Bird sounds"] }, c: 0 },
    { q: { ms: "Objek yang lebih laju mempunyai tenaga kinetik lebih...", en: "A faster object has kinetic energy that is..." }, a: { ms: ["Tinggi", "Rendah"], en: ["Higher", "Lower"] }, c: 0 },
    { q: { ms: "Contoh aktiviti kinetik di taman?", en: "Example of kinetic activity in a park?" }, a: { ms: ["Joging", "Tidur"], en: ["Jogging", "Sleeping"] }, c: 0 }
  ],
  4: [
    { q: { ms: "Biojisim berasal daripada sisa...", en: "Biomass comes from..." }, a: { ms: ["Besi", "Organik"], en: ["Metal", "Organic waste"] }, c: 1 },
    { q: { ms: "Sisa makanan boleh dijadikan kompos?", en: "Can food waste become compost?" }, a: { ms: ["Ya", "Tidak"], en: ["Yes", "No"] }, c: 0 },
    { q: { ms: "Gas daripada sisa mereput dikenali sebagai...", en: "Gas from decaying waste is known as..." }, a: { ms: ["Biogas", "Oksigen"], en: ["Biogas", "Oxygen"] }, c: 0 },
    { q: { ms: "Sisa kelapa sawit ialah contoh...", en: "Palm oil waste is an example of..." }, a: { ms: ["Biojisim", "Batu arang"], en: ["Biomass", "Coal"] }, c: 0 },
    { q: { ms: "Penggunaan biojisim membantu mengurangkan...", en: "Using biomass helps reduce..." }, a: { ms: ["Sampah", "Udara bersih"], en: ["Waste", "Clean air"] }, c: 0 }
  ],
  5: [
    { q: { ms: "Tenaga hidro menggunakan aliran...", en: "Hydro energy uses the flow of..." }, a: { ms: ["Air", "Angin"], en: ["Water", "Wind"] }, c: 0 },
    { q: { ms: "Mesin yang diputar oleh air disebut...", en: "A machine turned by water is called..." }, a: { ms: ["Turbin air", "Panel solar"], en: ["Water turbine", "Solar panel"] }, c: 0 },
    { q: { ms: "Hidro ialah tenaga yang...", en: "Hydro is an energy source that is..." }, a: { ms: ["Boleh baharu", "Fosil"], en: ["Renewable", "Fossil"] }, c: 0 },
    { q: { ms: "Air di tempat tinggi mempunyai tenaga...", en: "Water at height has..." }, a: { ms: ["Keupayaan", "Kimia"], en: ["Potential energy", "Chemical energy"] }, c: 0 },
    { q: { ms: "Sistem hidro kecil dikenali sebagai...", en: "A small hydro system is known as..." }, a: { ms: ["Mikro-hidro", "Mega-hidro sahaja"], en: ["Micro-hydro", "Mega-hydro only"] }, c: 0 }
  ]
};

const translations = {
  ms: {
    register: "Pendaftaran Pengunjung",
    name: "Nama Penuh",
    selectAge: "Kategori Umur",
    selectCareer: "Bidang Kerjaya Diminati",
    start: "Masuk Portal",
    welcomeTitle: "Eco-Trail STEM Digital Portal",
    welcomeCopy: "Belajar teknologi hijau melalui stesen interaktif, kuiz ringkas, kalkulator karbon dan saluran maklum balas komuniti.",
    home: "Home",
    hub: "Hab",
    statsTab: "Stat",
    teamTab: "Team",
    currentStation: "Stesen Semasa",
    chooseStation: "Pilih Stesen Pembelajaran",
    learningActions: "Aktiviti Pembelajaran",
    video: "Tonton Video Pakar",
    quiz: "Ambil e-Kuiz",
    carbon: "Kira Jejak Karbon",
    station: "Stesen",
    quickInfo: "Info Ringkas",
    community: "Hub Komuniti",
    report: "Lapor Kerosakan",
    suggest: "Cadangan Hijau",
    ask: "Tanya Pakar",
    leaderboard: "Ranking Bulanan",
    activities: "Aktiviti Akan Datang",
    stats: "Analitik Pengunjung",
    team: "Pasukan Projek",
    score: "Markah",
    finish: "Simpan & Tutup",
    estimate: "Anggaran",
    submit: "Hantar",
    details: "Tulis butiran di sini...",
    success: "Berjaya! Maklum balas anda telah diterima.",
    quizLimitTitle: "Had Kuiz Bulanan",
    quizLimitMessage: "Anda telah menjawab kuiz untuk bulan ini. Kuiz hanya dibenarkan sekali sebulan bagi setiap pengunjung.",
    quizLimitNext: "Sila cuba semula pada bulan hadapan.",
    quizTakenBadge: "Kuiz bulan ini selesai",
    visitor: "Pengunjung",
    greenAmbassador: "Duta Hijau",
    openMenu: "Pilih Stesen",
    openRank: "Ranking",
    impact: "Impak Pembelajaran",
    eventJoin: "Daftar Minat",
    categories: {
      children: "Kanak-kanak (5 - 12 tahun)",
      teen: "Remaja (13 - 19/24 tahun)",
      youth: "Belia (15 - 30 tahun)",
      adult: "Dewasa (30/40 - 59 tahun)"
    },
    careers: ["Doktor", "Guru", "Jurutera", "Arkitek", "Usahawan", "Polis", "Saintis", "Lain-lain"]
  },
  en: {
    register: "Visitor Registration",
    name: "Full Name",
    selectAge: "Age Category",
    selectCareer: "Career Interest",
    start: "Enter Portal",
    welcomeTitle: "Eco-Trail STEM Digital Portal",
    welcomeCopy: "Learn green technology through interactive stations, quick quizzes, a carbon calculator and community feedback channels.",
    home: "Home",
    hub: "Hub",
    statsTab: "Stat",
    teamTab: "Team",
    currentStation: "Current Station",
    chooseStation: "Choose Learning Station",
    learningActions: "Learning Activities",
    video: "Watch Expert Video",
    quiz: "Take e-Quiz",
    carbon: "Calculate Carbon",
    station: "Station",
    quickInfo: "Quick Info",
    community: "Community Hub",
    report: "Report Damage",
    suggest: "Green Suggestion",
    ask: "Ask Expert",
    leaderboard: "Monthly Ranking",
    activities: "Upcoming Activities",
    stats: "Visitor Analytics",
    team: "Project Team",
    score: "Score",
    finish: "Save & Close",
    estimate: "Estimate",
    submit: "Submit",
    details: "Write details here...",
    success: "Success! Your feedback has been received.",
    quizLimitTitle: "Monthly Quiz Limit",
    quizLimitMessage: "You have already completed the quiz for this month. The quiz is limited to once per month for each visitor.",
    quizLimitNext: "Please try again next month.",
    quizTakenBadge: "This month's quiz completed",
    visitor: "Visitor",
    greenAmbassador: "Green Ambassador",
    openMenu: "Choose Station",
    openRank: "Ranking",
    impact: "Learning Impact",
    eventJoin: "Register Interest",
    categories: {
      children: "Children (5 - 12 years)",
      teen: "Teenagers (13 - 19/24 years)",
      youth: "Youth (15 - 30 years)",
      adult: "Adults (30/40 - 59 years)"
    },
    careers: ["Doctor", "Teacher", "Engineer", "Architect", "Entrepreneur", "Police", "Scientist", "Others"]
  }
};

const leaderboard = {
  children: [
    { name: "Adam Mikhail", points: 2450 },
    { name: "Siti Sarah", points: 2300 },
    { name: "Ahmad Zaki", points: 2150 }
  ],
  teen: [
    { name: "Ryan Iskandar", points: 3100 },
    { name: "Chua Wei Ming", points: 2950 },
    { name: "Danish Haikal", points: 2800 }
  ],
  youth: [
    { name: "Farah Wahida", points: 4200 },
    { name: "Lim Jun Kit", points: 4100 },
    { name: "Amirul Afiq", points: 3850 }
  ],
  adult: [
    { name: "En. Rahman", points: 5500 },
    { name: "Pn. Zalina", points: 5350 },
    { name: "Dr. Siva", points: 5100 }
  ]
};

const projectMembers = [
  ["Zeno Michael", "Ketua Projek", "Mekanikal"],
  ["Dr. Kamariah Md Isa", "Timbalan Ketua & Kewangan", "Mekanikal"],
  ["Ir. Dr. Ts. Ab Aziz Mohd Yusof", "Penasihat Teknikal", "Mekanikal"],
  ["Nurrul Amilin Zainal Abidin", "Penyelaras Kurikulum STEM", "Mekanikal"],
  ["Nur Aini Sabrin Manssor", "Setiausaha & Dokumentasi", "Mekanikal"],
  ["Mohd Fadzli Ismail", "Analisis Data & Impak", "Mekanikal"],
  ["Dr. Mohamed Khatif Tawaf", "Penasihat Struktur", "Awam"]
];

const carbonFactors = {
  transport: {
    walk: { label: { ms: "Jalan kaki", en: "Walking" }, kgPerKm: 0, note: { ms: "Tiada pelepasan langsung.", en: "No direct emissions." } },
    bicycle: { label: { ms: "Basikal", en: "Bicycle" }, kgPerKm: 0, note: { ms: "Tiada pelepasan langsung.", en: "No direct emissions." } },
    motorcycle: { label: { ms: "Motosikal", en: "Motorcycle" }, kgPerKm: 0.09, note: { ms: "Anggaran motosikal petrol.", en: "Estimated petrol motorcycle." } },
    car: { label: { ms: "Kereta petrol", en: "Petrol car" }, kgPerKm: 0.19, note: { ms: "Anggaran kereta penumpang biasa.", en: "Estimated average passenger car." } },
    eHailing: { label: { ms: "E-hailing / Grab", en: "E-hailing / Grab" }, kgPerKm: 0.21, note: { ms: "Anggaran termasuk perjalanan kosong pemandu.", en: "Estimated with driver deadheading." } },
    bus: { label: { ms: "Bas awam", en: "Public bus" }, kgPerKm: 0.1, note: { ms: "Anggaran setiap penumpang-km.", en: "Estimated per passenger-km." } }
  },
  items: {
    plasticBottle: 0.08,
    foodPackaging: 0.12,
    printedPaper: 0.005,
    electricityKwh: 0.758
  }
};

function getQuizMonthKey(visitorName: string) {
  const monthKey = new Date().toISOString().slice(0, 7);
  const safeName = String(visitorName || "visitor")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");
  return `eco-trail-quiz-limit-${safeName}-${monthKey}`;
}

function cleanNumber(value: string | number, fallback = 0) {
  const number = Number(value);
  if (Number.isNaN(number) || number < 0) return fallback;
  return number;
}

function calculateCarbon(input: Record<string, any>) {
  const oneWayKm = cleanNumber(input.distanceOneWay, 0);
  const roundTripKm = oneWayKm * 2;
  const transportMode = carbonFactors.transport[(input.transport as keyof typeof carbonFactors.transport)] || carbonFactors.transport.walk;
  const shareableTransport = ["car", "motorcycle", "eHailing"].includes(input.transport);
  const passengers = shareableTransport ? Math.max(1, cleanNumber(input.passengers, 1)) : 1;
  const transportKg = (roundTripKm * transportMode.kgPerKm) / passengers;
  const bottleKg = cleanNumber(input.bottles, 0) * carbonFactors.items.plasticBottle;
  const packagingKg = cleanNumber(input.packaging, 0) * carbonFactors.items.foodPackaging;
  const paperKg = cleanNumber(input.paperSheets, 0) * carbonFactors.items.printedPaper;
  const electricityKg = cleanNumber(input.electricityKwh, 0) * carbonFactors.items.electricityKwh;
  const total = transportKg + bottleKg + packagingKg + paperKg + electricityKg;

  return {
    roundTripKm,
    passengers,
    transportKg,
    bottleKg,
    packagingKg,
    paperKg,
    electricityKg,
    total,
    level: total < 0.5 ? "Low" : total < 2 ? "Moderate" : "High"
  };
}

function runCarbonSelfTests() {
  const result = calculateCarbon({
    transport: "car",
    distanceOneWay: 5,
    passengers: 2,
    bottles: 1,
    packaging: 1,
    paperSheets: 2,
    electricityKwh: 0.02
  });

  console.assert(Math.abs(result.roundTripKm - 10) < 0.0001, "Carbon test failed: round trip distance should be 10 km");
  console.assert(Math.abs(result.transportKg - 0.95) < 0.0001, "Carbon test failed: car transport carbon should be 0.95 kg CO2e");
  console.assert(Math.abs(result.total - 1.17516) < 0.0001, "Carbon test failed: total should be 1.17516 kg CO2e");

  const zeroResult = calculateCarbon({
    transport: "walk",
    distanceOneWay: 3,
    passengers: 1,
    bottles: 0,
    packaging: 0,
    paperSheets: 0,
    electricityKwh: 0
  });
  console.assert(zeroResult.total === 0, "Carbon test failed: walking with no items should be zero");
}

runCarbonSelfTests();

type CardProps = { children: React.ReactNode; className?: string };
function Card({ children, className = "" }: CardProps) {
  return (
    <section className={`rounded-[2rem] border border-slate-800 bg-slate-900/90 p-5 shadow-xl shadow-slate-950/20 ${className}`}>
      {children}
    </section>
  );
}

type SectionTitleProps = { eyebrow?: React.ReactNode; title: React.ReactNode; action?: React.ReactNode };
function SectionTitle({ eyebrow, title, action }: SectionTitleProps) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        {eyebrow ? <p className="mb-2 text-[10px] font-black uppercase tracking-[0.25em] text-lime-400">{eyebrow}</p> : null}
        <h2 className="text-2xl font-black tracking-tight text-white">{title}</h2>
      </div>
      {action}
    </div>
  );
}

type PillButtonProps = { active?: boolean; children: React.ReactNode; onClick?: () => void; className?: string };
function PillButton({ active, children, onClick, className = "" }: PillButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border px-4 py-3 text-xs font-black transition active:scale-95 ${
        active
          ? "border-lime-400 bg-lime-400 text-slate-950"
          : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-600 hover:text-white"
      } ${className}`}
    >
      {children}
    </button>
  );
}

type MainTabsProps = { view: string; setView: (v: string) => void; t: any };
function MainTabs({ view, setView, t }: MainTabsProps) {
  const tabs = [
    ["home", "🏠", t.home],
    ["hub", "🧩", t.hub],
    ["stats", "📊", t.statsTab],
    ["team", "👥", t.teamTab]
  ];

  return (
    <Card className="p-4">
      <p className="mb-3 px-1 text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Main Navigation</p>
      <div className="grid grid-cols-4 gap-2">
        {tabs.map(([key, icon, label]) => (
          <button
            type="button"
            key={key}
            onClick={() => setView(key)}
            className={`rounded-[1.3rem] border px-3 py-4 text-center text-xs font-black transition active:scale-95 ${
              view === key
                ? "border-lime-400 bg-lime-400 text-slate-950 shadow-lg shadow-lime-400/10"
                : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-600 hover:text-white"
            }`}
          >
            <span className="mb-1 block text-lg">{icon}</span>
            {label}
          </button>
        ))}
      </div>
    </Card>
  );
}

type ModalProps = { children: React.ReactNode; onClose: () => void };
function Modal({ children, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 p-5 backdrop-blur-xl">
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[2.5rem] border border-slate-800 bg-slate-900 p-7 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-6 top-6 rounded-full bg-slate-800 px-3 py-2 text-sm font-black text-slate-400 hover:text-white"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

type QuickActionProps = { icon: React.ReactNode; title: React.ReactNode; desc: React.ReactNode; onClick?: () => void; primary?: boolean };
function QuickAction({ icon, title, desc, onClick, primary = false }: QuickActionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex items-center gap-4 rounded-[1.6rem] border p-4 text-left transition active:scale-[0.98] ${
        primary
          ? "border-lime-400 bg-lime-400 text-slate-950"
          : "border-slate-800 bg-slate-950 text-white hover:border-lime-400/50"
      }`}
    >
      <span className={`grid h-12 w-12 place-items-center rounded-2xl text-2xl ${primary ? "bg-slate-950/10" : "bg-slate-900"}`}>{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-black leading-tight">{title}</span>
        {desc ? <span className={`mt-1 block text-xs font-bold ${primary ? "text-slate-800" : "text-slate-500"}`}>{desc}</span> : null}
      </span>
      <span className={primary ? "text-slate-800" : "text-slate-600"}>→</span>
    </button>
  );
}

type NumberFieldProps = { label: string; value: number | string; step?: string; min?: string; onChange: (value: number | string) => void };
function NumberField({ label, value, step = "1", min = "0", onChange }: NumberFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-500">{label}</span>
      <input
        type="number"
        min={min}
        step={step}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-4 text-sm font-black outline-none focus:border-lime-400"
      />
    </label>
  );
}

type CarbonCalculatorProps = { lang: "ms" | "en"; t: any; onClose: () => void };
function CarbonCalculator({ lang, t, onClose }: CarbonCalculatorProps) {
  const [input, setInput] = useState({
    transport: "car",
    distanceOneWay: 5,
    passengers: 1,
    bottles: 1,
    packaging: 0,
    paperSheets: 0,
    electricityKwh: 0.02
  });

  const carbon = useMemo(() => calculateCarbon(input), [input]);
  const update = (key: string, value: number | string) => setInput((prev) => ({ ...prev, [key]: value }));
  const levelText = lang === "ms" ? (carbon.level === "Low" ? "Rendah" : carbon.level === "Moderate" ? "Sederhana" : "Tinggi") : carbon.level;

  const itemFields = [
    ["bottles", lang === "ms" ? "Botol plastik" : "Plastic bottles", "1"],
    ["packaging", lang === "ms" ? "Pembungkusan makanan" : "Food packaging", "1"],
    ["paperSheets", lang === "ms" ? "Helaian kertas" : "Paper sheets", "1"],
    ["electricityKwh", lang === "ms" ? "Elektrik digital (kWh)" : "Digital electricity (kWh)", "0.01"]
  ];

  const breakdownRows = [
    [lang === "ms" ? "Pengangkutan" : "Transport", carbon.transportKg],
    [lang === "ms" ? "Botol plastik" : "Plastic bottles", carbon.bottleKg],
    [lang === "ms" ? "Pembungkusan makanan" : "Food packaging", carbon.packagingKg],
    [lang === "ms" ? "Kertas" : "Paper", carbon.paperKg],
    [lang === "ms" ? "Elektrik digital" : "Digital electricity", carbon.electricityKg]
  ];

  return (
    <Modal onClose={onClose}>
      <p className="mb-4 text-xs font-black uppercase tracking-[0.25em] text-lime-400">{t.carbon}</p>
      <h2 className="mb-3 pr-10 text-3xl font-black leading-tight tracking-tight">
        {lang === "ms" ? "Pengiraan Jejak Karbon Terperinci" : "Detailed Carbon Footprint Calculation"}
      </h2>
      <p className="mb-6 text-sm font-bold leading-relaxed text-slate-400">
        {lang === "ms"
          ? "Anggaran ini dikira berdasarkan perjalanan pergi balik, bahan yang digunakan semasa lawatan dan penggunaan elektrik kecil untuk akses digital."
          : "This estimate is calculated from return travel, items used during the visit and small electricity use for digital access."}
      </p>

      <div className="mb-5 rounded-[2rem] border border-slate-800 bg-slate-950 p-5">
        <p className="mb-4 text-xs font-black uppercase tracking-widest text-slate-500">
          {lang === "ms" ? "1. Pengangkutan" : "1. Transport"}
        </p>
        <label className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-500">
          {lang === "ms" ? "Jenis pengangkutan" : "Transport mode"}
        </label>
        <select
          value={input.transport}
          onChange={(event) => update("transport", event.target.value)}
          className="mb-4 w-full rounded-2xl border border-slate-800 bg-slate-900 px-5 py-4 text-sm font-bold outline-none focus:border-lime-400"
        >
          {Object.entries(carbonFactors.transport).map(([key, item]) => (
            <option key={key} value={key}>
              {item.label[lang]}
            </option>
          ))}
        </select>
        <div className="grid grid-cols-2 gap-3">
          <NumberField label={lang === "ms" ? "Jarak sehala (km)" : "One-way distance (km)"} value={input.distanceOneWay} step="0.1" onChange={(value: number | string) => update("distanceOneWay", value)} />
          <NumberField label={lang === "ms" ? "Penumpang" : "Passengers"} value={input.passengers} min="1" onChange={(value: number | string) => update("passengers", value)} />
        </div>
        <div className="mt-4 rounded-2xl bg-slate-900 p-4 text-xs font-bold leading-relaxed text-slate-400">
          <p>{carbonFactors.transport[(input.transport as keyof typeof carbonFactors.transport)].note[lang]}</p>
          <p className="mt-1">
            {lang === "ms" ? "Jarak pergi balik" : "Return distance"}: <span className="text-white">{carbon.roundTripKm.toFixed(1)} km</span>
          </p>
        </div>
      </div>

      <div className="mb-5 rounded-[2rem] border border-slate-800 bg-slate-950 p-5">
        <p className="mb-4 text-xs font-black uppercase tracking-widest text-slate-500">
          {lang === "ms" ? "2. Bahan digunakan semasa lawatan" : "2. Items used during visit"}
        </p>
        <div className="grid grid-cols-2 gap-3">
          {itemFields.map(([key, label, step]) => (
            <NumberField key={key} label={label} step={step} value={input[key as keyof typeof input]} onChange={(value: number | string) => update(key, value)} />
          ))}
        </div>
      </div>

      <div className="mb-5 rounded-[2rem] border border-lime-400/20 bg-lime-400/10 p-6">
        <p className="text-xs font-black uppercase tracking-widest text-slate-400">{t.estimate}</p>
        <div className="mt-2 flex items-end gap-2">
          <p className="text-5xl font-black tracking-tight text-lime-400">{carbon.total.toFixed(2)}</p>
          <p className="pb-2 text-sm font-bold text-slate-400">kg CO₂e</p>
        </div>
        <p className="mt-3 text-xs font-black uppercase tracking-widest text-slate-500">
          {lang === "ms" ? "Tahap" : "Level"}: <span className="text-lime-400">{levelText}</span>
        </p>
      </div>

      <div className="mb-5 rounded-[2rem] border border-slate-800 bg-slate-950 p-5">
        <p className="mb-4 text-xs font-black uppercase tracking-widest text-slate-500">
          {lang === "ms" ? "3. Pecahan pengiraan" : "3. Calculation breakdown"}
        </p>
        <div className="space-y-3 text-sm font-bold">
          {breakdownRows.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between rounded-2xl bg-slate-900 px-4 py-3">
              <span className="text-slate-400">{label}</span>
              <span className="text-white">{typeof value === "number" ? value.toFixed(3) : value} kg CO₂e</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-800 bg-slate-950 p-5">
        <p className="mb-2 text-xs font-black uppercase tracking-widest text-slate-500">Formula</p>
        <p className="text-sm font-bold leading-relaxed text-slate-300">
          {lang === "ms"
            ? "Jumlah CO₂e = Pengangkutan + Botol Plastik + Pembungkusan + Kertas + Elektrik"
            : "Total CO₂e = Transport + Plastic Bottles + Packaging + Paper + Electricity"}
        </p>
        <p className="mt-3 text-xs leading-relaxed text-slate-500">
          {lang === "ms"
            ? "Nota: Ini ialah anggaran pendidikan. Faktor pelepasan boleh dikemaskini mengikut data rasmi tempatan atau keperluan MBIP."
            : "Note: This is an educational estimate. Emission factors can be updated according to local official data or MBIP requirements."}
        </p>
      </div>
    </Modal>
  );
}

type LoginScreenProps = { lang: "ms" | "en"; setLang: (l: "ms" | "en") => void; reg: any; setReg: (r: any) => void; t: any; onSubmit: (event: React.FormEvent<HTMLFormElement>) => void };
function LoginScreen({ lang, setLang, reg, setReg, t, onSubmit }: LoginScreenProps) {
  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-slate-100">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-5xl items-center gap-6 lg:grid-cols-[1fr_0.85fr]">
        <section className="rounded-[3rem] border border-slate-800 bg-gradient-to-br from-lime-400/20 via-slate-900 to-slate-950 p-8 shadow-2xl">
          <div className="mb-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="grid place-items-center rounded-2xl bg-lime-400 px-4 py-3 text-2xl font-black text-slate-950">E</div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-lime-400">Eco-Trail STEM</p>
                <p className="text-xs text-slate-400">Hutan Bandar Mutiara Rini</p>
              </div>
            </div>
            <button type="button" onClick={() => setLang(lang === "ms" ? "en" : "ms")} className="rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-xs font-black text-lime-400">
              {lang === "ms" ? "EN" : "BM"}
            </button>
          </div>
          <p className="mb-4 inline-flex rounded-full border border-lime-400/20 bg-lime-400/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-lime-400">Digital Learning Trail</p>
          <h1 className="mb-5 max-w-2xl text-5xl font-black leading-none tracking-tight text-white md:text-6xl">{t.welcomeTitle}</h1>
          <p className="max-w-2xl text-base font-medium leading-relaxed text-slate-400">{t.welcomeCopy}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {["5 Stesen", "e-Kuiz", "Carbon Check"].map((item) => (
              <div key={item} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-sm font-black text-slate-300">✓ {item}</div>
            ))}
          </div>
        </section>

        <section className="rounded-[3rem] border border-slate-800 bg-slate-900 p-7 shadow-2xl">
          <h2 className="mb-2 text-3xl font-black tracking-tight">{t.register}</h2>
          <p className="mb-6 text-sm font-medium text-slate-500">
            {lang === "ms" ? "Isi maklumat ringkas untuk mulakan sesi pembelajaran." : "Enter brief details to start your learning session."}
          </p>
          <form className="space-y-4" onSubmit={onSubmit}>
            <input
              required
              value={reg.name}
              onChange={(event) => setReg({ ...reg, name: event.target.value })}
              placeholder={t.name}
              className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-5 py-4 text-sm font-bold outline-none focus:border-lime-400"
            />
            <select
              required
              value={reg.age}
              onChange={(event) => setReg({ ...reg, age: event.target.value })}
              className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-5 py-4 text-sm font-bold outline-none focus:border-lime-400"
            >
              <option value="">-- {t.selectAge} --</option>
              {Object.entries(t.categories).map(([key, label]) => (
                <option key={key} value={key}>{String(label)}</option>
              ))}
            </select>
            <select
              required
              value={reg.career}
              onChange={(event) => setReg({ ...reg, career: event.target.value })}
              className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-5 py-4 text-sm font-bold outline-none focus:border-lime-400"
            >
              <option value="">-- {t.selectCareer} --</option>
              {t.careers.map((career: string) => (
                <option key={career}>{career}</option>
              ))}
            </select>
            <button className="w-full rounded-[2rem] bg-lime-400 px-6 py-5 text-xs font-black uppercase tracking-[0.2em] text-slate-950 shadow-lg shadow-lime-400/10 transition hover:bg-lime-300 active:scale-95">
              {t.start} →
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

type StationHeroProps = { station: any; lang: "ms" | "en"; activeStation: any; t: any };
function StationHero({ station, lang, activeStation, t }: StationHeroProps) {
  return (
    <div className={`overflow-hidden rounded-[2.5rem] border border-slate-800 bg-gradient-to-br ${station.color} p-1 shadow-2xl`}>
      <div className="rounded-[2.35rem] bg-slate-950/75 p-6 md:p-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-3 inline-flex rounded-full border border-lime-400/20 bg-lime-400/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-lime-400">
              {t.currentStation} • {t.station} 0{station.id}
            </p>
            <h1 className="max-w-2xl text-4xl font-black leading-none tracking-tight text-white md:text-6xl">{station.title[lang]}</h1>
          </div>
          <span className="text-7xl">{station.icon}</span>
        </div>
        <p className="mb-7 max-w-3xl text-base font-medium leading-relaxed text-slate-300 md:text-lg">{station.content[lang]}</p>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.5rem] border border-slate-800 bg-slate-950/70 p-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{t.quickInfo}</p>
            <p className="mt-2 text-sm font-black text-white">{station.keyPoint[lang]}</p>
          </div>
          <div className="rounded-[1.5rem] border border-slate-800 bg-slate-950/70 p-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Focus</p>
            <p className="mt-2 text-sm font-black text-white">{station.subtitle[lang]}</p>
          </div>
          <div className="rounded-[1.5rem] border border-slate-800 bg-slate-950/70 p-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Progress</p>
            <p className="mt-2 text-sm font-black text-lime-400">{activeStation + 1}/{stations.length} station</p>
          </div>
        </div>
      </div>
    </div>
  );
}

type StationChooserProps = { lang: "ms" | "en"; activeStation: any; setActiveStation: (s: any) => void; t: any };
function StationChooser({ lang, activeStation, setActiveStation, t }: StationChooserProps) {
  return (
    <Card>
      <SectionTitle eyebrow="Trail" title={t.chooseStation} />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {stations.map((station, index) => {
          const isActive = activeStation === index;
          return (
            <button
              type="button"
              key={station.id}
              onClick={() => setActiveStation(index)}
              className={`rounded-[1.7rem] border p-4 text-left transition active:scale-[0.98] ${
                isActive
                  ? "border-lime-400 bg-lime-400 text-slate-950"
                  : "border-slate-800 bg-slate-950 text-white hover:border-slate-600"
              }`}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-3xl">{station.icon}</span>
                <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? "text-slate-800" : "text-slate-500"}`}>0{station.id}</span>
              </div>
              <p className="text-sm font-black leading-tight">{station.title[lang]}</p>
              <p className={`mt-1 text-xs font-bold ${isActive ? "text-slate-800" : "text-slate-500"}`}>{station.subtitle[lang]}</p>
            </button>
          );
        })}
      </div>
    </Card>
  );
}

type HomeViewProps = {
  lang: "ms" | "en";
  t: any;
  station: any;
  activeStation: any;
  setActiveStation: (s: any) => void;
  startQuiz: () => void;
  quizTakenThisMonth: boolean;
  setShowCarbon: (b: boolean) => void;
};
function HomeView({ lang, t, station, activeStation, setActiveStation, startQuiz, quizTakenThisMonth, setShowCarbon }: HomeViewProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <section className="space-y-6">
        <StationHero station={station} lang={lang} activeStation={activeStation} t={t} />
        <StationChooser lang={lang} activeStation={activeStation} setActiveStation={setActiveStation} t={t} />
      </section>

      <aside className="space-y-6">
        <Card>
          <SectionTitle eyebrow="Action" title={t.learningActions} />
          <div className="space-y-3">
            <QuickAction icon="▶️" title={t.video} desc={lang === "ms" ? "Video penerangan pakar" : "Expert explanation video"} onClick={() => {}} />
            <QuickAction icon="🏅" title={quizTakenThisMonth ? t.quizTakenBadge : t.quiz} desc={lang === "ms" ? "5 soalan setiap sesi" : "5 questions per session"} onClick={startQuiz} primary />
            <QuickAction icon="🧮" title={t.carbon} desc={lang === "ms" ? "Pengiraan terperinci kg CO₂e" : "Detailed kg CO₂e calculation"} onClick={() => setShowCarbon(true)} />
          </div>
        </Card>

        <Card>
          <SectionTitle eyebrow="Impact" title={t.impact} />
          <div className="space-y-4">
            {[["Station visit", 80], ["Quiz awareness", quizTakenThisMonth ? 100 : 45], ["Carbon action", 60]].map(([label, value]) => (
              <div key={label}>
                <div className="mb-2 flex justify-between text-xs font-black text-slate-400">
                  <span>{label}</span>
                  <span>{value}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full rounded-full bg-lime-400" style={{ width: `${value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </aside>
    </div>
  );
}

type HubViewProps = {
  lang: "ms" | "en";
  t: any;
  rankCategory: keyof typeof leaderboard;
  setShowFeedback: (b: boolean) => void;
  setSubmitted: (b: boolean) => void;
  setShowRank: (b: boolean) => void;
};
function HubView({ lang, t, rankCategory, setShowFeedback, setSubmitted, setShowRank }: HubViewProps) {
  const events = [
    ["25", "MEI", lang === "ms" ? "Bengkel Solar Cilik" : "Junior Solar Workshop", lang === "ms" ? "Stesen 1 • 9:00 AM" : "Station 1 • 9:00 AM"],
    ["08", "JUN", lang === "ms" ? "Cabaran Jejak Karbon" : "Carbon Trail Challenge", lang === "ms" ? "Semua Stesen • 8:30 AM" : "All Stations • 8:30 AM"]
  ];

  const feedbackActions = [
    ["report", "🚧", t.report, lang === "ms" ? "Kerosakan panel atau fasiliti" : "Damaged panel or facility"],
    ["suggest", "💡", t.suggest, lang === "ms" ? "Idea penambahbaikan" : "Improvement idea"],
    ["ask", "❓", t.ask, lang === "ms" ? "Soalan kepada pakar" : "Question for expert"]
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <section className="space-y-6">
        <Card>
          <SectionTitle eyebrow="Community" title={t.community} />
          <div className="grid gap-3 md:grid-cols-3">
            {feedbackActions.map(([key, icon, title, desc]) => (
              <QuickAction
                key={key}
                icon={icon}
                title={title}
                desc={desc}
                onClick={() => {
                  setSubmitted(false);
                  setShowFeedback(key);
                }}
              />
            ))}
          </div>
        </Card>

        <Card>
          <SectionTitle eyebrow="Event" title={t.activities} />
          <div className="grid gap-4 md:grid-cols-2">
            {events.map(([day, month, title, detail]) => (
              <div key={title} className="rounded-[1.8rem] border border-slate-800 bg-slate-950 p-5">
                <div className="mb-5 flex items-center gap-4">
                  <div className="grid h-16 w-16 place-items-center rounded-2xl bg-lime-400 text-center font-black leading-none text-slate-950">
                    <span>{day}<br /><small>{month}</small></span>
                  </div>
                  <div>
                    <h3 className="text-lg font-black leading-tight">{title}</h3>
                    <p className="mt-1 text-sm font-bold text-slate-500">{detail}</p>
                  </div>
                </div>
                <button type="button" className="w-full rounded-2xl bg-slate-800 px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-300 hover:bg-lime-400 hover:text-slate-950">
                  {t.eventJoin}
                </button>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <aside className="space-y-6">
        <Card>
          <SectionTitle eyebrow="Top 3" title={t.leaderboard} action={<button type="button" onClick={() => setShowRank(true)} className="text-xs font-black text-lime-400">View →</button>} />
          <div className="space-y-3">
            {leaderboard[rankCategory].slice(0, 3).map((entry: any, index: number) => (
              <div key={entry.name} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 p-4">
                <div className="flex items-center gap-3">
                  <span className={`grid h-9 w-9 place-items-center rounded-xl font-black ${index === 0 ? "bg-yellow-400 text-slate-950" : "bg-slate-800 text-slate-400"}`}>{index + 1}</span>
                  <span className="text-sm font-black">{entry.name}</span>
                </div>
                <span className="text-sm font-black text-lime-400">{entry.points}</span>
              </div>
            ))}
          </div>
        </Card>
      </aside>
    </div>
  );
}

type StatsViewProps = { lang: "ms" | "en"; t: any };
function StatsView({ lang, t }: StatsViewProps) {
  const summary = [
    ["Visitors", "3,412", "+18%"],
    ["Quiz Completed", "1,284", "+11%"],
    ["Carbon Check", "982", "+24%"],
    ["Feedback", "76", "+5%"]
  ];

  return (
    <section className="space-y-6">
      <Card>
        <SectionTitle eyebrow="Data" title={t.stats} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {summary.map(([label, value, change]) => (
            <div key={label} className="rounded-[1.8rem] border border-slate-800 bg-slate-950 p-6">
              <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-slate-500">{label}</p>
              <h3 className="text-4xl font-black text-lime-400">{value}</h3>
              <p className="mt-2 text-xs font-black text-slate-500">{change} monthly</p>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionTitle eyebrow="Station" title={lang === "ms" ? "Penglibatan Mengikut Stesen" : "Engagement by Station"} />
        <div className="space-y-4">
          {stations.map((station, index) => {
            const value = [92, 76, 68, 61, 73][index];
            return (
              <div key={station.id} className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                <div className="mb-3 flex items-center justify-between text-sm font-black">
                  <span>{station.icon} {station.title[lang as keyof typeof station.title]}</span>
                  <span className="text-lime-400">{value}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full rounded-full bg-lime-400" style={{ width: `${value}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </section>
  );
}

type TeamViewProps = { t: any };
function TeamView({ t }: TeamViewProps) {
  return (
    <Card>
      <SectionTitle eyebrow="People" title={t.team} />
      <div className="grid gap-3 md:grid-cols-2">
        {projectMembers.map(([name, role, dept], index) => (
          <div key={name} className="flex items-center justify-between rounded-[1.6rem] border border-slate-800 bg-slate-950 p-5">
            <div className="flex min-w-0 items-center gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-slate-800 text-xl">{index === 0 ? "🛡️" : "👤"}</div>
              <div className="min-w-0">
                <h3 className="truncate font-black leading-tight">{name}</h3>
                <p className="mt-1 text-xs font-bold text-slate-500">{role}</p>
              </div>
            </div>
            <span className="ml-3 rounded-lg bg-slate-800 px-2 py-1 text-[10px] font-black text-slate-400">{dept}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

type StationModalProps = {
  lang: "ms" | "en";
  t: any;
  activeStation: any;
  setActiveStation: (s: any) => void;
  setView: (v: string) => void;
  onClose: () => void;
};
function StationModal({ lang, t, activeStation, setActiveStation, setView, onClose }: StationModalProps) {
  return (
    <Modal onClose={onClose}>
      <h2 className="mb-7 pr-12 text-3xl font-black tracking-tight">{t.chooseStation}</h2>
      <div className="grid gap-3">
        {stations.map((station, index) => (
          <button
            type="button"
            key={station.id}
            onClick={() => {
              setActiveStation(index);
              setView("home");
              onClose();
            }}
            className={`flex items-center gap-4 rounded-[2rem] border p-5 text-left ${
              activeStation === index ? "border-lime-400 bg-lime-400/10" : "border-slate-800 bg-slate-950"
            }`}
          >
            <span className="text-4xl">{station.icon}</span>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-lime-400">{t.station} 0{station.id}</p>
              <p className="text-xl font-black">{station.title[lang as keyof typeof station.title]}</p>
              <p className="mt-1 text-xs font-bold text-slate-500">{station.subtitle[lang as keyof typeof station.subtitle]}</p>
            </div>
          </button>
        ))}
      </div>
    </Modal>
  );
}

type QuizModalProps = {
  lang: "ms" | "en";
  t: any;
  questions: any[];
  qIndex: number;
  score: number;
  finished: boolean;
  answerQuiz: (answer: number) => void;
  onClose: () => void;
};
function QuizModal({ lang, t, questions, qIndex, score, finished, answerQuiz, onClose }: QuizModalProps) {
  return (
    <Modal onClose={onClose}>
      {finished ? (
        <div className="py-8 text-center">
          <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full bg-lime-400 text-4xl text-slate-950">✓</div>
          <h2 className="mb-2 text-3xl font-black">{lang === "ms" ? "Kuiz Selesai!" : "Quiz Finished!"}</h2>
          <p className="mb-8 text-slate-400">
            {t.score}: <span className="font-black text-lime-400">{score}/100</span>
          </p>
          <button type="button" onClick={onClose} className="w-full rounded-2xl bg-lime-400 px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-950">
            {t.finish}
          </button>
        </div>
      ) : (
        <div>
          <p className="mb-4 text-xs font-black uppercase tracking-[0.25em] text-slate-500">Question {qIndex + 1}/{questions.length}</p>
          <div className="mb-6 h-2 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full bg-lime-400 transition-all" style={{ width: `${((qIndex + 1) / questions.length) * 100}%` }} />
          </div>
          <h2 className="mb-7 text-2xl font-black leading-tight tracking-tight">{questions[qIndex].q[lang]}</h2>
          <div className="space-y-3">
            {questions[qIndex].a[lang].map((option: string, index: number) => (
              <button
                type="button"
                key={option}
                onClick={() => answerQuiz(index)}
                className="w-full rounded-[1.6rem] border border-slate-800 bg-slate-950 p-5 text-left text-sm font-black transition hover:border-lime-400/60 active:scale-95"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </Modal>
  );
}

type FeedbackModalProps = {
  lang: "ms" | "en";
  t: any;
  type: string;
  submitted: boolean;
  setSubmitted: (b: boolean) => void;
  onClose: () => void;
};
function FeedbackModal({ lang, t, type, submitted, setSubmitted, onClose }: FeedbackModalProps) {
  const title = type === "report" ? t.report : type === "suggest" ? t.suggest : t.ask;

  return (
    <Modal onClose={onClose}>
      {submitted ? (
        <div className="py-8 text-center">
          <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full bg-lime-400 text-4xl text-slate-950">✓</div>
          <h2 className="mb-3 text-2xl font-black">{t.success}</h2>
          <button type="button" onClick={onClose} className="mt-5 w-full rounded-2xl bg-lime-400 px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-950">
            Close
          </button>
        </div>
      ) : (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
        >
          <h2 className="mb-6 pr-10 text-3xl font-black tracking-tight">{title}</h2>
          <select className="mb-4 w-full rounded-2xl border border-slate-800 bg-slate-950 px-5 py-4 text-sm font-bold outline-none">
            {stations.map((station) => (
              <option key={station.id}>{station.title[lang as keyof typeof station.title]}</option>
            ))}
          </select>
          <textarea
            rows={5}
            placeholder={t.details}
            className="mb-4 w-full rounded-2xl border border-slate-800 bg-slate-950 px-5 py-4 text-sm font-bold outline-none focus:border-lime-400"
          />
          <button className="w-full rounded-2xl bg-lime-400 px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-950">
            {t.submit}
          </button>
        </form>
      )}
    </Modal>
  );
}

type RankModalProps = {
  t: any;
  rankMonth: string;
  setRankMonth: (m: string) => void;
  rankCategory: keyof typeof leaderboard;
  setRankCategory: (c: keyof typeof leaderboard) => void;
  onClose: () => void;
};
function RankModal({ t, rankMonth, setRankMonth, rankCategory, setRankCategory, onClose }: RankModalProps) {
  return (
    <Modal onClose={onClose}>
      <h2 className="mb-6 pr-10 text-3xl font-black tracking-tight">🏆 {t.leaderboard}</h2>
      <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
        {months.map((month) => (
          <PillButton key={month} active={rankMonth === month} onClick={() => setRankMonth(month)}>{month}</PillButton>
        ))}
      </div>
      <div className="mb-6 grid grid-cols-2 gap-2">
        {Object.entries(t.categories).map(([key, label]) => (
          <PillButton key={key} active={rankCategory === key} onClick={() => setRankCategory(key as keyof typeof leaderboard)}>{label as React.ReactNode}</PillButton>
        ))}
      </div>
      <div className="space-y-3">
        {leaderboard[rankCategory].map((entry, index) => (
          <div key={entry.name} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 p-5">
            <div className="flex items-center gap-4">
              <span className={`grid h-9 w-9 place-items-center rounded-xl font-black ${index === 0 ? "bg-yellow-400 text-slate-950" : "bg-slate-800 text-slate-400"}`}>{index + 1}</span>
              <span className="font-black">{entry.name}</span>
            </div>
            <span className="font-black text-lime-400">{entry.points} pts</span>
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default function App() {
  const [lang, setLang] = useState("ms");
  const [user, setUser] = useState(null);
  const [reg, setReg] = useState({ name: "", age: "", career: "" });
  const [view, setView] = useState("home");
  const [activeStation, setActiveStation] = useState(0);
  const [showStations, setShowStations] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showQuizLimit, setShowQuizLimit] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showCarbon, setShowCarbon] = useState(false);
  const [showFeedback, setShowFeedback] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showRank, setShowRank] = useState(false);
  const [rankCategory, setRankCategory] = useState("children");
  const [rankMonth, setRankMonth] = useState("Mei");

  const t = translations[lang as keyof typeof translations];
  const station = stations[activeStation];
  const questions = quizPool[(station.id as keyof typeof quizPool)];
  const finished = qIndex >= questions.length;

  const quizTakenThisMonth = useMemo(() => {
    if (!user || typeof window === "undefined") return false;
    return Boolean(window.localStorage.getItem(getQuizMonthKey((user as any)?.name)));
  }, [user, showQuiz, showQuizLimit]);

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (reg.name && reg.age && reg.career) setUser(reg as any);
  }

  function startQuiz() {
    const quizKey = getQuizMonthKey((user as any)?.name);
    const savedQuiz = typeof window !== "undefined" ? window.localStorage.getItem(quizKey) : null;
    if (savedQuiz) {
      setShowQuizLimit(true);
      return;
    }
    setQIndex(0);
    setScore(0);
    setShowQuiz(true);
  }

  function answerQuiz(choice: number) {
    const isCorrect = choice === questions[qIndex].c;
    const updatedScore = isCorrect ? score + 20 : score;
    if (isCorrect) setScore((current) => current + 20);

    if (qIndex === questions.length - 1 && typeof window !== "undefined") {
      window.localStorage.setItem(
        getQuizMonthKey((user as any)?.name),
        JSON.stringify({
          visitor: (user as any)?.name,
          month: new Date().toISOString().slice(0, 7),
          score: updatedScore,
          completedAt: new Date().toISOString()
        })
      );
    }
    setQIndex((current) => current + 1);
  }

  if (!user) {
    return <LoginScreen lang={lang as "ms" | "en"} setLang={setLang as any} reg={reg} setReg={setReg as any} t={t} onSubmit={handleLogin} />;
  }

  return (
    <main className="min-h-screen bg-slate-950 pb-28 text-slate-100">
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/90 px-5 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <button type="button" onClick={() => setView("home")} className="flex min-w-0 items-center gap-3 text-left">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-lime-400 text-xl font-black text-slate-950">E</div>
            <div className="min-w-0">
              <p className="truncate text-sm font-black leading-none">{(user as any)?.name || t.visitor}</p>
              <p className="mt-1 text-[10px] font-black uppercase tracking-[0.2em] text-lime-400">{t.greenAmbassador}</p>
            </div>
          </button>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setShowRank(true)} className="hidden rounded-full border border-slate-800 bg-slate-900 px-4 py-3 text-xs font-black text-lime-400 sm:block">
              🏆 {t.openRank}
            </button>
            <button type="button" onClick={() => setLang(lang === "ms" ? "en" : "ms")} className="rounded-full border border-slate-800 bg-slate-900 px-4 py-3 text-xs font-black text-slate-300">
              {lang === "ms" ? "EN" : "BM"}
            </button>
            <button type="button" onClick={() => setShowStations(true)} className="rounded-full border border-slate-800 bg-slate-900 px-4 py-3 text-xs font-black text-white">
              ☰ {t.openMenu}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-6 px-5 pt-6">
        <MainTabs view={view} setView={setView} t={t} />

        {view === "home" ? (
          <HomeView
            lang={lang as "ms" | "en"}
            t={t}
            station={station}
            activeStation={activeStation}
            setActiveStation={setActiveStation}
            startQuiz={startQuiz}
            quizTakenThisMonth={quizTakenThisMonth}
            setShowCarbon={setShowCarbon}
          />
        ) : null}

        {view === "hub" ? (
          <HubView
            lang={lang as "ms" | "en"}
            t={t}
            rankCategory={rankCategory as keyof typeof leaderboard}
            setShowFeedback={setShowFeedback as any}
            setSubmitted={setSubmitted}
            setShowRank={setShowRank}
          />
        ) : null}

        {view === "stats" ? <StatsView lang={lang as "ms" | "en"} t={t} /> : null}
        {view === "team" ? <TeamView t={t} /> : null}
      </div>

            {/* BRANDING LOGO SECTION BEFORE FOOTER */}
      <section className="mx-auto max-w-6xl px-5 pt-16 pb-8">
        <div className="flex flex-col items-center justify-center border-t border-slate-900 pt-12 text-center">
          <div className="relative group">
            {/* Pulsing Backlight effect */}
            <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-lime-400 to-emerald-400 opacity-20 blur-lg transition duration-1000 group-hover:opacity-40"></div>
            
            {/* Custom High-Fidelity SVG Sustainability Logo Container */}
            <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-slate-800 bg-slate-900 p-4 shadow-xl">
              <svg viewBox="0 0 100 100" className="h-full w-full fill-none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="42" className="stroke-lime-400/20 stroke-[3]" strokeDasharray="6 4" />
                <path d="M50 15 V25 M50 75 V85 M15 50 H25 M75 50 H85" className="stroke-lime-400 stroke-[5] stroke-linecap-round" />
                <path d="M50 25 C65 25 75 40 75 55 C75 70 60 75 50 75 C40 75 25 70 25 55 C25 40 35 25 50 25 Z" className="fill-lime-400/10 stroke-lime-400 stroke-[4] stroke-linejoin-round" />
                <path d="M50 25 V75 C42 62 38 52 42 42" className="stroke-lime-400 stroke-[3]" />
                <circle cx="50" cy="50" r="8" className="fill-slate-950 stroke-lime-400 stroke-[2]" />
              </svg>
            </div>
          </div>
          
          <div className="mt-6">
            <h2 className="text-2xl font-black uppercase tracking-[0.25em] text-white">DUTA HIJAU</h2>
            <p className="mt-1.5 text-xs font-black uppercase tracking-[0.2em] text-lime-400">Eco-Trail STEM Digital Portal</p>
          </div>
          
          {/* <p className="mx-auto mt-4 max-w-lg text-xs font-medium leading-relaxed text-slate-500">
            {t.motto}
          </p> */}
          
          <div className="mt-8 flex items-center justify-center gap-3 text-slate-600 text-[10px] font-black uppercase tracking-widest">
            <span>Mutiara Rini</span>
            <span className="h-1.5 w-1.5 rounded-full bg-slate-800"></span>
            <span>UiTM STEM</span>
            <span className="h-1.5 w-1.5 rounded-full bg-slate-800"></span>
            <span>MBIP</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 text-center border-t border-slate-900/50">
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-600">
          © 2026 Duta Hijau — STEM Discovery Trail. All Rights Reserved.
        </p>
      </footer>

      {/* Progress Tracker at very bottom */}
      <div className="fixed bottom-0 left-0 z-40 h-2 w-full bg-slate-900">
        <div className="h-full bg-lime-400 transition-all" style={{ width: `${((activeStation + 1) / stations.length) * 100}%` }} />
      </div>


      {showStations ? (
        <StationModal
          lang={lang as "ms" | "en"}
          t={t}
          activeStation={activeStation}
          setActiveStation={setActiveStation}
          setView={setView}
          onClose={() => setShowStations(false)}
        />
      ) : null}

      {showQuizLimit ? (
        <Modal onClose={() => setShowQuizLimit(false)}>
          <div className="py-8 text-center">
            <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full bg-lime-400 text-4xl text-slate-950">🔒</div>
            <h2 className="mb-3 text-3xl font-black">{t.quizLimitTitle}</h2>
            <p className="mb-3 text-sm font-bold leading-relaxed text-slate-300">{t.quizLimitMessage}</p>
            <p className="mb-8 text-sm text-slate-500">{t.quizLimitNext}</p>
            <button type="button" onClick={() => setShowQuizLimit(false)} className="w-full rounded-2xl bg-lime-400 px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-950">
              Close
            </button>
          </div>
        </Modal>
      ) : null}

      {showQuiz ? (
        <QuizModal
          lang={lang as "ms" | "en"}
          t={t}
          questions={questions}
          qIndex={qIndex}
          score={score}
          finished={finished}
          answerQuiz={answerQuiz}
          onClose={() => setShowQuiz(false)}
        />
      ) : null}

      {showCarbon ? <CarbonCalculator lang={lang as "ms" | "en"} t={t} onClose={() => setShowCarbon(false)} /> : null}

      {showFeedback ? (
        <FeedbackModal
          lang={lang as "ms" | "en"}
          t={t}
          type={showFeedback}
          submitted={submitted}
          setSubmitted={setSubmitted}
          onClose={() => setShowFeedback(null)}
        />
      ) : null}

      {showRank ? (
        <RankModal
          t={t}
          rankMonth={rankMonth}
          setRankMonth={setRankMonth}
          rankCategory={rankCategory as keyof typeof leaderboard}
          setRankCategory={setRankCategory}
          onClose={() => setShowRank(false)}
        />
      ) : null}
    </main>
  );
}
