import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth/auth.service';
import { AuthMethod } from './shared/models/auth-method.enum';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription, debounceTime, map } from 'rxjs';
import { LocalStorageService } from './shared/services/local-storage/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly subscription: Subscription = new Subscription();

  constructor(
    @Inject('AUTH_METHOD') public authMethod: AuthMethod,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.subscribeToUrlParamsChange();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private subscribeToUrlParamsChange(): void {
    this.subscription.add(
      this.activatedRoute.queryParamMap
        .pipe(
          debounceTime(1000),
          map((params: ParamMap) => params.get('code')),
        )
        .subscribe((code: string | null) => {
          if (code) {
            this.storeUserAuthorizationCode(code);
            this.navigateAndRemoveAllUrlParams();
          } else if (!code && this.hasAuthorizationCodeExpired()) {
            this.requestUserAuthorization();
          }
        }),
    );
  }

  private hasAuthorizationCodeExpired(now = new Date()): boolean {
    const code: string | null = this.localStorageService.get('code_value');
    const expiredOn: Date = new Date(
      this.localStorageService.get('code_will_be_expired_on') ||
        new Date(+now + 10000).toISOString(),
    );

    return !code || +now >= +expiredOn;
  }

  private requestUserAuthorization(): void {
    const delay = 2500;

    setTimeout(() => {
      this.authService.requestUserAuthorization();
    }, delay);
  }

  private storeUserAuthorizationCode(code: string, timestamp: Date = new Date()): void {
    this.localStorageService.set('code_value', code);
    this.localStorageService.set(
      'code_will_be_expired_on',
      new Date(timestamp.valueOf() + 3600000).toISOString(),
    );
  }

  private navigateAndRemoveAllUrlParams(): void {
    this.router.navigate(['']);
  }
}
