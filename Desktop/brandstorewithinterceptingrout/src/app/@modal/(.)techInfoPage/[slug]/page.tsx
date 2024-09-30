'use client'
import { Modal } from './modal';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';

export default function PhotoModal({
  params: { slug: techInfoPageSlug },
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
        const product = products.find((item: any) => item.slug === techInfoPageSlug);
        setProductData(product);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, [techInfoPageSlug]);

  if (!productData) return <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'> <div
    className=" inline-block h-14 w-14 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary-100 motion-reduce:animate-[spin_1.5s_linear_infinite]"
    role="status">
    <span
      className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
    >Loading...</span>
  </div>
  </div>;
  //https://tw-elements.com/docs/react/components/spinners/

  return (
    <Modal>
      <Image src={productData.images[0].url} alt={productData.name} width={500} height={500} />

      <div className='flex flex-col gap-2 py-8 pr-8'>
      <div className='flex flex-col gap-2'>
        <h2>{productData.name}</h2>
        <p>{productData.class.name}</p>
        <p>Narxi: {productData.random_shop.price} сум</p>
        </div>
        <div className='flex justify-end pt-8'>
          <Link className='text-2xl text-white bg-red-500  py-2 px-4 rounded-md hover:bg-red-600 
      max-w-max' href={productData.web_url} target="_blank" rel="noopener noreferrer">
            Batafsil ma'lumot
          </Link>
        </div>


      </div>

    </Modal>
  );
}