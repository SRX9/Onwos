import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { VideodetailComponent } from './videodetail/videodetail.component';
import { VideoListComponent } from './video-list/video-list.component';
import { ResponsiveModule } from 'ngx-responsive';
import { LoginComponent } from './login/login.component';
import { ShowDetailComponent } from './show-detail/show-detail.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SeasondetailComponent } from './seasondetail/seasondetail.component';
import { PlayComponent } from './play/play.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatVideoModule } from 'mat-video';
import { RegisterComponent } from './register/register.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';

registerLocaleData(en);

const config = {
  breakPoints: {
    xs: { max: 600 },
    sm: { min: 601, max: 959 },
    md: { min: 0, max: 1000 },
    lg: { min: 1000, max: 4000 },
    xl: { min: 6000 }
  },
  debounceTime: 100
};
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    VideodetailComponent,
    VideoListComponent,
    LoginComponent,
    ShowDetailComponent,
    HomeComponent,
    ProfileComponent,
    SeasondetailComponent,
    PlayComponent,
    RegisterComponent,

  ],
  imports: [
    BrowserAnimationsModule,
    MatVideoModule,
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    NgxSmartModalModule.forRoot(),
    FormsModule,
    HttpClientModule,
    ResponsiveModule.forRoot(config),
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
