import React from 'react';
import { Character } from '../data/characterData';
import { ClassEmblem } from './ClassEmblem';
import { Trash2, Users, Download, X } from 'lucide-react';

interface RosterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedCharacters: Character[];
  onSelectCharacter: (char: Character) => void;
  onRemoveCharacter: (id: string) => void;
  onClearAll: () => void;
}

export const RosterDrawer: React.FC<RosterDrawerProps> = ({
  isOpen,
  onClose,
  savedCharacters,
  onSelectCharacter,
  onRemoveCharacter,
  onClearAll,
}) => {
  if (!isOpen) return null;

  const handleExportJSON = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(savedCharacters, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `mythic_party_roster_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-400" />
            <h2 className="font-cinzel font-bold text-lg text-white">
              My Deck
            </h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 font-bold border border-amber-500/20">
              {savedCharacters.length} Cards
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Characters List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {savedCharacters.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <Users className="w-10 h-10 text-slate-600 mb-3" />
              <p className="text-sm font-medium text-slate-300">Your Deck is Empty</p>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">
                Click &quot;Save to Deck&quot; on any player card to add it to your &apos;My Deck&apos; collection.
              </p>
            </div>
          ) : (
            savedCharacters.map((char) => (
              <div
                key={char.id}
                onClick={() => {
                  onSelectCharacter(char);
                  onClose();
                }}
                className="p-3.5 rounded-xl bg-slate-950/80 border border-amber-500/30 hover:border-amber-500/70 shadow-md transition-all flex flex-col gap-2.5 cursor-pointer group"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {char.portrait?.url ? (
                      <img
                        src={char.portrait.url}
                        alt={char.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-lg object-cover border border-amber-500/50 shrink-0"
                      />
                    ) : (
                      <ClassEmblem classType={char.classType} size="sm" />
                    )}
                    <div className="truncate">
                      <div className="text-sm font-bold text-slate-100 group-hover:text-amber-300 transition-colors truncate font-cinzel">
                        {char.name}
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-1.5 truncate">
                        <span className="text-amber-400 font-semibold">{char.classType}</span>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span className="truncate">{char.subclass}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveCharacter(char.id);
                    }}
                    className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
                    title="Remove card from deck"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Card Stats Strip: Health, Mana, Strength */}
                <div className="grid grid-cols-3 gap-1.5 pt-1 border-t border-slate-800/80 text-[11px] font-mono">
                  <div className="flex items-center justify-center gap-1 px-1.5 py-0.5 rounded bg-rose-950/40 border border-rose-900/40 text-rose-300">
                    <span className="text-[9px] text-rose-400">HP</span>
                    <span className="font-bold tabular-nums">{char.health ?? char.hitPoints}</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 px-1.5 py-0.5 rounded bg-sky-950/40 border border-sky-900/40 text-sky-300">
                    <span className="text-[9px] text-sky-400">MP</span>
                    <span className="font-bold tabular-nums">{char.mana ?? 75}</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 px-1.5 py-0.5 rounded bg-amber-950/40 border border-amber-900/40 text-amber-300">
                    <span className="text-[9px] text-amber-400">STR</span>
                    <span className="font-bold tabular-nums">{char.strength ?? 60}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer Actions */}
        {savedCharacters.length > 0 && (
          <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between gap-3">
            <button
              onClick={handleExportJSON}
              className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-400" />
              <span>Export Roster</span>
            </button>

            <button
              onClick={onClearAll}
              className="px-3 py-2 text-xs font-medium rounded-lg text-rose-400 hover:bg-rose-950/30 transition-colors cursor-pointer"
            >
              Clear Roster
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
