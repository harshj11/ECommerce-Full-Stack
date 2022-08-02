class ApiFeatures {

    /**
     * 
     * @param {mongoose.Query} query 
     * @param {Object} queryParameters 
     */
    constructor(query, queryParameters) {
        this.query = query;
        this.queryParameters = queryParameters;
    }

    /**
     * A method to prepare the query object based on the keyword paramter provided in the
     * URL string.
     * 
     * @return the updated ApiFeature class object.
     */
    search = () => {
        const keyword = this.queryParameters.keyword ? {
            name: {
                $regex: this.queryParameters.keyword,
                $options: "i"
            }
        } : {}

        this.query = this.query.find({ ...keyword });
        return this;
    }

    /**
     * A method to prepare the query object based on the filters(the paramters, other than keyword, page, limit) 
     * provided in the URL string.
     * 
     * @return the updated ApiFeature class object.
     */
    filter = () => {
        const queryParametersCopy = {...this.queryParameters};

        //Removing some keys for category from the queryParametersCopy object.(To filter based on the category)
        const keysToRemove = ["keyword", "page", "limit"];
        keysToRemove.forEach(key => delete queryParametersCopy[key]);

        //Filter based on the price and rating.
        let queryParametersString = JSON.stringify(queryParametersCopy);
        queryParametersString = queryParametersString.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);

        this.query = this.query.find(JSON.parse(queryParametersString));
        return this;
    }

    /**
     * A method to prepare the query based on the page number provided in the URL string.
     * 
     * @param {Number} productsPerPage
     */
    pagination = (productsPerPage) => {
        let pageNumber = this.queryParameters.page || 1; 
        let numberOfProductsToSkip = (pageNumber - 1) * productsPerPage;
        this.query = this.query.limit(productsPerPage).skip(numberOfProductsToSkip);
        return this;
    }
}

module.exports = ApiFeatures;