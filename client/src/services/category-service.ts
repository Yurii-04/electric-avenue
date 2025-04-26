import { axiosClient } from '~/plugins/axios-client';
import { URLs } from '~/constants/request';

class CategoriesService {
  async fetchCategories() {
    return axiosClient.get(URLs.categories.get);
  }

  async fetchChildrenCategories() {
    return axiosClient.get(URLs.categories.getChildren);
  }
}

export const categoriesService = new CategoriesService()