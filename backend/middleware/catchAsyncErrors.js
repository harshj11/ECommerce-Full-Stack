/**
 * A middleware function which resolves the promise if no errors occur during the calls to database
 * for storing or retrieving the details otherwise call the next middleware function.
 * 
 * @param {function} theFunction 
 */
module.exports = (theFunction) => (req, res, next) => {
    Promise.resolve(theFunction(req, res, next)).catch(next);
}