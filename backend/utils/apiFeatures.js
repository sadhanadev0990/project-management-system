class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query.sort(sortBy);
    } else {
      this.query.sort();
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    }
    return this;
  }

  paginate() {
    // const page = this.queryString.page * 1 || 1;
    // const limit = this.queryString.limit * 1 || 6;
    // const skip = (page - 1) * limit;

    // this.query = this.query.skip(skip).limit(limit);
    const resultPerPage = 6;
    const currentPage = Number(this.queryString.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    // if (this.queryString.page) {
    //   const numTours = await Tour.countDocuments();
    //   if (skip > numTours) throw new Error('This page does not exist');
    // }
    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryString.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}
module.exports = APIFeatures;
