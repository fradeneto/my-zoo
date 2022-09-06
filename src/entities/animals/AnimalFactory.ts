import { Animal } from './Aminal';
import { AnimalType } from './constants';
import { Elephant } from './Elephant';
import { Giraffe } from './Giraffe';
import { Monkey } from './Monkey';

const AnimalClasses = {
  [AnimalType.Elephant]: Elephant,
  [AnimalType.Giraffe] : Giraffe,
  [AnimalType.Monkey]  : Monkey,
};

class AnimalFactory {
  newElephants({ quantity }: NewAnimalsProps): Animal[] {
    return this.generateAnimals({
      quantity,
      animalType: AnimalType.Elephant,
    });
  }

  newGiraffes({ quantity }: NewAnimalsProps): Animal[] {
    return this.generateAnimals({
      quantity,
      animalType: AnimalType.Giraffe,
    });
  }

  newMonkeys({ quantity }: NewAnimalsProps): Animal[] {
    return this.generateAnimals({
      quantity,
      animalType: AnimalType.Monkey,
    });
  }

  private generateAnimals({ quantity, animalType }: GenerateAnimalsProps): Animal[] {
    const animals: Animal[] = [];
    const AnimalClass = AnimalClasses[animalType];
    if (!AnimalClass) {
      throw new Error(`Animal [${animalType}] not found`);
    }
    for (let index = 0; index < quantity; index += 1) {
      animals.push(new AnimalClass());
    }
    return animals;
  }
}
type NewAnimalsProps = {
  quantity: number
};

type GenerateAnimalsProps = {
  quantity: number
  animalType: AnimalType
};

export const animalFactory = new AnimalFactory();
