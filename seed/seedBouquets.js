require('dotenv').config();

const { sequelize, Bouquet } = require('../models');
const bouquetsServices = require('../services/bouquetsServices');

// Demo data mirrors the bouquets that used to live in the frontend's
// db.json (json-server mock), so the storefront looks the same once it
// switches over to this real API. photoURL is generated automatically by
// bouquetsServices.addBouquet(), exactly like a real POST request would.
const demoBouquets = [
  { title: 'Peach Meadow', description: 'A soft and radiant arrangement of peach and blush roses with lush greenery in a straw basket — light and natural.', price: 55, category: 'basket' },
  { title: 'Blush Romance', description: 'A premium bouquet of deep pink and ivory roses, complemented by silver eucalyptus — sophisticated and intimate.', price: 34, category: 'roses' },
  { title: 'Pastel Garden', description: 'A pastel-toned mix of spray roses and greenery in a woven basket — gentle, airy, and perfect for any occasion.', price: 40, category: 'basket' },
  { title: 'Tulip Charm', description: 'A vivid bouquet of bright tulips and roses in a lavender box — cheerful and full of charm.', price: 61, category: 'tulips' },
  { title: 'Berry Bloom', description: 'A lush mix of rich pink, purple, and cream blooms with textured greens — romantic and elegant.', price: 32, category: 'premium' },
  { title: 'Sweet Whisper', description: 'A charming spring bouquet with peonies, roses, and lilac-toned accents — fresh, lively, and expressive.', price: 40, category: 'spring' },
  { title: 'Field Joy', description: 'A rustic hand-tied bouquet of sunflowers, lisianthus, and daisies — perfect for brightening the day.', price: 49, category: 'summer' },
  { title: 'Soft Bloom', description: 'A delicate bouquet of pink carnations and roses wrapped in satin paper — soft, stylish, and versatile.', price: 37, category: 'roses' },
];

async function seed() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    const existingCount = await Bouquet.count();
    if (existingCount > 0) {
      console.log(`Skipping seed — bouquets table already has ${existingCount} row(s).`);
      return;
    }

    for (const data of demoBouquets) {
      await bouquetsServices.addBouquet(data);
    }

    console.log(`Seeded ${demoBouquets.length} bouquets.`);
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
}

seed();
