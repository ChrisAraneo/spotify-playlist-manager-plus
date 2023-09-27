import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './shared/services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PlaylistListModule } from './playlist-list/playlist-list.module';
import { ApiClientService } from './shared/services/api-client/api-client.service';
import { LocalStorageService } from './shared/services/local-storage/local-storage.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgbModule, HttpClientModule, PlaylistListModule, AppRoutingModule],
  providers: [
    { provide: 'AUTH_METHOD', useValue: environment.authMethod },
    { provide: 'GRANT_TYPE', useValue: environment.grantType },
    { provide: 'CLIENT_ID', useValue: environment.clientId },
    { provide: 'CLIENT_SECRET', useValue: environment.clientSecret },
    AuthService,
    ApiClientService,
    LocalStorageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
