import { axiosClient } from '~/plugins/axios-client';
import { URLs } from '~/constants/request';
import {
  FindProductsParams,
  Product,
  ProductWithPagination,
  RelevantAttribute,
  SearchParams,
  SelectedAttributes,
} from '~/types';
import { AxiosResponse } from 'axios';
import { createUrlPath } from '~/utils/helper-functions';

class ProductService {
  async searchProductsTitles(params?: SearchParams): Promise<AxiosResponse<ProductWithPagination>> {
    return axiosClient.get(URLs.product.search.byTitle, { params });
  }

  async findProducts(params?: FindProductsParams): Promise<AxiosResponse<ProductWithPagination>> {
    return axiosClient.get(URLs.product.get, { params });
  }

  async getRelevantAttributes(categoryIds: string[]): Promise<AxiosResponse<RelevantAttribute[]>> {
    return axiosClient.get(URLs.product.attributes.getRelevant, { params: { categoryIds } });
  }

  async filterByAttributes(attributes: SelectedAttributes): Promise<AxiosResponse<ProductWithPagination>> {
    return axiosClient.get(URLs.product.attributes.filter, { params: { attributes } });
  }

  async getById(id: string): Promise<AxiosResponse<Product>> {
    return axiosClient.get(createUrlPath(URLs.product.get, id))
  }
}

export const productService = new ProductService();