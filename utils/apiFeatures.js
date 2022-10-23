class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const location = this.queryStr.location
      ? {
          address: {
            $regex: this.queryStr.location,
            $options: "i",
          },
        }
      : {};

    console.log(location);

    this.query = this.query.find({ ...location });
    return this;
  }
    
    filter() {
        const queryCopy = { ...this.queryStr }
        
        // Remove fields from query
        const removeFields = ['location'];
        removeFields.forEach(el => delete queryCopy[el])
    }
}

export default APIFeatures;
