const bcrypt = require('bcrypt');

const SecurePassword = async(original) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hashSync(original,salt);
    return (hash)
}

module.exports = SecurePassword