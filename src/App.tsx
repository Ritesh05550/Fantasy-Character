import React, { useState, useEffect, useCallback } from 'react';
import {
  Character,
  CharacterClassType,
  CLASS_DEFINITIONS,
  generateRandomCharacter,
} from './data/characterData';
import { getCharacterPortrait } from './data/portraitData';
import { generateUniqueBackstory } from './utils/backstoryGenerator';
import { CharacterCard } from './components/CharacterCard';
import { RosterDrawer } from './components/RosterDrawer';
import { EmberCanvas } from './components/EmberCanvas';
import { playRollSound, playClickSound } from './utils/audio';
import {
  Dices,
  Volume2,
  VolumeX,
  Users,
  Sparkles,
  History,
  RotateCcw,
  Compass,
  Layers,
} from 'lucide-react';

const SAVED_HEROES_KEY = 'my_fantasy_deck';
const POPULAR_CLASSES: (CharacterClassType | 'ALL')[] = [
  'ALL',
  'Warrior',
  'Mage',
  'Rogue',
  'Paladin',
  'Ranger',
  'Cleric',
];

export default function App() {
  const [character, setCharacter] = useState<Character | null>(null);
  const [selectedClassFilter, setSelectedClassFilter] = useState<CharacterClassType | 'ALL'>('ALL');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isGeneratingPortrait, setIsGeneratingPortrait] = useState(false);
  const [isGeneratingBackstory, setIsGeneratingBackstory] = useState(false);
  const [savedCharacters, setSavedCharacters] = useState<Character[]>(() => {
    try {
      const saved = localStorage.getItem(SAVED_HEROES_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [history, setHistory] = useState<Character[]>([]);
  const [isRosterOpen, setIsRosterOpen] = useState(false);
  const [rollCount, setRollCount] = useState(0);

  // Generate initial character on mount with matching class portrait
  useEffect(() => {
    const initialChar = generateRandomCharacter();
    const portrait = getCharacterPortrait(initialChar.classType, Date.now(), initialChar.ancestry, 0);
    initialChar.portrait = {
      url: portrait.url,
      styleName: portrait.styleName,
      variantIndex: 0,
    };
    setCharacter(initialChar);
    setHistory([initialChar]);
    setRollCount(1);
  }, []);

  // Save to localStorage whenever savedCharacters change
  useEffect(() => {
    try {
      localStorage.setItem(SAVED_HEROES_KEY, JSON.stringify(savedCharacters));
    } catch {
      // Ignore storage errors
    }
  }, [savedCharacters]);

  const handleGenerate = useCallback(
    (forcedClass?: CharacterClassType) => {
      const targetClass =
        forcedClass || (selectedClassFilter === 'ALL' ? undefined : selectedClassFilter);
      const newChar = generateRandomCharacter(targetClass);

      // Generate matching cartoon / video-game portrait for the rolled class
      const portrait = getCharacterPortrait(newChar.classType, Date.now(), newChar.ancestry, 0);
      newChar.portrait = {
        url: portrait.url,
        styleName: portrait.styleName,
        variantIndex: 0,
      };

      playRollSound(soundEnabled);
      setCharacter(newChar);
      setRollCount((prev) => prev + 1);

      setHistory((prev) => {
        // Keep last 8 generated characters
        const updated = [newChar, ...prev.filter((c) => c.id !== newChar.id)].slice(0, 8);
        return updated;
      });
    },
    [selectedClassFilter, soundEnabled]
  );

  // Handle explicit "Generate Portrait" button click
  const handleGeneratePortrait = useCallback(() => {
    if (!character) return;
    setIsGeneratingPortrait(true);
    playClickSound(soundEnabled);

    setTimeout(() => {
      const portrait = getCharacterPortrait(character.classType, Date.now(), character.ancestry, 0);
      const updatedChar: Character = {
        ...character,
        portrait: {
          url: portrait.url,
          styleName: portrait.styleName,
          variantIndex: 0,
        },
      };

      setCharacter(updatedChar);
      setHistory((prev) =>
        prev.map((c) => (c.id === updatedChar.id ? updatedChar : c))
      );
      setSavedCharacters((prev) =>
        prev.map((c) => (c.id === updatedChar.id ? updatedChar : c))
      );
      setIsGeneratingPortrait(false);
    }, 200);
  }, [character, soundEnabled]);

  // Handle explicit "Regenerate Portrait" button click
  const handleRegeneratePortrait = useCallback(() => {
    if (!character) return;
    setIsGeneratingPortrait(true);
    playRollSound(soundEnabled);

    setTimeout(() => {
      const currentVariant = character.portrait?.variantIndex ?? 0;
      const nextVariant = currentVariant + 1;
      const portrait = getCharacterPortrait(
        character.classType,
        Date.now() + nextVariant * 17,
        character.ancestry,
        nextVariant
      );

      const updatedChar: Character = {
        ...character,
        portrait: {
          url: portrait.url,
          styleName: portrait.styleName,
          variantIndex: nextVariant,
        },
      };

      setCharacter(updatedChar);
      setHistory((prev) =>
        prev.map((c) => (c.id === updatedChar.id ? updatedChar : c))
      );
      setSavedCharacters((prev) =>
        prev.map((c) => (c.id === updatedChar.id ? updatedChar : c))
      );
      setIsGeneratingPortrait(false);
    }, 220);
  }, [character, soundEnabled]);

  // Handle explicit "Generate Backstory" button click
  const handleGenerateBackstory = useCallback(() => {
    if (!character) return;
    setIsGeneratingBackstory(true);
    playClickSound(soundEnabled);

    setTimeout(() => {
      const newBackstory = generateUniqueBackstory(character);
      const updatedChar: Character = {
        ...character,
        backstory: newBackstory,
      };

      setCharacter(updatedChar);
      setHistory((prev) =>
        prev.map((c) => (c.id === updatedChar.id ? updatedChar : c))
      );
      setSavedCharacters((prev) =>
        prev.map((c) => (c.id === updatedChar.id ? updatedChar : c))
      );
      setIsGeneratingBackstory(false);
    }, 180);
  }, [character, soundEnabled]);

  // Keyboard shortcut: Spacebar to generate character
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid triggering when user is in input or textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA' ||
        document.activeElement?.tagName === 'SELECT'
      ) {
        return;
      }
      if (e.code === 'Space') {
        e.preventDefault();
        handleGenerate();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleGenerate]);

  const toggleSaveCharacter = (char: Character) => {
    playClickSound(soundEnabled);
    setSavedCharacters((prev) => {
      const exists = prev.some((c) => c.id === char.id);
      if (exists) {
        return prev.filter((c) => c.id !== char.id);
      } else {
        return [char, ...prev];
      }
    });
  };

  const isCurrentCharacterSaved = character
    ? savedCharacters.some((c) => c.id === character.id)
    : false;

  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-100 relative flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      {/* Ancient Alchemist's Workbench Background Texture */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src="/src/assets/images/alchemist_workbench_bg_1792578908428.jpg"
          alt="Ancient alchemist's workbench with dark wood, transmutation runes, and potion vials"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-30 filter brightness-90 contrast-110 scale-105"
        />
        {/* Subtle dark vignette scrim for maximum text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c10]/85 via-[#0a0c10]/75 to-[#0a0c10]/95" />
        <div className="absolute inset-0 alchemist-grain opacity-40 pointer-events-none" />
      </div>

      {/* Floating Ember Particles Canvas */}
      <EmberCanvas />

      {/* Top Bar Contract: 1-line wordmark, single-line links, 1 primary action */}
      <header className="relative z-10 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          
          {/* Zone 1: Wordmark */}
          <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Compass className="w-4 h-4" />
            </div>
            <span className="font-cinzel text-lg sm:text-xl font-bold tracking-tight text-white">
              Mythic Forge
            </span>
          </div>

          {/* Zone 2: Navigation & Quick Info */}
          <div className="hidden md:flex items-center gap-6 text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-1.5">
              <span>Press</span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200 font-mono text-[10px]">
                Space
              </kbd>
              <span>to generate</span>
            </div>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span>
              Generated:{' '}
              <span className="font-mono tabular-nums text-slate-200 font-semibold">
                {rollCount}
              </span>
            </span>
          </div>

          {/* Zone 3: Roster and Audio Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                playClickSound(!soundEnabled);
                setSoundEnabled(!soundEnabled);
              }}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 transition-colors cursor-pointer"
              title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
              aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-amber-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-500" />
              )}
            </button>

            <button
              onClick={() => {
                playClickSound(soundEnabled);
                setIsRosterOpen(true);
              }}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-amber-500/40 transition-colors cursor-pointer whitespace-nowrap shadow-sm"
              title="Open My Deck collection"
            >
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>My Deck</span>
              {savedCharacters.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold">
                  {savedCharacters.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main App Content Area */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex flex-col gap-8">
        
        {/* Generator Controls Section */}
        <section className="flex flex-col items-center justify-center text-center gap-4">
          <div className="space-y-1 max-w-xl">
            <h2 className="font-cinzel text-xl sm:text-2xl font-bold tracking-tight text-white text-balance">
              Fantasy Player Card Forge
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Forge bordered player cards with random Health, Mana, and Strength. Save champions to &apos;My Deck&apos;.
            </p>
          </div>

          {/* Primary Action Button (Prominent, High-Intent) */}
          <div className="mt-1 flex flex-col items-center gap-3">
            <button
              onClick={() => handleGenerate()}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-cinzel text-base sm:text-lg font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:shadow-[0_0_35px_rgba(245,158,11,0.55)] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <Dices className="w-6 h-6 transition-transform group-hover:rotate-45" />
              <span>Generate Character</span>
              <Sparkles className="w-4 h-4 text-amber-900" />
            </button>

            <span className="text-[11px] text-slate-500 font-mono">
              Click the button or press [Spacebar]
            </span>
          </div>

          {/* Class Filter Segmented Controls */}
          <div className="w-full max-w-2xl mt-2 flex flex-col items-center gap-2">
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <span>Filter by Class:</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-xl bg-slate-900/80 border border-slate-800">
              {POPULAR_CLASSES.map((cls) => {
                const isActive = selectedClassFilter === cls;
                return (
                  <button
                    key={cls}
                    onClick={() => {
                      playClickSound(soundEnabled);
                      setSelectedClassFilter(cls);
                    }}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                    }`}
                  >
                    {cls === 'ALL' ? 'All Classes (Fate)' : cls}
                  </button>
                );
              })}

              {/* Extended Class Dropdown */}
              <div className="relative inline-block">
                <select
                  value={
                    POPULAR_CLASSES.includes(selectedClassFilter) ? '' : selectedClassFilter
                  }
                  onChange={(e) => {
                    if (e.target.value) {
                      playClickSound(soundEnabled);
                      setSelectedClassFilter(e.target.value as CharacterClassType);
                    }
                  }}
                  className="px-2.5 py-1.5 text-xs font-medium rounded-lg bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700/80 cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option value="" disabled>
                    More Classes...
                  </option>
                  {(Object.keys(CLASS_DEFINITIONS) as CharacterClassType[])
                    .filter((c) => !POPULAR_CLASSES.includes(c))
                    .map((extraCls) => (
                      <option key={extraCls} value={extraCls} className="bg-slate-900 text-slate-200">
                        {extraCls}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Character Sheet Hero Display */}
        {character && (
          <section className="w-full">
            <CharacterCard
              character={character}
              isSaved={isCurrentCharacterSaved}
              onToggleSave={toggleSaveCharacter}
              onReroll={() => handleGenerate()}
              onGeneratePortrait={handleGeneratePortrait}
              onRegeneratePortrait={handleRegeneratePortrait}
              isGeneratingPortrait={isGeneratingPortrait}
              onGenerateBackstory={handleGenerateBackstory}
              isGeneratingBackstory={isGeneratingBackstory}
            />
          </section>
        )}

        {/* Recent Rolls History Bar */}
        {history.length > 1 && (
          <section className="w-full max-w-4xl mx-auto pt-4 border-t border-slate-800/80">
            <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 font-medium">
                <History className="w-3.5 h-3.5 text-slate-500" />
                <span>Recent Generations:</span>
              </div>
              <button
                onClick={() => setHistory(character ? [character] : [])}
                className="text-[11px] text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
              >
                Clear History
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {history.map((histChar) => {
                const isSelected = character?.id === histChar.id;
                return (
                  <button
                    key={histChar.id}
                    onClick={() => {
                      playClickSound(soundEnabled);
                      setCharacter(histChar);
                    }}
                    className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer truncate ${
                      isSelected
                        ? 'bg-amber-950/30 border-amber-500/60 shadow-sm'
                        : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="text-xs font-semibold text-slate-200 truncate">
                      {histChar.name}
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1.5 truncate mt-0.5">
                      <span className="text-amber-400 font-medium">
                        {histChar.classType}
                      </span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span className="truncate">{histChar.subclass}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}
      </main>

      {/* Roster Drawer Modal */}
      <RosterDrawer
        isOpen={isRosterOpen}
        onClose={() => setIsRosterOpen(false)}
        savedCharacters={savedCharacters}
        onSelectCharacter={(char) => setCharacter(char)}
        onRemoveCharacter={(id) => {
          playClickSound(soundEnabled);
          setSavedCharacters((prev) => prev.filter((c) => c.id !== id));
        }}
        onClearAll={() => {
          playClickSound(soundEnabled);
          setSavedCharacters([]);
        }}
      />

      {/* Clean Footer */}
      <footer className="relative z-10 border-t border-slate-800/80 bg-slate-950/80 py-4 text-center text-xs text-slate-500">
        <p>Mythic Forge · Interactive Random Fantasy Character Generator</p>
      </footer>
    </div>
  );
}
