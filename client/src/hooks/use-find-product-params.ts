import { useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useRef } from 'react';
import { FindProductsParams, SelectedAttributes } from '~/types';

export const useFindProductsParams = (): FindProductsParams => {
  const [searchParams, setSearchParams] = useSearchParams();
  const prevParamsRef = useRef<string>('');

  useEffect(() => {
    const currentParamsObj: Record<string, string[]> = {};

    for (const [key, value] of searchParams.entries()) {
      if (!key.startsWith('page-options')) {
        if (!currentParamsObj[key]) {
          currentParamsObj[key] = [];
        }
        currentParamsObj[key].push(value);
      }
    }

    const currentParamsStr = JSON.stringify(currentParamsObj);

    if (prevParamsRef.current && prevParamsRef.current !== currentParamsStr) {
      const pageParam = searchParams.get('page-options[page]');
      if (pageParam && pageParam !== '1') {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page-options[page]', '1');
        setSearchParams(newParams);
      }
    }

    prevParamsRef.current = currentParamsStr;
  }, [searchParams, setSearchParams]);

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