
import bcrypt from 'bcrypt'

export async function encryptPassword(myPassword) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(myPassword, salt)
    return hashedPassword;
}

export async function decryptPassword(myPassword, hashedPassword) {
    return await bcrypt.compare(myPassword, hashedPassword);
}
