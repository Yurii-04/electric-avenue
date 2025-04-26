import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { FindProductsParams, SelectedAttributes } from '~/types';

export const useFindProductsParams = (): FindProductsParams => {
  const [searchParams] = useSearchParams();

  return useMemo(() => {
    const category = searchParams.get('category');
    const title = searchParams.get('title');
    const attributes: SelectedAttributes = {};

    for (const [key, value] of searchParams.entries()) {
      if (key.startsWith('attributes')) {
        const attributeMatch = key.match(/attributes\[(.*?)]/);

        if (attributeMatch && attributeMatch[1]) {
          const attributeName = attributeMatch[1];

          if (!attributes[attributeName]) {
            attributes[attributeName] = [];
          }

          attributes[attributeName].push(value);
        }
      }
    }

    return {
      ...(category && { category }),
      ...(title && { title }),
      ...(Object.keys(attributes).length > 0 && { attributes }),
    };
  }, [searchParams]);
};
