import { Injectable } from '@angular/core';
import { random, cipher, util} from 'node-forge';
import { adjectives, animals, colors, NumberDictionary, uniqueNamesGenerator, } from 'unique-names-generator';

import { EncryptedItem } from './fire-store.service';

const key = random.getBytesSync(32);
export const iv = random.getBytesSync(32);

export const keyHex = util.bytesToHex(key);
export const uniqueName = uniqueNamesGenerator({ dictionaries: [
  adjectives, colors, animals, NumberDictionary.generate({ min: 0, max: 99999 })
]});

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }

  public encrypt(value: string): EncryptedItem {
    const blockCipher = cipher.createCipher('AES-GCM', key);

    blockCipher.start({iv});
    blockCipher.update(util.createBuffer(value));
    blockCipher.finish();

    return {
      data: blockCipher.output.data,
      tag: blockCipher.mode.tag.data,
      iv
    }
  }

  public decrypt(data: string, iv: string, tag: string, key: string) {
    const decipher = cipher.createDecipher('AES-GCM', util.hexToBytes(key));

    decipher.start({iv, tag: new util.ByteStringBuffer(tag)});
    decipher.update(new util.ByteStringBuffer(data));

    return decipher.finish() ? decipher.output.data : 'Incorrect data authentication!';
  }
}
