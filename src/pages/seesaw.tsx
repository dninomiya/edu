import React, { useMemo, useState } from 'react';

type Animal = {
  name: string;
  weight: number;
  image: string;
};

const animals: Animal[] = [
  { name: 'Lion', weight: 150, image: '/images/animals/lion.png' },
  { name: 'Tiger', weight: 250, image: '/images/animals/tiger.png' },
  { name: 'Bear', weight: 300, image: '/images/animals/bear.png' },
  { name: 'Elephant', weight: 5000, image: '/images/animals/elephant.png' },
];

const Seesaw = () => {
  const [leftAnimal, setLeftAnimal] = useState<Animal | null>(null);
  const [rightAnimal, setRightAnimal] = useState<Animal | null>(null);
  const [leftAnimalCount, setLeftAnimalCount] = useState<number>(1);
  const [rightAnimalCount, setRightAnimalCount] = useState<number>(1);

  const handleLeftAnimalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAnimal = animals.find(
      (animal) => animal.name === e.target.value
    );
    setLeftAnimal(selectedAnimal || null);
  };

  const handleRightAnimalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAnimal = animals.find(
      (animal) => animal.name === e.target.value
    );
    setRightAnimal(selectedAnimal || null);
  };

  const handleLeftAnimalCountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLeftAnimalCount(parseInt(e.target.value, 10));
  };

  const handleRightAnimalCountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRightAnimalCount(parseInt(e.target.value, 10));
  };

  const calculateSeesawAngle = (
    leftAnimal: Animal | null,
    leftAnimalCount: number,
    rightAnimal: Animal | null,
    rightAnimalCount: number
  ): number => {
    const totalLeftWeight = leftAnimal
      ? leftAnimal.weight * leftAnimalCount
      : 0;
    const totalRightWeight = rightAnimal
      ? rightAnimal.weight * rightAnimalCount
      : 0;

    const minAngle = -30;
    const maxAngle = 30;
    const angle =
      Math.atan2(totalRightWeight - totalLeftWeight, 400) * (180 / Math.PI);
    return Math.min(Math.max(angle, minAngle), maxAngle);
  };

  const angle = useMemo(() => {
    return calculateSeesawAngle(
      leftAnimal,
      leftAnimalCount,
      rightAnimal,
      rightAnimalCount
    );
  }, [leftAnimal, leftAnimalCount, rightAnimal, rightAnimalCount]);

  const renderAnimalImages = (
    animal: Animal | null,
    count: number,
    isRightSide: boolean = false
  ) => {
    if (!animal) return null;

    const images = [];
    for (let i = 0; i < count; i++) {
      images.push(
        <img
          key={i}
          src={animal.image}
          alt={animal.name}
          className="w-full h-full object-cover"
          style={{
            position: 'absolute',
            top: 0,
            left: isRightSide ? 'auto' : i * 40,
            right: isRightSide ? i * 40 : 'auto',
            zIndex: i,
          }}
        />
      );
    }
    return images;
  };

  return (
    <div className="App">
      <div className="flex flex-col items-center justify-center h-screen">
        <div>
          <h1 className="text-4xl font-bold mb-4">Animal Weight Seesaw</h1>
          <div className="flex space-x-4 mb-4">
            <div>
              <label htmlFor="left-animal" className="block mb-2">
                Left Animal
              </label>
              <select
                id="left-animal"
                onChange={handleLeftAnimalChange}
                className="form-select"
              >
                <option value="">Choose an animal</option>
                {animals.map((animal) => (
                  <option key={animal.name} value={animal.name}>
                    {animal.name}
                  </option>
                ))}
              </select>
              <label htmlFor="left-animal-count" className="block mt-2 mb-2">
                Count
              </label>
              <input
                id="left-animal-count"
                type="number"
                min="1"
                max="5"
                value={leftAnimalCount}
                onChange={handleLeftAnimalCountChange}
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="right-animal" className="block mb-2">
                Right Animal
              </label>
              <select
                id="right-animal"
                onChange={handleRightAnimalChange}
                className="form-select"
              >
                <option value="">Choose an animal</option>
                {animals.map((animal) => (
                  <option key={animal.name} value={animal.name}>
                    {animal.name}
                  </option>
                ))}
              </select>
              <label htmlFor="right-animal-count" className="block mt-2 mb-2">
                Count
              </label>
              <input
                id="right-animal-count"
                type="number"
                min="1"
                max="5"
                value={rightAnimalCount}
                onChange={handleRightAnimalCountChange}
                className="form-input"
              />
            </div>
          </div>
        </div>

        <div className="seesaw-container pointer-events-none">
          <div className="seesaw" style={{ transform: `rotate(${angle}deg)` }}>
            <div className="seesaw-bar"></div>
            <div className="seesaw-left-box" style={{ position: 'absolute' }}>
              {renderAnimalImages(leftAnimal, leftAnimalCount)}
            </div>
            <div className="seesaw-right-box" style={{ position: 'absolute' }}>
              {renderAnimalImages(rightAnimal, rightAnimalCount, true)}
            </div>
          </div>
          <div className="support"></div>
          <div className="ground"></div>
        </div>
      </div>
    </div>
  );
};

export default Seesaw;
