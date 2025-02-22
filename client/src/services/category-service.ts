import { axiosClient } from '~/plugins/axios-client';
import { URLs } from '~/constants/request';

class CategoriesService {
  async fetchCategories() {
    return axiosClient.get(URLs.categories.get);
  }
}

export const categoriesService = new CategoriesService()