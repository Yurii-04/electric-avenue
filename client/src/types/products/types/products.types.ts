import { ApiResponse, ProductMainFields } from '~/types';

export type SearchParams = { query?: string };
export type FindProductsParams = {
  title?: string | null,
  category?: string | null,
  attributes?: SelectedAttributes | null,
};
export type ProductWithPagination = ApiResponse<ProductMainFields>
export type SearchResult = ApiResponse<Pick<ProductMainFields, 'title'>>
export type RelevantAttribute = {
  name: string
  attributeOptions: string[]
}
export type SelectedAttributes = Record<string, string[]>;
