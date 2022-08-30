import {
  minHealthWeakenPercentage,
  maxHealthWeakenPercentage,
  minHealthHealPercentage,
  maxHealthHealPercentage,
} from './constants';
import { AnimalHealthHealError } from '@/error/AnimalHealthHealError';
import { AnimalHealthWeakenError } from '@/error/AnimalHealthWeakenError';
import { Monkey } from './Monkey';

describe('animals/Monkey', () => {
  const makeSut = () => new Monkey();

  test('should create a Monkey', () => {
    const sut = makeSut();
    expect(sut).toBeInstanceOf(Monkey);
    expect(sut.typeName).toEqual('Monkey');
  });

  test('should create a monkey with 100% health', () => {
    const sut = makeSut();
    expect(sut.getHealth()).toBe(100);
    expect(sut.isAlive()).toBe(true);
  });

  test('should weaken a monkey properly', () => {
    const sut = makeSut();
    sut.weaken({ healthPercentage: 14.5 });
    expect(sut.getHealth()).toBe(85.5);
  });

  test('should heal a monkey when feed it', () => {
    const sut = makeSut();
    sut.weaken({ healthPercentage: 20.0 });
    expect(sut.getHealth()).toBe(80.0);
    sut.heal({ healthPercentage: 15.5 });
    expect(sut.getHealth()).toBe(95.5);
  });

  test('should throw an error if healthPercentage is bellow the minimun when weaken a monkey', () => {
    const sut = makeSut();
    try {
      sut.weaken({ healthPercentage: minHealthWeakenPercentage - 0.1 });
      throw new Error('unexpected');
    } catch (error: any) {
      expect(error).toBeInstanceOf(AnimalHealthWeakenError);
    }
  });

  test('should throw an error if healthPercentage is above the maximum when weaken a monkey', () => {
    const sut = makeSut();
    try {
      sut.weaken({ healthPercentage: maxHealthWeakenPercentage + 0.1 });
      throw new Error('unexpected');
    } catch (error: any) {
      expect(error).toBeInstanceOf(AnimalHealthWeakenError);
    }
  });

  test('should throw an error if healthPercentage is bellow the minimun when heal a monkey', () => {
    const sut = makeSut();
    try {
      sut.heal({ healthPercentage: minHealthHealPercentage - 1 });
      throw new Error('unexpected');
    } catch (error: any) {
      expect(error).toBeInstanceOf(AnimalHealthHealError);
    }
  });

  test('should throw an error if healthPercentage is above the maximum when heal a monkey', () => {
    const sut = makeSut();
    try {
      sut.heal({ healthPercentage: maxHealthHealPercentage + 1 });
      throw new Error('unexpected');
    } catch (error: any) {
      expect(error).toBeInstanceOf(AnimalHealthHealError);
    }
  });

  test('monkey health should be 100% if heal above 100%', () => {
    const sut = makeSut();
    sut.weaken({ healthPercentage: 10.0 });
    expect(sut.getHealth()).toBe(90.0);
    sut.heal({ healthPercentage: 15.5 });
    expect(sut.getHealth()).toBe(100);
  });

  test('monkey should die if health is bellow 30%', () => {
    const sut = makeSut();
    sut.weaken({ healthPercentage: 15.0 });
    expect(sut.getHealth()).toBe(85.0);
    sut.weaken({ healthPercentage: 15.0 });
    expect(sut.getHealth()).toBe(70.0);
    sut.weaken({ healthPercentage: 15.0 });
    expect(sut.getHealth()).toBe(55.0);
    sut.weaken({ healthPercentage: 15.0 });
    expect(sut.getHealth()).toBe(40.0);
    sut.weaken({ healthPercentage: 10.1 });
    expect(sut.getHealth()).toBe(0.0);
    expect(sut.isAlive()).toBe(false);
  });

  test('should not feed monkey if is dead', () => {
    const sut = makeSut();
    sut.weaken({ healthPercentage: 15.0 });
    expect(sut.getHealth()).toBe(85.0);
    sut.weaken({ healthPercentage: 15.0 });
    expect(sut.getHealth()).toBe(70.0);
    sut.weaken({ healthPercentage: 15.0 });
    expect(sut.getHealth()).toBe(55.0);
    sut.weaken({ healthPercentage: 15.0 });
    expect(sut.getHealth()).toBe(40.0);
    sut.weaken({ healthPercentage: 10.1 });
    expect(sut.getHealth()).toBe(0.0);
    expect(sut.isAlive()).toBe(false);
    sut.heal({ healthPercentage: 15 });
    expect(sut.getHealth()).toBe(0.0);
    expect(sut.isAlive()).toBe(false);
  });
});
