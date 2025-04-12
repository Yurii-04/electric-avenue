import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productService } from '~/services/product-service';
import { ProductWithPagination, SelectedAttributes } from '~/types';

interface UseAttributeFilterProps {
  onProductsUpdate: (products: ProductWithPagination) => void;
  fetchProducts: () => Promise<void>;
}

const EXCLUDED_PARAMS = ['category', 'title'];

export const useAttributeFilter = ({
  onProductsUpdate,
  fetchProducts,
}: UseAttributeFilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getSelectedAttributesFromUrl = useCallback((): SelectedAttributes => {
    const attributes: SelectedAttributes = {};
    searchParams.forEach((value, key) => {
      if (!EXCLUDED_PARAMS.includes(key)) {
        attributes[key] = value.split(',');
      }
    });
    return attributes;
  }, [searchParams]);

  const handleAttributeChange = useCallback(
    async (attributeName: string, option: string, checked: boolean) => {
      const currentAttributes = getSelectedAttributesFromUrl();
      const updatedAttributes = { ...currentAttributes };

      if (!updatedAttributes[attributeName]) {
        updatedAttributes[attributeName] = [];
      }

      if (checked) {
        updatedAttributes[attributeName] = [...updatedAttributes[attributeName], option];
      } else {
        updatedAttributes[attributeName] = updatedAttributes[attributeName].filter(
          (item) => item !== option
        );
      }

      if (updatedAttributes[attributeName].length === 0) {
        delete updatedAttributes[attributeName];
      }

      const newSearchParams = new URLSearchParams(searchParams);
      Object.keys(updatedAttributes).forEach(attr => {
        newSearchParams.set(attr, updatedAttributes[attr].join(','));
      });
      
      searchParams.forEach((_, key) => {
        if (key !== 'category' && key !== 'title' && !updatedAttributes[key]) {
          newSearchParams.delete(key);
        }
      });

      setSearchParams(newSearchParams);

      if (Object.keys(updatedAttributes).length > 0) {
        const response = await productService.filterByAttributes(updatedAttributes);
        onProductsUpdate(response.data);
      } else {
        await fetchProducts();
      }

      return updatedAttributes;
    },
    [searchParams, setSearchParams, onProductsUpdate, fetchProducts, getSelectedAttributesFromUrl]
  );

  useEffect(() => {
    const selectedAttributes = getSelectedAttributesFromUrl();
    if (Object.keys(selectedAttributes).length > 0) {
      productService.filterByAttributes(selectedAttributes)
        .then(response => onProductsUpdate(response.data));
    }
  }, [getSelectedAttributesFromUrl, onProductsUpdate]);

  return {
    selectedAttributes: getSelectedAttributesFromUrl(),
    handleAttributeChange,
  };
}; 