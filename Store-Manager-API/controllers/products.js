const Product = require("../models/product");
const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;

  // Filtering

  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.featured = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  const result = Product.find(queryObject);

  // Numeric Filters

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b('>'|'<'|'='|'>='|'<=')\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split("-").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { operator: Number(value) };
      }
    });
  }

  // Sorting

  if (sort) {
    const sortList = sort.split(",").join(" ");
    result.sort(sortList);
  } else {
    result.sort("createdAt");
  }

  // Selecting

  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result.select(fieldsList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limt(limit);
  const products = await result;
  res.status(200).json(products);
};

const getAllProductsTesting = async (req, res) => {
  res.status(200).json({ msg: "Products testing Route" });
};

module.exports = {
  getAllProducts,
  getAllProductsTesting,
};
