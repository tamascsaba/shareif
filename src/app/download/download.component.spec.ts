import { DownloadComponent } from './download.component';
import { MockBuilder, MockRender } from 'ng-mocks';
import { AppModule } from '../app.module';
import { ActivatedRoute } from '@angular/router';
import { FireStoreService } from '../services/fire-store.service';
import { EMPTY } from 'rxjs';

describe('DownloadComponent', () => {
  const activatedRouteMock: any = {
    snapshot: {
      params: {id: 'foo', key: 'bar'}
    }
  }

  beforeEach(() => MockBuilder(DownloadComponent, AppModule)
    .mock(ActivatedRoute, activatedRouteMock)
    .mock(FireStoreService, {download: () => EMPTY})
  );

  it('should create', () => {
    const fixture = MockRender(DownloadComponent);
    expect(fixture).toBeDefined();
  });
});
