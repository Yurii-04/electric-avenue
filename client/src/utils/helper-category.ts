import { Category } from '~/types';

class CategoryHelper {
  getRootCategories(categories: Category[]): Category[] {
    return categories.filter(category => !category.parentId);
  }

  getChildCategories(categories: Category[], parentId: number): Category[] {
    return categories.filter(category => category.parentId === parentId);
  }

  getGroups(categories: Category[], parentId?: number): Category[] {
    return categories.filter(category => category.parentId === parentId && category.isGroup);
  }

  getItems(categories: Category[]): Category[] {
    return categories.filter(category => !category.isGroup);
  }
}

export const categoryHelper = new CategoryHelper();
