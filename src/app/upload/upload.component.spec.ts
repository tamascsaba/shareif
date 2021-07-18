import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadComponent } from './upload.component';

import { AppModule } from '../app.module';
import { DownloadComponent } from '../download/download.component';

describe('UploadComponent', () => {
  let component: DownloadComponent;
  let fixture: ComponentFixture<DownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeDefined()
  });
});
