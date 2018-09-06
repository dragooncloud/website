# website
The dragoon.cloud web site and serverless functions hosted in [Google Firebase](https://firebase.google.com/).

## Developers

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/359f0b8fc4e1459c99154f52afe98060)](https://www.codacy.com/app/tommed/website?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=dragooncloud/website&amp;utm_campaign=Badge_Grade)

### Deploy to production

```bash
# install firebase cli
npm i -g firebase-tools

# authenticate
firebase login
# then login...

# deploy
firebase deploy --only hosting
```