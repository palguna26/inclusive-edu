export const LESSONS = [
  {
    id: 'solar-system',
    title: 'Solar System',
    caption: 'Planets orbit the Sun due to gravity. Click a planet to learn more.',
    models: [
      // Using simple A-Frame primitives; real apps can load .glb via a-asset-item
      { id: 'sun', primitive: 'sphere', position: '0 1.6 -4', radius: 1, color: '#FDB813' },
      { id: 'earth', primitive: 'sphere', position: '2 1.6 -4', radius: 0.5, color: '#2E86DE' },
      { id: 'mars', primitive: 'sphere', position: '-2 1.6 -4', radius: 0.4, color: '#C1440E' },
    ],
    sounds: {
      click: null,
    },
    tts: {
      sun: 'The Sun is a star that provides energy to the Solar System.',
      earth: 'Earth is our home planet with abundant life and water.',
      mars: 'Mars is known as the red planet.',
    }
  },
  {
    id: 'heart',
    title: 'Human Heart',
    caption: 'Explore the chambers of the heart and blood flow.',
    models: [
      { id: 'heart', primitive: 'box', position: '0 1.6 -3', depth: 0.6, height: 0.6, width: 0.6, color: '#E74C3C' },
    ],
    sounds: { click: null },
    tts: { heart: 'The human heart pumps blood through the body.' }
  },
  {
    id: 'atom',
    title: 'Atom Structure',
    caption: 'Protons and neutrons in the nucleus, electrons orbit around.',
    models: [
      { id: 'nucleus', primitive: 'sphere', position: '0 1.6 -3', radius: 0.4, color: '#9B59B6' },
      { id: 'electron1', primitive: 'sphere', position: '1 1.6 -3', radius: 0.1, color: '#1ABC9C' },
      { id: 'electron2', primitive: 'sphere', position: '-1 1.6 -3', radius: 0.1, color: '#1ABC9C' },
    ],
    sounds: { click: null },
    tts: { nucleus: 'The nucleus contains protons and neutrons.', electron1: 'Electrons orbit the nucleus.', electron2: 'Electrons carry negative charge.' }
  }
]


