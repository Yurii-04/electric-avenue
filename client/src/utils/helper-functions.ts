import { SxProps, Theme } from '@mui/material';

export const spliceSx = (
  defaultStyles?: SxProps<Theme>,
  newStyles?: SxProps<Theme>,
) => ({
  ...defaultStyles,
  ...newStyles,
}) as SxProps;

const createQueryParamsString = (query: { [key: string]: string }) => {
  const queryParams = new URLSearchParams()

  Object.entries(query).forEach(([key, value]) => {
    queryParams.append(key, value)
  })

  return queryParams.toString()
}

export const createUrlPath = (
  URL: string,
  params: string | null = '',
  query = {}
) => {
  const queryParams = createQueryParamsString(query)
  const queryParamsString = queryParams ? `?${queryParams}` : ''
  const paramsString = params ? `/${params}` : ''

  return `${URL}${paramsString}${queryParamsString}`
}