/**
 * Logging decorator
 * @param {Api} child the child to decorate
 */
const LoggingDecorator = function(child) {
  return {
    /**
     * Get account information
     * @param {string} accountId The account's identifier
     * @returns {Promise<*>} The account information or null if not found
     */
    getAccountInfo(accountId) {
      console.log(`getAccountInfo(${accountId})`);
      return child.getAccountInfo(accountId);
    },

    /**
     * Fetch a user's info, but only if you know the account they
     * belong to.
     * @param {string} userId the identifier for the user
     * @param {string} accountId the identifier for the account
     * @returns {Promise<*>} the user or null of the account was wrong
     */
    getUserInfo: function(userId, accountId) {
      console.log(`getUserInfo(${userId}, ${accountId})`);
      return child.getUserInfo(userId, accountId);
    }
  }
};

module.exports = LoggingDecorator;