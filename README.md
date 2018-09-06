# website
The dragoon.cloud web site and serverless functions hosted in [Google Firebase](https://firebase.google.com/).

## Developers

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