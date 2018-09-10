const functions = require('firebase-functions');
const api = require('./api');

// == API FUNCTIONS == //

/**
 * Fetch account info
 */
exports.account_info = functions.https.onRequest((request, response) => {
  return api.getAccountInfo(request.query.account)
    .then((account) => {
      if (!account) {
        return response.status(404).send({error: 'Subscription not found'});
      }
      return response.status(200).send(account);
    })
    .catch((err) => {
      console.error(`Unable to fetch account info:`, err);
      return response.status(500).send({error: err});
    });
});

/**
 * Fetch user info
 */
exports.user_info = functions.https.onRequest((request, response) => {
  return api.getUserInfo(request.query.user, request.query.account)
    .then((user) => {
      if (!user) {
        return response.status(404).send({error: 'User not found'});
      }
      return response.status(200).send(user);
    })
    .catch((err) => {
      console.error(`Unable to fetch user info:`, err);
      return response.status(500).send({error: err});
    });
});