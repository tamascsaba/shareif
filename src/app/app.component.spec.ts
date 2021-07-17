import { MockBuilder, MockRender } from 'ng-mocks';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';

describe('AppComponent', () => {
  beforeEach(() => MockBuilder(AppComponent, AppModule));

  it('should create the app', () => {
    const fixture = MockRender(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'shareif'`, () => {
    const fixture = MockRender(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('shareif');
  });
});
