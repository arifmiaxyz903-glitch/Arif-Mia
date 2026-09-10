import React, { useState, useMemo, useEffect } from 'react';
import {
  Film,
  Play,
  Search,
  SlidersHorizontal,
  Copy,
  Check,
  Download,
  Eye,
  Code2,
  BookOpen,
  Smartphone,
  Monitor,
  Tablet,
  X,
  ChevronRight,
  ShieldCheck,
  Tv,
  Flame,
  Sparkles,
  Plus,
  RefreshCw,
  ExternalLink,
  DollarSign,
  Menu,
  Star,
  Info,
  Layers
} from 'lucide-react';
import { BLOGGER_THEME_XML } from './themeXml.ts';

// Movie data interface
interface MovieItem {
  id: string;
  title: string;
  originalTitle?: string;
  tagline?: string;
  type: 'movie' | 'series';
  year: number;
  releaseDate: string;
  rating: number;
  votes?: string;
  quality: string;
  runtime: string;
  genres: string[];
  overview: string;
  director: string;
  starring: string;
  audio?: string;
  posterUrl: string;
  backdropUrl: string;
  trailerId: string;
  providers: string[];
  isFeatured?: boolean;
  isTrending?: boolean;
  isTopRated?: boolean;
  isLatest?: boolean;
}

const INITIAL_CATALOG: MovieItem[] = [
  {
    id: "cf-101",
    title: "Chronicles of Nova: Beyond Orbit",
    originalTitle: "Chronicles of Nova",
    tagline: "The stars remember what humanity forgot.",
    type: "movie",
    year: 2026,
    releaseDate: "2026-04-14",
    rating: 8.8,
    votes: "142K",
    quality: "4K UHD",
    runtime: "2h 24m",
    genres: ["Sci-Fi", "Adventure", "Drama"],
    overview: "When deep space signals point toward an uncharted wormhole on the outer rings of Saturn, an elite reconnaissance squad embarks on a high-stakes voyage across dimensional boundaries to salvage what remains of the pioneering fleet.",
    director: "Elena Vance",
    starring: "Marcus Thorne, Linnea Sterling, David O'Connor",
    audio: "Dolby Atmos 7.1 / English, French",
    posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=85",
    trailerId: "dQw4w9WgXcQ",
    providers: ["Netflix", "Apple TV+", "Prime Video"],
    isFeatured: true,
    isTrending: true,
    isTopRated: true,
    isLatest: true
  },
  {
    id: "cf-102",
    title: "Shadow Protocol: Tokyo Underworld",
    originalTitle: "Shadow Protocol",
    tagline: "Silence is their deadliest weapon.",
    type: "movie",
    year: 2025,
    releaseDate: "2025-11-08",
    rating: 8.4,
    votes: "98K",
    quality: "4K UHD",
    runtime: "1h 58m",
    genres: ["Action", "Thriller", "Crime"],
    overview: "An undercover forensic operative in neon-lit Shinjuku uncovers a conspiracy intertwining high-frequency cyber espionage with ancient clan syndicates, forcing him into a lethal race against time.",
    director: "Kenji Takahashi",
    starring: "Ren Tanaka, Maya Hoshino, Liam Cross",
    audio: "DTS-HD Master 5.1 / Japanese, English",
    posterUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1920&q=85",
    trailerId: "L61p2uyiMSo",
    providers: ["Prime Video", "Max", "Disney+"],
    isFeatured: true,
    isTrending: true,
    isTopRated: true,
    isLatest: false
  },
  {
    id: "cf-103",
    title: "Echoes of the Crown",
    originalTitle: "Echoes of the Crown",
    tagline: "Power never sleeps.",
    type: "series",
    year: 2026,
    releaseDate: "2026-02-19",
    rating: 8.9,
    votes: "185K",
    quality: "4K HDR",
    runtime: "3 Seasons (24 Eps)",
    genres: ["Drama", "Mystery", "History"],
    overview: "A sprawling political saga dissecting three rival royal houses during an unforgiving Nordic winter, where secret alliances, poisoned wine, and succession crises threaten total continental collapse.",
    director: "Astrid Lindholm",
    starring: "Freja Sorensen, Henrik Blom, Clara Dupont",
    audio: "Dolby Atmos 5.1 / English, German",
    posterUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=85",
    trailerId: "kJQP7kiw5Fk",
    providers: ["Max", "Apple TV+"],
    isFeatured: true,
    isTrending: true,
    isTopRated: true,
    isLatest: true
  },
  {
    id: "cf-104",
    title: "The Quantum Enigma",
    originalTitle: "The Quantum Enigma",
    tagline: "Reality is merely an equation waiting to be solved.",
    type: "movie",
    year: 2025,
    releaseDate: "2025-08-15",
    rating: 8.2,
    votes: "74K",
    quality: "HD",
    runtime: "2h 11m",
    genres: ["Sci-Fi", "Mystery", "Thriller"],
    overview: "Two rival quantum physicists at CERN inadvertently trigger a localized time dilation bubble, experiencing conflicting memories of catastrophic world events before they even take place.",
    director: "Claire Bennet",
    starring: "Oliver Walsh, Sophie Moreau, Julian Reed",
    audio: "Dolby Digital 5.1 / English",
    posterUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1920&q=85",
    trailerId: "fJ9rUzIMcZQ",
    providers: ["Netflix", "Hulu"],
    isFeatured: false,
    isTrending: true,
    isTopRated: false,
    isLatest: false
  },
  {
    id: "cf-105",
    title: "Cyberpunk: Neon District",
    originalTitle: "Neon District",
    tagline: "In the high-tech slums, memory is currency.",
    type: "series",
    year: 2026,
    releaseDate: "2026-01-10",
    rating: 8.7,
    votes: "115K",
    quality: "4K UHD",
    runtime: "2 Seasons (18 Eps)",
    genres: ["Action", "Sci-Fi", "Animation"],
    overview: "An underground neural hacker in a hyper-capitalist dystopian megacity takes on a megacorporation after stumbling upon classified neuro-implants that can rewrite human consciousness.",
    director: "Shinichi Watanabe",
    starring: "Kai Mitchell, Akira Sato, Chloe Adams",
    audio: "Dolby Atmos 5.1 / English, Japanese",
    posterUrl: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1920&q=85",
    trailerId: "J---aiyznGQ",
    providers: ["Netflix"],
    isFeatured: false,
    isTrending: true,
    isTopRated: true,
    isLatest: true
  },
  {
    id: "cf-106",
    title: "The Last Lighthouse",
    originalTitle: "The Last Lighthouse",
    tagline: "Some lights guide you home. Others lead you into the abyss.",
    type: "movie",
    year: 2024,
    releaseDate: "2024-10-31",
    rating: 7.9,
    votes: "62K",
    quality: "HD",
    runtime: "1h 49m",
    genres: ["Drama", "Mystery", "Thriller"],
    overview: "Stationed on an isolated granite outcrop off the stormy coast of Maine, a solitary lighthouse keeper begins suspecting that the shipwrecks occurring below are orchestrated by whispers in the fog.",
    director: "Arthur Pendelton",
    starring: "Sean Harris, Fiona Shaw",
    audio: "Dolby Digital 5.1 / English",
    posterUrl: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=600&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=85",
    trailerId: "HyHNuVaZJ-k",
    providers: ["Prime Video", "Apple TV+"],
    isFeatured: false,
    isTrending: false,
    isTopRated: false,
    isLatest: false
  },
  {
    id: "cf-107",
    title: "Grand Horizon: Velocity",
    originalTitle: "Grand Horizon",
    tagline: "Burn the tarmac. Chase the impossible.",
    type: "movie",
    year: 2025,
    releaseDate: "2025-07-22",
    rating: 8.1,
    votes: "88K",
    quality: "4K UHD",
    runtime: "2h 05m",
    genres: ["Action", "Adventure"],
    overview: "An expelled Formula 1 test engineer joins an underground transnational endurance rally spanning from Monaco to the Sahara, driving an experimental prototype with dangerously unstable synthetic fuel.",
    director: "Matteo Rossi",
    starring: "Lucas Vance, Isabella Morales, Paul Walker Jr.",
    audio: "Dolby Atmos 7.1 / English, Italian",
    posterUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1920&q=85",
    trailerId: "Bey4XXJAqS8",
    providers: ["Prime Video", "Disney+"],
    isFeatured: false,
    isTrending: true,
    isTopRated: false,
    isLatest: false
  },
  {
    id: "cf-108",
    title: "Wilderness Detective",
    originalTitle: "Wilderness Detective",
    tagline: "Nature buries secrets deep.",
    type: "series",
    year: 2025,
    releaseDate: "2025-09-04",
    rating: 8.5,
    votes: "79K",
    quality: "HD",
    runtime: "1 Season (10 Eps)",
    genres: ["Crime", "Drama", "Mystery"],
    overview: "A disgraced former federal marshal takes a park ranger posting in the treacherous Pacific Northwest wilderness, only to discover that missing hikers are tied to an illicit black-market wildlife ring.",
    director: "Sarah Jenkins",
    starring: "Brett Carlson, Naomi Young, Victor Garber",
    audio: "Dolby Digital 5.1 / English",
    posterUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=85",
    trailerId: "TcMBFSGVi1c",
    providers: ["Hulu", "Disney+"],
    isFeatured: false,
    isTrending: false,
    isTopRated: true,
    isLatest: false
  },
  {
    id: "cf-109",
    title: "The Baker Street Files",
    originalTitle: "Baker Street Files",
    tagline: "Elementary was just the beginning.",
    type: "series",
    year: 2024,
    releaseDate: "2024-03-12",
    rating: 8.6,
    votes: "130K",
    quality: "4K UHD",
    runtime: "2 Seasons (16 Eps)",
    genres: ["Crime", "Drama", "Mystery"],
    overview: "A gritty, modern-era reinvention of London's legendary consultative detectives tackling dark web syndicate crime, algorithmic heists, and diplomatic assassinations.",
    director: "Dominic Thorne",
    starring: "Benedict Sterling, Martin Hughes",
    audio: "Dolby Atmos 5.1 / English",
    posterUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1920&q=85",
    trailerId: "xK7S9mrFWL4",
    providers: ["Netflix", "Apple TV+"],
    isFeatured: false,
    isTrending: false,
    isTopRated: true,
    isLatest: false
  },
  {
    id: "cf-110",
    title: "Kingdom of Sands",
    originalTitle: "Kingdom of Sands",
    tagline: "Empire is built on blood and shifting dunes.",
    type: "movie",
    year: 2026,
    releaseDate: "2026-03-01",
    rating: 8.3,
    votes: "54K",
    quality: "4K UHD",
    runtime: "2h 32m",
    genres: ["Adventure", "Drama", "Action"],
    overview: "In an opulent desert realm on the cusp of an industrial revolution, a rebellious desert nomad princess unites exiled tribes to reclaim the sacred oasis water rights from a despotic oil baron.",
    director: "Tariq Mansoor",
    starring: "Layla Zafar, Omar Bashir, Clive Owen",
    audio: "Dolby Atmos 7.1 / Arabic, English",
    posterUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=85",
    trailerId: "8g18jFHCLgk",
    providers: ["Max", "Prime Video"],
    isFeatured: false,
    isTrending: true,
    isTopRated: false,
    isLatest: true
  }
];

export default function App() {
  // Navigation tabs in preview shell
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'install' | 'monetag' | 'addmovie'>('preview');
  const [copied, setCopied] = useState(false);
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showAdBorders, setShowAdBorders] = useState(false);
  const [themeMode, setThemeMode] = useState<'dark' | 'oled' | 'slate'>('dark');

  // Interactive Live Portal state
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'movie' | 'series'>('all');
  const [genreFilter, setGenreFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'popularity' | 'rating' | 'releaseDate' | 'title'>('popularity');
  
  // Hero slide index
  const [heroIndex, setHeroIndex] = useState(0);
  const featuredMovies = useMemo(() => INITIAL_CATALOG.filter(m => m.isFeatured), []);

  // Modals state
  const [selectedMovie, setSelectedMovie] = useState<MovieItem | null>(null);
  const [activeTrailerId, setActiveTrailerId] = useState<string | null>(null);
  const [activePolicy, setActivePolicy] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // New Movie Generator Form
  const [newMovieTitle, setNewMovieTitle] = useState('');
  const [newMovieType, setNewMovieType] = useState<'movie' | 'series'>('movie');
  const [newMovieYear, setNewMovieYear] = useState('2026');
  const [newMovieRating, setNewMovieRating] = useState('8.5');
  const [newMovieGenres, setNewMovieGenres] = useState('Action, Sci-Fi');
  const [newMovieDirector, setNewMovieDirector] = useState('Christopher Nolan');
  const [newMovieStarring, setNewMovieStarring] = useState('John David Washington, Elizabeth Debicki');
  const [newMovieOverview, setNewMovieOverview] = useState('A mind-bending cinematic discovery journey across secret timelines.');
  const [newMoviePoster, setNewMoviePoster] = useState('https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80');
  const [newMovieBackdrop, setNewMovieBackdrop] = useState('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=85');
  const [newMovieProviders, setNewMovieProviders] = useState('Netflix, Prime Video, Apple TV+');
  const [newMovieTrailer, setNewMovieTrailer] = useState('L61p2uyiMSo');
  const [generatedJson, setGeneratedJson] = useState('');
  const [jsonCopied, setJsonCopied] = useState(false);

  // Rotate Hero
  useEffect(() => {
    if (featuredMovies.length === 0) return;
    const timer = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % featuredMovies.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [featuredMovies]);

  // Copy handler
  const handleCopyCode = () => {
    navigator.clipboard.writeText(BLOGGER_THEME_XML);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Download handler
  const handleDownloadXml = () => {
    const blob = new Blob([BLOGGER_THEME_XML], { type: 'text/xml;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'cinefind-blogger-theme.xml');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Generate movie JSON snippet
  const handleGenerateMovieJson = () => {
    const slug = newMovieTitle.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 20) || 'cf-custom';
    const item = {
      id: `cf-${slug}-${Date.now().toString().slice(-4)}`,
      title: newMovieTitle || "Untitled Feature",
      type: newMovieType,
      year: parseInt(newMovieYear, 10) || 2026,
      releaseDate: `${newMovieYear}-06-01`,
      rating: parseFloat(newMovieRating) || 8.0,
      quality: "4K UHD",
      runtime: newMovieType === 'series' ? "2 Seasons (16 Eps)" : "2h 10m",
      genres: newMovieGenres.split(',').map(s => s.trim()).filter(Boolean),
      overview: newMovieOverview,
      director: newMovieDirector,
      starring: newMovieStarring,
      posterUrl: newMoviePoster,
      backdropUrl: newMovieBackdrop,
      trailerId: newMovieTrailer,
      providers: newMovieProviders.split(',').map(s => s.trim()).filter(Boolean),
      isTrending: true,
      isTopRated: parseFloat(newMovieRating) >= 8.5,
      isLatest: true
    };
    setGeneratedJson(JSON.stringify(item, null, 2) + ',');
  };

  // Filtered list
  const filteredCatalog = useMemo(() => {
    return INITIAL_CATALOG.filter(item => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match = item.title.toLowerCase().includes(q) ||
          item.overview.toLowerCase().includes(q) ||
          item.director.toLowerCase().includes(q) ||
          item.starring.toLowerCase().includes(q) ||
          item.genres.some(g => g.toLowerCase().includes(q));
        if (!match) return false;
      }
      if (typeFilter !== 'all' && item.type !== typeFilter) return false;
      if (genreFilter !== 'all' && !item.genres.includes(genreFilter)) return false;
      if (yearFilter !== 'all') {
        if (yearFilter === 'classic') {
          if (item.year > 2022) return false;
        } else if (item.year !== parseInt(yearFilter, 10)) {
          return false;
        }
      }
      if (ratingFilter !== 'all') {
        if (item.rating < parseFloat(ratingFilter)) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'releaseDate') return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return (b.isTrending ? 2 : 1) * b.rating - (a.isTrending ? 2 : 1) * a.rating;
    });
  }, [searchQuery, typeFilter, genreFilter, yearFilter, ratingFilter, sortBy]);

  const isFiltering = searchQuery !== '' || typeFilter !== 'all' || genreFilter !== 'all' || yearFilter !== 'all' || ratingFilter !== 'all' || sortBy !== 'popularity';

  const currentHero = featuredMovies[heroIndex] || INITIAL_CATALOG[0];

  return (
    <div className="min-h-screen bg-[#07090d] text-slate-100 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      
      {/* TOP STUDIO TOOLBAR */}
      <header className="sticky top-0 z-50 bg-[#0d121c]/95 border-b border-white/10 backdrop-blur-md px-4 py-2.5 flex items-center justify-between gap-3 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-md shadow-red-600/30">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-white">Cine<span className="text-red-500">Find</span></span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/10 text-emerald-400 border border-emerald-500/20">
                  Blogger Theme XML v2.5
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Production-ready template for Google Blogger &amp; Blogspot</p>
            </div>
          </div>
        </div>

        {/* View mode buttons */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10 text-xs">
          <button
            id="tab-preview-btn"
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition ${
              activeTab === 'preview' ? 'bg-red-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live Preview</span>
          </button>
          <button
            id="tab-code-btn"
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition ${
              activeTab === 'code' ? 'bg-red-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Blogger XML Code</span>
          </button>
          <button
            id="tab-install-btn"
            onClick={() => setActiveTab('install')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition hidden md:flex ${
              activeTab === 'install' ? 'bg-red-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Installation Guide</span>
          </button>
          <button
            id="tab-monetag-btn"
            onClick={() => setActiveTab('monetag')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition hidden lg:flex ${
              activeTab === 'monetag' ? 'bg-red-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Monetag Ads</span>
          </button>
          <button
            id="tab-addmovie-btn"
            onClick={() => setActiveTab('addmovie')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition hidden lg:flex ${
              activeTab === 'addmovie' ? 'bg-red-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Movie Tool</span>
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            id="copy-xml-top-btn"
            onClick={handleCopyCode}
            className="flex items-center gap-1.5 bg-red-600 hover:bg-red-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition shadow-md shadow-red-600/20 active:scale-95 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied XML!' : 'Copy Blogger Theme XML'}</span>
          </button>
          <button
            id="download-xml-btn"
            onClick={handleDownloadXml}
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/15 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition border border-white/10 cursor-pointer"
            title="Download .xml file directly"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download .xml</span>
          </button>
        </div>
      </header>

      {/* VIEWPORT CONTROLS (WHEN IN PREVIEW TAB) */}
      {activeTab === 'preview' && (
        <div className="bg-[#111622] border-b border-white/10 px-4 py-2 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">Device Simulator:</span>
            <div className="flex items-center bg-black/30 p-0.5 rounded-lg border border-white/10">
              <button
                onClick={() => setViewportMode('desktop')}
                className={`p-1.5 rounded ${viewportMode === 'desktop' ? 'bg-white/15 text-white' : 'text-slate-400 hover:text-white'}`}
                title="Desktop View (100%)"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewportMode('tablet')}
                className={`p-1.5 rounded ${viewportMode === 'tablet' ? 'bg-white/15 text-white' : 'text-slate-400 hover:text-white'}`}
                title="Tablet View (768px)"
              >
                <Tablet className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewportMode('mobile')}
                className={`p-1.5 rounded ${viewportMode === 'mobile' ? 'bg-white/15 text-white' : 'text-slate-400 hover:text-white'}`}
                title="Mobile View (390px)"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer select-none text-slate-300 hover:text-white">
              <input
                type="checkbox"
                checked={showAdBorders}
                onChange={e => setShowAdBorders(e.target.checked)}
                className="rounded border-slate-600 text-red-600 focus:ring-0 cursor-pointer"
              />
              <span>Highlight Monetag Ad Slots</span>
            </label>

            <div className="hidden sm:flex items-center gap-1.5 text-[11px] bg-white/5 px-2.5 py-1 rounded-md border border-white/10 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Blogger Engine: Passed All Checks</span>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col">
        {/* =========================================================================
            TAB 1: LIVE CINEFIND PORTAL PREVIEW
            ========================================================================= */}
        {activeTab === 'preview' && (
          <div className="flex-1 overflow-auto bg-[#07090d] flex justify-center py-4 px-2">
            <div
              className={`transition-all duration-300 w-full flex flex-col bg-[#0b0e14] text-slate-100 shadow-2xl rounded-2xl overflow-hidden border border-white/10 ${
                viewportMode === 'mobile'
                  ? 'max-w-[420px] min-h-[840px]'
                  : viewportMode === 'tablet'
                  ? 'max-w-[768px] min-h-[900px]'
                  : 'max-w-[1360px]'
              }`}
            >
              {/* CINEFIND SITE HEADER */}
              <nav className="sticky top-0 z-40 bg-[#0b0e14]/90 backdrop-blur-lg border-b border-white/10 px-6 py-4 flex items-center justify-between gap-4">
                <a href="#cinefind-home" className="flex items-center gap-2 text-xl font-black tracking-tight text-white">
                  <Film className="w-6 h-6 text-red-600" />
                  <span>Cine<span className="text-red-600">Find</span></span>
                </a>

                <div className="hidden md:flex items-center gap-1 text-sm font-semibold">
                  <button
                    onClick={() => { setTypeFilter('all'); setSearchQuery(''); }}
                    className={`px-3 py-1.5 rounded-full transition ${typeFilter === 'all' && !searchQuery ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}
                  >
                    Home
                  </button>
                  <button
                    onClick={() => { setTypeFilter('movie'); }}
                    className={`px-3 py-1.5 rounded-full transition ${typeFilter === 'movie' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}
                  >
                    Movies
                  </button>
                  <button
                    onClick={() => { setTypeFilter('series'); }}
                    className={`px-3 py-1.5 rounded-full transition ${typeFilter === 'series' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}
                  >
                    TV Shows
                  </button>
                  <a href="#section-trending-portal" className="px-3 py-1.5 rounded-full text-slate-400 hover:text-white transition">
                    Trending
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const input = document.getElementById('portalSearchInput');
                      if (input) input.focus();
                    }}
                    className="w-10 h-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-white/30 transition"
                    title="Search titles"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden w-10 h-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition"
                  >
                    <Menu className="w-5 h-5" />
                  </button>
                </div>
              </nav>

              {/* MOBILE DRAWER */}
              {mobileMenuOpen && (
                <div className="md:hidden bg-slate-900/95 border-b border-white/10 p-4 flex flex-col gap-2 z-30">
                  <button
                    onClick={() => { setTypeFilter('all'); setMobileMenuOpen(false); }}
                    className="text-left px-3 py-2 rounded-lg bg-white/5 font-semibold"
                  >
                    All Catalog
                  </button>
                  <button
                    onClick={() => { setTypeFilter('movie'); setMobileMenuOpen(false); }}
                    className="text-left px-3 py-2 rounded-lg bg-white/5 font-semibold"
                  >
                    Movies
                  </button>
                  <button
                    onClick={() => { setTypeFilter('series'); setMobileMenuOpen(false); }}
                    className="text-left px-3 py-2 rounded-lg bg-white/5 font-semibold"
                  >
                    TV Shows
                  </button>
                </div>
              )}

              {/* MONETAG AD 1: HEADER BANNER (SIMULATED) */}
              <div className="px-6 pt-4">
                <div className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition ${
                  showAdBorders ? 'bg-amber-950/30 border-amber-500 text-amber-300' : 'bg-slate-900/50 border-dashed border-white/10 text-slate-500'
                }`}>
                  <span className="text-[10px] uppercase font-bold tracking-wider mb-1">
                    {showAdBorders ? 'MONETAG AD SLOT #1: Header Responsive Banner (728x90 / 320x50)' : 'Advertisement'}
                  </span>
                  <div className="text-xs font-mono opacity-80">
                    &lt;!-- MONETAG AD CODE START: Header Banner --&gt;
                  </div>
                </div>
              </div>

              {/* CINEMATIC HERO BANNER */}
              <div className="relative min-h-[460px] md:min-h-[520px] flex items-end overflow-hidden mt-4 bg-black">
                <img
                  src={currentHero.backdropUrl}
                  alt={currentHero.title}
                  className="absolute inset-0 w-full h-full object-cover object-center opacity-45 transition-opacity duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e14] via-[#0b0e14]/70 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0b0e14] via-[#0b0e14]/50 to-transparent"></div>

                <div className="relative z-10 p-6 md:p-12 max-w-3xl">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs font-bold uppercase tracking-wider">
                      {currentHero.quality}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {currentHero.rating.toFixed(1)}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30 text-xs font-bold uppercase">
                      {currentHero.type === 'series' ? 'TV SERIES' : 'MOVIE'}
                    </span>
                    <span className="text-xs text-slate-300 font-semibold">{currentHero.year}</span>
                    <span className="text-xs text-slate-400">• {currentHero.genres.slice(0, 2).join(' / ')}</span>
                  </div>

                  <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-3 tracking-tight">
                    {currentHero.title}
                  </h1>

                  <p className="text-sm md:text-base text-slate-300 line-clamp-3 mb-6 max-w-2xl leading-relaxed">
                    {currentHero.overview}
                  </p>

                  <div className="flex items-center gap-3 flex-wrap">
                    <button
                      onClick={() => setSelectedMovie(currentHero)}
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-red-600/40 transition active:scale-95 cursor-pointer"
                    >
                      <Info className="w-4 h-4" />
                      <span>View Details</span>
                    </button>
                    <button
                      onClick={() => setActiveTrailerId(currentHero.trailerId)}
                      className="flex items-center gap-2 bg-white/15 hover:bg-white/20 text-white font-bold px-5 py-3 rounded-xl backdrop-blur-md border border-white/20 transition active:scale-95 cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>Watch Trailer</span>
                    </button>
                  </div>
                </div>

                {/* Hero Dots */}
                <div className="absolute bottom-4 right-6 flex items-center gap-1.5 z-20">
                  {featuredMovies.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setHeroIndex(idx)}
                      className={`h-1.5 rounded-full transition-all ${
                        idx === heroIndex ? 'w-8 bg-red-600' : 'w-2 bg-white/30 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* SEARCH & FILTER BAR */}
              <div className="p-6">
                <div className="bg-[#121824] p-4 md:p-5 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-4">
                  {/* Search Input */}
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                    <input
                      id="portalSearchInput"
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Search movies, TV shows, actors, directors, genres..."
                      className="w-full bg-[#1a2232] border border-white/10 rounded-xl pl-12 pr-10 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-sm md:text-base transition"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Filter Selectors */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 text-xs">
                    {/* Media Type */}
                    <select
                      value={typeFilter}
                      onChange={e => setTypeFilter(e.target.value as any)}
                      className="bg-[#1a2232] border border-white/10 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-red-500"
                    >
                      <option value="all">All Types (Movies &amp; Shows)</option>
                      <option value="movie">Movies Only</option>
                      <option value="series">TV Shows Only</option>
                    </select>

                    {/* Genre */}
                    <select
                      value={genreFilter}
                      onChange={e => setGenreFilter(e.target.value)}
                      className="bg-[#1a2232] border border-white/10 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-red-500"
                    >
                      <option value="all">All Genres</option>
                      <option value="Action">Action</option>
                      <option value="Sci-Fi">Sci-Fi</option>
                      <option value="Drama">Drama</option>
                      <option value="Thriller">Thriller</option>
                      <option value="Adventure">Adventure</option>
                      <option value="Comedy">Comedy</option>
                      <option value="Animation">Animation</option>
                      <option value="Crime">Crime</option>
                      <option value="Mystery">Mystery</option>
                    </select>

                    {/* Year */}
                    <select
                      value={yearFilter}
                      onChange={e => setYearFilter(e.target.value)}
                      className="bg-[#1a2232] border border-white/10 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-red-500"
                    >
                      <option value="all">All Release Years</option>
                      <option value="2026">2026 (New)</option>
                      <option value="2025">2025</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                      <option value="classic">2022 &amp; Earlier</option>
                    </select>

                    {/* Rating */}
                    <select
                      value={ratingFilter}
                      onChange={e => setRatingFilter(e.target.value)}
                      className="bg-[#1a2232] border border-white/10 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-red-500"
                    >
                      <option value="all">All Ratings</option>
                      <option value="8.5">⭐ 8.5+ Top Tier</option>
                      <option value="8.0">⭐ 8.0+ Great</option>
                      <option value="7.0">⭐ 7.0+ Good</option>
                    </select>

                    {/* Sort */}
                    <select
                      value={sortBy}
                      onChange={e => setSortBy(e.target.value as any)}
                      className="bg-[#1a2232] border border-white/10 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-red-500"
                    >
                      <option value="popularity">Sort: Most Popular</option>
                      <option value="rating">Sort: Highest Rating</option>
                      <option value="releaseDate">Sort: Newest First</option>
                      <option value="title">Sort: Title (A-Z)</option>
                    </select>
                  </div>

                  {/* Reset button if filter active */}
                  {isFiltering && (
                    <div className="flex items-center justify-between pt-1 border-t border-white/5 text-xs">
                      <span className="text-slate-400">
                        Found <strong className="text-white">{filteredCatalog.length}</strong> matching titles
                      </span>
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setTypeFilter('all');
                          setGenreFilter('all');
                          setYearFilter('all');
                          setRatingFilter('all');
                          setSortBy('popularity');
                        }}
                        className="text-red-400 hover:text-red-300 font-semibold flex items-center gap-1"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Reset Filters</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* MOVIE CATALOG / SECTIONS */}
              <div className="px-6 pb-12 flex flex-col gap-10">
                {/* When filtering or searching: Show unified grid */}
                {isFiltering ? (
                  <section>
                    <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                      <h2 className="text-xl font-bold flex items-center gap-2">
                        <Search className="w-5 h-5 text-red-500" />
                        <span>Filter Results</span>
                      </h2>
                      <span className="text-xs text-slate-400">{filteredCatalog.length} titles</span>
                    </div>

                    {filteredCatalog.length === 0 ? (
                      <div className="text-center py-16 bg-[#121824] rounded-2xl border border-white/10 p-6">
                        <Film className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                        <h3 className="text-lg font-bold text-white mb-1">No matching titles found</h3>
                        <p className="text-sm text-slate-400 mb-4">Try relaxing your search terms or clearing genre/rating filters.</p>
                        <button
                          onClick={() => { setSearchQuery(''); setTypeFilter('all'); setGenreFilter('all'); }}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-500 transition"
                        >
                          Clear Filters
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {filteredCatalog.map(movie => (
                          <MovieCard key={movie.id} item={movie} onSelect={() => setSelectedMovie(movie)} />
                        ))}
                      </div>
                    )}
                  </section>
                ) : (
                  <>
                    {/* Trending Today */}
                    <section id="section-trending-portal">
                      <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                        <h2 className="text-xl font-extrabold flex items-center gap-2 text-white">
                          <Flame className="w-5 h-5 text-red-500" />
                          <span>Trending Today</span>
                        </h2>
                        <span className="text-xs font-bold text-slate-400 px-2 py-0.5 rounded bg-white/5">Daily Rank</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {INITIAL_CATALOG.filter(m => m.isTrending).map((movie, idx) => (
                          <MovieCard key={movie.id} item={movie} rank={idx + 1} onSelect={() => setSelectedMovie(movie)} />
                        ))}
                      </div>
                    </section>

                    {/* MONETAG AD 2: BETWEEN SECTIONS */}
                    <div className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center transition ${
                      showAdBorders ? 'bg-amber-950/30 border-amber-500 text-amber-300' : 'bg-slate-900/50 border-dashed border-white/10 text-slate-500'
                    }`}>
                      <span className="text-[10px] uppercase font-bold tracking-wider mb-1">
                        {showAdBorders ? 'MONETAG AD SLOT #2: In-Feed Native / Banner (Between Sections)' : 'Sponsored'}
                      </span>
                      <div className="text-xs font-mono opacity-80">
                        &lt;!-- MONETAG AD CODE START: Between Movie Sections --&gt;
                      </div>
                    </div>

                    {/* Popular Movies */}
                    <section>
                      <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                        <h2 className="text-xl font-extrabold flex items-center gap-2 text-white">
                          <Film className="w-5 h-5 text-red-500" />
                          <span>Popular Movies</span>
                        </h2>
                        <span className="text-xs text-slate-400 font-semibold">In Theaters &amp; Streaming</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {INITIAL_CATALOG.filter(m => m.type === 'movie').map(movie => (
                          <MovieCard key={movie.id} item={movie} onSelect={() => setSelectedMovie(movie)} />
                        ))}
                      </div>
                    </section>

                    {/* Popular TV Shows */}
                    <section>
                      <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                        <h2 className="text-xl font-extrabold flex items-center gap-2 text-white">
                          <Tv className="w-5 h-5 text-purple-400" />
                          <span>Popular TV Series</span>
                        </h2>
                        <span className="text-xs text-slate-400 font-semibold">Binge Worthy</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {INITIAL_CATALOG.filter(m => m.type === 'series').map(movie => (
                          <MovieCard key={movie.id} item={movie} onSelect={() => setSelectedMovie(movie)} />
                        ))}
                      </div>
                    </section>

                    {/* Top Rated */}
                    <section>
                      <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                        <h2 className="text-xl font-extrabold flex items-center gap-2 text-white">
                          <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                          <span>Top Rated Masterpieces</span>
                        </h2>
                        <span className="text-xs text-slate-400 font-semibold">Critical Acclaim</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {INITIAL_CATALOG.filter(m => m.rating >= 8.4).map(movie => (
                          <MovieCard key={movie.id} item={movie} onSelect={() => setSelectedMovie(movie)} />
                        ))}
                      </div>
                    </section>
                  </>
                )}
              </div>

              {/* FOOTER */}
              <footer className="mt-auto bg-[#090c12] border-t border-white/10 p-8 text-xs text-slate-400">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div>
                    <div className="flex items-center gap-2 text-white font-bold text-lg mb-2">
                      <Film className="w-5 h-5 text-red-600" />
                      <span>CineFind</span>
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      Your legal streaming discovery guide for movies, TV series, ratings, trailers, and where to watch online.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-white font-bold uppercase tracking-wider mb-3">Explore</h4>
                    <ul className="space-y-1.5">
                      <li><a href="#section-trending-portal" className="hover:text-white transition">Trending Today</a></li>
                      <li><button onClick={() => setTypeFilter('movie')} className="hover:text-white transition">Movies Catalog</button></li>
                      <li><button onClick={() => setTypeFilter('series')} className="hover:text-white transition">TV Series</button></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-bold uppercase tracking-wider mb-3">Legal</h4>
                    <ul className="space-y-1.5">
                      <li><button onClick={() => setActivePolicy('privacy')} className="hover:text-white transition">Privacy Policy</button></li>
                      <li><button onClick={() => setActivePolicy('terms')} className="hover:text-white transition">Terms of Service</button></li>
                      <li><button onClick={() => setActivePolicy('dmca')} className="hover:text-white transition">DMCA &amp; Copyright</button></li>
                      <li><button onClick={() => setActivePolicy('disclaimer')} className="hover:text-white transition">Disclaimer</button></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-bold uppercase tracking-wider mb-3">About</h4>
                    <ul className="space-y-1.5">
                      <li><button onClick={() => setActivePolicy('about')} className="hover:text-white transition">About CineFind</button></li>
                      <li><button onClick={() => setActivePolicy('contact')} className="hover:text-white transition">Contact Us</button></li>
                      <li><span className="text-slate-500">Google Blogger XML Ready</span></li>
                    </ul>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-500">
                  <p>&copy; 2026 CineFind. All rights reserved. Built for Google Blogger.</p>
                  <p className="text-[11px]">Notice: CineFind does not host or upload video files. All links are for discovery.</p>
                </div>
              </footer>

            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: BLOGGER XML THEME CODE INSPECTOR
            ========================================================================= */}
        {activeTab === 'code' && (
          <div className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full flex flex-col gap-6">
            <div className="bg-[#121824] border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-bold">
                    Blogger XML Template
                  </span>
                  <span className="text-xs text-slate-400">Lines: ~1,120 • Pure HTML5 / CSS3 / Vanilla JS</span>
                </div>
                <h2 className="text-2xl font-black text-white">Complete Blogger Theme Code</h2>
                <p className="text-sm text-slate-400 mt-1">
                  This single file contains the complete XML structure, embedded responsive CSS, vanilla JavaScript, Monetag ad placements, and demo movie catalog.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  id="copy-xml-inspector-btn"
                  onClick={handleCopyCode}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-red-600/30 transition cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Complete XML Code'}</span>
                </button>
                <button
                  onClick={handleDownloadXml}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-4 py-2.5 rounded-xl border border-white/10 transition cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download .xml</span>
                </button>
              </div>
            </div>

            {/* Validation Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="bg-[#121824] border border-white/10 rounded-xl p-3.5 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white">Blogger XML Validated</h4>
                  <p className="text-slate-400">Includes &lt;b:skin&gt;, &lt;b:section&gt; and Blog1 widget.</p>
                </div>
              </div>
              <div className="bg-[#121824] border border-white/10 rounded-xl p-3.5 flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white">CDATA Script Shield</h4>
                  <p className="text-slate-400">All JS safely wrapped in //&lt;![CDATA[ to prevent XML parser errors.</p>
                </div>
              </div>
              <div className="bg-[#121824] border border-white/10 rounded-xl p-3.5 flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white">Monetag Ready</h4>
                  <p className="text-slate-400">5 distinct ad zones pre-mapped with exact insertion markers.</p>
                </div>
              </div>
              <div className="bg-[#121824] border border-white/10 rounded-xl p-3.5 flex items-start gap-3">
                <Film className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white">Client-Side Catalog</h4>
                  <p className="text-slate-400">Zero backend needed; search, filter, and detail modal run anywhere.</p>
                </div>
              </div>
            </div>

            {/* Code Box */}
            <div className="bg-[#090c12] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
              <div className="bg-[#121824] px-4 py-3 border-b border-white/10 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                  </div>
                  <span className="font-mono text-slate-300 ml-2">cinefind-blogger-theme.xml</span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="text-slate-300 hover:text-white flex items-center gap-1 font-semibold"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>

              <pre className="p-4 md:p-6 text-slate-300 text-xs font-mono leading-relaxed overflow-x-auto max-h-[600px] select-all">
                <code>{BLOGGER_THEME_XML}</code>
              </pre>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: BLOGGER INSTALLATION GUIDE
            ========================================================================= */}
        {activeTab === 'install' && (
          <div className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full flex flex-col gap-6">
            <div className="bg-[#121824] border border-white/10 rounded-2xl p-6 shadow-xl">
              <h2 className="text-2xl font-black text-white mb-2">How to Install CineFind on Blogger / Blogspot</h2>
              <p className="text-sm text-slate-400">
                Follow these 5 simple steps to deploy your movie discovery website on Google Blogger in under 2 minutes.
              </p>
            </div>

            <div className="space-y-4">
              {/* Step 1 */}
              <div className="bg-[#121824] border border-white/10 rounded-xl p-5 flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-red-600 text-white font-bold flex items-center justify-center shrink-0">1</div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">Open Blogger &amp; Backup Your Current Theme</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Go to <strong>blogger.com</strong> &rarr; Select your blog &rarr; Click <strong>Theme</strong> in the left sidebar.
                    Click the dropdown arrow next to the orange "CUSTOMIZE" button and click <strong>Backup</strong> &rarr; <strong>Download</strong>. This ensures you can restore your old theme at any time.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-[#121824] border border-white/10 rounded-xl p-5 flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-red-600 text-white font-bold flex items-center justify-center shrink-0">2</div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">Click "Edit HTML"</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    In the same dropdown menu next to "CUSTOMIZE", choose <strong>Edit HTML</strong>. Blogger will open its full-screen code editor showing your current theme code.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-[#121824] border border-white/10 rounded-xl p-5 flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-red-600 text-white font-bold flex items-center justify-center shrink-0">3</div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">Replace with CineFind XML</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">
                    Click anywhere inside the code box in Blogger, press <strong>Ctrl + A</strong> (or <strong>Cmd + A</strong> on Mac) to select all existing code, press <strong>Delete</strong>, and paste the CineFind XML code.
                  </p>
                  <button
                    onClick={handleCopyCode}
                    className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied to Clipboard!' : 'Copy CineFind XML Code Now'}</span>
                  </button>
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-[#121824] border border-white/10 rounded-xl p-5 flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-red-600 text-white font-bold flex items-center justify-center shrink-0">4</div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">Save Theme</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Click the <strong>Save</strong> icon (floppy disk icon in the top right corner of Blogger's editor). Wait until you see "Update success".
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="bg-[#121824] border border-white/10 rounded-xl p-5 flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-red-600 text-white font-bold flex items-center justify-center shrink-0">5</div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">Set Mobile Theme to "Desktop"</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Back on the Theme page, click the dropdown next to "CUSTOMIZE" &rarr; <strong>Mobile settings</strong> &rarr; Choose <strong>Desktop</strong> &rarr; Save. CineFind is 100% responsive and handles mobile devices natively with modern CSS!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 4: MONETAG AD SETUP & ZONES
            ========================================================================= */}
        {activeTab === 'monetag' && (
          <div className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full flex flex-col gap-6">
            <div className="bg-[#121824] border border-white/10 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-amber-400" />
                <h2 className="text-2xl font-black text-white">Monetag Ad Integration Guide</h2>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                CineFind has 5 designated ad placements created specifically for Monetag (formerly PropellerAds).
                Find the comment markers in the XML code and paste your generated ad tags.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Ad Zone 1 */}
              <div className="bg-[#121824] border border-white/10 rounded-xl p-5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                    Placement 1
                  </span>
                  <h3 className="text-base font-bold text-white mt-2 mb-1">Header Banner Ad (728x90 / Responsive)</h3>
                  <p className="text-xs text-slate-400 mb-3">
                    Placed directly below the top navigation bar. High visibility on page load.
                  </p>
                  <pre className="bg-black/50 p-2.5 rounded-lg text-[11px] font-mono text-slate-300 overflow-x-auto border border-white/5">
{`<!-- MONETAG AD CODE START -->
<!-- Paste your 728x90 Banner or In-Page Push code here -->
<!-- MONETAG AD CODE END -->`}
                  </pre>
                </div>
                <p className="text-[11px] text-slate-500 mt-3">ID: <code>#monetag-header-ad</code></p>
              </div>

              {/* Ad Zone 2 */}
              <div className="bg-[#121824] border border-white/10 rounded-xl p-5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                    Placement 2
                  </span>
                  <h3 className="text-base font-bold text-white mt-2 mb-1">In-Feed Native Ad (Between Sections)</h3>
                  <p className="text-xs text-slate-400 mb-3">
                    Placed between "Trending Today" and "Popular Movies". High engagement without disrupting browsing.
                  </p>
                  <pre className="bg-black/50 p-2.5 rounded-lg text-[11px] font-mono text-slate-300 overflow-x-auto border border-white/5">
{`<!-- MONETAG AD CODE START -->
<!-- Paste Native Banner or Multi-Tag here -->
<!-- MONETAG AD CODE END -->`}
                  </pre>
                </div>
                <p className="text-[11px] text-slate-500 mt-3">ID: <code>#monetag-between-sections-ad</code></p>
              </div>

              {/* Ad Zone 3 */}
              <div className="bg-[#121824] border border-white/10 rounded-xl p-5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                    Placement 3
                  </span>
                  <h3 className="text-base font-bold text-white mt-2 mb-1">In-Content Detail Modal Ad</h3>
                  <p className="text-xs text-slate-400 mb-3">
                    Placed inside the movie/show detail modal above recommended similar titles. Very high CPM.
                  </p>
                  <pre className="bg-black/50 p-2.5 rounded-lg text-[11px] font-mono text-slate-300 overflow-x-auto border border-white/5">
{`<!-- MONETAG AD CODE START -->
<!-- Paste your In-Content ad code here -->
<!-- MONETAG AD CODE END -->`}
                  </pre>
                </div>
                <p className="text-[11px] text-slate-500 mt-3">ID: <code>#monetag-incontent-ad</code></p>
              </div>

              {/* Ad Zone 4 */}
              <div className="bg-[#121824] border border-white/10 rounded-xl p-5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                    Placement 4
                  </span>
                  <h3 className="text-base font-bold text-white mt-2 mb-1">Monetag Popunder / OnClick</h3>
                  <p className="text-xs text-slate-400 mb-3">
                    For OnClick (Popunder), paste your Monetag script directly before the closing <code>&lt;/head&gt;</code> or inside <code>&lt;head&gt;</code> in the Blogger Theme editor.
                  </p>
                  <pre className="bg-black/50 p-2.5 rounded-lg text-[11px] font-mono text-slate-300 overflow-x-auto border border-white/5">
{`<script src="https://...monetag...js"></script>`}
                  </pre>
                </div>
                <p className="text-[11px] text-slate-500 mt-3">Location: Inside <code>&lt;head&gt;</code></p>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 5: ADD NEW MOVIE DATA GENERATOR
            ========================================================================= */}
        {activeTab === 'addmovie' && (
          <div className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full flex flex-col gap-6">
            <div className="bg-[#121824] border border-white/10 rounded-2xl p-6 shadow-xl">
              <h2 className="text-2xl font-black text-white mb-2">Movie &amp; TV Show Data Generator</h2>
              <p className="text-sm text-slate-400">
                Use this form to format any movie or TV series into the exact JavaScript format expected by CineFind.
                Once generated, simply copy the JSON and paste it into <code>CINEFIND_DATA</code> in your Blogger Theme code.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Form */}
              <div className="bg-[#121824] border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Title</label>
                  <input
                    type="text"
                    value={newMovieTitle}
                    onChange={e => setNewMovieTitle(e.target.value)}
                    placeholder="e.g. Interstellar Odyssey"
                    className="w-full bg-[#1a2232] border border-white/10 rounded-lg px-3 py-2 text-white text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Type</label>
                    <select
                      value={newMovieType}
                      onChange={e => setNewMovieType(e.target.value as any)}
                      className="w-full bg-[#1a2232] border border-white/10 rounded-lg px-3 py-2 text-white text-xs"
                    >
                      <option value="movie">Movie</option>
                      <option value="series">TV Series</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Release Year</label>
                    <input
                      type="text"
                      value={newMovieYear}
                      onChange={e => setNewMovieYear(e.target.value)}
                      className="w-full bg-[#1a2232] border border-white/10 rounded-lg px-3 py-2 text-white text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Rating (out of 10)</label>
                    <input
                      type="text"
                      value={newMovieRating}
                      onChange={e => setNewMovieRating(e.target.value)}
                      className="w-full bg-[#1a2232] border border-white/10 rounded-lg px-3 py-2 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Genres (comma separated)</label>
                    <input
                      type="text"
                      value={newMovieGenres}
                      onChange={e => setNewMovieGenres(e.target.value)}
                      className="w-full bg-[#1a2232] border border-white/10 rounded-lg px-3 py-2 text-white text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Synopsis / Overview</label>
                  <textarea
                    rows={3}
                    value={newMovieOverview}
                    onChange={e => setNewMovieOverview(e.target.value)}
                    className="w-full bg-[#1a2232] border border-white/10 rounded-lg px-3 py-2 text-white text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Director</label>
                    <input
                      type="text"
                      value={newMovieDirector}
                      onChange={e => setNewMovieDirector(e.target.value)}
                      className="w-full bg-[#1a2232] border border-white/10 rounded-lg px-3 py-2 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">YouTube Trailer ID</label>
                    <input
                      type="text"
                      value={newMovieTrailer}
                      onChange={e => setNewMovieTrailer(e.target.value)}
                      placeholder="e.g. dQw4w9WgXcQ"
                      className="w-full bg-[#1a2232] border border-white/10 rounded-lg px-3 py-2 text-white text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Poster Image URL</label>
                  <input
                    type="text"
                    value={newMoviePoster}
                    onChange={e => setNewMoviePoster(e.target.value)}
                    className="w-full bg-[#1a2232] border border-white/10 rounded-lg px-3 py-2 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Where to Watch Providers</label>
                  <input
                    type="text"
                    value={newMovieProviders}
                    onChange={e => setNewMovieProviders(e.target.value)}
                    className="w-full bg-[#1a2232] border border-white/10 rounded-lg px-3 py-2 text-white text-xs"
                  />
                </div>

                <button
                  onClick={handleGenerateMovieJson}
                  className="bg-red-600 hover:bg-red-500 text-white font-bold py-2.5 rounded-xl transition cursor-pointer text-xs mt-2"
                >
                  Generate Movie JSON
                </button>
              </div>

              {/* Output Preview */}
              <div className="bg-[#090c12] border border-white/10 rounded-2xl p-6 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-white">Generated Code Snippet</h3>
                  {generatedJson && (
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(generatedJson);
                        setJsonCopied(true);
                        setTimeout(() => setJsonCopied(false), 2000);
                      }}
                      className="text-xs text-red-400 hover:text-red-300 font-semibold flex items-center gap-1"
                    >
                      {jsonCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{jsonCopied ? 'Copied!' : 'Copy Snippet'}</span>
                    </button>
                  )}
                </div>

                {generatedJson ? (
                  <pre className="bg-[#121824] p-4 rounded-xl text-xs font-mono text-slate-300 overflow-x-auto flex-1 border border-white/5">
                    <code>{generatedJson}</code>
                  </pre>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-500">
                    <Code2 className="w-10 h-10 mb-2 opacity-50" />
                    <p className="text-xs">Fill the form and click "Generate Movie JSON" to see your formatted movie item here.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* =========================================================================
          INTERACTIVE MOVIE DETAIL MODAL (IN PREVIEW)
          ========================================================================= */}
      {selectedMovie && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-[#121824] border border-white/10 rounded-2xl overflow-hidden shadow-2xl my-auto max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedMovie(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-red-600 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="overflow-y-auto">
              {/* Header Backdrop */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <img
                  src={selectedMovie.backdropUrl || selectedMovie.posterUrl}
                  alt={selectedMovie.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121824] via-[#121824]/60 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 -mt-24 relative z-10 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
                {/* Poster & Actions */}
                <div className="flex flex-col gap-3 max-w-[180px] mx-auto md:max-w-none">
                  <img
                    src={selectedMovie.posterUrl}
                    alt={selectedMovie.title}
                    className="w-full aspect-[2/3] object-cover rounded-xl shadow-2xl border-2 border-white/10"
                  />
                  <button
                    onClick={() => setActiveTrailerId(selectedMovie.trailerId)}
                    className="w-full py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-md shadow-red-600/30 transition cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Watch Trailer</span>
                  </button>
                </div>

                {/* Details */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 flex-wrap text-xs font-bold">
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {selectedMovie.rating.toFixed(1)} / 10
                    </span>
                    <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 border border-sky-500/30 uppercase">
                      {selectedMovie.quality}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30 uppercase">
                      {selectedMovie.type}
                    </span>
                    <span className="text-slate-300">{selectedMovie.year}</span>
                    <span className="text-slate-400">• {selectedMovie.runtime}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-white">{selectedMovie.title}</h2>
                  {selectedMovie.tagline && (
                    <p className="text-xs sm:text-sm text-slate-400 italic -mt-2">"{selectedMovie.tagline}"</p>
                  )}

                  {/* Genres */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {selectedMovie.genres.map(g => (
                      <span key={g} className="px-2.5 py-1 rounded-full bg-[#1a2232] border border-white/10 text-xs text-slate-300 font-semibold">
                        {g}
                      </span>
                    ))}
                  </div>

                  {/* Synopsis */}
                  <div>
                    <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-1">Overview</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">{selectedMovie.overview}</p>
                  </div>

                  {/* Legal Stream Availability */}
                  <div className="bg-[#1a2232] p-3.5 rounded-xl border border-white/10">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Where to Watch (Legal Streaming &amp; Rent)
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {selectedMovie.providers.map(p => (
                        <div key={p} className="px-3 py-1.5 rounded-lg bg-white/10 text-xs font-semibold text-white flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cast & Director */}
                  <div className="grid grid-cols-2 gap-3 text-xs pt-1 border-t border-white/10">
                    <div>
                      <span className="text-slate-400 font-semibold block">Director:</span>
                      <span className="text-white font-bold">{selectedMovie.director}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold block">Cast:</span>
                      <span className="text-white font-bold">{selectedMovie.starring}</span>
                    </div>
                  </div>

                  {/* Monetag In-Content Ad Preview */}
                  <div className={`p-3 rounded-lg border text-center transition mt-2 ${
                    showAdBorders ? 'bg-amber-950/30 border-amber-500 text-amber-300' : 'bg-slate-900/50 border-dashed border-white/10 text-slate-500'
                  }`}>
                    <span className="text-[10px] uppercase font-bold tracking-wider mb-0.5 block">
                      {showAdBorders ? 'MONETAG AD SLOT #3: In-Content Modal Ad' : 'Sponsored Placement'}
                    </span>
                    <span className="text-[11px] font-mono opacity-80">&lt;!-- MONETAG AD CODE START: In-Content Ad --&gt;</span>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TRAILER MODAL
          ========================================================================= */}
      {activeTrailerId && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <button
              onClick={() => setActiveTrailerId(null)}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-red-600 transition"
            >
              <X className="w-4 h-4" />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${activeTrailerId}?autoplay=1&rel=0`}
              title="Movie Trailer"
              className="w-full h-full border-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* =========================================================================
          POLICY / LEGAL MODAL
          ========================================================================= */}
      {activePolicy && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-[#121824] border border-white/10 rounded-2xl p-6 shadow-2xl text-slate-300 text-xs sm:text-sm leading-relaxed max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setActivePolicy(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-red-600 transition"
            >
              <X className="w-4 h-4" />
            </button>
            {activePolicy === 'privacy' && (
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Privacy Policy</h3>
                <p className="mb-3">CineFind respects your privacy. Our discovery portal runs purely in the client browser with zero server databases collecting private personal identifying information.</p>
                <h4 className="font-bold text-white mt-4 mb-1">Cookies &amp; Ad Networks</h4>
                <p>Third-party advertising partners like Monetag may use standard browser cookies and web beacons to display relevant contextual advertisements.</p>
              </div>
            )}
            {activePolicy === 'dmca' && (
              <div>
                <h3 className="text-xl font-bold text-white mb-2">DMCA &amp; Copyright Policy</h3>
                <p className="mb-3"><strong>CineFind does not host, upload, or broadcast video files or illicit media streams.</strong></p>
                <p>All trailers are embedded via YouTube's authorized API. All posters and descriptions are displayed under Fair Use informational guidelines to help users find legal streaming sources.</p>
              </div>
            )}
            {activePolicy === 'terms' && (
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Terms of Service</h3>
                <p className="mb-3">By accessing CineFind, you agree to use the catalog for informational streaming discovery. Commercial automated scraping is strictly prohibited.</p>
              </div>
            )}
            {activePolicy === 'disclaimer' && (
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Legal Disclaimer</h3>
                <p className="mb-3">CineFind is an independent discovery hub. All movie posters, trademarks, and studio logos belong to their respective copyright holders.</p>
              </div>
            )}
            {activePolicy === 'about' && (
              <div>
                <h3 className="text-xl font-bold text-white mb-2">About CineFind</h3>
                <p className="mb-3">CineFind was designed to make finding what to watch effortless, cinematic, and fast on Google Blogger without requiring heavy server infrastructure.</p>
              </div>
            )}
            {activePolicy === 'contact' && (
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Contact CineFind</h3>
                <p className="mb-3">Have feedback or questions? Reach out via contact@cinefind-portal.example.</p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

interface MovieCardProps {
  key?: React.Key;
  item: MovieItem;
  rank?: number;
  onSelect: () => void;
}

// Reusable Movie Card Subcomponent
const MovieCard: React.FC<MovieCardProps> = ({ item, rank, onSelect }) => {
  return (
    <article
      onClick={onSelect}
      className="group relative bg-[#121824] border border-white/10 rounded-xl overflow-hidden hover:border-white/30 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col shadow-lg"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-950">
        <img
          src={item.posterUrl}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e14] via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity"></div>

        {/* Top Badges */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-10">
          <span className="px-2 py-0.5 rounded bg-black/75 backdrop-blur-md text-amber-400 font-bold text-[11px] flex items-center gap-1">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            {item.rating.toFixed(1)}
          </span>
          <span className="px-1.5 py-0.5 rounded bg-sky-500 text-white font-extrabold text-[9px] uppercase tracking-wider">
            {item.quality}
          </span>
        </div>

        {/* Optional Rank Badge for Trending */}
        {rank !== undefined && (
          <div className="absolute top-2 left-2 w-7 h-7 rounded-full bg-red-600 text-white font-black text-xs flex items-center justify-center shadow-lg border border-white/20">
            #{rank}
          </div>
        )}

        {/* Bottom stream badges */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1 z-10 flex-wrap">
          {item.providers.slice(0, 2).map(p => (
            <span key={p} className="px-1.5 py-0.5 rounded bg-white/20 backdrop-blur-md text-white text-[9px] font-bold uppercase">
              {p}
            </span>
          ))}
        </div>
      </div>

      <div className="p-3 flex flex-col flex-1">
        <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-1 group-hover:text-red-400 transition-colors">
          {item.title}
        </h3>
        <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold mt-1">
          <span>{item.year} • {item.type === 'series' ? 'TV' : 'Movie'}</span>
          <span className="text-slate-500">{item.genres[0]}</span>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); onSelect(); }}
          className="mt-2.5 w-full py-1.5 rounded-lg bg-[#1a2232] group-hover:bg-red-600 group-hover:text-white text-slate-300 text-[11px] font-bold transition flex items-center justify-center gap-1"
        >
          <span>View Details</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </article>
  );
}
