import { NgModule }                 from '@angular/core'
import { BrowserModule }            from '@angular/platform-browser'
import { HttpModule, JsonpModule }  from '@angular/http';

import { AppComponent }             from './app.component'
import { TumblrPicturesComponent }  from './twitter-timeline.component'
import { LoginComponent }           from './component/login.component'
import { LoginTwitterComponent }    from './component/login-twitter.component'

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule
  ],
  declarations: [
    AppComponent,
    TumblrPicturesComponent,
    LoginComponent,
    LoginTwitterComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
