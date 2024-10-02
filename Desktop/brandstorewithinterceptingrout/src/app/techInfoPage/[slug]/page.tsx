'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';

export default function PhotoModal({
  params: { slug: techInfoPage },
}: {
  params: { slug: string };
}) {
  const [productData, setProductData] = useState<any>(null);
  const [singleProductData, setSingleProductData] = useState<any>(null);

  useEffect(() => {
    // Ikkita API chaqiruvini birgalikda bajarish
    const fetchProductData = async () => {
      try {
        const [hotProductsResponse, cartProductsResponse] = await Promise.all([
          axios.get(`https://api.brandstore.uz/api/home`, {
            params: {
              type: 'hot_products',
            },
          }),
          axios.get(`https://api.brandstore.uz/api/cart/show`),
        ]);

         // Hot productsdan olingan ma'lumotlarni konsolga chiqarish
    console.log("Hot Products Response:", hotProductsResponse.data);
        // Hot productsdan kerakli mahsulotni olish
        const hotProducts = hotProductsResponse.data.data.product_request;
        const product = hotProducts.find((item: any) => item.slug === techInfoPage);
        setProductData(product);

         // Cart mahsulotlardan olingan ma'lumotlarni konsolga chiqarish
    console.log("Cart Products Response:", cartProductsResponse.data);
        // Cart mahsulotlardan kerakli mahsulotni olish
        const cartProducts = cartProductsResponse.data.data.product_request;
        const cartProduct = cartProducts.find((item: any) => item.slug === techInfoPage);
        setSingleProductData(cartProduct);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, [techInfoPage]);

  if (!productData) {
    return (
      <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
        <div
          className="inline-block h-14 w-14 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary-100 motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className='p-8 flex flex-col gap-8'>
      <div className='flex justify-around items-center'>
        <Image
          src={productData.images[0].url}
          alt={productData.name}
          className='max-xl:max-w-72'
          width={500}
          height={500}
        />
        <div className='flex flex-col gap-2 max-xl:text-xl text-3xl'>
          <h2 className='text-3xl font-bold pb-6'>{productData.name}</h2>
          <p>
            <span className='text-red-500 font-bold text-5xl'>
              {Number(productData.random_shop.discount.price).toLocaleString('fr-FR')} сум
            </span>
            <span className='font-extrabold text-4xl'>| </span>Asl narxi:{' '}
            <span className='line-through text-black/60'>
              {Number(productData.random_shop.discount.price).toLocaleString('fr-FR')}
            </span>{' '}
            сум
          </p>
          <p>
            <span className='text-red-500 font-bold '>Oylik to'lov:</span>{' '}
            {Number(productData.random_shop.monthly_price).toLocaleString('fr-FR')} сум
          </p>
        </div>
      </div>
      <p className='text-3xl'></p>
    </div>
  );
}
