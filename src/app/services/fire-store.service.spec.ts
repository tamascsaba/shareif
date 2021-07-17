import { TestBed } from '@angular/core/testing';
import { MockBuilder } from 'ng-mocks';

import { FireStoreService } from './fire-store.service';

import { AppModule } from '../app.module';

describe('FirebaseService', () => {
  let service: FireStoreService;

  beforeEach(() => MockBuilder(FireStoreService, AppModule));
  beforeEach(() => service = TestBed.inject(FireStoreService));

  it('should be created', () => {
    expect(service).toBeDefined();
  });
});
