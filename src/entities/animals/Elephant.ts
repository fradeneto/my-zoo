import { Decimal } from 'decimal.js';
import { AnimalHealthWeakenError } from '@/error/AnimalHealthWeakenError';
import {
  initalHealthPercentage,
  minHealthWeakenPercentage,
  maxHealthWeakenPercentage,
  minHealthHealPercentage,
  maxHealthHealPercentage,
} from './constants';
import { AnimalHealthHealError } from '@/error/AnimalHealthHealError';
import { Animal } from './Aminal';

const ELEPHANT_TYPE_NAME = 'Elephant';
const MINIMUM_HEALTH_BEFORE_DIE = 70;
export class Elephant implements Animal {
  private health: Decimal;
  private isHealthBellowTheMinimum: boolean = false;

  constructor() {
    this.health = new Decimal(initalHealthPercentage);
  }

  get typeName() {
    return ELEPHANT_TYPE_NAME;
  }

  getHealth() {
    return this.health.toNumber();
  }

  isAlive() {
    return this.health.toNumber() > 0;
  }

  weaken({ healthPercentage }: { healthPercentage: number }) {
    AnimalHealthWeakenError.assert(healthPercentage >= minHealthWeakenPercentage);
    AnimalHealthWeakenError.assert(healthPercentage <= maxHealthWeakenPercentage);
    this.health = this.health.sub(healthPercentage);
    this.killIfNeeded();
    this.setHealthBellowTheMinimumIfNeeded();
  }

  heal({ healthPercentage }: { healthPercentage: number }) {
    if (!this.isAlive()) {
      return;
    }
    AnimalHealthHealError.assert(healthPercentage >= minHealthHealPercentage);
    AnimalHealthHealError.assert(healthPercentage <= maxHealthHealPercentage);
    this.health = Decimal.min(this.health.plus(healthPercentage), 100);
  }

  canWalk() {
    return this.health.toNumber() > MINIMUM_HEALTH_BEFORE_DIE;
  }

  private killIfNeeded() {
    if (!this.isHealthBellowTheMinimum) {
      return;
    }

    if (this.health.toNumber() < MINIMUM_HEALTH_BEFORE_DIE) {
      this.kill();
    }
  }

  private kill() {
    this.health = new Decimal(0);
  }

  private setHealthBellowTheMinimumIfNeeded() {
    this.isHealthBellowTheMinimum = this.health.toNumber() < MINIMUM_HEALTH_BEFORE_DIE;
  }
}
