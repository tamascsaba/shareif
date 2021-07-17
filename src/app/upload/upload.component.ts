import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { UploadService } from './upload.service'

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadComponent {
  public url = new Subject<string | null>();
  public text = '';

  constructor(private readonly uploadService: UploadService) {}

  public change(text: string) {
    this.text = text;
  }

  public upload(text: string) {
    this.uploadService
      .upload(text)
      .pipe(distinctUntilChanged())
      .subscribe(this.url)
  }
}
