const gravatar = require('gravatar');
const crypto = require('crypto');

/**
 * Generates a placeholder photo URL for a newly created bouquet.
 * Gravatar needs an "email-like" seed to hash — since bouquets don't have
 * one, we derive a unique seed from the title + a random token so every
 * bouquet gets its own identicon until a real photo is uploaded via
 * PATCH /api/bouquets/:id/photo.
 */
function generatePhotoURL(seedText = 'bouquet') {
  const uniqueSeed = `${seedText}-${crypto.randomBytes(4).toString('hex')}@flora.app`;

  return gravatar.url(
    uniqueSeed,
    { s: '250', r: 'pg', d: 'identicon' },
    true
  );
}

module.exports = generatePhotoURL;
