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

const GIRAFFE_TYPE_NAME = 'Giraffe';
const MINIMUM_HEALTH_BEFORE_DIE = 50;
export class Giraffe implements Animal {
  private health: Decimal;

  constructor() {
    this.health = new Decimal(initalHealthPercentage);
  }

  get typeName() {
    return GIRAFFE_TYPE_NAME;
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
    return this.isAlive();
  }

  private killIfNeeded() {
    if (this.health.toNumber() < MINIMUM_HEALTH_BEFORE_DIE) {
      this.kill();
    }
  }

  private kill() {
    this.health = new Decimal(0);
  }
}
