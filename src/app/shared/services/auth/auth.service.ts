import { HttpClient, HttpParams } from '@angular/common/http';
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

  fetchAccessTokenUsingPKCEFlow(): Observable<TokenResponse> {
    const codeVerifier = this.generateCodeVerifier();
    const codeChallenge = this.generateCodeChallenge(codeVerifier);

    const scope = 'user-read-private user-read-email';
    const redirectUrl = 'http://localhost:4200/callback';
    const state = this.generateState();
    const params = new HttpParams()
      .set('response_type', 'code')
      .set('client_id', this.clientId)
      .set('scope', scope)
      .set('redirect_url', redirectUrl)
      .set('state', state)
      .set('code_challenge_method', 'S256')
      .set('code_challenge', codeChallenge);

    this.storeCodeVerifier(codeVerifier);

    return this.httpClient.get<TokenResponse>('https://accounts.spotify.com/authorize', {
      params,
    });
  }

  private generateCodeVerifier(): string {
    const array = new Uint32Array(56 / 2);
    window.crypto.getRandomValues(array);
    return Array.from(array, (n) => ('0' + n.toString(16)).substring(-2)).join('');
  }

  private generateCodeChallenge(codeVerifier: string): string {
    return btoa(this.hashTextUsingSHA256(codeVerifier))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  private hashTextUsingSHA256(plainText: string): string {
    return CryptoJS.SHA256(plainText).toString();
  }

  private generateState(): string {
    return this.getRandomString(16);
  }

  private getRandomString(length: number): string {
    const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let counter = 0;
    let result = '';
    while (counter < length) {
      result += this.getRandomChar(CHARACTERS);
      counter += 1;
    }

    return result;
  }

  private getRandomChar(string: string): string {
    return string.charAt(this.getRandomDecimalNumber(0, string.length - 1));
  }

  private getRandomDecimalNumber(min: number, max: number): number {
    const MAX_VALUE = 4294967295;
    const numberOfRandomDecimals = Math.ceil((max - min) / MAX_VALUE);

    const cryptoRandomNumbers = new Uint32Array(numberOfRandomDecimals);
    crypto.getRandomValues(cryptoRandomNumbers);

    let sum = 0;
    for (let i = 0; i < cryptoRandomNumbers.length; i++) {
      sum += cryptoRandomNumbers[i];
    }

    const randomDecimal = sum / (MAX_VALUE * numberOfRandomDecimals);

    return randomDecimal === 1
      ? this.getRandomDecimalNumber(min, max)
      : Math.floor(randomDecimal * (max - min + 1) + min);
  }

  private storeCodeVerifier(codeVerifier: string): void {
    localStorage.setItem('code_verifier', codeVerifier);
  }
}
