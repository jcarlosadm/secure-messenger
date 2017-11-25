import forge from 'node-forge';

class BlockCipher {
  /*
  * callback: callback with two arguments (key, initVector)
  */
  genKeys() {
    const key = forge.random.getBytesSync(16);
    const initVector = forge.random.getBytesSync(16);

    return { key, initVector };
  }

  encrypt(message, key, initVector) {
    const cipher = forge.cipher.createCipher('AES-CBC', key);

    cipher.start({ iv: initVector });
    cipher.update(forge.util.createBuffer(forge.util.encodeUtf8(message)));
    cipher.finish();

    return cipher.output.toHex();
  }

  decrypt(message_, key, initVector) {
    const message = forge.util.hexToBytes(message_);
    const decipher = forge.cipher.createDecipher('AES-CBC', key);
    decipher.start({ iv: initVector });
    decipher.update(forge.util.createBuffer(message));
    decipher.finish();

    return forge.util.decodeUtf8(decipher.output);
  }

  jsonToKeys(jsonKey, jsonInitVector) {
    const key = JSON.parse(jsonKey);
    const initVector = JSON.parse(jsonInitVector);
    return { key, initVector };
  }

  keysToJson(key, initVector) {
    const jsonKey = JSON.stringify(key);
    const jsonInitVector = JSON.stringify(initVector);
    return { jsonKey, jsonInitVector };
  }
}

export default BlockCipher;
