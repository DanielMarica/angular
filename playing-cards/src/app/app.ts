import { Component, signal, computed, effect, model,inject } from '@angular/core';
import { PlayingCard } from './components/playing-card/playing-card';
import { Monster } from './model/monster';
import { SearchBar } from './components/search-bar/search-bar';
import { MonsterType } from './utils/monster';
import { CommonModule } from '@angular/common'
import {MonsterService} from './services/monster/monster'

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [SearchBar, PlayingCard,CommonModule],
})
export class App {

    monsterService = inject(MonsterService);

    monsters = signal<Monster[]>([]);
    search = model('');

      filteredMonsters = computed(() => {
        return this.monsters().filter(monster => monster.name.includes(this.search()));
    })

    constructor() {
        this.monsters.set(this.monsterService.getAll());
    }

   addGenericMonster() {
  const monster = this.monsterService.getRandomMonster();
  this.monsterService.add(monster);
  this.monsters.set(this.monsterService.getAll());
}


}