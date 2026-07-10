require('dotenv').config();

const { sequelize, Bouquet } = require('../models');
const bouquetsServices = require('../services/bouquetsServices');

const demoBouquets = [
  // 🌹 Roses
  {
    title: 'Crimson Romance',
    description:
      'A luxurious bouquet of premium red roses symbolizing deep love and timeless elegance. Perfect for anniversaries and romantic occasions.',
    price: 55,
    category: 'roses',
    favorite: true,
    photoURL: '/photos/bouquet-1.jpg',
  },
  {
    title: 'Velvet Passion',
    description:
      'Rich velvet-red roses carefully arranged to express passion and admiration.',
    price: 62,
    category: 'roses',
    favorite: true,
    photoURL: '/photos/bouquet-2.jpg',
  },
  {
    title: 'White Elegance',
    description:
      'Elegant white roses representing purity, grace, and sophistication.',
    price: 49,
    category: 'roses',
    favorite: false,
    photoURL: '/photos/bouquet-3.jpg',
  },
  {
    title: 'Blush Harmony',
    description:
      'Soft pink roses with delicate greenery creating a romantic atmosphere.',
    price: 53,
    category: 'roses',
    favorite: false,
    photoURL: '/photos/bouquet-4.jpg',
  },
  {
    title: 'Golden Sunset',
    description:
      'A warm combination of peach and yellow roses inspired by sunset colors.',
    price: 58,
    category: 'roses',
    favorite: false,
    photoURL: '/photos/bouquet-5.jpg',
  },
  {
    title: 'Eternal Love',
    description:
      'Classic long-stemmed roses arranged for unforgettable celebrations.',
    price: 65,
    category: 'roses',
    favorite: true,
    photoURL: '/photos/bouquet-6.jpg',
  },

  // 🌷 Tulips
  {
    title: 'Spring Melody',
    description:
      'Bright tulips in cheerful spring colors bringing freshness and happiness.',
    price: 38,
    category: 'tulips',
    favorite: false,
    photoURL: '/photos/bouquet-7.jpg',
  },
  {
    title: 'Sunny Morning',
    description:
      'Yellow tulips inspired by the warmth of a beautiful spring morning.',
    price: 36,
    category: 'tulips',
    favorite: false,
    photoURL: '/photos/bouquet-8.jpg',
  },
  {
    title: 'Purple Dream',
    description:
      'Elegant purple tulips with modern wrapping and premium presentation.',
    price: 44,
    category: 'tulips',
    favorite: true,
    photoURL: '/photos/bouquet-9.jpg',
  },
  {
    title: 'Fresh Touch',
    description:
      'Fresh seasonal tulips perfect for birthdays and joyful surprises.',
    price: 40,
    category: 'tulips',
    favorite: false,
    photoURL: '/photos/bouquet-10.jpg',
  },
  {
    title: 'Rainbow Tulips',
    description:
      'A colorful bouquet combining tulips in every shade of spring.',
    price: 48,
    category: 'tulips',
    favorite: true,
    photoURL: '/photos/bouquet-11.jpg',
  },

  // 🌸 Spring
  {
    title: 'Garden Bouquet',
    description:
      'A charming bouquet filled with fresh seasonal flowers and greenery.',
    price: 59,
    category: 'spring',
    favorite: false,
    photoURL: '/photos/bouquet-12.jpg',
  },
  {
    title: 'Country Bloom',
    description:
      'Rustic bouquet arrangement inspired by blooming countryside gardens.',
    price: 54,
    category: 'spring',
    favorite: false,
    photoURL: '/photos/bouquet-13.jpg',
  },
  {
    title: 'Rustic Charm',
    description:
      'Natural flowers beautifully arranged inside a handcrafted bouquet.',
    price: 63,
    category: 'spring',
    favorite: true,
    photoURL: '/photos/bouquet-14.jpg',
  },
  {
    title: 'Floral Treasure',
    description: 'Premium flowers arranged in an elegant bouquet.',
    price: 68,
    category: 'spring',
    favorite: false,
    photoURL: '/photos/bouquet-15.jpg',
  },
  {
    title: 'Blooming Bouquet',
    description:
      'A delightful mix of colorful flowers designed to brighten every room.',
    price: 57,
    category: 'spring',
    favorite: false,
    photoURL: '/photos/bouquet-16.jpg',
  },

  // 👑 Premium
  {
    title: 'Royal Elegance',
    description:
      'A luxurious designer bouquet created for unforgettable moments.',
    price: 95,
    category: 'premium',
    favorite: true,
    photoURL: '/photos/bouquet-17.jpg',
  },
  {
    title: 'Luxury Blossom',
    description:
      'Premium seasonal flowers carefully selected by expert florists.',
    price: 89,
    category: 'premium',
    favorite: true,
    photoURL: '/photos/bouquet-18.jpg',
  },
  {
    title: 'Diamond Bouquet',
    description:
      'Exclusive floral arrangement with elegant wrapping and premium blooms.',
    price: 99,
    category: 'premium',
    favorite: true,
    photoURL: '/photos/bouquet-19.jpg',
  },
  {
    title: 'Prestige Collection',
    description:
      'Sophisticated bouquet combining rare flowers and modern design.',
    price: 92,
    category: 'premium',
    favorite: false,
    photoURL: '/photos/bouquet-20.jpg',
  },
  {
    title: 'Imperial Garden',
    description:
      'Luxury bouquet designed for weddings, anniversaries, and celebrations.',
    price: 105,
    category: 'premium',
    favorite: true,
    photoURL: '/photos/bouquet-21.jpg',
  },

  // ☀ Summer
  {
    title: 'Summer Breeze',
    description:
      'Fresh summer flowers inspired by blooming gardens and sunny mornings.',
    price: 46,
    category: 'summer',
    favorite: false,
    photoURL: '/photos/bouquet-22.jpg',
  },
  {
    title: 'Cherry Blossom',
    description:
      'Soft pink blossoms creating a delicate and elegant composition.',
    price: 52,
    category: 'summer',
    favorite: true,
    photoURL: '/photos/bouquet-23.jpg',
  },
  {
    title: 'Morning Dew',
    description:
      'Fresh seasonal bouquet with light pastel colors and natural greenery.',
    price: 49,
    category: 'summer',
    favorite: false,
    photoURL: '/photos/bouquet-24.jpg',
  },
  {
    title: 'Floral Awakening',
    description:
      'A lively bouquet celebrating the beauty of summer.',
    price: 55,
    category: 'summer',
    favorite: false,
    photoURL: '/photos/bouquet-25.jpg',
  },
  {
    title: 'Fresh Garden',
    description:
      'A colorful summer arrangement bringing freshness into every home.',
    price: 51,
    category: 'summer',
    favorite: false,
    photoURL: '/photos/bouquet-26.jpg',
  },
  {
    title: 'Summer Sunset',
    description:
      'Bright summer flowers inspired by golden evening sunsets.',
    price: 60,
    category: 'summer',
    favorite: true,
    photoURL: '/photos/bouquet-27.jpg',
  },
];

async function seed() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    const existingCount = await Bouquet.count();

    if (existingCount > 0) {
      console.log(
        `Skipping seed — bouquets table already has ${existingCount} row(s).`
      );
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