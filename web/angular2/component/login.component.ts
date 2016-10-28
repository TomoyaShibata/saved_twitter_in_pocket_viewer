import { Component } from '@angular/core'
import { Request, RequestMethod, Headers, RequestOptions, Http, Jsonp, URLSearchParams, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Component({
  selector: 'login',
  styles: [`
    .tweet-articles {
      column-count: 4;
      column-gap: 15px;
      column-fill: auto;
    }

    @media (min-width: 1635px) {
      .tweet-articles {
        column-count: 5;
      }
    }

    article {
      background: #fff;
      border-radius: 3px;
      margin: 10px;
      width: 300px;
      column-break-inside: avoid;
      transition: all 1s ease;
    }

    .tweet-description {
      margin: 10px;
    }

    .tweet-text {
      text-align: justify;
      word-break: break-all;
    }

    .tweet-created-at {
      font-size: 0.8em;
      font-weight: 100;
    }

    .media {
      // filter: blur(30px);
      max-width: 100%;
    }
  `],
  template: `
    <section>
      <button (click)='clickLoginButton()' type='button'>Pocket 認証</button>
    </section>
      <button (click)='clickGetPocketItems()' type='button'>Pocket アイテム取得</button>
    <section class='tweet-articles'>
      <article *ngFor='let tweet of tweets'>
        <ng-container *ngFor='let imgSrc of tweet.mediaUrlHttpses'>
          <img class='media' src={{imgSrc}} alt='tweet_media' />
        </ng-container>
        <div class='tweet-description'>
          <p class='user-info'>
            <img src={{tweet.profileImageUrlHttps}} alt='profile_image_url_https' />
            <a href='https://twitter.com/{{tweet.screenName}}' target='_blank'>{{tweet.userName}}</a>
          </p>
          <p class='tweet-text'>{{tweet.text}}</p>
          <p class='tweet-created-at'>
            <a href='https://twitter.com/{{tweet.screenName}}/status/{{tweet.id}}' target='_blank'>{{tweet.createdAt}}</a>
          </p>
        </div>
      </article>
    </section>
  `
})
export class LoginComponent {
  private tweets: Array<Object> = []

  constructor(private http: Http) {
  }

  private clickLoginButton() {
    const res = this.http.get('/api/getRequestCode')
      .map(this.extractData)
      .catch(this.handleError)
      .subscribe(r => {
        location.href = `https://getpocket.com/auth/authorize?request_token=${r.code}&consumer_key=59640-4683c3c77d1004356c3f7c25`
      })
  }

  private clickGetPocketItems() {
    this.http.get('/api/getPocketItems')
      .map(this.extractData)
      .catch(this.handleError)
      .subscribe(r => {
        this.tweets = r.map(tweet => {
          const medias = (tweet.extended_entities || {}).media || []
          const mediaUrlHttpses = medias.map(e => e.media_url_https) || []

          return {
            id: tweet.id,
            createdAt: tweet.created_at,
            mediaUrlHttpses,
            text: tweet.text,
            userName: tweet.user.name,
            screenName: tweet.user.screen_name,
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
