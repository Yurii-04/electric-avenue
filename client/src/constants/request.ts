export const URLs = {
  product: {
    get: '/products',
    search: {
      byTitle: '/products/search?title=',
      byCategory: '/products/search?category=',
    },
    attributes: {
      getRelevant: '/product-attributes?',
      filter: '/product-attributes/filter?',
    },
  },
  categories: {
    get: '/categories',
    getChildren: '/categories/children',
  },
}