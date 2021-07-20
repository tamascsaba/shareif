import {MockBuilder, MockedComponentFixture, MockRender, ngMocks} from 'ng-mocks';

import {TextareaComponent} from './textarea/textarea.component';
import {UploadComponent} from './upload.component';
import {UploadService} from './upload.service';

import {AppModule} from '../app.module';

describe('UploadComponent', () => {
  let fixture: MockedComponentFixture<UploadComponent>;
  let component: UploadComponent;

  beforeEach(() => MockBuilder(UploadComponent, AppModule).keep(UploadService).keep(TextareaComponent));
  beforeEach(() => (fixture = MockRender(UploadComponent)));
  beforeEach(() => (component = fixture.point.componentInstance));

  it('should create', () => {
    expect(fixture.point.componentInstance).toBeDefined();
  });

  it('should upload text', () => {
    console.log(fixture.point.nativeElement.innerHTML);
    ngMocks.find(TextareaComponent).componentInstance.textChange.emit('almafa');
  });
});
