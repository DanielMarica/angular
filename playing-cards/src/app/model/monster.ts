import { IMonster } from "../interfaces/monster";
import { MonsterType } from "../utils/monster";

export class Monster implements IMonster {

    id: number = -1;
    name: string = "Monster";
    image: string = "img/pika.png"
    type: MonsterType = MonsterType.ELECTRIC;
    hp: number = 60;
    figureCaption: string = "N°001 Monster";

    attackName: string = "Standard Attack";
    attackStrength: number = 10;
    attackDescription: string = "This is an attack description...";

    copy(): Monster {
        return Object.assign(new Monster(), this);
    }

    static fromJson(monsterData: IMonster) {
        return Object.assign(new Monster(), monsterData);
    }

    toJson(): IMonster {
        const jsonObject: IMonster = Object.assign({}, this);
        delete jsonObject.id;
        return jsonObject;
    }

}