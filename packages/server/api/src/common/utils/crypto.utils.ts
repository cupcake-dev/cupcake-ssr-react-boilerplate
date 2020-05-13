import { pbkdf2Sync, randomBytes } from 'crypto';

export function getHash(password, salt) {
  /**Generate Hash using Password based key derivative function (PBKDF2)*/
  return pbkdf2Sync(password, salt, 2048, 32, 'sha512').toString('hex');
}

export function hashPassword(password) {
  /** Salt is a pseudo-random data buffer contains raw bytes represented in hex*/
  const salt = randomBytes(32).toString('hex');
  const hash = getHash(password, salt);
  /** Return the salt + hash of the password*/
  return [salt, hash].join('$');
}

export function checkPassword(saltedPasswordHash, candidatePassword) {
  const originalHash = saltedPasswordHash.split('$')[1];
  const salt = saltedPasswordHash.split('$')[0];
  const hash = getHash(candidatePassword, salt);
  return hash === originalHash ? true : false;
}
