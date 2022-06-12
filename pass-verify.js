const bcrypt = require('bcrypt');

async function verifyPassword() {
  const myPassword = 'the pass';
  const hash = 'weasdwi142ui214124';
  const isMatch = await bcrypt.compare(myPassword, hash);
}
