export type CharacterClassType =
  | 'Warrior'
  | 'Mage'
  | 'Rogue'
  | 'Paladin'
  | 'Ranger'
  | 'Cleric'
  | 'Bard'
  | 'Druid'
  | 'Necromancer'
  | 'Monk'
  | 'Warlock'
  | 'Alchemist';

export type Ancestry =
  | 'High Elf'
  | 'Wood Elf'
  | 'Mountain Dwarf'
  | 'Human'
  | 'Shadow Tiefling'
  | 'Silver Dragonborn'
  | 'Half-Orc'
  | 'Deep Gnome'
  | 'Celestial Aasimar'
  | 'Halfling';

export interface CharacterStats {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
}

export interface Character {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  title: string;
  classType: CharacterClassType;
  subclass: string;
  ancestry: Ancestry;
  level: number;
  stats: CharacterStats;
  hitPoints: number;
  armorClass: number;
  health: number;
  mana: number;
  strength: number;
  primaryStat: keyof CharacterStats;
  signatureWeapon: string;
  armor: string;
  relic: string;
  alignment: string;
  backstory: string;
  quote: string;
  portrait?: {
    url: string;
    styleName: string;
    variantIndex: number;
  };
  createdAt: number;
}

export interface ClassDefinition {
  name: CharacterClassType;
  categoryName: string;
  role: string;
  themeColor: string;
  borderColor: string;
  accentBg: string;
  glowColor: string;
  primaryStat: keyof CharacterStats;
  baseHitDie: number;
  subclasses: string[];
  weapons: string[];
  armors: string[];
  relics: string[];
}

export const CLASS_DEFINITIONS: Record<CharacterClassType, ClassDefinition> = {
  Warrior: {
    name: 'Warrior',
    categoryName: 'The Vanguard & Master of Arms',
    role: 'Frontline Combat & Martial Superiority',
    themeColor: 'from-amber-600 via-orange-600 to-red-700',
    borderColor: 'border-amber-600/50',
    accentBg: 'bg-amber-500/10 text-amber-300',
    glowColor: 'rgba(217, 119, 6, 0.3)',
    primaryStat: 'str',
    baseHitDie: 10,
    subclasses: ['Battlemaster', 'Berserker', 'Dreadnought', 'Warmaster', 'Iron Vanguard'],
    weapons: [
      'Meteor-Forged Greatsword',
      'Twin Damascus Waraxes',
      'Dragonbone Halberd',
      'Runic Broadsword & Shield',
      'Sun-Tempered Flail',
    ],
    armors: [
      'Gilded Juggernaut Plate',
      'Full Dwarven Plate of Defiance',
      'Tempered Steel Harness',
      'Dragon-Scale Mail',
    ],
    relics: [
      'Sigil of the Unbroken Banner',
      'Whetstone of Crimson Sparks',
      'War-Horn of the First Host',
      'Chipped War Medallion',
    ],
  },
  Mage: {
    name: 'Mage',
    categoryName: 'The Arcane Scholar & Reality Weaver',
    role: 'Mystic Evocation & Cosmic Ley Manipulation',
    themeColor: 'from-cyan-500 via-blue-600 to-indigo-800',
    borderColor: 'border-cyan-500/50',
    accentBg: 'bg-cyan-500/10 text-cyan-300',
    glowColor: 'rgba(6, 182, 212, 0.3)',
    primaryStat: 'int',
    baseHitDie: 6,
    subclasses: ['Archmage', 'Chronoturge', 'Pyromancer', 'Void Weaver', 'Aether Scholar'],
    weapons: [
      'Staff of Crystallized Aether',
      'Gilded Astrolabe Focus',
      'Grimoire of Seven Moons',
      'Arcane Wand of Azure Lightning',
      'Hovering Runed Scythe',
    ],
    armors: [
      'Robes of the Astral Conclave',
      'Enchanted Gossamer Vestments',
      'Midnight Velvet Mantle',
      'Spell-Woven Scholar Raiment',
    ],
    relics: [
      'Tear of the Fallen Comet',
      'Ever-Whispering Chrono-Hourglass',
      'Prism of True Sight',
      'Bound Elemental Core',
    ],
  },
  Rogue: {
    name: 'Rogue',
    categoryName: 'The Shadow Stalker & Infiltrator',
    role: 'Stealth Execution & Clandestine Sabotage',
    themeColor: 'from-emerald-500 via-teal-600 to-slate-800',
    borderColor: 'border-emerald-500/50',
    accentBg: 'bg-emerald-500/10 text-emerald-300',
    glowColor: 'rgba(16, 185, 129, 0.3)',
    primaryStat: 'dex',
    baseHitDie: 8,
    subclasses: ['Shadowblade', 'Phantom Assassin', 'Mastermind', 'Whisper Spy', 'Acrobatic Trickster'],
    weapons: [
      'Twin Night-Tipped Stiletto Daggers',
      'Silent Obsidian Hand Crossbow',
      'Viper-Tooth Rapier',
      'Concealed Spring-Steel Blades',
      'Shadow-Forged Shortsword',
    ],
    armors: [
      'Smoked Leather Assassin Garb',
      'Silken Shroud of the Gloom',
      'Reinforced Wyvern-Hide Brigandine',
      'Cloak of Blended Shadows',
    ],
    relics: [
      'Lockpick of the Master Thief',
      'Smoke Pellet of Vanishing Mist',
      'False Coin of Whispering Luck',
      'Skeleton Key of Lost Guilds',
    ],
  },
  Paladin: {
    name: 'Paladin',
    categoryName: 'The Sacred Luminary & Oathkeeper',
    role: 'Holy Smite & Divine Bastion of Justice',
    themeColor: 'from-yellow-500 via-amber-500 to-neutral-700',
    borderColor: 'border-yellow-500/50',
    accentBg: 'bg-yellow-500/10 text-yellow-300',
    glowColor: 'rgba(234, 179, 8, 0.3)',
    primaryStat: 'str',
    baseHitDie: 10,
    subclasses: ['Oath of the Sun', 'Vengeance Arbiter', 'Ancients Guardian', 'Crown Crusader', 'Silver Sentinel'],
    weapons: [
      'Radiant Dawn-Bringer Longsword',
      'Blessed Sun-Hammer of Righteousness',
      'Tower Shield with Solar Emblem',
      'Spear of Celestial Judgement',
      'Gilded Two-Handed Flamberge',
    ],
    armors: [
      'Silvered Crusader Plate Armor',
      'Dawn-Blessed Mirrored Full Harness',
      'Embroidered Tabard over Sacred Mail',
      'Aegis of the Sun-King',
    ],
    relics: [
      'Vial of Sanctified Springwater',
      'Shard of the Seraphic Pillar',
      'Prayer Beads of Dawnlight',
      'Holy Crest of the Golden Sun',
    ],
  },
  Ranger: {
    name: 'Ranger',
    categoryName: 'The Untamed Scout & Marksman',
    role: 'Precision Archery & Wilderness Tracking',
    themeColor: 'from-green-600 via-emerald-700 to-lime-800',
    borderColor: 'border-green-600/50',
    accentBg: 'bg-green-500/10 text-green-300',
    glowColor: 'rgba(34, 197, 94, 0.3)',
    primaryStat: 'dex',
    baseHitDie: 10,
    subclasses: ['Gloom Stalker', 'Horizon Walker', 'Beast Whisperer', 'Deepwood Warden', 'Deadeye Sniper'],
    weapons: [
      'Heartwood Recurve Greatbow',
      'Twin Elven Hunting Scimitars',
      'Feathered Longbow of the North Wind',
      'Tracker Composite Bow & Machete',
      'Thorn-Bark Crossbow',
    ],
    armors: [
      'Hardened Boar-Hide Camouflage Armor',
      'Supple Leather of the Forest Warden',
      'Ghillie Mantle of Pine & Fern',
      'Studded Leaf-Mail',
    ],
    relics: [
      'Eagle Eye Talisman',
      'Whistle of the Spectral Wolf',
      'Compass of the Ley Lines',
      'Pouch of Never-Failing Rations',
    ],
  },
  Cleric: {
    name: 'Cleric',
    categoryName: 'The Divine Channeler & Healer',
    role: 'Sacred Benediction, Restoration & Wardenship',
    themeColor: 'from-sky-500 via-indigo-600 to-amber-600',
    borderColor: 'border-sky-500/50',
    accentBg: 'bg-sky-500/10 text-sky-300',
    glowColor: 'rgba(14, 165, 233, 0.3)',
    primaryStat: 'wis',
    baseHitDie: 8,
    subclasses: ['Life Domain', 'Storm Channeler', 'Grave Watcher', 'Light Bearer', 'War Priest'],
    weapons: [
      'Engraved Silver Morningstar',
      'Scepter of Healing Waters',
      'Mace of Disruption',
      'Iron Censer of Holy Smite',
      'Staff of the Seraph',
    ],
    armors: [
      'Sanctified Heavy Chainmail',
      'Ceremonial Vestments with Silver Gorget',
      'Reinforced Prayer Cuirass',
      'White Robes with Golden Thread',
    ],
    relics: [
      'Reliquary of the First Saint',
      'Self-Lighting Incense Chalice',
      'Vial of Tears from the Moon Mother',
      'Sanctified Rosary',
    ],
  },
  Bard: {
    name: 'Bard',
    categoryName: 'The Skald & Melody Weaver',
    role: 'Sonic Spells, Inspiration & Swashbuckling',
    themeColor: 'from-fuchsia-500 via-rose-600 to-purple-800',
    borderColor: 'border-fuchsia-500/50',
    accentBg: 'bg-fuchsia-500/10 text-fuchsia-300',
    glowColor: 'rgba(217, 70, 239, 0.3)',
    primaryStat: 'cha',
    baseHitDie: 8,
    subclasses: ['College of Lore', 'College of Swords', 'College of Glamour', 'Whisper Skald', 'Balladeer of Ages'],
    weapons: [
      'Yew Lute with Silver Strings & Secret Blade',
      'Ornate Gilded Rapier',
      'Carved Ivory Battle-Horn',
      'Throwing Daggers in Violet Sheaths',
      'Spell-Woven Flute of Charming',
    ],
    armors: [
      'Embroidered Velvet Courtier Coat',
      'Supple Leather with Silk Cloak',
      'Brocade Vestments of the Troubadour',
      'Gilded Leather Doublet',
    ],
    relics: [
      'Tuning Fork of the Spheres',
      'Inkwell of Perpetual Rhymes',
      'Mirror of Flawless Charisma',
      'Ring of Dramatic Entrance',
    ],
  },
  Druid: {
    name: 'Druid',
    categoryName: 'The Primordial Shifter & Green Warden',
    role: 'Nature Magic, Beast Form & Elemental Rites',
    themeColor: 'from-emerald-600 via-green-700 to-yellow-700',
    borderColor: 'border-emerald-600/50',
    accentBg: 'bg-emerald-500/10 text-emerald-300',
    glowColor: 'rgba(5, 150, 105, 0.3)',
    primaryStat: 'wis',
    baseHitDie: 8,
    subclasses: ['Circle of the Moon', 'Circle of Spores', 'Circle of the Land', 'Circle of Stars', 'Wildfire Shaper'],
    weapons: [
      'Living Briar Staff with Amber Blossom',
      'Flint-Tipped Scythe of the Solstice',
      'Totemic Club of the Great Bear',
      'Ironwood Sickle & Sling',
      'Gnarled Oak Wand',
    ],
    armors: [
      'Treated Ironwood Bark Armor',
      'Hide of the Winter Stag',
      'Woven Vine & Bramble Mantle',
      'Petrified Coral Breastplate',
    ],
    relics: [
      'Ever-Sprouting Golden Acorn',
      'Pouch of Glowing Bioluminescent Spores',
      'Pendant of the Lunar Eclipse',
      'Branch of the World Tree',
    ],
  },
  Necromancer: {
    name: 'Necromancer',
    categoryName: 'The Ossuary Lord & Soul Binder',
    role: 'Death Rites, Bonecraft & Essence Manipulation',
    themeColor: 'from-purple-600 via-indigo-900 to-black',
    borderColor: 'border-purple-600/50',
    accentBg: 'bg-purple-500/10 text-purple-300',
    glowColor: 'rgba(147, 51, 234, 0.3)',
    primaryStat: 'int',
    baseHitDie: 6,
    subclasses: ['Ossuary Lord', 'Grave Walker', 'Soul Sculptor', 'Crypt Archon', 'Deathweaver'],
    weapons: [
      'Staff of Carved Dragon Skull & Emerald Fire',
      'Obsidian Ritual Dagger with Runes of Decay',
      'Grimoire of the Pale Queen',
      'Scythe of the Midnight Tide',
      'Bone-Carved Wand of Sapping',
    ],
    armors: [
      'Shroud of the Crypt Walker',
      'Vestments of Smoked Bone & Mourning Silk',
      'Cuirass of Interlocking Ribs',
      'Cowl of Eternal Slumber',
    ],
    relics: [
      'Soul Cage of Verdant Mists',
      'Jar of Tomb Dust of the Ancients',
      'Onyx Ring of the Restless Dead',
      'Hourglass of Black Sand',
    ],
  },
  Monk: {
    name: 'Monk',
    categoryName: 'The Ascetic Master & Ki Conduit',
    role: 'Hand-to-Hand Martial Arts & Spirit Flow',
    themeColor: 'from-orange-500 via-amber-600 to-stone-800',
    borderColor: 'border-orange-500/50',
    accentBg: 'bg-orange-500/10 text-orange-300',
    glowColor: 'rgba(249, 115, 22, 0.3)',
    primaryStat: 'dex',
    baseHitDie: 8,
    subclasses: ['Way of the Open Hand', 'Shadow Discipline', 'Astral Manifest', 'Drunken Flow', 'Sun Soul'],
    weapons: [
      'Hardened Ironwood Bo Staff',
      'Weighted Runic Handwraps',
      'Twin Nunchaku of the Storm',
      'Wind-Slicing Kama Blades',
      'Bare Fists with Glowing Ki Aura',
    ],
    armors: [
      'Simple Saffron Meditation Wraps',
      'Silk Sash of the Mountain Monastery',
      'Featherweight Linen Tunic',
      'Leather Greaves of the Wind-Walker',
    ],
    relics: [
      'Prayer Wheel of Clear Mind',
      'Incense of Astral Centering',
      'Tea Gourd of Boundless Vigor',
      'Beads of the Hundred Fists',
    ],
  },
  Warlock: {
    name: 'Warlock',
    categoryName: 'The Eldritch Pactbound',
    role: 'Forbidden Invocations & Otherworldly Power',
    themeColor: 'from-violet-600 via-fuchsia-700 to-indigo-950',
    borderColor: 'border-violet-600/50',
    accentBg: 'bg-violet-500/10 text-violet-300',
    glowColor: 'rgba(124, 58, 237, 0.3)',
    primaryStat: 'cha',
    baseHitDie: 8,
    subclasses: ['The Fiend Patron', 'The Great Old One', 'The Archfey Bond', 'Hexblade Champion', 'The Celestial Flame'],
    weapons: [
      'Eldritch Blade of Fractured Mirrors',
      'Tome of Shadows with Writhing Script',
      'Orb of Inky Cosmic Emptiness',
      'Wand of Eldritch Blast',
      'Pact-Forged Void Glaive',
    ],
    armors: [
      'Coat of Woven Nightmares',
      'Leather Bound with Abyssal Script',
      'Dark Silk Vestments of the Bound Master',
      'Feathered Cape of the Dark Fairies',
    ],
    relics: [
      'Eyeball of a Slumbering Titan',
      'Signet Ring of the Hellish Prince',
      'Pact Contract Written in Starlight',
      'Talisman of the Deep Trenches',
    ],
  },
  Alchemist: {
    name: 'Alchemist',
    categoryName: 'The Crucible Sage & Transmuter',
    role: 'Volatile Concoctions, Elixirs & Homunculi',
    themeColor: 'from-amber-500 via-lime-600 to-emerald-800',
    borderColor: 'border-lime-500/50',
    accentBg: 'bg-lime-500/10 text-lime-300',
    glowColor: 'rgba(132, 204, 22, 0.3)',
    primaryStat: 'int',
    baseHitDie: 8,
    subclasses: ['Mutagenist', 'Bombardier', 'Homunculus Weaver', 'Philosopher of Metals', 'Apothecary Supreme'],
    weapons: [
      'Pneumatic Flask Launcher',
      'Crucible Stun-Baton',
      'Bandolier of Volatile Phosphor Bombs',
      'Acid-Spraying Brass Gauntlet',
      'Precision Scalpel of Transmutation',
    ],
    armors: [
      'Treated Acid-Resistant Leather Apron',
      'Brass-Reinforced Hazardous Suit',
      'Coated Canvas Lab Duster with Flask Loops',
      'Gilded Goggles of Material Sight',
    ],
    relics: [
      'Vial of Liquid Quicksilver Stars',
      'Homunculus in a Pocket Terrarium',
      'Philosopher Stone Dust Shard',
      'Ever-Bubbling Portable Alembic',
    ],
  },
};

export const ANCESTRIES: Ancestry[] = [
  'High Elf',
  'Wood Elf',
  'Mountain Dwarf',
  'Human',
  'Shadow Tiefling',
  'Silver Dragonborn',
  'Half-Orc',
  'Deep Gnome',
  'Celestial Aasimar',
  'Halfling',
];

export const FIRST_NAMES = [
  'Aeloria', 'Valerius', 'Zephyr', 'Thorgar', 'Kaelen', 'Morwenna', 'Branoc',
  'Lyra', 'Cassian', 'Seraphina', 'Ignis', 'Rhydian', 'Vesper', 'Astrid',
  'Darian', 'Grimnir', 'Sylas', 'Elowen', 'Fenris', 'Talia', 'Alistair',
  'Nyx', 'Gareth', 'Orla', 'Balthazar', 'Isolde', 'Kieran', 'Vaelin',
  'Rowan', 'Cedric', 'Kallista', 'Theron', 'Elira', 'Corvus', 'Dragan',
  'Gwendolyn', 'Hesper', 'Jareth', 'Mirei', 'Torin', 'Zarek', 'Elysia',
  'Bram', 'Faelyn', 'Kaida', 'Magnus', 'Oakhaven', 'Selene', 'Viggo', 'Rhiannon',
];

export const LAST_NAMES = [
  'Starweaver', 'Ironbeard', 'Ashthorn', 'Nightshade', 'Sunstrider', 'Stormforge',
  'Bloodmoon', 'Silverveil', 'Frostpeak', 'Ravenshade', 'Oakenshield', 'Dawnseeker',
  'Wyrmbane', 'Emberfall', 'Shadowmere', 'Stonebreaker', 'Whisperwind', 'Goldenleaf',
  'Darkwater', 'Runecarver', 'Gloomwarden', 'Winterborne', 'Firebrand', 'Trueblade',
  'Crestfall', 'Mistwalker', 'Blackthorn', 'Deepdelver', 'Moonchaser', 'Windrider',
];

export const TITLES = [
  'The Unbroken',
  'Shield of the Dawn',
  'Whisperer of the Void',
  'Bane of the Wyrm',
  'Flame of the North',
  'The Silver Shadow',
  'Warden of the Deep',
  'The Iron Heart',
  'The Arcane Siphon',
  'Keeper of the Grove',
  'The Silent Blade',
  'Bringer of Solace',
  'Hero of the Ashen Pass',
  'Scourge of the Leviathan',
  'The Starlight Sovereign',
  'The Undefeated',
  'The Horizon Seeker',
  'The Gilded Shield',
];

export const ALIGNMENTS = [
  'Lawful Good',
  'Neutral Good',
  'Chaotic Good',
  'Lawful Neutral',
  'True Neutral',
  'Chaotic Neutral',
  'Lawful Pragmatic',
];

export const BACKSTORY_HOOKS = [
  'Exiled from the citadel after unveiling a forbidden royal prophecy; now scours ruins to clear their ancestral house.',
  'Sole survivor of a caravan ambushed by abyssal wyrms, sworn to forge a shield that can turn any monstrous talon.',
  'Apprenticed to a blind cartographer who recorded unseen realms; carries a map that updates with celestial alignments.',
  'Walked away from high nobility when they discovered the family dynasty was built upon an infernal debt.',
  'Found as an infant inside a petrified oak tree during a meteor storm, carrying an innate resonance with wild beasts.',
  'Former gladiator champion of the Sunken Arena who bought their freedom with a single miraculous duel.',
  'A monastery archivist whose sacred library was burned; carries the remaining charred codex within their heart.',
  'Struck by lightning while meditating atop the Spire of Echoes, awaking with eyes that perceive magical leylines.',
  'Trained in the underground fighting rings of the capital before becoming an agent for the clandestine guild.',
  'A veteran warden from the frozen northern frontier, journeying south to warn the realm of an encroaching frost.',
];

export const CHARACTER_QUOTES = [
  '"Steel can break and spells can fade, but my resolve will never falter."',
  '"Listen closely to the dark; even shadows have tales they must confess."',
  '"Knowledge is not merely power—it is the chisel that carves the cosmos."',
  '"The dawn does not ask permission to rise, and neither do I."',
  '"Every track in the dirt tells a truth no mortal tongue can dispute."',
  '"May the light guide our strikes and heal the wounds of those we cherish."',
  '"A song remembered in battle is worth a thousand spears."',
  '"Nature neither hates nor loves; it simply endures, as shall I."',
  '"Death is not the end of duty, merely a change of marching cadence."',
  '"Balance the breath, still the mind, and the mountain itself will yield."',
  '"We make our bargains with fate so that tomorrow might still dawn."',
  '"Every element in this world is waiting to be ignited or transformed."',
];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function rollStat(isPrimary = false): number {
  // Roll 4d6 drop lowest, with slight boost for primary stat
  const rolls = [
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
  ];
  rolls.sort((a, b) => a - b);
  const sum = rolls[1] + rolls[2] + rolls[3];
  return isPrimary ? Math.max(14, Math.min(18, sum + 2)) : Math.max(8, Math.min(18, sum));
}

export function generateRandomCharacter(lockedClass?: CharacterClassType): Character {
  const classKeys = Object.keys(CLASS_DEFINITIONS) as CharacterClassType[];
  const chosenClassType = lockedClass || getRandomItem(classKeys);
  const classDef = CLASS_DEFINITIONS[chosenClassType];

  const firstName = getRandomItem(FIRST_NAMES);
  const lastName = getRandomItem(LAST_NAMES);
  const title = getRandomItem(TITLES);
  const fullName = `${firstName} ${lastName}`;
  const ancestry = getRandomItem(ANCESTRIES);
  const subclass = getRandomItem(classDef.subclasses);

  const stats: CharacterStats = {
    str: rollStat(classDef.primaryStat === 'str'),
    dex: rollStat(classDef.primaryStat === 'dex'),
    con: rollStat(classDef.primaryStat === 'con'),
    int: rollStat(classDef.primaryStat === 'int'),
    wis: rollStat(classDef.primaryStat === 'wis'),
    cha: rollStat(classDef.primaryStat === 'cha'),
  };

  // Compute CON modifier for HP
  const conMod = Math.floor((stats.con - 10) / 2);
  const dexMod = Math.floor((stats.dex - 10) / 2);
  const level = 1;
  const hitPoints = classDef.baseHitDie + conMod;
  const armorClass = 10 + dexMod + (chosenClassType === 'Warrior' || chosenClassType === 'Paladin' ? 4 : chosenClassType === 'Cleric' ? 3 : 1);

  // Random RPG Card Stats: Health, Mana, Strength
  const baseHealth = chosenClassType === 'Warrior' || chosenClassType === 'Paladin' ? 100 : chosenClassType === 'Mage' || chosenClassType === 'Necromancer' ? 65 : 80;
  const health = baseHealth + Math.floor(Math.random() * 40) + conMod * 5;

  const baseMana = chosenClassType === 'Mage' || chosenClassType === 'Warlock' || chosenClassType === 'Cleric' ? 100 : chosenClassType === 'Warrior' ? 40 : 70;
  const mana = baseMana + Math.floor(Math.random() * 45) + Math.floor((stats.int - 10) / 2) * 5;

  const baseStr = chosenClassType === 'Warrior' || chosenClassType === 'Paladin' ? 70 : chosenClassType === 'Rogue' || chosenClassType === 'Monk' ? 55 : 35;
  const strength = baseStr + Math.floor(Math.random() * 30) + Math.floor((stats.str - 10) / 2) * 4;

  return {
    id: `char_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: fullName,
    firstName,
    lastName,
    title,
    classType: chosenClassType,
    subclass,
    ancestry,
    level,
    stats,
    hitPoints,
    armorClass,
    health,
    mana,
    strength,
    primaryStat: classDef.primaryStat,
    signatureWeapon: getRandomItem(classDef.weapons),
    armor: getRandomItem(classDef.armors),
    relic: getRandomItem(classDef.relics),
    alignment: getRandomItem(ALIGNMENTS),
    backstory: getRandomItem(BACKSTORY_HOOKS),
    quote: getRandomItem(CHARACTER_QUOTES),
    createdAt: Date.now(),
  };
}
