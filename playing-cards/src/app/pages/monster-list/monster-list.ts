import { SearchBar } from './../../components/search-bar/search-bar';
import { Component, computed, inject, model, signal } from '@angular/core';
import { Monster } from '../../model/monster';
import { MonsterService } from '../../services/monster/monster';
import { CommonModule } from '@angular/common';
import { PlayingCard } from '../../../app/components/playing-card/playing-card';

@Component({
  selector: 'app-monster-list',
  standalone: true,
  imports: [CommonModule, PlayingCard, SearchBar],
  templateUrl: './monster-list.html',
  styleUrl: './monster-list.css'
})
export class MonsterListComponent {

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
        const monster = new Monster();
        this.monsterService.add(monster);
        this.monsters.set(this.monsterService.getAll());
    }

}