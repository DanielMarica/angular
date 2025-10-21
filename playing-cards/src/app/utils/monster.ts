import { Monster } from "../model/monster";
export enum MonsterType {
  PLANT = 'plant',
  ELECTRIC = 'electric',
  FIRE = 'fire',
  WATER = 'water',
}

export interface IMonsterProperties {
  imageUrl: string;
  color: string;
}

export const MonsterTypeProperties: { [key: string]: IMonsterProperties } = {
  [MonsterType.PLANT]: {
    imageUrl: 'img/plant.png',
    color: 'rgb(135, 255, 124)',
  },
  [MonsterType.ELECTRIC]: {
    imageUrl: 'img/electric.png',
    color: 'rgb(255, 255, 104)',
  },
  [MonsterType.FIRE]: {
    imageUrl: 'img/fire.png',
    color: 'rgb(255, 104, 104)',
  },
  [MonsterType.WATER]: {
    imageUrl: 'img/water.png',
    color: 'rgb(118, 234, 255)',
  },
};

// ...existing code...

// Utilise Partial<Monster> pour ignorer les méthodes
export const MONSTER_TEMPLATES: Partial<Monster>[] = [
  {
    name: "Pik",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    type: MonsterType.ELECTRIC,
    hp: 40,
    figureCaption: "N°002 Pik",
    attackName: "Thunder Shock",
    attackStrength: 40,
    attackDescription: "A jolt of electricity strikes the foe"
  },
  {
    name: "Car",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
    type: MonsterType.WATER,
    hp: 60,
    figureCaption: "N°003 Car",
    attackName: "Water Gun",
    attackStrength: 40,
    attackDescription: "The target is blasted with a forceful shot of water"
  },
  {
    name: "Bulb",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    type: MonsterType.PLANT,
    hp: 60,
    figureCaption: "N°004 Bulb",
    attackName: "Vine Whip",
    attackStrength: 45,
    attackDescription: "The target is struck with slender vines"
  },
  {
    name: "Sala",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
    type: MonsterType.FIRE,
    hp: 60,
    figureCaption: "N°005 Sala",
    attackName: "Ember",
    attackStrength: 40,
    attackDescription: "The target is attacked with small flames"
  }
];



// ...existing code...