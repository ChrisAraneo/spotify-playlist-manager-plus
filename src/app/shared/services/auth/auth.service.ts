import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenResponse } from '../../model/token-response.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    @Inject('GRANT_TYPE') public grantType: string,
    @Inject('CLIENT_ID') public clientId: string,
    @Inject('CLIENT_SECRET') public clientSecret: string,
    private httpClient: HttpClient,
  ) {}

  fetchAccessToken(): Observable<TokenResponse> {
    return this.httpClient.post<TokenResponse>(
      'https://accounts.spotify.com/api/token',
      `grant_type=${this.grantType}&client_id=${this.clientId}&client_secret=${this.clientSecret}`,
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    );
  }
}
