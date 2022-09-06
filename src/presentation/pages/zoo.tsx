import React, { useState } from 'react';
import { clone } from 'lodash';
import { MyZoo } from '@/entities/MyZoo';
import { animalFactory } from '@/entities/animals/AnimalFactory';

const animals = [
  ...animalFactory.newElephants({ quantity: 5 }),
  ...animalFactory.newGiraffes({ quantity: 5 }),
  ...animalFactory.newMonkeys({ quantity: 5 }),
];

export const Zoo: React.FC   = () => {
  const [zoo, setZoo] = useState<MyZoo>(new MyZoo({ animals }));

  const handleAddHour = () => {
    const clonedZoo = clone(zoo);
    clonedZoo.addOneHour();
    setZoo(clonedZoo);
  };

  const handleFeedAnimals = () => {
    const clonedZoo = clone(zoo);
    clonedZoo.feedAnimals();
    setZoo(clonedZoo);
  };

  return (
    <div>
      <div data-testid="zoo-main">My Zoo</div>
      <div>{`${zoo.getTime()} hour`}</div>
      <table>
        <thead>
          <tr>
            <td style={{ paddingRight: '20px' }}>Type Name</td>
            <td style={{ paddingRight: '20px' }}>Health</td>
            <td style={{ paddingRight: '20px' }}>Can Walk</td>
            <td style={{ paddingRight: '20px' }}>Is Alive</td>
          </tr>
        </thead>
        <tbody>
          {zoo.getAnimals().map((animal, index) => (
            <tr key={index} data-testid={`${animal.typeName}-${index}`}>
              <td>
                {animal.typeName}
              </td>
              <td style={{ paddingRight: '20px' }}>
                {animal.getHealth()}
              </td>
              <td style={{ color: animal.canWalk() ? '#005500' : '#550000' }}>
                {String(animal.canWalk())}
              </td>
              <td style={{ color: animal.isAlive() ? '#005500' : '#550000' }}>
                {String(animal.isAlive())}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" data-testid="button-add-1-hour" onClick={() => { handleAddHour(); }}>add 1 hour</button>
      <button type="button" data-testid="button-feed-animals" onClick={() => { handleFeedAnimals(); }}>Feed animals</button>
    </div>
  );
};
