import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, ReplaySubject, Subscriber } from 'rxjs';

import { CryptoService } from '../services/crypto.service';
import { FireStoreService } from '../services/fire-store.service';

export const MAX_FILE_SIZE = 2097152; // 2 MiB
export const ERROR_TIMEOUT = 3000; // 3sec

export enum DragProgress {
  LEAVE_PAGE,
  OVER_BOX,
  DROP,
  LEAVE_BOX,
}

export enum UploadState {
  DEFAULT,
  UPLOADING,
  TEXTAREA,
  ERROR,
}

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  public uploadState = new BehaviorSubject<UploadState>(UploadState.TEXTAREA);
  public errorMessage = new ReplaySubject(1);

  constructor(private readonly cryptoService: CryptoService, private readonly fireStoreService: FireStoreService) { }

  public upload(text: string): Observable<string | null> {
    this.uploadState.next(UploadState.UPLOADING);
    const data = this.cryptoService.encrypt(text);
    return from(this.fireStoreService.upload(data)
      .catch(() => this.setError('Upload error'))
      .then((url: string | null) => {
        this.uploadState.next(UploadState.TEXTAREA);
        return url;
      }));
  }

  public processFile(file: File | undefined) {
    return new Observable((subscriber: Subscriber<string | ArrayBuffer | null | undefined>) => {
      if (!file || !this.isValid(file.size)) {
        subscriber.complete();
        return;
      }
      this.uploadState.next(UploadState.UPLOADING);

      const fileReader = new FileReader();
      fileReader.onload = (event: ProgressEvent<FileReader>) => {
        this.uploadState.next(UploadState.TEXTAREA);
        subscriber.next(event.target?.result)
        subscriber.complete();
      };

      fileReader.readAsText(file);
    })
  }

  private setError(message?: string) {
    this.uploadState.next(UploadState.ERROR);
    this.errorMessage.next(message);

    setTimeout(() => this.uploadState.next(UploadState.TEXTAREA), ERROR_TIMEOUT);

    return null;
  }

  private isValid(size: number): boolean {
    if (size > MAX_FILE_SIZE) {
      this.setError('Text is too large');
      return false;
    }
    return true
  }
}
