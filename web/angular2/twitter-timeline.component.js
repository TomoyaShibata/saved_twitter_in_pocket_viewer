"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var TumblrPicturesComponent = (function () {
    function TumblrPicturesComponent(jsonp) {
        this.jsonp = jsonp;
        this.url = 'https://api.tumblr.com/v2/tagged?api_key=S8ny2xS8WbmPnNkw9iTJ7zrX4yY1tfz84RJ93nPewxfHVdFUqZ&callback=JSONP_CALLBACK';
        console.log('constructor');
        this.getTumblrSearchResult('');
        //     <li *ngFor='let item of pictureOriginalUrls'>
        //   {{item[0]}}
        // </li>
    }
    /**
     * キーワードを使って tag 検索を行います。
     *
     * @param searchKeyword キーワード
     */
    TumblrPicturesComponent.prototype.getTumblrSearchResult = function (searchKeyword) {
        var _this = this;
        console.log('getTumblrSearchResult');
        return this.jsonp.get(this.url + "&tag=\u8266\u3053\u308C")
            .map(this.extractData)
            .catch(this.handleError)
            .subscribe(function (r) { return _this.pictureOriginalUrls = r; });
    };
    TumblrPicturesComponent.prototype.extractData = function (res) {
        return res.json()
            .response
            .filter(function (r) { return r.photos != undefined; })
            .map(function (r) { return r.photos.map(function (p) { return p.original_size.url; }); });
    };
    TumblrPicturesComponent.prototype.handleError = function (error) {
        console.log(error.message);
        return Observable_1.Observable.throw(error.message);
    };
    TumblrPicturesComponent = __decorate([
        core_1.Component({
            selector: 'picture_original_urls',
            template: "\n    <p>hoge</p>\n  "
        }), 
        __metadata('design:paramtypes', [http_1.Jsonp])
    ], TumblrPicturesComponent);
    return TumblrPicturesComponent;
}());
exports.TumblrPicturesComponent = TumblrPicturesComponent;
