require('dotenv').config();

const { sequelize, Feedback } = require('../models');
const feedbackServices = require('../services/feedbackServices');

const demoFeedback = [
  {
    author: 'Emma T.',
    text: 'Flora made my anniversary unforgettable with their beautiful arrangement! The roses were still fresh a full week later.',
    rating: 5,
  },
  {
    author: 'Daniel R.',
    text: 'Absolutely stunning bouquet! It looked even better than the photo and arrived right on time for my mom’s birthday.',
    rating: 5,
  },
  {
    author: 'Olivia M.',
    text: 'The service was exceptional, and the flowers were fresh. Ordering was quick and the delivery driver was very polite.',
    rating: 5,
  },
  {
    author: 'Nathan P.',
    text: 'Great selection and easy checkout. My only complaint is that delivery took a bit longer than the estimated window.',
    rating: 4,
  },
  {
    author: 'Sophia K.',
    text: 'I ordered the Royal Elegance bouquet for a client meeting and it made a fantastic impression. Will definitely order again.',
    rating: 5,
  },
  {
    author: 'Marcus L.',
    text: 'Beautiful tulips, great value for the price. Packaging kept everything in perfect shape during shipping.',
    rating: 4,
  },
  {
    author: 'Isabella C.',
    text: 'The customer support team helped me change my delivery address last minute and everything still arrived on schedule. Really impressed!',
    rating: 5,
  },
  {
    author: 'Ethan W.',
    text: 'Lovely flowers overall, though the bouquet was slightly smaller than I expected from the pictures on the site.',
    rating: 3,
  },
];

async function seed() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    const existingCount = await Feedback.count();

    if (existingCount > 0) {
      console.log(
        `Skipping seed — feedbacks table already has ${existingCount} row(s).`
      );
      return;
    }

    for (const data of demoFeedback) {
      await feedbackServices.addFeedback(data);
    }

    console.log(`Seeded ${demoFeedback.length} feedback entries.`);
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
}

seed();
