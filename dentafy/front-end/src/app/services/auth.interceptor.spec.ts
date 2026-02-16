import { HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { of } from 'rxjs';
import { authInterceptor } from './auth.interceptor';

describe('authInterceptor', () => {
  afterEach(() => localStorage.clear());

  it('adds Authorization header when token exists', () => {
    localStorage.setItem('dentafy_token', 'my-token');

    const req = new HttpRequest('POST', '/graphql', {});
    const next: HttpHandlerFn = (r) => {
      expect(r.headers.get('Authorization')).toBe('Bearer my-token');
      return of(null as any);
    };

    authInterceptor(req, next);
  });

  it('does not add header when no token', () => {
    const req = new HttpRequest('POST', '/graphql', {});
    const next: HttpHandlerFn = (r) => {
      expect(r.headers.has('Authorization')).toBe(false);
      return of(null as any);
    };

    authInterceptor(req, next);
  });
});
