import { MonsterType } from "../utils/monster";

export class Monster {
    
    id: number = -1;
    name: string = "Monster";
    image: string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png";
    type: MonsterType = MonsterType.ELECTRIC;
    hp: number = 60;
    figureCaption: string = "N°001 Monster";

    attackName: string = "Standard Attack";
    attackStrength: number = 10;
    attackDescription: string = "This is an attack description...";

    copy(): Monster {
        return Object.assign(new Monster(), this);
    }
}