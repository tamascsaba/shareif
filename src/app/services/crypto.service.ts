import { Injectable } from '@angular/core';
import { random, cipher, util} from 'node-forge';
import { EncryptedItem } from './fire-store.service';
import { adjectives, animals, colors, uniqueNamesGenerator } from 'unique-names-generator';

const key = random.getBytesSync(32);
const iv = random.getBytesSync(32);

export const keyHex = util.bytesToHex(key);
export const ivHex = util.bytesToHex(iv);
export const uniqueName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });

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
