import { Character } from '../data/characterData';

interface BackstoryTemplate {
  origins: (c: Character) => string[];
  destinies: (c: Character) => string[];
}

const CLASS_NARRATIVE_TEMPLATES: Record<string, BackstoryTemplate> = {
  Warrior: {
    origins: (c) => [
      `Raised along the bloodied frontiers as a ${c.ancestry} ${c.subclass}, ${c.firstName} learned to wield the ${c.signatureWeapon} long before they could recite clan poetry.`,
      `Once the vaunted champion of an ancient siege, ${c.name} shattered their oath to an unjust warlord when commanded to burn a sanctuary.`,
      `Found amid the smoldering ruins of their mountain stronghold, ${c.firstName} was the only soul to survive the dragon's wrath.`,
      `Trained in the gladiatorial pits of the Iron Reach, ${c.name} won their emancipation through thirty unbroken duels of honor.`,
      `Born under the fiery red star of battle, ${c.firstName} forged the ${c.signatureWeapon} from cold star-iron to protect their people.`,
    ],
    destinies: (c) => [
      `Now bearing the ${c.relic}, they wander the fractured kingdoms to ensure no innocent village ever suffers the same fate.`,
      `With grim resolve and an unyielding blade, they seek out the legendary beasts spoken of in the elders' prophecies.`,
      `Sworn to an unbreakable personal code, they march toward the shadowed border where a forgotten army gathers in the mist.`,
      `They now lend their mighty shield only to those without a voice, hunting the fiend that betrayed their vanguard.`,
    ],
  },
  Mage: {
    origins: (c) => [
      `During a total solar eclipse over the academy towers, ${c.name} accidentally deciphered a forbidden astral manuscript that unbound their mortal senses.`,
      `Apprenticed to an eccentric archivist of the High Spire, this ${c.ancestry} prodigy mastered the ${c.subclass} rites years ahead of the council's elders.`,
      `Exiled from the floating libraries after warning the high mages of an impending tear in the veil, ${c.firstName} took only their ${c.signatureWeapon}.`,
      `Born with eyes that perceive magical leylines pulsing beneath the soil, ${c.name} was chosen by the arcane cosmos from childhood.`,
      `After their sanctuary was swallowed by a spatial rift, ${c.firstName} salvaged only the ${c.relic} and a vow of remembrance.`,
    ],
    destinies: (c) => [
      `Now they traverse the realm unraveling ancient anomalies, determined to prevent reality from fraying at the seams.`,
      `Guarded by their shimmering ward, they seek the lost fragments of a celestial spell capable of healing the poisoned land.`,
      `Every incantation they cast brings them one step closer to uncovering the forgotten entity bound inside their arcane focus.`,
      `With starlight woven into their fingertips, they journey to restore the ancient balance before the stars turn cold.`,
    ],
  },
  Rogue: {
    origins: (c) => [
      `Reared in the labyrinthine alleys of the lower docks, ${c.name} mastered the art of vanishing before city guards could even draw breath.`,
      `Once the most prized infiltrator for the Obsidian Syndicate, this ${c.ancestry} ${c.subclass} chose independence over a gilded gilded cage.`,
      `Framed for the theft of the crown jewels by an aristocratic rival, ${c.firstName} slipped through dungeon bars with nothing but a wire and iron resolve.`,
      `Trained in silence by a blind master of the shadow arts, ${c.name} walks with footsteps so quiet that even fallen leaves make no sound.`,
      `Having uncovered a conspiracy that reached the royal throne room, ${c.firstName} was forced to abandon their noble name for the whisper of the shadows.`,
    ],
    destinies: (c) => [
      `Armed with the ${c.signatureWeapon} and carrying the ${c.relic}, they now balance debts that money can never repay.`,
      `They live by a strict clandestine code, taking fortunes only from corrupt tyrants while watching over the forgotten alleyways.`,
      `Now an elusive ghost of the frontier roads, they hunt the shadow syndicate that placed a bounty upon their head.`,
      `Every lock they pick and shadow they walk draws them closer to the secret ledger that could topple an empire.`,
    ],
  },
  Paladin: {
    origins: (c) => [
      `Kneeling at the altar of the Radiant Dawn, ${c.name} spoke their solemn oaths as daylight pierced through the cathedral's shattered rose window.`,
      `Once a disillusioned soldier who laid down their arms, this ${c.ancestry} warrior was called back to the light by a miraculous vision in the wastes.`,
      `Born as the third child of an impoverished border town, ${c.firstName} took the mantle of the ${c.subclass} to shield the vulnerable from horrors in the dark.`,
      `Blessed by the ancestral spirits of their bloodline, ${c.name} carries the sacred ${c.signatureWeapon} as a beacon against the crawling shadows.`,
    ],
    destinies: (c) => [
      `Drawing strength from the ${c.relic}, they stand as an immovable wall between innocent lives and the tides of chaos.`,
      `With righteous flame burning in their eyes, they seek to cleanse the blighted shrines and renew hope across the provinces.`,
      `Though the road is fraught with temptation, their sacred vow remains unblemished as they hunt the primordial fiend.`,
    ],
  },
  Ranger: {
    origins: (c) => [
      `For three decades, ${c.name} has stalked the ancient boughs of the Deepwood, learning the silent tongues of wind and predatory beasts.`,
      `The sole survivor of an expedition into the Wyrmtooth Crags, this ${c.ancestry} scout survived a brutal winter using only their wits and the ${c.signatureWeapon}.`,
      `Banished from their clan for refusing to cull an endangered spectral wolf, ${c.firstName} adopted the beast as their loyal kin instead.`,
      `Guarding the hidden mountain passes from encroaching raiders, ${c.name} became a legend whispered among campfire travelers.`,
    ],
    destinies: (c) => [
      `Guided by the ${c.relic}, they track the unnatural corruption that has begun withering the ancient roots of the world tree.`,
      `With deadly precision and an intimate knowledge of the wild, they hunt those who would desecrate the sacred frontiers.`,
      `They roam where civilized maps end, keeping watch over the ancient borders that separate mortal realms from primordial wildlands.`,
    ],
  },
  Cleric: {
    origins: (c) => [
      `Struck by a celestial comet as a youth, ${c.name} awoke unburned, their hands blessed with the miraculous warmth of restoration.`,
      `A gentle apothecary's child from an ${c.ancestry} village, ${c.firstName} answered the call of the heavens when a plague gripped the valley.`,
      `Chosen by the divine pantheon during the Great Conjunction, ${c.name} became the living vessel for the ${c.subclass} domain.`,
    ],
    destinies: (c) => [
      `Empowered by the ${c.relic}, they mend the broken and cast radiant judgment upon the undead terrors that stalk the nights.`,
      `With prayer beads clasped in calloused hands, they journey across war-torn provinces bringing solace to the downtrodden.`,
      `They march fearlessly into the darkest catacombs, confident that their divine patron's light will never extinguish.`,
    ],
  },
  Necromancer: {
    origins: (c) => [
      `Born during a rare alignment of the dead moons, ${c.name} could hear the peaceful whispers of buried ancestors beneath the churchyard soil.`,
      `Cast out from the scholarly colleges for treating mortality as a puzzle rather than a finality, this ${c.ancestry} philosopher took their research into the catacombs.`,
      `After their loved ones were taken by a ruthless curse, ${c.firstName} vowed that death would no longer be an insurmountable boundary.`,
    ],
    destinies: (c) => [
      `Wielding the ${c.signatureWeapon} and sustained by the ${c.relic}, they command bone and spirit only to settle restless grievances.`,
      `They seek the legendary Tomb of the Pale King, hoping to glean the one rite that can grant peaceful rest to tortured souls.`,
      `Misunderstood by the living, they maintain the fragile boundary between the physical realm and the restless tide of the beyond.`,
    ],
  },
};

// Generic fallback template for any other class
const DEFAULT_TEMPLATE: BackstoryTemplate = {
  origins: (c) => [
    `Hailing from a secluded ${c.ancestry} settlement nestled within the jagged peaks, ${c.name} embraced the path of the ${c.classType} to honor their ancestral heritage.`,
    `After discovering the ${c.relic} buried beneath the roots of an ancient runestone, ${c.firstName} was marked by fate for an uncommon destiny.`,
    `Trained in secretive traditions passed down through generations, ${c.name} honed their mastery of the ${c.signatureWeapon} in relative obscurity.`,
    `Exiled from their homeland following a bitter feud among noble houses, ${c.firstName} turned to the road to forge their own legend.`,
  ],
  destinies: (c) => [
    `Driven by an unyielding spirit, they now seek out the mythical relics that can restore prosperity to their fractured realm.`,
    `With every step across uncharted lands, they challenge tyranny and write their saga into the annals of myth.`,
    `Now adventuring with fellow champions, they stand ready to confront the ancient evils awakening in the forgotten deep.`,
    `Carrying the burdens of their past with quiet dignity, they search for answers to a riddle that has baffled scholars for centuries.`,
  ],
};

function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Creates a unique, high-character 1-to-2-sentence origin backstory
 * specifically tailored to the character's name, class, subclass, ancestry, and equipment.
 */
export function generateUniqueBackstory(character: Character): string {
  const template = CLASS_NARRATIVE_TEMPLATES[character.classType] || DEFAULT_TEMPLATE;
  const sentence1 = getRandom(template.origins(character));
  const sentence2 = getRandom(template.destinies(character));
  return `${sentence1} ${sentence2}`;
}
