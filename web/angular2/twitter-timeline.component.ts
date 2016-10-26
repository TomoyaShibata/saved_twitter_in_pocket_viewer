import { Component } from '@angular/core'
import { Jsonp, URLSearchParams, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Component({
  selector: 'picture_original_urls',
  template: `
    <div class='original_size_block' *ngFor='let item of pictureOriginalUrls'>
      <img class='original_size_image_thumb' src='{{item[0]}}' alt='{{item[0]}}' />
    </div>
  `,
  styles: [`
    .original_size_block {
        display: inline;
    }

    .original_size_image_thumb {
      width: 30%;
      height: auto;
    }
  `]
})
export class TumblrPicturesComponent {
  private url: String = 'https://api.tumblr.com/v2/tagged?api_key=S8ny2xS8WbmPnNkw9iTJ7zrX4yY1tfz84RJ93nPewxfHVdFUqZ&callback=JSONP_CALLBACK'
  private pictureOriginalUrls: Array<Array<Object>>

  constructor(private jsonp: Jsonp) {
    console.log('constructor')
    // this.getTumblrSearchResult('')
  }

  private requestPocketToken () {
    const url         = 'https://getpocket.com/v3/oauth/request'
    const consumerKey = '59640-4683c3c77d1004356c3f7c25'
    const redirectUri = 'http://localhost:8080/Angular2Practice/'
 
  }

  /**
   * キーワードを使って tag 検索を行います。
   *
   * @param searchKeyword キーワード
   */
  private getTumblrSearchResult(searchKeyword: String) {
    console.log('getTumblrSearchResult')
    return this.jsonp.get(`${this.url}&tag=艦これ`)
      .map(this.extractData)
      .catch(this.handleError)
      .subscribe(r => this.pictureOriginalUrls = r)
  }

  private extractData(res: Response) {
    return res.json()
      .response
      .filter(r => r.photos != undefined)
      .map(r => r.photos.map(p => p.original_size.url))
  }

  private handleError(error: any) {
    console.log(error.message)
    return Observable.throw(error.message)
  }
}
