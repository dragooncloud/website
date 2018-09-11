const functions = require('firebase-functions');
const api = require('./api');

// == API FUNCTIONS == //

exports.paypal_events = functions.https.onRequest((request, response) => {
  /**
   * TODO:
   * https://api.sandbox.paypal.com/v1/notifications/verify-webhook-signature
   * {
   * auth_algo: request.header('paypal-auth-algo'),
   * cert_url: request.header('paypal-cert-url'),
   * transmission_id: request.header('paypal-transmission-id'),
   * transmission_sig: request.header('paypal-transmission-sig'),
   * transmission_time: request.header('paypal-transmission-time'),
   * webhook_id: functions.config().paypal.webhook_id, // My Apps & Credentials page
   * webhook_event: request.body,
   * }
   */
  console.log('method', request.method);
  console.log('eventType', request.body.event_type);
  console.log('body', JSON.stringify(request.body, {}, 2));
  console.log('headers', JSON.stringify(request.headers, {}, 2));
  console.log('my_webhook_id', functions.config().paypal.webhook_id);
  response.status(200).send({});
});

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