import { Component } from '@angular/core'
import { Request, RequestMethod, Headers, RequestOptions, Http, Jsonp, URLSearchParams, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'login-twitter',
  template: `
    <div>
      <button (click)='clickLoginButton()' type='button'>Twitter 認証</button>
      <button (click)='clickGetStatus()' type='button'>Tweet 取得</button>
    </div>
    <div>
      <article *ngFor='let t of tweets'>
        <img src={{t.media_url_https}} alt={{t.media_url_httpsl}} />
        <div class='description-wrapper'>
          <p>
            <img class="profile_image" src={{t.profile_image}} alt={{t.profile_image}} />
            {{t.name}}
          </p>
          <p>{{t.text}}</p>
        </div>
      </article>
      <article *ngFor='let t of tweets'>
        <img src={{t.media_url_https}} alt={{t.media_url_httpsl}} />
        <div class='description-wrapper'>
          <p>
            <img class="profile_image" src={{t.profile_image}} alt={{t.profile_image}} />
            {{t.name}}
          </p>
          <p>{{t.text}}</p>
        </div>
      </article>
      <article *ngFor='let t of tweets'>
        <img src={{t.media_url_https}} alt={{t.media_url_httpsl}} />
        <div class='description-wrapper'>
          <p>
            <img class="profile_image" src={{t.profile_image}} alt={{t.profile_image}} />
            {{t.name}}
          </p>
          <p>{{t.text}}</p>
        </div>
      </article>
      <article *ngFor='let t of tweets'>
        <img src={{t.media_url_https}} alt={{t.media_url_httpsl}} />
        <div class='description-wrapper'>
          <p>
            <img class="profile_image" src={{t.profile_image}} alt={{t.profile_image}} />
            {{t.name}}
          </p>
          <p>{{t.text}}</p>
        </div>
      </article>
    </div>
  `,
  styles: [`
    article {
      background: #fff;
      border-radius: 3px;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
      display: inline-block;
      margin: 10px;
      width: 300px;
    }

    .description-wrapper {
      margin: 10px;    
    }
  `]
})
export class LoginTwitterComponent {
  private accessToken: String
  private tweets: Array<String>

  constructor(private http: Http, private jsonp: Jsonp) { }

  private clickLoginButton(event) {
    this.http.get('/api/getTwitterToken')
      .subscribe(r => {
        this.accessToken = r.json().access_token
      })
  }

  private clickGetStatus(event) {
    this.http.get('/api/getTweetStatus')
      .subscribe(r => {
        const json = r.json()
        this.tweets = json.extended_entities
          .media.map(m => {
            return {
              'media_url_https': m.media_url_https,
              'name': `${json.user.name}(@${json.user.screen_name})`,
              'profile_image': json.user.profile_image_url_https,
              'text': json.text
            }
          })
      })
  }
}