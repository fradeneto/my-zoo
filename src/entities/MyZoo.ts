import { random } from 'lodash';
import { Animal } from './animals/Aminal';
import {
  maxHealthHealPercentage, maxHealthWeakenPercentage, minHealthHealPercentage, minHealthWeakenPercentage,
} from './animals/constants';

export class MyZoo {
  private animals: Animal[];
  private timeInHour: number;
  private animalTypes: string[] = [];

  constructor({ animals }: { animals: Animal[] }) {
    this.animals = animals;
    this.timeInHour = 0;
    this.setAnimalTypes();
  }

  getAnimals(): Animal[] {
    return this.animals;
  }

  getTime(): number {
    return this.timeInHour;
  }

  addOneHour(): void {
    this.timeInHour += 1;
    this.weakenAnimals();
  }

  feedAnimals(): void {
    const healPercentageByType = this.generateHealPercentageByType();
    this.animals.forEach((animal) => {
      animal.heal({ healthPercentage: healPercentageByType.get(animal.typeName)! });
    });
  }

  private setAnimalTypes(): void {
    this.animals.forEach((animal) => {
      if (this.animalTypes.includes(animal.typeName)) {
        return;
      }
      this.animalTypes.push(animal.typeName);
    });
  }

  private weakenAnimals(): void {
    this.animals.forEach((animal) => {
      const weakenPercentage = random(minHealthWeakenPercentage, maxHealthWeakenPercentage, true);
      animal.weaken({ healthPercentage: weakenPercentage });
    });
  }

  private generateHealPercentageByType(): Map<string, number> {
    const healPercentageByType = new Map<string, number>();
    this.animalTypes.forEach((typeName) => {
      healPercentageByType.set(typeName, random(minHealthHealPercentage, maxHealthHealPercentage, true));
    });
    return healPercentageByType;
  }
}
