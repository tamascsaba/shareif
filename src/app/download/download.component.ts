import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CryptoService } from '../services/crypto.service';
import { EncryptedItem, FireStoreService } from '../services/fire-store.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadComponent implements OnInit {
  public text!: Observable<string>;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly cryptoService: CryptoService,
    private readonly fireStoreService: FireStoreService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    const key = this.route.snapshot.params.key;

    this.text = this.fireStoreService
      .download(id)
      .pipe(map((encryptedItem: EncryptedItem | undefined) => {
        if (!encryptedItem) return 'This item not available';
        return this.cryptoService.decrypt(encryptedItem.data, encryptedItem.iv, encryptedItem.tag, key)
      })
    )
  }

}
