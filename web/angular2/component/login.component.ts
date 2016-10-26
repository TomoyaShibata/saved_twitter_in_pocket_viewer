import { Component } from '@angular/core'
import { Request, RequestMethod, Headers, RequestOptions, Http, Jsonp, URLSearchParams, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Component({
  selector: 'login',
  template: `
    <button (click)='clickLoginButton()' type='button'>Pocket 認証</button>
    <button (click)='clickGetPocketItems()' type='button'>Pocket アイテム取得</button>
    <li *ngFor='let item of resolvedUrls'>
      {{item}}
    </li>
  `
})
export class LoginComponent {
  private resolvedUrls: Array<String> = []

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
        this.resolvedUrls = r.sort((x, y) => x.sort_id > y.sort_id)
                             .map(o => o.resolved_url)
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
