import React from 'react';
import {
  Sword,
  Wand2,
  Eye,
  Shield,
  Crosshair,
  Sparkles,
  Music,
  Trees,
  Skull,
  Flame,
  Zap,
  FlaskConical,
} from 'lucide-react';
import { CharacterClassType } from '../data/characterData';

interface ClassEmblemProps {
  classType: CharacterClassType;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showLabel?: boolean;
}

export const ClassEmblem: React.FC<ClassEmblemProps> = ({
  classType,
  size = 'md',
  showLabel = false,
}) => {
  const getIcon = () => {
    switch (classType) {
      case 'Warrior':
        return <Sword className="w-full h-full text-amber-300" />;
      case 'Mage':
        return <Wand2 className="w-full h-full text-cyan-300" />;
      case 'Rogue':
        return <Eye className="w-full h-full text-emerald-300" />;
      case 'Paladin':
        return <Shield className="w-full h-full text-yellow-300" />;
      case 'Ranger':
        return <Crosshair className="w-full h-full text-green-300" />;
      case 'Cleric':
        return <Sparkles className="w-full h-full text-sky-300" />;
      case 'Bard':
        return <Music className="w-full h-full text-fuchsia-300" />;
      case 'Druid':
        return <Trees className="w-full h-full text-emerald-400" />;
      case 'Necromancer':
        return <Skull className="w-full h-full text-purple-300" />;
      case 'Monk':
        return <Flame className="w-full h-full text-orange-300" />;
      case 'Warlock':
        return <Zap className="w-full h-full text-violet-300" />;
      case 'Alchemist':
        return <FlaskConical className="w-full h-full text-lime-300" />;
      default:
        return <Sword className="w-full h-full text-slate-300" />;
    }
  };

  const sizeClasses = {
    sm: 'w-7 h-7 p-1.5',
    md: 'w-10 h-10 p-2',
    lg: 'w-14 h-14 p-3',
    xl: 'w-20 h-20 p-4',
  }[size];

  const bgClasses = {
    Warrior: 'bg-amber-950/80 border-amber-500/40 shadow-amber-900/40',
    Mage: 'bg-cyan-950/80 border-cyan-500/40 shadow-cyan-900/40',
    Rogue: 'bg-emerald-950/80 border-emerald-500/40 shadow-emerald-900/40',
    Paladin: 'bg-yellow-950/80 border-yellow-500/40 shadow-yellow-900/40',
    Ranger: 'bg-green-950/80 border-green-500/40 shadow-green-900/40',
    Cleric: 'bg-sky-950/80 border-sky-500/40 shadow-sky-900/40',
    Bard: 'bg-fuchsia-950/80 border-fuchsia-500/40 shadow-fuchsia-900/40',
    Druid: 'bg-emerald-950/80 border-emerald-500/40 shadow-emerald-900/40',
    Necromancer: 'bg-purple-950/80 border-purple-500/40 shadow-purple-900/40',
    Monk: 'bg-orange-950/80 border-orange-500/40 shadow-orange-900/40',
    Warlock: 'bg-violet-950/80 border-violet-500/40 shadow-violet-900/40',
    Alchemist: 'bg-lime-950/80 border-lime-500/40 shadow-lime-900/40',
  }[classType];

  return (
    <div className="inline-flex items-center gap-2">
      <div
        className={`relative rounded-xl border flex items-center justify-center shadow-lg transition-transform ${sizeClasses} ${bgClasses}`}
      >
        {/* Subtle decorative corner notches */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
        {getIcon()}
      </div>
      {showLabel && (
        <span className="font-semibold text-slate-200 tracking-wide text-sm">
          {classType}
        </span>
      )}
    </div>
  );
};
