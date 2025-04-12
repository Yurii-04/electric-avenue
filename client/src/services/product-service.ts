import { axiosClient } from '~/plugins/axios-client';
import { URLs } from '~/constants/request';
import {
  FindProductsParams,
  ProductWithPagination,
  RelevantAttribute,
  SearchParams,
  SelectedAttributes,
} from '~/types';
import { AxiosResponse } from 'axios';

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
}

export const productService = new ProductService();