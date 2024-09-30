'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function PhotoModal({
  params: { slug: techInfoPage },
}: {
  params: { slug: string };
}) {
  const [productData, setProductData] = useState<any>(null);

  useEffect(() => {
    // Slug orqali kerakli mahsulotni olish
    axios
      .get(`https://api.brandstore.uz/api/home`, {
        params: {
          type: 'hot_products',
        },
      })
      .then((response) => {
        const products = response.data.data.product_request;
        const product = products.find((item: any) => item.slug === techInfoPage);
        setProductData(product);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, [techInfoPage]);

  if (!productData) return <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'> <div
  className=" inline-block h-14 w-14 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary-100 motion-reduce:animate-[spin_1.5s_linear_infinite]"
  role="status">
  <span
    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
  >Loading...</span>
</div>
</div>;

  return (
    <div>
      <h2>{productData.name}</h2>
      <img src={productData.images[0].url} alt={productData.name} />
      <p>{productData.class.name}</p>
      <p>{productData.random_shop.price} сум</p>
      <Link href={productData.web_url} target="_blank" rel="noopener noreferrer">
        Batafsil ma'lumot
      </Link>
    </div>
  );
}