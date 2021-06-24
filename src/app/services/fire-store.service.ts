import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { keyHex, uniqueName } from './crypto.service';
import { AngularFireAuth } from '@angular/fire/auth';
export interface EncryptedItem {
  data: string;
  tag: string;
  iv: string;
}

@Injectable({
  providedIn: 'root'
})
export class FireStoreService {
  items = this.firestore.collection<EncryptedItem>('items');

  constructor(private readonly firestore: AngularFirestore, private readonly auth: AngularFireAuth) { }

  download(key: string) {
    return this.items.doc(key).valueChanges();
  }
  upload(item: EncryptedItem): Promise<string> {
    return this.items
      .doc(uniqueName)
      .set(item)
      .then(() => `${document.location}${uniqueName}/${keyHex}`);
  }

  login() {
    return this.auth.signInAnonymously();
  }

}
