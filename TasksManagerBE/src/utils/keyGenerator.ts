import { generateKeyPairSync } from "crypto";
import fs from 'fs';

const generate = () => {
    const {publicKey, privateKey} = generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
          },
          privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
          }
    })
    fs.writeFileSync('./keys/pub.key', publicKey)
    fs.writeFileSync('./keys/priv.key', privateKey)
}

generate();