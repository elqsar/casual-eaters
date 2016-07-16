## Project setup:
* clone project and run `npm i`
* create proper configuration:
```javascript
{
  "slack_token": YOUR_SLACK_TOKEN,
  "zomato_token": YOUR_ZOMATO_TOKEN,
  "mock_search": "http://private-722707-casualeaters.apiary-mock.com/search",
  "mock_dailymenu": "http://private-722707-casualeaters.apiary-mock.com/dailymenu",
  "search_app_id": ALGOLIA_APP_ID,
  "search_api_key": ALGOLIA_API_KEY,
  "max_step_to_fetch": 20
}
```
* add firebase configuration: [Manual](https://firebase.google.com/docs/web/setup)
* start project with `npm start`
* run tests with `npm test`
* enjoy

## Architecture
* Persist data to [Firebase](firebase.google.com)
* Data indexed in [Algolia](https://www.algolia.com) so we could search faster
* Use [Slackbot](https://howdy.ai/botkit) to communicate with Slack via RTM
* Job scheduled by [NodeCron](https://github.com/ncb000gt/node-cron)

### Notes
- Lat Long 50.078897, 14.427061
- Establishments: 18, 161, 31, 21, 16
