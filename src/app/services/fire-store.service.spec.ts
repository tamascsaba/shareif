import { TestBed } from '@angular/core/testing';

import { FireStoreService } from './fire-store.service';

import { AppModule } from '../app.module';

describe('FirebaseService', () => {
  let service: FireStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    });
    service = TestBed.inject(FireStoreService);
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });
});
