const forge = require('node-forge');

class RSAManager {

  /*
  * generate keys
  * callback: callback function with one argument (keyPair)
  */
  genKeys(callback) {
    const rsa = forge.pki.rsa;
    rsa.generateKeyPair({ bits: 512, workers: 4 }, (err, keyPair) => {
      callback(keyPair);
    });
  }

  encrypt(message, publicKey) {
    return publicKey.encrypt(forge.util.encodeUtf8(message));
  }

  decrypt(encrypted, privateKey) {
    return forge.util.decodeUtf8(privateKey.decrypt(encrypted));
  }
}

export default RSAManager;
