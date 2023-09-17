import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './shared/services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, NgbModule, HttpClientModule],
  providers: [
    { provide: 'GRANT_TYPE', useValue: environment.grantType },
    { provide: 'CLIENT_ID', useValue: environment.clientId },
    { provide: 'CLIENT_SECRET', useValue: environment.clientSecret },
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
