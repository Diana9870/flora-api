require('dotenv').config();

const { sequelize, Bestseller } = require('../models');
const bestsellersServices = require('../services/bestsellersServices');

// Reuses the bouquet photos already shipped in /public/photos — bestsellers
// are simply the top-selling arrangements from the same catalog, so it
// makes sense for them to share the same photo set instead of needing a
// separate upload step.
const demoBestsellers = [
  {
    title: 'Crimson Romance',
    description:
      'Our #1 best-seller: premium red roses in a classic hand-tied arrangement, chosen by hundreds of customers for anniversaries and declarations of love.',
    price: 55,
    category: 'roses',
    salesCount: 482,
    photoURL: '/photos/bouquet-1.jpg',
  },
  {
    title: 'Royal Elegance',
    description:
      'A luxurious designer bouquet that consistently tops our premium collection — rich textures, rare blooms, and unforgettable presentation.',
    price: 95,
    category: 'premium',
    salesCount: 417,
    photoURL: '/photos/bouquet-17.jpg',
  },
  {
    title: 'Spring Melody',
    description:
      'Bright seasonal tulips that fly off the shelves every spring — a cheerful, affordable favorite for birthdays and thank-you gifts.',
    price: 38,
    category: 'tulips',
    salesCount: 389,
    photoURL: '/photos/bouquet-7.jpg',
  },
  {
    title: 'Cherry Blossom',
    description:
      'Delicate pink blossoms with an elegant, airy silhouette — one of our most photographed and most requested summer arrangements.',
    price: 52,
    category: 'summer',
    salesCount: 356,
    photoURL: '/photos/bouquet-23.jpg',
  },
  {
    title: 'Velvet Passion',
    description:
      'Deep velvet-red roses arranged for maximum impact — a long-time favorite for proposals and milestone celebrations.',
    price: 62,
    category: 'roses',
    salesCount: 341,
    photoURL: '/photos/bouquet-2.jpg',
  },
  {
    title: 'Rustic Charm',
    description:
      'Natural, garden-style blooms in a handcrafted arrangement — customers love how effortlessly elegant it looks on any table.',
    price: 63,
    category: 'spring',
    salesCount: 318,
    photoURL: '/photos/bouquet-14.jpg',
  },
  {
    title: 'Diamond Bouquet',
    description:
      'Our most exclusive arrangement, wrapped in premium paper with rare seasonal blooms — a top pick for weddings and VIP gifting.',
    price: 99,
    category: 'premium',
    salesCount: 302,
    photoURL: '/photos/bouquet-19.jpg',
  },
  {
    title: 'Rainbow Tulips',
    description:
      'A colorful, joyful mix of tulips in every spring shade — consistently one of our best-reviewed budget-friendly bouquets.',
    price: 48,
    category: 'tulips',
    salesCount: 287,
    photoURL: '/photos/bouquet-11.jpg',
  },
  {
    title: 'Summer Sunset',
    description:
      'Warm golden and coral tones inspired by summer evenings — a customer favorite for outdoor parties and warm-weather gifting.',
    price: 60,
    category: 'summer',
    salesCount: 265,
    photoURL: '/photos/bouquet-27.jpg',
  },
  {
    title: 'White Elegance',
    description:
      'Timeless white roses with a clean, sophisticated look — the go-to choice for sympathy arrangements and formal occasions.',
    price: 49,
    category: 'roses',
    salesCount: 251,
    photoURL: '/photos/bouquet-3.jpg',
  },
  {
    title: 'Floral Treasure',
    description:
      'Premium seasonal blooms hand-selected by our florists — a reliable best-seller among returning customers.',
    price: 68,
    category: 'spring',
    salesCount: 233,
    photoURL: '/photos/bouquet-15.jpg',
  },
  {
    title: 'Imperial Garden',
    description:
      'A grand, luxury arrangement designed for weddings and anniversaries — small volume, but our highest-rated bouquet overall.',
    price: 105,
    category: 'premium',
    salesCount: 214,
    photoURL: '/photos/bouquet-21.jpg',
  },
];

async function seed() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    const existingCount = await Bestseller.count();

    if (existingCount > 0) {
      console.log(
        `Skipping seed — bestsellers table already has ${existingCount} row(s).`
      );
      return;
    }

    for (const data of demoBestsellers) {
      await bestsellersServices.addBestseller(data);
    }

    console.log(`Seeded ${demoBestsellers.length} bestsellers.`);
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
}

seed();
