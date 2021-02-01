import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { AuthModule } from '../auth.module';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AuthModule],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
