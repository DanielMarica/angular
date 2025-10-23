import { Router } from '@angular/router';
import { SearchBar } from './../../components/search-bar/search-bar';
import { Component, computed, inject, model, signal } from '@angular/core';
import { Monster } from '../../model/monster';
import { MonsterService } from '../../services/monster/monster';
import { CommonModule } from '@angular/common';
import { PlayingCard } from '../../../app/components/playing-card/playing-card';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-monster-list',
  standalone: true,
  imports: [CommonModule, PlayingCard, SearchBar],
  templateUrl: './monster-list.html',
  styleUrl: './monster-list.css'
})
export class MonsterListComponent {

    private monsterService = inject(MonsterService);
    private router = inject(Router);

    monsters = toSignal(this.monsterService.getAll());
    search = model('');

    filteredMonsters = computed(() => {
        return this.monsters()?.filter(monster => monster.name.includes(this.search())) ?? [];
    });

    addMonster() {
        this.router.navigate(['monster']);
    }

    openMonster(monster: Monster) {
        this.router.navigate(['monster', monster.id]);
    }

}