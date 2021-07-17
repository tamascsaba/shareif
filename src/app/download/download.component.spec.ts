import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { EMPTY } from 'rxjs';

import { DownloadComponent } from './download.component';

import { AppModule } from '../app.module';
import { FireStoreService } from '../services/fire-store.service';
import { TextareaComponent } from '../upload/textarea/textarea.component';

describe('DownloadComponent', () => {
  let component: TextareaComponent;
  let fixture: ComponentFixture<TextareaComponent>;

  const activatedRouteMock: any = {
    snapshot: {
      params: {id: 'foo', key: 'bar'}
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [DownloadComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock
        },
        {
          provide: FireStoreService,
          useValue: {download: () => EMPTY}
        },
      ]
    });

    fixture = TestBed.createComponent(TextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })


  it('should create', () => {
    expect(fixture).toBeDefined();
  });
});
