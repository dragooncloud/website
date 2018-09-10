var admin = require("firebase-admin");

// initialise on runtime start-up
const serviceAccount = require('./serviceAccount.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://dragoon-215220.firebaseio.com"
});
const db = admin.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

// constants
const constants = {
  DOCTYPE_ACCOUNTS: 'accounts',
  DOCTYPE_USERS: 'users',
};

// api contrete implementation
const FirebaseApi = {
  /**
   * Get account information
   * @param {string} accountId The account's identifier
   * @returns {Promise<*>} The account information or null if not found
   */
  getAccountInfo: function(accountId) {
    return db
      .collection(constants.DOCTYPE_ACCOUNTS)
      .doc(accountId)
      .get()
      .then(d => d.data());
  },

  /**
   * Fetch a user's info, but only if you know the account they
   * belong to.
   * @param {string} userId the identifier for the user
   * @param {string} accountId the identifier for the account
   * @returns {Promise<*>} the user or null of the account was wrong
   */
  getUserInfo: function(userId, accountId) {
    return db
      .collection(constants.DOCTYPE_USERS)
      .doc(userId)
      .get()
      .then((d) => {
        let userInfo = d.data();
        if (!userInfo) {
          return null; // user not found
        }
        // check account id known by user is correct
        const usersAccountId = userInfo.account._referencePath.segments[1];
        if (usersAccountId !== accountId) {
          console.error(`users account did not match, expected:${accountId} got:${usersAccountId}`);
          return null; // account not the same
        }
        // leave only the id here
        userInfo.account = usersAccountId;
        return userInfo;
      });
  }
};

module.exports = FirebaseApi;