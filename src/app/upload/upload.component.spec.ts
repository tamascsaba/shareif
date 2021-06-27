import { MockBuilder, MockRender } from 'ng-mocks';
import { UploadComponent } from './upload.component';
import { AppModule } from '../app.module';
import { DownloadComponent } from '../download/download.component';

describe('UploadComponent', () => {

  beforeEach(() => MockBuilder(UploadComponent, AppModule));

  it('should create', () => {
    const fixture = MockRender(DownloadComponent);
    expect(fixture.point.componentInstance).toBeDefined()
  });
});
