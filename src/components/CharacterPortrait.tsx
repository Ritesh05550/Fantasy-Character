import React, { useState } from 'react';
import { Character, CLASS_DEFINITIONS } from '../data/characterData';
import { Sparkles, RefreshCw, Image as ImageIcon, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CharacterPortraitProps {
  character: Character;
  onGenerate: () => void;
  onRegenerate: () => void;
  isGenerating?: boolean;
}

export const CharacterPortrait: React.FC<CharacterPortraitProps> = ({
  character,
  onGenerate,
  onRegenerate,
  isGenerating = false,
}) => {
  const [imageError, setImageError] = useState(false);
  const classDef = CLASS_DEFINITIONS[character.classType];
  const hasPortrait = Boolean(character.portrait?.url);

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Portrait Viewport Frame */}
      <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden bg-slate-950 border-2 border-slate-700/80 shadow-xl group">
        {/* Class Theme Tinted Rim Glow */}
        <div
          className={`absolute inset-0 pointer-events-none rounded-2xl transition-all duration-300 ${
            hasPortrait
              ? 'ring-2 ring-amber-500/30 shadow-[inset_0_0_20px_rgba(245,158,11,0.2)]'
              : ''
          }`}
        />

        {/* The Portrait Image or Placeholder */}
        <AnimatePresence mode="wait">
          {hasPortrait && !imageError ? (
            <motion.div
              key={`${character.id}_${character.portrait?.variantIndex || 0}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full relative"
            >
              <img
                src={character.portrait!.url}
                alt={`${character.name} - ${character.classType} Portrait`}
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover object-center select-none"
              />

              {/* Class Watermark Overlay on Bottom */}
              <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-between text-[11px] text-slate-300 font-mono">
                <span className="font-semibold text-amber-300">
                  {character.classType}
                </span>
                <span className="text-[10px] text-slate-400 truncate max-w-[110px]">
                  {character.portrait?.styleName || 'Game Art'}
                </span>
              </div>
            </motion.div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-b from-slate-900 to-slate-950">
              <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400 mb-2">
                <ImageIcon className="w-6 h-6 text-slate-500" />
              </div>
              <p className="text-xs font-semibold text-slate-200">
                {character.classType} Portrait Slot
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                Cartoon & Video-Game Style
              </p>
            </div>
          )}
        </AnimatePresence>

        {/* Loading Overlay during generation */}
        {isGenerating && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex flex-col items-center justify-center gap-2 z-20">
            <RefreshCw className="w-8 h-8 text-amber-400 animate-spin" />
            <span className="text-xs font-mono text-amber-300 tracking-wider">
              Forging Portrait...
            </span>
          </div>
        )}

        {/* Corner Runic Accents */}
        <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t-2 border-l-2 border-amber-500/60 pointer-events-none" />
        <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t-2 border-r-2 border-amber-500/60 pointer-events-none" />
        <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b-2 border-l-2 border-amber-500/60 pointer-events-none" />
        <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b-2 border-r-2 border-amber-500/60 pointer-events-none" />
      </div>

      {/* Required Buttons: "Generate Portrait" and "Regenerate Portrait" */}
      <div className="flex flex-col sm:flex-row items-center gap-2 w-full max-w-xs">
        {/* Button 1: "Generate Portrait" */}
        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className="w-full flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-[0.98] transition-all shadow-md hover:shadow-amber-500/20 disabled:opacity-50 cursor-pointer whitespace-nowrap"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-950" />
          <span>Generate Portrait</span>
        </button>

        {/* Button 2: "Regenerate Portrait" */}
        <button
          onClick={onRegenerate}
          disabled={isGenerating}
          className="w-full flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer whitespace-nowrap"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-slate-400 ${isGenerating ? 'animate-spin' : ''}`} />
          <span>Regenerate Portrait</span>
        </button>
      </div>
    </div>
  );
};
