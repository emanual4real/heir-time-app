import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { autoLoginResolver } from './auto-login.resolver';

describe('autoLoginResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => autoLoginResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
