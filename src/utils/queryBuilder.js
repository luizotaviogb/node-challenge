const buildProductQuery = (filters) => {
  const query = {};

  if (filters.name) {
    query.name = { $regex: filters.name, $options: 'i' };
  }

  if (filters.value) {
    query.value = { $gte: filters.value };
  }

  if (filters.startDate || filters.endDate) {
    query.createdAt = {
      ...(filters.startDate && { $gte: new Date(filters.startDate) }),
      ...(filters.endDate && { $lte: new Date(filters.endDate) }),
    };
  }

  return query;
};

module.exports = { buildProductQuery };
