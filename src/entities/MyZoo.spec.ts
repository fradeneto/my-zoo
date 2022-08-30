import sinon from 'sinon';

import { Animal } from './animals/Aminal';
import {
  maxHealthHealPercentage, maxHealthWeakenPercentage, minHealthHealPercentage, minHealthWeakenPercentage,
} from './animals/constants';
import { MyZoo } from './MyZoo';

const newAnimal = ({ typeName }: { typeName: string }): Animal => ({
  typeName,
  canWalk  : sinon.stub().returns(true),
  isAlive  : sinon.stub().returns(true),
  heal     : sinon.stub(),
  weaken   : sinon.stub(),
  getHealth: sinon.stub().returns(100),
});

const createAnimals = (): Animal[] => {
  const animal1 = newAnimal({ typeName: '<ANIMAL-1>' });
  const animal2 = newAnimal({ typeName: '<ANIMAL-2>' });
  const animal3 = newAnimal({ typeName: '<ANIMAL-1>' }); // same type of animal 1

  const animals: Animal[] = [
    animal1,
    animal2,
    animal3,
  ];
  return animals;
};

describe('MyZoo', () => {
  const makeSut = ({ animals }: { animals: Animal[] }) => new MyZoo({ animals });

  test('should create a Zoo with animals properly', () => {
    const animals = createAnimals();
    const sut = makeSut({ animals });
    expect(sut).toBeInstanceOf(MyZoo);
    expect(sut.getAnimals()).toEqual(animals);
    expect(sut.getTime()).toEqual(0);
  });

  test('should increase time', () => {
    const animals = createAnimals();
    const sut = makeSut({ animals });
    sut.addOneHour();
    expect(sut.getTime()).toEqual(1);
  });

  test('should weaken animals when increase time', () => {
    const animals = createAnimals();
    const sut = makeSut({ animals });
    sut.addOneHour();
    expect((sut.getAnimals()[0].weaken as sinon.SinonStub).calledOnce).toBeTruthy();
    expect((sut.getAnimals()[1].weaken as sinon.SinonStub).calledOnce).toBeTruthy();
    expect((sut.getAnimals()[2].weaken as sinon.SinonStub).calledOnce).toBeTruthy();
  });

  test('should weaken animals between [minHealthWeakenPercentage] and [maxHealthWeakenPercentage] when increase time', () => {
    const animals = createAnimals();
    const sut = makeSut({ animals });
    sut.addOneHour();
    const animal1HealthPercentage = (sut.getAnimals()[0].weaken as sinon.SinonStub).args[0][0].healthPercentage;
    const animal2HealthPercentage = (sut.getAnimals()[1].weaken as sinon.SinonStub).args[0][0].healthPercentage;
    const animal3HealthPercentage = (sut.getAnimals()[2].weaken as sinon.SinonStub).args[0][0].healthPercentage;

    expect(animal1HealthPercentage).toBeGreaterThanOrEqual(minHealthWeakenPercentage);
    expect(animal1HealthPercentage).toBeLessThanOrEqual(maxHealthWeakenPercentage);
    expect(animal2HealthPercentage).toBeGreaterThanOrEqual(minHealthWeakenPercentage);
    expect(animal2HealthPercentage).toBeLessThanOrEqual(maxHealthWeakenPercentage);
    expect(animal3HealthPercentage).toBeGreaterThanOrEqual(minHealthWeakenPercentage);
    expect(animal3HealthPercentage).toBeLessThanOrEqual(maxHealthWeakenPercentage);
  });

  test('should heal animals when feed they', () => {
    const animals = createAnimals();
    const sut = makeSut({ animals });
    sut.addOneHour();
    sut.feedAnimals();
    expect((sut.getAnimals()[0].heal as sinon.SinonStub).calledOnce).toBeTruthy();
    expect((sut.getAnimals()[1].heal as sinon.SinonStub).calledOnce).toBeTruthy();
    expect((sut.getAnimals()[2].heal as sinon.SinonStub).calledOnce).toBeTruthy();
  });

  test('should heal animals between [minHealthHealPercentage] and [maxHealthHealPercentage] when feed they', () => {
    const animals = createAnimals();
    const sut = makeSut({ animals });
    sut.addOneHour();
    sut.feedAnimals();
    const animal1HealthPercentage = (sut.getAnimals()[0].heal as sinon.SinonStub).args[0][0].healthPercentage;
    const animal2HealthPercentage = (sut.getAnimals()[1].heal as sinon.SinonStub).args[0][0].healthPercentage;
    const animal3HealthPercentage = (sut.getAnimals()[2].heal as sinon.SinonStub).args[0][0].healthPercentage;

    expect(animal1HealthPercentage).toBeGreaterThanOrEqual(minHealthHealPercentage);
    expect(animal1HealthPercentage).toBeLessThanOrEqual(maxHealthHealPercentage);
    expect(animal2HealthPercentage).toBeGreaterThanOrEqual(minHealthHealPercentage);
    expect(animal2HealthPercentage).toBeLessThanOrEqual(maxHealthHealPercentage);
    expect(animal3HealthPercentage).toBeGreaterThanOrEqual(minHealthHealPercentage);
    expect(animal3HealthPercentage).toBeLessThanOrEqual(maxHealthHealPercentage);
  });

  test('should heal animals with the same healthPercentage for each type when feed they', () => {
    const animals = createAnimals();
    const sut = makeSut({ animals });
    sut.addOneHour();
    sut.feedAnimals();

    const animal1HealthPercentage = (sut.getAnimals()[0].heal as sinon.SinonStub).args[0][0].healthPercentage;
    const animal3HealthPercentage = (sut.getAnimals()[2].heal as sinon.SinonStub).args[0][0].healthPercentage;

    expect(animal1HealthPercentage).toEqual(animal3HealthPercentage);
  });
});
