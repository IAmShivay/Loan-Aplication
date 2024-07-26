class apiFeature {
  constructor(query, queryStr) {
    (this.query = query), (this.queryStr = queryStr);
  }
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const queryCopy = { ...this.queryStr };
    const removeField = ["keyword", "limit", "page"];
    removeField.forEach((element) => {
      delete queryCopy(element);
let queryStr= JSON.stringify(queryCopy)
queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`)


this.query=this.query.find(JSON.parse(queryStr));
      // this.query = this.query.find(queryCopy);
      return this;
    });

    
  }
  pagination(resultPerPage){
    const currentPage = Number(resultPerPage) | 1;
    const skip = resultPerPage * (currentPage - 1);
    this.query = currentPage.limit(resultPerPage).skip(skip)
    return this;
  }
}

module.exports = apiFeature;
