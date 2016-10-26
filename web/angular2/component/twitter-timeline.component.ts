import { Component } from '@angular/core'

@Component({
  selector: 'twitter-timeline',
  template: `
    <a class="twitter-timeline"  href="https://twitter.com/search?q=from%3A%40Bar_Chloe0301" data-widget-id="782781003173470209">Tweets about from:@Bar_Chloe0301</a>
    <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
  `
})
export class TwitterTimelineComponent {}
