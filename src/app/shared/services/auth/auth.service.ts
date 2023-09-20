import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenResponse } from '../../models/token-response.type';
import * as CryptoJS from 'crypto-js';

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
    const codeVerifier = this.generateCodeVerifier();
    const codeVerifierHash = this.hashTextUsingSHA256(codeVerifier);

    throw Error('Fetching authorization code with PKCE flow is not implemented yet.');
  }

  private generateCodeVerifier(): string {
    const array = new Uint32Array(56 / 2);
    window.crypto.getRandomValues(array);
    return Array.from(array, (n) => ('0' + n.toString(16)).substring(-2)).join('');
  }

  private hashTextUsingSHA256(plainText: string): string {
    return CryptoJS.SHA256(plainText).toString();
  }
}
