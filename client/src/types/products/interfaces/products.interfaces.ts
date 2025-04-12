export interface ProductMainFields {
  id: string
  title: string
  description: string
  categoryId: string
  productImages: Pick<ProductImages, 'url'>[]
  price: string
}

export interface ProductImages {
  publicId: string
  url: string
}