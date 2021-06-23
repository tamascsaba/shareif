import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

const MAX_FILE_SIZE = 2097152; // 2 MiB

export enum DragProgress {
  LEAVE_PAGE,
  OVER_BOX,
  DROP,
  LEAVE_BOX,
}

enum UploadState {
  DEFAULT,
  UPLOADING,
  TEXTAREA,
  ERROR,
}

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadComponent implements OnInit {
  DragProgress = DragProgress;
  UploadState = UploadState;
  public textControl = new FormControl('', Validators.required);
  public dragProgress = new BehaviorSubject<DragProgress>(DragProgress.LEAVE_PAGE);
  public uploadState = new BehaviorSubject<UploadState>(UploadState.TEXTAREA);

  private destroy = new Subject<boolean>();

  constructor() {}

  public ngOnInit(): void {
    this.textControl.valueChanges
      .pipe(
        takeUntil(this.destroy),
        filter(value => !!value),
        map(value => value.length),
      )
      .subscribe(this.isValid);
  }

  @HostListener('document:dragenter')
  public dragEnter() {
    this.uploadState.next(UploadState.DEFAULT);
    this.setDefault();
  }

  @HostListener('document:dragleave')
  public leavePage() {
    this.dragProgress.next(DragProgress.LEAVE_PAGE);
  }

  @HostListener('dragover', ['$event'])
  public dragOver(event: DragEvent) {
    UploadComponent.stopEvent(event);
    this.dragProgress.next(DragProgress.OVER_BOX);
  }

  @HostListener('dragleave', ['$event'])
  public dragLeave() {
    this.dragProgress.next(DragProgress.LEAVE_BOX);
  }

  @HostListener('drop', ['$event'])
  public dragDrop(event: DragEventInit) {
    UploadComponent.stopEvent(event);
    this.dragProgress.next(DragProgress.DROP);
    this.processFile(event.dataTransfer?.files?.[0]);
  }

  public uploadText() {
    this.uploadState.next(UploadState.UPLOADING);
    console.log(this.textControl.value);
  }

  private setDefault() {
    this.textControl.reset();
  }

  private isValid(size: number): boolean {
    if (size > MAX_FILE_SIZE) {
      this.setError();
      return false;
    }
    return true
  }

  private processFile(file: File | undefined) {
    if (!file) return;
    if (!this.isValid(file.size)) return;

    this.uploadState.next(UploadState.UPLOADING);

    const fileReader = new FileReader();
    fileReader.onload = (event: ProgressEvent<FileReader>) => {
      this.uploadState.next(UploadState.TEXTAREA);
      this.textControl.setValue(event.target?.result);
    };

    fileReader.readAsText(file);
  }

  private setError() {
    this.uploadState.next(UploadState.ERROR);
    this.setDefault();
    setTimeout(() => {
      this.uploadState.next(UploadState.TEXTAREA);
    }, 2000);
  }

  private static stopEvent(event: any) {
    event.stopPropagation();
    event.preventDefault();
  }
}
