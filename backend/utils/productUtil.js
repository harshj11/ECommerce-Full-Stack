/**
 * Check whether the product id is valid.
 * 
 * @param {String} productId 
 * @return true or false.
 */
exports.isValidProductId = (productId) => {
    const regex = /[0-9a-fA-F]{24}/
    if(!regex.test(productId))
        return false;
    return true;
}