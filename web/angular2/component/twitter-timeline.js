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
var TwitterTimelineComponent = (function () {
    function TwitterTimelineComponent() {
    }
    TwitterTimelineComponent = __decorate([
        component({
            selector: 'twitter-timeline',
            template: "\n    <a class=\"twitter-timeline\"  href=\"https://twitter.com/search?q=from%3A%40Bar_Chloe0301\" data-widget-id=\"782781003173470209\">Tweets about from:@Bar_Chloe0301</a>\n    <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+\"://platform.twitter.com/widgets.js\";fjs.parentNode.insertBefore(js,fjs);}}(document,\"script\",\"twitter-wjs\");</script>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], TwitterTimelineComponent);
    return TwitterTimelineComponent;
}());
exports.TwitterTimelineComponent = TwitterTimelineComponent;
