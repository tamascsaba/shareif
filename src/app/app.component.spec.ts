import {Location} from '@angular/common';
import {TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {MockBuilder, MockRender} from 'ng-mocks';

import {routes} from './app-routing.module';
import {AppComponent} from './app.component';
import {AppModule} from './app.module';

describe('AppComponent', () => {
  beforeEach(() => MockBuilder(AppComponent, AppModule).keep(RouterTestingModule.withRoutes(routes)));

  it('should create', () => {
    const fixture = MockRender(AppComponent);
    expect(fixture.point.componentInstance).toBeInstanceOf(AppComponent);
    expect(fixture).toBeTruthy();
  });

  it('should create', () => {
    const fixture = MockRender<AppComponent>(`<app-root title="alma"></app-root>`);
    expect(fixture.point.componentInstance).toBeInstanceOf(AppComponent);
    expect(fixture.point.componentInstance.title).toEqual('alma');
    expect(fixture).toBeTruthy();
  });

  it('should navigate download page', async () => {
    MockRender<AppComponent>(`<app-root title="alma"></app-root>`);
    const router = TestBed.inject(Router);
    router.initialNavigation();
    await router.navigate(['foo/bar']);
    const location = TestBed.inject(Location);

    expect(location.path()).toContain('foo/bar');
  });
});
