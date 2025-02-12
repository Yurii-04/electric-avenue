import { axiosClient } from '~/plugins/axios-client';
import { URLs } from '~/constants/request';
import { ProductWithPagination, SearchParams } from '~/types';
import { AxiosResponse } from 'axios';

class ProductService {
  async searchProducts(params?: SearchParams ): Promise<AxiosResponse<ProductWithPagination>> {
    return axiosClient.get(URLs.product.search, { params })
  }
}

export const productService = new ProductService();