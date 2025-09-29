import { useState } from 'react'

function App() {
  const [color, setColor] = useState('olive');

  const colors = [
    { name: 'Red', value: 'red', textColor: 'text-white' },
    { name: 'Blue', value: 'blue', textColor: 'text-white' },
    { name: 'Green', value: 'green', textColor: 'text-white' },
    { name: 'Yellow', value: 'yellow', textColor: 'text-black' },
    { name: 'Purple', value: 'purple', textColor: 'text-white' },
    { name: 'Pink', value: 'pink', textColor: 'text-black' },
    { name: 'Orange', value: 'orange', textColor: 'text-black' },
    { name: 'Gray', value: 'gray', textColor: 'text-white' },
    { name: 'Black', value: 'black', textColor: 'text-white' },
    { name: 'White', value: 'white', textColor: 'text-black' }
  ];

  return (
    <>
      <div className="w-full h-screen" style={{ backgroundColor: color }}>
        <div className='fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2'>
          <div className="flex flex-wrap justify-center bg-white p-4 rounded-lg gap-3 shadow-lg">
            {colors.map((colorObj) => (
              <button
                key={colorObj.value}
                onClick={() => setColor(colorObj.value)}
                className={`px-4 py-2 rounded transition-all hover:scale-105 hover:opacity-90 ${colorObj.textColor} hover:cursor-pointer`}
                style={{ backgroundColor: colorObj.value }}
              >
                {colorObj.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App