import {
  minHealthWeakenPercentage,
  maxHealthWeakenPercentage,
} from '@/entities/animals/constants';

export class AnimalHealthWeakenError extends Error {
  constructor() {
    super(`Animal health weaken percentage should be between ${minHealthWeakenPercentage} and ${maxHealthWeakenPercentage}`);
  }

  static assert(condition: boolean) {
    if (!condition) {
      throw new AnimalHealthWeakenError();
    }
  }
}
