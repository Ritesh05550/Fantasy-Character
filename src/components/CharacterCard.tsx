import React, { useState } from 'react';
import {
  Character,
  CLASS_DEFINITIONS,
} from '../data/characterData';
import { ClassEmblem } from './ClassEmblem';
import {
  Shield,
  Heart,
  Sparkles,
  Sword,
  BookOpen,
  Copy,
  Check,
  BookmarkPlus,
  BookmarkCheck,
  Quote,
  Feather,
  Wand2,
  Zap,
  Flame,
  Layers,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CharacterPortrait } from './CharacterPortrait';

interface CharacterCardProps {
  character: Character;
  isSaved: boolean;
  onToggleSave: (character: Character) => void;
  onReroll: () => void;
  onGeneratePortrait: () => void;
  onRegeneratePortrait: () => void;
  isGeneratingPortrait?: boolean;
  onGenerateBackstory: () => void;
  isGeneratingBackstory?: boolean;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  isSaved,
  onToggleSave,
  onReroll,
  onGeneratePortrait,
  onRegeneratePortrait,
  isGeneratingPortrait = false,
  onGenerateBackstory,
  isGeneratingBackstory = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [nameFont, setNameFont] = useState<'cinzel-decorative' | 'uncial'>('cinzel-decorative');
  const classDef = CLASS_DEFINITIONS[character.classType];

  // Primary Player Card Stats: Health, Mana, Strength
  const healthVal = character.health ?? (character.hitPoints * 8);
  const manaVal = character.mana ?? 75;
  const strengthVal = character.strength ?? (character.stats.str * 4);

  const handleCopy = () => {
    const text = `
🃏 [PLAYER CARD] ${character.name.toUpperCase()} - ${character.title}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Class: ${character.classType} (${character.subclass})
Ancestry: ${character.ancestry} · Alignment: ${character.alignment} · Level: ${character.level}

CARD STATS:
❤️ HEALTH: ${healthVal} HP
🔮 MANA: ${manaVal} MP
⚔️ STRENGTH: ${strengthVal} STR

Attributes:
• STR: ${character.stats.str} | DEX: ${character.stats.dex} | CON: ${character.stats.con}
• INT: ${character.stats.int} | WIS: ${character.stats.wis} | CHA: ${character.stats.cha}

Starting Gear:
• Weapon: ${character.signatureWeapon}
• Armor: ${character.armor}
• Relic: ${character.relic}

Origin Chronicle:
${character.backstory}

${character.quote}
`.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={character.id}
        initial={{ opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 0.97 }}
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl mx-auto"
      >
        {/* =========================================================
            BORDERED PLAYER CARD CONTAINER
            Layered metallic gold / rune bevel border frame
            ========================================================= */}
        <div className="relative rounded-3xl p-3 sm:p-4 bg-gradient-to-b from-amber-500/70 via-amber-800/40 to-amber-950/80 shadow-[0_0_40px_rgba(245,158,11,0.3)] magical-glow-border">
          
          {/* Outer Filigree Card Texture */}
          <div className="relative rounded-2xl bg-[#090b10] border-2 border-amber-500/50 p-4 sm:p-6 shadow-2xl overflow-hidden">
            
            {/* Card Background Shimmer */}
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-black/60 pointer-events-none" />

            {/* Ancient Brass Corner Brackets */}
            <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-amber-400 pointer-events-none" />
            <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-amber-400 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-amber-400 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-amber-400 pointer-events-none" />

            {/* ---------------------------------------------------------
                1. CARD TOP BANNER (Header & Name)
                --------------------------------------------------------- */}
            <div className="relative z-10 border-b border-amber-500/30 pb-3 mb-4">
              
              {/* Top Sub-Row: Class Emblem & Level / Font Selector */}
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <ClassEmblem classType={character.classType} size="sm" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-600/40">
                    {character.classType}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Font Toggle */}
                  <div className="flex items-center gap-1 text-[10px] font-mono bg-slate-900/90 px-1.5 py-0.5 rounded border border-slate-700/80">
                    <span className="text-slate-500">Font:</span>
                    <button
                      type="button"
                      onClick={() => setNameFont('cinzel-decorative')}
                      className={`px-1 py-0.2 rounded cursor-pointer ${
                        nameFont === 'cinzel-decorative'
                          ? 'text-amber-300 font-bold bg-amber-500/20'
                          : 'text-slate-400'
                      }`}
                    >
                      Cinzel
                    </button>
                    <button
                      type="button"
                      onClick={() => setNameFont('uncial')}
                      className={`px-1 py-0.2 rounded cursor-pointer ${
                        nameFont === 'uncial'
                          ? 'text-amber-300 font-bold bg-amber-500/20'
                          : 'text-slate-400'
                      }`}
                    >
                      Uncial
                    </button>
                  </div>

                  {/* Player Card Level Gem */}
                  <div className="px-2 py-0.5 rounded bg-slate-900 border border-amber-500/40 font-mono text-xs font-bold text-amber-300 shadow">
                    LVL {character.level}
                  </div>
                </div>
              </div>

              {/* Character Name in Chosen Fantasy Font */}
              <div className="text-center sm:text-left">
                <div className="text-[11px] uppercase tracking-widest text-amber-400/80 font-medium mb-0.5">
                  {character.title} · <span className="normal-case text-slate-400">{character.ancestry}</span>
                </div>
                <h1
                  className={`${
                    nameFont === 'cinzel-decorative'
                      ? 'font-cinzel-decorative'
                      : 'font-uncial'
                  } text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-400 leading-tight drop-shadow-[0_2px_12px_rgba(245,158,11,0.35)]`}
                >
                  {character.name}
                </h1>
              </div>
            </div>

            {/* ---------------------------------------------------------
                2. CARD PORTRAIT ARTWORK WINDOW
                --------------------------------------------------------- */}
            <div className="relative z-10 flex flex-col items-center justify-center mb-4">
              <div className="w-full flex justify-center">
                <CharacterPortrait
                  character={character}
                  onGenerate={onGeneratePortrait}
                  onRegenerate={onRegeneratePortrait}
                  isGenerating={isGeneratingPortrait}
                />
              </div>
            </div>

            {/* ---------------------------------------------------------
                3. CARD TYPE RIBBON BAR
                --------------------------------------------------------- */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-amber-500/30 text-xs mb-4 shadow-inner">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Class:</span>
                <span className="font-bold text-amber-300 font-mono">{character.classType}</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-slate-300 font-medium">{character.subclass}</span>
              </div>
              <div className="text-slate-400 text-[11px] font-mono">
                {character.alignment}
              </div>
            </div>

            {/* ---------------------------------------------------------
                4. CORE STATS TRIAD: Health, Mana, and Strength
                --------------------------------------------------------- */}
            <div className="relative z-10 mb-4 p-3 rounded-xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-amber-500/40 shadow-md">
              <div className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-semibold mb-2 flex items-center justify-between">
                <span>Player Card Stats</span>
                <span className="text-slate-500">Combat Power</span>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {/* 1. HEALTH STAT */}
                <div className="flex flex-col gap-1 p-2 rounded-lg bg-red-950/40 border border-red-800/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-rose-400">
                      <Heart className="w-4 h-4 fill-rose-500/30" />
                      <span className="text-xs font-bold font-mono tracking-wider">Health</span>
                    </div>
                    <span className="font-mono font-bold text-sm text-white tabular-nums">
                      {healthVal}
                    </span>
                  </div>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-rose-600 to-red-400 rounded-full"
                      style={{ width: `${Math.min(100, Math.max(20, (healthVal / 160) * 100))}%` }}
                    />
                  </div>
                </div>

                {/* 2. MANA STAT */}
                <div className="flex flex-col gap-1 p-2 rounded-lg bg-sky-950/40 border border-sky-800/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-sky-400">
                      <Sparkles className="w-4 h-4 fill-sky-500/30" />
                      <span className="text-xs font-bold font-mono tracking-wider">Mana</span>
                    </div>
                    <span className="font-mono font-bold text-sm text-white tabular-nums">
                      {manaVal}
                    </span>
                  </div>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-sky-600 to-cyan-400 rounded-full"
                      style={{ width: `${Math.min(100, Math.max(20, (manaVal / 160) * 100))}%` }}
                    />
                  </div>
                </div>

                {/* 3. STRENGTH STAT */}
                <div className="flex flex-col gap-1 p-2 rounded-lg bg-amber-950/40 border border-amber-800/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-amber-400">
                      <Sword className="w-4 h-4" />
                      <span className="text-xs font-bold font-mono tracking-wider">Strength</span>
                    </div>
                    <span className="font-mono font-bold text-sm text-white tabular-nums">
                      {strengthVal}
                    </span>
                  </div>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-600 to-yellow-400 rounded-full"
                      style={{ width: `${Math.min(100, Math.max(20, (strengthVal / 120) * 100))}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ---------------------------------------------------------
                5. CARD TEXT BOX: Chronicle & Origin
                --------------------------------------------------------- */}
            <div className="relative z-10 p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 shadow-inner mb-4">
              <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-800/80">
                <div className="flex items-center gap-1.5">
                  <Feather className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300">
                    Chronicle & Origin
                  </span>
                </div>

                {/* Generate Backstory Button */}
                <button
                  type="button"
                  onClick={onGenerateBackstory}
                  disabled={isGeneratingBackstory}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 active:scale-95 transition-all cursor-pointer shadow-xs disabled:opacity-50 whitespace-nowrap"
                  title="Generate a unique 1-to-2-sentence origin story for this character"
                >
                  <BookOpen className={`w-3.5 h-3.5 text-amber-400 ${isGeneratingBackstory ? 'animate-pulse' : ''}`} />
                  <span>Generate Backstory</span>
                </button>
              </div>

              {/* Backstory Paragraph */}
              <p className={`text-xs sm:text-sm text-slate-300 leading-relaxed transition-opacity ${
                isGeneratingBackstory ? 'opacity-50' : 'opacity-100'
              }`}>
                {character.backstory}
              </p>

              {/* Equipment Inlay */}
              <div className="mt-3 pt-2.5 border-t border-slate-900 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="text-amber-500 font-mono font-bold">Weapon:</span>
                  <span className="text-slate-200 truncate">{character.signatureWeapon}</span>
                </div>
                <div className="flex items-center gap-1.5 truncate">
                  <span className="text-cyan-500 font-mono font-bold">Relic:</span>
                  <span className="text-slate-200 truncate">{character.relic}</span>
                </div>
              </div>
            </div>

            {/* ---------------------------------------------------------
                6. CARD FOOTER: "Save to Deck" & Actions
                --------------------------------------------------------- */}
            <div className="relative z-10 pt-2 border-t border-amber-500/30 flex flex-wrap items-center justify-between gap-3">
              
              {/* Primary "Save to Deck" Button */}
              <button
                onClick={() => onToggleSave(character)}
                className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer shadow-md active:scale-95 ${
                  isSaved
                    ? 'bg-amber-500/25 text-amber-300 border-amber-500 hover:bg-amber-500/35 shadow-amber-500/20'
                    : 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-bold border-amber-400 hover:brightness-110 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                }`}
              >
                {isSaved ? (
                  <>
                    <BookmarkCheck className="w-4 h-4 text-amber-400" />
                    <span>Saved to Deck</span>
                  </>
                ) : (
                  <>
                    <Layers className="w-4 h-4 text-slate-950" />
                    <span>Save to Deck</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2">
                {/* Copy Sheet */}
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/80 transition-colors cursor-pointer"
                  title="Copy player card details"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy Card</span>
                    </>
                  )}
                </button>

                {/* Reroll Card */}
                <button
                  onClick={onReroll}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
                  title="Generate a new random character"
                >
                  <Wand2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Reroll</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
