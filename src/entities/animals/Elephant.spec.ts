import {
  minHealthWeakenPercentage,
  maxHealthWeakenPercentage,
  minHealthHealPercentage,
  maxHealthHealPercentage,
} from './constants';
import { AnimalHealthHealError } from '@/error/AnimalHealthHealError';
import { AnimalHealthWeakenError } from '@/error/AnimalHealthWeakenError';
import { Elephant } from './Elephant';

describe('animals/Elephant', () => {
  const makeSut = () => new Elephant();

  test('should create an Elephant', () => {
    const sut = makeSut();
    expect(sut).toBeInstanceOf(Elephant);
    expect(sut.typeName).toEqual('Elephant');
  });

  test('should create a elephant with 100% health', () => {
    const sut = makeSut();
    expect(sut.getHealth()).toBe(100);
    expect(sut.isAlive()).toBe(true);
  });

  test('should weaken a elephant properly', () => {
    const sut = makeSut();
    sut.weaken({ healthPercentage: 14.5 });
    expect(sut.getHealth()).toBe(85.5);
  });

  test('should heal a elephant when feed it', () => {
    const sut = makeSut();
    sut.weaken({ healthPercentage: 20.0 });
    expect(sut.getHealth()).toBe(80.0);
    sut.heal({ healthPercentage: 15.5 });
    expect(sut.getHealth()).toBe(95.5);
  });

  test('should throw an error if healthPercentage is bellow the minimun when weaken a elephant', () => {
    const sut = makeSut();
    try {
      sut.weaken({ healthPercentage: minHealthWeakenPercentage - 0.1 });
      throw new Error('unexpected');
    } catch (error: any) {
      expect(error).toBeInstanceOf(AnimalHealthWeakenError);
    }
  });

  test('should throw an error if healthPercentage is above the maximum when weaken a elephant', () => {
    const sut = makeSut();
    try {
      sut.weaken({ healthPercentage: maxHealthWeakenPercentage + 0.1 });
      throw new Error('unexpected');
    } catch (error: any) {
      expect(error).toBeInstanceOf(AnimalHealthWeakenError);
    }
  });

  test('should throw an error if healthPercentage is bellow the minimun when heal a elephant', () => {
    const sut = makeSut();
    try {
      sut.heal({ healthPercentage: minHealthHealPercentage - 1 });
      throw new Error('unexpected');
    } catch (error: any) {
      expect(error).toBeInstanceOf(AnimalHealthHealError);
    }
  });

  test('should throw an error if healthPercentage is above the maximum when heal a elephant', () => {
    const sut = makeSut();
    try {
      sut.heal({ healthPercentage: maxHealthHealPercentage + 1 });
      throw new Error('unexpected');
    } catch (error: any) {
      expect(error).toBeInstanceOf(AnimalHealthHealError);
    }
  });

  test('elephant health should be 100% if heal above 100%', () => {
    const sut = makeSut();
    sut.weaken({ healthPercentage: 10.0 });
    expect(sut.getHealth()).toBe(90.0);
    sut.heal({ healthPercentage: 15.5 });
    expect(sut.getHealth()).toBe(100);
  });

  test('elephant should not die if health is bellow 70% for only 1 round', () => {
    const sut = makeSut();
    sut.weaken({ healthPercentage: 15.0 });
    expect(sut.getHealth()).toBe(85.0);
    sut.weaken({ healthPercentage: 15.1 });
    expect(sut.getHealth()).toBe(69.9);
    sut.heal({ healthPercentage: 15.0 });
    expect(sut.getHealth()).toBe(84.9);
    expect(sut.isAlive()).toBe(true);
  });

  test('elephant should die if health is bellow 70% more than 1 round', () => {
    const sut = makeSut();
    sut.weaken({ healthPercentage: 15.0 });
    expect(sut.getHealth()).toBe(85.0);
    sut.weaken({ healthPercentage: 15.0 });
    expect(sut.getHealth()).toBe(70.0);
    sut.weaken({ healthPercentage: 15.0 });
    expect(sut.getHealth()).toBe(55.0);
    sut.weaken({ healthPercentage: 5.1 });
    expect(sut.getHealth()).toBe(0.0);
    expect(sut.isAlive()).toBe(false);
  });

  test('elephant should not walk if health is bellow 70%', () => {
    const sut = makeSut();
    sut.weaken({ healthPercentage: 15.0 });
    expect(sut.getHealth()).toBe(85.0);
    sut.weaken({ healthPercentage: 15.1 });
    expect(sut.getHealth()).toBe(69.9);
    expect(sut.canWalk()).toBe(false);
    expect(sut.isAlive()).toBe(true);
  });

  test('should not feed elephant if is dead', () => {
    const sut = makeSut();
    sut.weaken({ healthPercentage: 15.0 });
    expect(sut.getHealth()).toBe(85.0);
    sut.weaken({ healthPercentage: 15.0 });
    expect(sut.getHealth()).toBe(70.0);
    sut.weaken({ healthPercentage: 15.0 });
    expect(sut.getHealth()).toBe(55.0);
    sut.weaken({ healthPercentage: 5.1 });
    expect(sut.getHealth()).toBe(0.0);
    expect(sut.isAlive()).toBe(false);
    sut.heal({ healthPercentage: 15 });
    expect(sut.getHealth()).toBe(0.0);
    expect(sut.isAlive()).toBe(false);
  });
});
