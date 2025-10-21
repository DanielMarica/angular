import { Injectable } from '@angular/core';
import { Monster } from '../../model/monster';
import { MonsterType } from '../../utils/monster';
import { MONSTER_TEMPLATES } from '../../utils/monster';
@Injectable({
  providedIn: 'root'
})
export class MonsterService {
  monsters: Monster[] = [];
  currentId: number = 1;

  constructor() {
    this.load();
  }

  private save() {
    localStorage.setItem('monsters', JSON.stringify(this.monsters));
  }

  private load() {
    const monstersData = localStorage.getItem('monsters');
    if (monstersData) {
      this.monsters = JSON.parse(monstersData).map((monsterJson: any) => 
        Object.assign(new Monster(), monsterJson)
      );
      this.currentId = Math.max(...this.monsters.map(monster => monster.id)) + 1;
    } else {
      this.init();
      this.save();
    }
  }

  private init() {
    this.monsters = [];

    // ELECTRIC - Pikachu (#25)
    const monster1 = new Monster();
    monster1.id = this.currentId;
    monster1.name = "Pik";
    monster1.image = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png";
    monster1.type = MonsterType.ELECTRIC;
    monster1.hp = 40;
    monster1.figureCaption = "N°002 Pik";
    monster1.attackName = "Thunder Shock";
    monster1.attackStrength = 40;
    monster1.attackDescription = "A jolt of electricity strikes the foe";
    this.monsters.push(monster1);
    this.currentId++;

    // WATER - Squirtle (#7)
    const monster2 = new Monster();
    monster2.id = this.currentId;
    monster2.name = "Car";
    monster2.image = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png";
    monster2.type = MonsterType.WATER;
    monster2.hp = 60;
    monster2.figureCaption = "N°003 Car";
    monster2.attackName = "Water Gun";
    monster2.attackStrength = 40;
    monster2.attackDescription = "The target is blasted with a forceful shot of water";
    this.monsters.push(monster2);
    this.currentId++;

    // PLANT - Bulbasaur (#1)
    const monster3 = new Monster();
    monster3.id = this.currentId;
    monster3.name = "Bulb";
    monster3.image = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png";
    monster3.type = MonsterType.PLANT;
    monster3.hp = 60;
    monster3.figureCaption = "N°004 Bulb";
    monster3.attackName = "Vine Whip";
    monster3.attackStrength = 45;
    monster3.attackDescription = "The target is struck with slender vines";
    this.monsters.push(monster3);
    this.currentId++;

    // FIRE - Charmander (#4)
    const monster4 = new Monster();
    monster4.id = this.currentId;
    monster4.name = "Sala";
    monster4.image = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png";
    monster4.type = MonsterType.FIRE;
    monster4.hp = 60;
    monster4.figureCaption = "N°005 Sala";
    monster4.attackName = "Ember";
    monster4.attackStrength = 40;
    monster4.attackDescription = "The target is attacked with small flames";
    this.monsters.push(monster4);
    this.currentId++;
  }

  getAll() {
    return this.monsters.map(monster => monster.copy());
  }

  get(id: number): Monster | undefined {
    const monster = this.monsters.find(monster => monster.id === id);
    return monster ? monster.copy() : undefined;
  }

  add(monster: Monster): Monster {
    const monsterCopy = monster.copy();
    monsterCopy.id = this.currentId;
    this.monsters.push(monsterCopy.copy());
    this.save();
    this.currentId++;
    return monsterCopy;
  }

  update(monster: Monster): Monster {
    const monsterCopy = monster.copy();
    const monsterIndex = this.monsters.findIndex(monster => monster.id === monsterCopy.id);
    if (monsterIndex !== -1) {
      this.monsters[monsterIndex] = monsterCopy.copy();
      this.save();
    }
    return monsterCopy;
  }

  delete(id: number) {
    const monsterIndex = this.monsters.findIndex(monster => monster.id === id);
    if (monsterIndex !== -1) {
      this.monsters.splice(monsterIndex, 1);
      this.save();
    }
  }

  getRandomMonster(): Monster {
  const template = MONSTER_TEMPLATES[Math.floor(Math.random() * MONSTER_TEMPLATES.length)];
  const monster = new Monster();
  Object.assign(monster, template);
  return monster;
}

}