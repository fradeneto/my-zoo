import {
  minHealthHealPercentage,
  maxHealthHealPercentage,
} from '@/entities/animals/constants';

export class AnimalHealthHealError extends Error {
  constructor() {
    super(`Animal health heal percentage should be between ${minHealthHealPercentage} and ${maxHealthHealPercentage}`);
  }

  static assert(condition: boolean) {
    if (!condition) {
      throw new AnimalHealthHealError();
    }
  }
}
