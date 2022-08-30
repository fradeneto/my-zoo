export interface Animal {
  typeName: string
  getHealth: () => number
  isAlive: () => boolean
  weaken: ({ healthPercentage }: { healthPercentage: number }) => void
  heal: ({ healthPercentage }: { healthPercentage: number }) => void
  canWalk: () => boolean
}
