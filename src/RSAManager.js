import { AsyncStorage } from 'react-native';
import forge from 'node-forge';

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

  /*
  * return: encrypted message
  */
  encrypt(message, publicKey) {
    return publicKey.encrypt(forge.util.encodeUtf8(message));
  }

  /*
  * return: decrypted message
  */
  decrypt(encrypted, privateKey) {
    return forge.util.decodeUtf8(privateKey.decrypt(encrypted));
  }

  /*
  * callback: callback function without arguments
  */
  savePrivateKeyLocally(privateKey, uid, callback) {
    AsyncStorage.setItem(uid,
      JSON.stringify(forge.pki.privateKeyToAsn1(privateKey)), () => {
        callback();
      });
  }

  /*
  * callback: callback function with one argument (privateKey)
  */
  getPrivateKeyLocally(uid, callback) {
    AsyncStorage.getItem(uid, (err, value) => {
      const privateKey = forge.pki.privateKeyFromAsn1(JSON.parse(value));
      callback(privateKey);
    });
  }

  publicKeyToJson(publicKey) {
    return (publicKey ? JSON.stringify(forge.pki.publicKeyToAsn1(publicKey)) : null);
  }

  jsonToPublicKey(jsonData) {
    return (jsonData ? forge.pki.publicKeyFromAsn1(JSON.parse(jsonData)) : null);
  }
}

export default RSAManager;
