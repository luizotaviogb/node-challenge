const { buildProductQuery } = require('../utils/queryBuilder');

describe('buildProductQuery', () => {
  it('should return an empty query when no filters are provided', () => {
    const filters = {};
    const query = buildProductQuery(filters);

    expect(query).toEqual({});
  });

  it('should build a query with name filter using regex case-insensitive', () => {
    const filters = { name: 'test' };
    const query = buildProductQuery(filters);

    expect(query).toEqual({
      name: { $regex: 'test', $options: 'i' },
    });
  });

  it('should build a query with value filter using $gte', () => {
    const filters = { value: 100 };
    const query = buildProductQuery(filters);

    expect(query).toEqual({
      value: { $gte: 100 },
    });
  });

  it('should build a query with only startDate filter', () => {
    const startDate = '2023-01-01';
    const filters = { startDate };
    const query = buildProductQuery(filters);

    expect(query).toEqual({
      createdAt: { $gte: new Date(startDate) },
    });
  });

  it('should build a query with only endDate filter', () => {
    const endDate = '2023-12-31';
    const filters = { endDate };
    const query = buildProductQuery(filters);

    expect(query).toEqual({
      createdAt: { $lte: new Date(endDate) },
    });
  });

  it('should build a query with both startDate and endDate filters', () => {
    const startDate = '2023-01-01';
    const endDate = '2023-12-31';
    const filters = { startDate, endDate };
    const query = buildProductQuery(filters);

    expect(query).toEqual({
      createdAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    });
  });

  it('should build a query with all filters combined', () => {
    const filters = {
      name: 'product',
      value: 50,
      startDate: '2023-01-01',
      endDate: '2023-12-31',
    };
    const query = buildProductQuery(filters);

    expect(query).toEqual({
      name: { $regex: 'product', $options: 'i' },
      value: { $gte: 50 },
      createdAt: {
        $gte: new Date('2023-01-01'),
        $lte: new Date('2023-12-31'),
      },
    });
  });
});
