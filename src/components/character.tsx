interface Character {
    id: number;
    name: string;
    class: string;
    level: number;
    hp: HP;
    ac: number;
    speed: Speed;
    info: string;
    abilities: {
        strength: Ability;
        dexterity: Ability;
        constitution: Ability;
        intelligence: Ability;
        wisdom: Ability;
        charisma: Ability;
      };

}

interface Ability {
    score: number;
    profec: boolean;
}

interface HP {
    max: number;
    current: number;
}

interface Speed {
    walking: number;
    swimming: number;
    flying: number;
    burrowing: number;
    climbing: number;
}

export default Character;