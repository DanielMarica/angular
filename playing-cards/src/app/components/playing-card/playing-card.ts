import { Component, computed, input } from '@angular/core';
import { Monster } from "../../model/monster";
import { MonsterTypeProperties } from '../../utils/monster';

@Component({
    selector: 'app-playing-card',
    standalone: true,
    templateUrl: './playing-card.html',
    styleUrl: './playing-card.css'
})
export class PlayingCard {
    // Input signal
    monster = input<Monster>(new Monster());
    
    // Computed signals pour la couleur et l'icône
    monsterTypeIcon = computed(() => {
        return MonsterTypeProperties[this.monster().type].imageUrl;
    });
    
    backgroundColor = computed(() => {
        return MonsterTypeProperties[this.monster().type].color;
    });
}