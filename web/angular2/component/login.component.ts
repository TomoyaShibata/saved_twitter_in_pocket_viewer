import { Component } from '@angular/core'
import { Request, RequestMethod, Headers, RequestOptions, Http, Jsonp, URLSearchParams, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Component({
  selector: 'login',
  styles: [`
    article {
      background: #fff;
      border-radius: 3px;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
      display: inline-block;
      margin: 10px;
      width: 300px;
    }

    .media {
      filter: blur(30px);
      max-width: 100%;
    }
  `],
  template: `
    <section>
      <button (click)='clickLoginButton()' type='button'>Pocket 認証</button>
      <button (click)='clickGetPocketItems()' type='button'>Pocket アイテム取得</button>
    </section>
    <section>
      <article *ngFor='let tweet of tweets'>
        <ng-container *ngFor='let imgSrc of tweet.mediaUrlHttpses'>
          <img class='media' src={{imgSrc}} alt='tweet_media' />
        </ng-container>
        <p class='user-info'>
          <img src={{tweet.profileImageUrlHttps}} alt='profile_image_url_https' />
          <a href="#">{{tweet.userName}}</a>
        </p>
        <p class='text'>
          {{tweet.text}}
        </p>
        <p class='created-at'>{{tweet.createdAt}}</p>
      </article>
    </section>
  `
})
export class LoginComponent {
  private tweets: Array<Object>

  constructor(private http: Http) { }

  private clickLoginButton(event) {
    const res = this.http.get('/api/getRequestCode')
      .map(this.extractData)
      .catch(this.handleError)
      .subscribe(r => {
        location.href = `https://getpocket.com/auth/authorize?request_token=${r.code}&consumer_key=59640-4683c3c77d1004356c3f7c25`
      })
  }

  private clickGetPocketItems(event) {
    this.http.get('/api/getPocketItems')
      .map(this.extractData)
      .catch(this.handleError)
      .subscribe(r => {
        this.tweets = r.map(tweet => {
          const medias = (tweet.extended_entities || {}).media || []
          const mediaUrlHttpses = medias.map(e => e.media_url_https ) || []

          return {
            createdAt: tweet.created_at,
            mediaUrlHttpses,
            text: tweet.text,
            userName: `${tweet.user.name} @${tweet.user.screen_name}`,
            profileImageUrlHttps: tweet.user.profile_image_url_https
          }
        })
      })
  }

  private extractData(res: Response) {
    return res.json()
  }

  private handleError(error: any) {
    console.log(error.message)
    return Observable.throw(error.message)
  }
}
