import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { DragProgress, UploadService, UploadState } from '../upload.service'

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {
  public DragProgress = DragProgress;
  public UploadState = UploadState;

  public dragProgress = new BehaviorSubject<DragProgress>(DragProgress.LEAVE_PAGE);
  public uploadState = this.uploadService.uploadState;
  public errorMessage = this.uploadService.errorMessage;

  public textControl = new FormControl('', Validators.required);

  @Output() textChange = new EventEmitter<string>();

  constructor(private readonly uploadService: UploadService) { }

  ngOnInit(): void {
    this.textControl.valueChanges.subscribe(this.textChange);
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
    TextareaComponent.stopEvent(event);
    this.dragProgress.next(DragProgress.OVER_BOX);
  }

  @HostListener('dragleave', ['$event'])
  public dragLeave() {
    this.dragProgress.next(DragProgress.LEAVE_BOX);
  }

  @HostListener('drop', ['$event'])
  public dragDrop(event: DragEventInit) {
    TextareaComponent.stopEvent(event);
    this.dragProgress.next(DragProgress.DROP);
    this.uploadService.processFile(event.dataTransfer?.files?.[0])
      .subscribe();
  }

  private setDefault() {
    this.textControl.reset();
  }

  private static stopEvent(event: any) {
    event.stopPropagation();
    event.preventDefault();
  }

}
