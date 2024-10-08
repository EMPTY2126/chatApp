import crypto from 'crypto';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const genKeyPair = () => {
    const keyPair = crypto.generateKeyPairSync("rsa", {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: "pkcs1",
            format: "pem"
        },
        privateKeyEncoding: {
            type: "pkcs1",
            format: "pem"
        }
    });

    fs.writeFileSync(`${__dirname}/id_rsa_pub.pem`, keyPair.publicKey);
    fs.writeFileSync(`${__dirname}/id_rsa_priv.pem`, keyPair.privateKey);
}

genKeyPair();
