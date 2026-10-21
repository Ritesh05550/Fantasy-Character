import { CharacterClassType } from './characterData';

export interface PortraitVariant {
  id: string;
  classType: CharacterClassType;
  styleName: string;
  description: string;
  imageUrl?: string;
  svgGenerator?: (seed: number, ancestry: string) => string;
}

// Master pre-rendered game assets from generate_image
export const PRE_RENDERED_PORTRAITS: Partial<Record<CharacterClassType, string>> = {
  Warrior: '/src/assets/images/portrait_warrior_1792578641846.jpg',
  Mage: '/src/assets/images/portrait_mage_1792578643011.jpg',
  Rogue: '/src/assets/images/portrait_rogue_1792578644055.jpg',
  Paladin: '/src/assets/images/portrait_paladin_1792578643898.jpg',
  Ranger: '/src/assets/images/portrait_ranger_1792578644341.jpg',
};

// Color palettes per class for procedural cartoon video-game avatars
export const CLASS_PALETTES: Record<
  CharacterClassType,
  { primary: string; secondary: string; glow: string; weapon: string; accent: string }
> = {
  Warrior: {
    primary: '#b45309',
    secondary: '#78350f',
    glow: '#f59e0b',
    weapon: '#e2e8f0',
    accent: '#dc2626',
  },
  Mage: {
    primary: '#0284c7',
    secondary: '#1e1b4b',
    glow: '#38bdf8',
    weapon: '#a855f7',
    accent: '#6366f1',
  },
  Rogue: {
    primary: '#059669',
    secondary: '#0f172a',
    glow: '#10b981',
    weapon: '#94a3b8',
    accent: '#14b8a6',
  },
  Paladin: {
    primary: '#ca8a04',
    secondary: '#422006',
    glow: '#facc15',
    weapon: '#fef08a',
    accent: '#38bdf8',
  },
  Ranger: {
    primary: '#16a34a',
    secondary: '#14532d',
    glow: '#4ade80',
    weapon: '#d97706',
    accent: '#84cc16',
  },
  Cleric: {
    primary: '#0284c7',
    secondary: '#1e293b',
    glow: '#7dd3fc',
    weapon: '#e0f2fe',
    accent: '#eab308',
  },
  Bard: {
    primary: '#c026d3',
    secondary: '#4a044e',
    glow: '#f0abfc',
    weapon: '#fb7185',
    accent: '#ec4899',
  },
  Druid: {
    primary: '#059669',
    secondary: '#064e3b',
    glow: '#34d399',
    weapon: '#ca8a04',
    accent: '#65a30d',
  },
  Necromancer: {
    primary: '#7e22ce',
    secondary: '#18181b',
    glow: '#c084fc',
    weapon: '#10b981',
    accent: '#a855f7',
  },
  Monk: {
    primary: '#ea580c',
    secondary: '#292524',
    glow: '#fb923c',
    weapon: '#fde047',
    accent: '#d97706',
  },
  Warlock: {
    primary: '#9333ea',
    secondary: '#030712',
    glow: '#a855f7',
    weapon: '#ec4899',
    accent: '#6366f1',
  },
  Alchemist: {
    primary: '#65a30d',
    secondary: '#1c1917',
    glow: '#a3e635',
    weapon: '#38bdf8',
    accent: '#f59e0b',
  },
};

/**
 * Generates an SVG data URL for a cartoon / arcade video-game character avatar
 * tailored to the character's class, ancestry, and random seed.
 */
export function generateProceduralCartoonPortrait(
  classType: CharacterClassType,
  seed: number,
  ancestry: string,
  variant: number
): string {
  const p = CLASS_PALETTES[classType];
  const eyeColors = ['#38bdf8', '#34d399', '#facc15', '#f43f5e', '#a855f7', '#fb923c'];
  const skinTones = ['#fde047', '#fbcfe8', '#fed7aa', '#e2e8f0', '#cbd5e1', '#d8b4fe'];
  
  const eyeColor = eyeColors[seed % eyeColors.length];
  const skinTone = skinTones[(seed + 2) % skinTones.length];
  const isAltPose = variant % 2 === 1;

  // Class-specific headgear and weapon accessories
  let helmetOrHairSvg = '';
  let emblemSvg = '';
  let weaponSvg = '';

  if (classType === 'Warrior') {
    helmetOrHairSvg = `
      <!-- Horned / Visored Steel Helmet -->
      <path d="M60,95 Q100,55 140,95 L145,120 Q100,105 55,120 Z" fill="${p.secondary}" stroke="#f8fafc" stroke-width="3" />
      <path d="M45,75 Q55,40 30,30 Q45,55 60,75" fill="#f59e0b" stroke="#78350f" stroke-width="2" />
      <path d="M155,75 Q145,40 170,30 Q155,55 140,75" fill="#f59e0b" stroke="#78350f" stroke-width="2" />
      <!-- Crest Rune -->
      <circle cx="100" cy="85" r="7" fill="${p.glow}" />
    `;
    weaponSvg = `
      <!-- Greatsword Blade on Back -->
      <rect x="${isAltPose ? '150' : '30'}" y="20" width="16" height="150" rx="3" fill="#94a3b8" stroke="#475569" stroke-width="2" transform="rotate(${isAltPose ? '25 150 20' : '-25 30 20'})" />
      <path d="${isAltPose ? 'M140,40 L176,40' : 'M20,40 L56,40'}" stroke="${p.glow}" stroke-width="4" stroke-linecap="round" />
    `;
  } else if (classType === 'Mage') {
    helmetOrHairSvg = `
      <!-- Mystical Hood -->
      <path d="M45,130 Q100,20 155,130 Q100,105 45,130 Z" fill="${p.secondary}" stroke="${p.glow}" stroke-width="2.5" />
      <polygon points="100,30 105,45 100,42 95,45" fill="${p.glow}" />
    `;
    weaponSvg = `
      <!-- Floating Arcane Orb / Crystal -->
      <circle cx="${isAltPose ? '160' : '40'}" cy="70" r="16" fill="${p.glow}" opacity="0.85" />
      <circle cx="${isAltPose ? '160' : '40'}" cy="70" r="8" fill="#ffffff" />
      <path d="${isAltPose ? 'M150,70 Q160,50 170,70' : 'M30,70 Q40,50 50,70'}" stroke="#ffffff" stroke-width="2" fill="none" />
    `;
  } else if (classType === 'Rogue') {
    helmetOrHairSvg = `
      <!-- Assassin Cowl & Mask -->
      <path d="M50,115 Q100,45 150,115 Q100,95 50,115 Z" fill="${p.secondary}" stroke="#334155" stroke-width="2" />
      <!-- Half Face Mask -->
      <path d="M68,135 Q100,155 132,135 L125,160 Q100,165 75,160 Z" fill="#090d16" stroke="${p.glow}" stroke-width="1.5" />
    `;
    weaponSvg = `
      <!-- Curved Dagger -->
      <path d="M35,160 Q30,110 50,85 Q45,120 40,160 Z" fill="#e2e8f0" stroke="${p.glow}" stroke-width="2" />
      <rect x="30" y="155" width="18" height="6" rx="2" fill="${p.accent}" />
    `;
  } else if (classType === 'Paladin') {
    helmetOrHairSvg = `
      <!-- Golden Crown & Halo -->
      <circle cx="100" cy="65" r="48" fill="none" stroke="${p.glow}" stroke-width="3" stroke-dasharray="8 6" opacity="0.8" />
      <path d="M65,95 L100,70 L135,95 L125,115 L75,115 Z" fill="${p.primary}" stroke="#ffffff" stroke-width="2" />
    `;
    weaponSvg = `
      <!-- Solar Shield Edge -->
      <path d="M145,110 Q180,120 175,170 Q150,185 140,165 Z" fill="${p.primary}" stroke="${p.glow}" stroke-width="2.5" />
    `;
  } else if (classType === 'Ranger') {
    helmetOrHairSvg = `
      <!-- Wood Elf Forest Cowl & Feather -->
      <path d="M55,125 Q100,50 145,125 Q100,105 55,125 Z" fill="${p.primary}" stroke="#052e16" stroke-width="2" />
      <path d="M135,70 Q165,40 170,25 Q150,45 135,60" fill="#eab308" stroke="#713f12" stroke-width="1.5" />
    `;
    weaponSvg = `
      <!-- Quiver of Feathers -->
      <rect x="25" y="60" width="18" height="70" rx="4" fill="${p.secondary}" stroke="#854d0e" stroke-width="2" transform="rotate(-15 25 60)" />
      <line x1="28" y1="50" x2="33" y2="70" stroke="#facc15" stroke-width="3" />
      <line x1="38" y1="45" x2="40" y2="70" stroke="#4ade80" stroke-width="3" />
    `;
  } else if (classType === 'Necromancer') {
    helmetOrHairSvg = `
      <!-- Bone Crown & Shadow Shroud -->
      <path d="M48,125 Q100,40 152,125 Q100,100 48,125 Z" fill="#090514" stroke="${p.glow}" stroke-width="2" />
      <circle cx="100" cy="70" r="10" fill="#ffffff" stroke="#9333ea" stroke-width="2" />
      <!-- Skull Eyes -->
      <circle cx="96" cy="69" r="2.5" fill="#581c87" />
      <circle cx="104" cy="69" r="2.5" fill="#581c87" />
    `;
    weaponSvg = `
      <!-- Spectral Flame Floating -->
      <path d="M30,90 Q40,60 30,45 Q48,65 38,90 Z" fill="#a855f7" opacity="0.9" />
    `;
  } else if (classType === 'Cleric') {
    helmetOrHairSvg = `
      <!-- Divine Mitre & Silver Circlet -->
      <path d="M65,100 L100,45 L135,100 Q100,85 65,100 Z" fill="${p.secondary}" stroke="${p.glow}" stroke-width="2" />
      <circle cx="100" cy="75" r="6" fill="${p.glow}" />
    `;
    weaponSvg = `
      <!-- Sun Mace -->
      <circle cx="${isAltPose ? '155' : '45'}" cy="80" r="14" fill="${p.primary}" stroke="${p.glow}" stroke-width="2" />
      <line x1="${isAltPose ? '155' : '45'}" y1="94" x2="${isAltPose ? '155' : '45'}" y2="160" stroke="#64748b" stroke-width="5" />
    `;
  } else {
    // Generic / Bard / Monk / Druid / Warlock / Alchemist
    helmetOrHairSvg = `
      <!-- Styled Class Hood -->
      <path d="M52,125 Q100,48 148,125 Q100,105 52,125 Z" fill="${p.secondary}" stroke="${p.glow}" stroke-width="2" />
      <circle cx="100" cy="80" r="6" fill="${p.accent}" />
    `;
    weaponSvg = `
      <!-- Class Sparkle -->
      <polygon points="${isAltPose ? '155' : '45'},65 ${isAltPose ? '160' : '50'},80 ${isAltPose ? '175' : '65'},85 ${isAltPose ? '160' : '50'},90 ${isAltPose ? '155' : '45'},105 ${isAltPose ? '150' : '40'},90 ${isAltPose ? '135' : '25'},85 ${isAltPose ? '150' : '40'},80" fill="${p.glow}" opacity="0.85" />
    `;
  }

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
      <defs>
        <radialGradient id="bgGlow_${seed}" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="${p.glow}" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="#0a0c10" stop-opacity="0.95"/>
        </radialGradient>
        <linearGradient id="armorGrad_${seed}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${p.primary}"/>
          <stop offset="100%" stop-color="${p.secondary}"/>
        </linearGradient>
      </defs>

      <!-- Background Card Texture -->
      <rect width="200" height="200" fill="url(#bgGlow_${seed})" />
      
      <!-- Ambient Rune Ring -->
      <circle cx="100" cy="100" r="86" fill="none" stroke="${p.glow}" stroke-width="1.5" stroke-dasharray="4 6" opacity="0.35" />
      <circle cx="100" cy="100" r="92" fill="none" stroke="${p.glow}" stroke-width="0.75" opacity="0.2" />

      <!-- Weapon / Side Accessory Behind -->
      ${weaponSvg}

      <!-- Shoulders & Armor Torso -->
      <path d="M30,200 L45,155 Q100,140 155,155 L170,200 Z" fill="url(#armorGrad_${seed})" stroke="${p.glow}" stroke-width="2" />
      <!-- Gorget / Chest Emblem -->
      <path d="M75,160 Q100,185 125,160 L120,195 Q100,200 80,195 Z" fill="${p.secondary}" stroke="#e2e8f0" stroke-width="1.5" />
      <circle cx="100" cy="175" r="4" fill="${p.glow}" />

      <!-- Neck & Head -->
      <rect x="86" y="130" width="28" height="25" rx="4" fill="${skinTone}" opacity="0.9" />
      
      <!-- Face Base Shape -->
      <ellipse cx="100" cy="118" rx="28" ry="30" fill="${skinTone}" stroke="#1e293b" stroke-width="2" />
      
      <!-- Expressive Cartoon Eyes (Chibi/Video-Game Style) -->
      <ellipse cx="88" cy="116" rx="6" ry="7" fill="#0f172a" />
      <ellipse cx="112" cy="116" rx="6" ry="7" fill="#0f172a" />
      <!-- Iris & Glow -->
      <circle cx="88" cy="116" r="3.5" fill="${eyeColor}" />
      <circle cx="112" cy="116" r="3.5" fill="${eyeColor}" />
      <!-- Pupil White Highlight -->
      <circle cx="86" cy="114" r="1.5" fill="#ffffff" />
      <circle cx="110" cy="114" r="1.5" fill="#ffffff" />

      <!-- Confident Eyebrows -->
      <path d="M80,107 Q89,103 96,108" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round" fill="none" />
      <path d="M120,107 Q111,103 104,108" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round" fill="none" />

      <!-- Cute/Determined Cartoon Mouth -->
      <path d="M93,132 Q100,137 107,132" stroke="#0f172a" stroke-width="2" stroke-linecap="round" fill="none" />

      <!-- Headgear / Hair / Hood on top -->
      ${helmetOrHairSvg}

      <!-- Corner Runic Accents -->
      <polygon points="12,12 24,12 12,24" fill="${p.glow}" opacity="0.7" />
      <polygon points="188,12 176,12 188,24" fill="${p.glow}" opacity="0.7" />
      <polygon points="12,188 24,188 12,176" fill="${p.glow}" opacity="0.7" />
      <polygon points="188,188 176,188 188,176" fill="${p.glow}" opacity="0.7" />
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Returns a cartoon/video-game portrait for a character.
 * Uses the pre-rendered high fidelity video-game art when available for variant 0,
 * and seamlessly generates cartoon video-game variations for subsequent regenerations.
 */
export function getCharacterPortrait(
  classType: CharacterClassType,
  seed: number,
  ancestry: string,
  variantIndex = 0
): { url: string; styleName: string; isPreRendered: boolean } {
  // If variantIndex is 0 and we have a pre-rendered high-res game art for this class:
  const preRenderedUrl = PRE_RENDERED_PORTRAITS[classType];
  if (variantIndex % 2 === 0 && preRenderedUrl) {
    return {
      url: preRenderedUrl,
      styleName: 'Epic Video-Game Digital Art',
      isPreRendered: true,
    };
  }

  // Otherwise, produce a distinct cartoon/arcade video-game character portrait
  const svgUrl = generateProceduralCartoonPortrait(classType, seed + variantIndex * 7, ancestry, variantIndex);
  return {
    url: svgUrl,
    styleName: variantIndex % 2 === 1 ? 'Chibi Arcade Game Sprite' : 'Stylized 2D Game Portrait',
    isPreRendered: false,
  };
}
