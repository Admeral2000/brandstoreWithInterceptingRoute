'use client'

import axios from "axios";
import cls from "../styles/brands.module.css";
import stl from "../styles/hotProducts.module.css";
import style from "../styles/recomendationProducts.module.css";
import { useEffect, useState } from "react";
import {
  HotProductsLogo,
  LikeLogo,
  ChartLogo,
  BucketLogo,
} from "../components/svg";
import Link from "next/link";


export default function RecommendationProducts() {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      axios
        .get("https://api.brandstore.uz/api/home", {
          params: {
            type: "hot_products",
          },
        })
        .then((r) => {
          console.log(r.data.data.product_request, "res");
          setData(r.data.data.product_request);
        });
    }, []);

    return (
  
         <section className={`${cls.sectionBrands} ${stl.sectionHotProducts}`}>
             <div className="container">
             <div className={cls.brandAndReccomendNavPart}>
            <div className={`${cls.sectionName} ${stl.hotProductNav}`}>
              <div className={stl.hotProductsLogo}>
                <HotProductsLogo />
              </div>

              <span>
                <p>Горящие</p>
                <p>предложения</p>
              </span>
            </div>
            <button>Смотреть всё</button>
          </div>


          <ul className={stl.hotProductsWrapper}>
          {data.length &&
          data.slice(0, 8).map((item) => (
            <li key={item.id} className={stl.hotProductsWrapperItem}>
              <div className={stl.hotProductLikeAndChart}><button><LikeLogo/></button> <button><ChartLogo/></button></div>
             <div className={stl.hotProductImg}><Link href='#'><img src={item.images[0].url} alt={item.name} /></Link></div>

             <div className={stl.hotProductInfoWrapper}>

                <div className={stl.hotProductTitle}>
                  <Link href={`/techInfoPage/${item.slug}`}>
                  <p>{item.class.name}</p>
                  <h4>{item.name}</h4>
                  </Link>
                </div>

                <div className={stl.hotProductDiscountTime}>
                  <p>Осталось до конца:</p>
                  <ul className={stl.hotProductDiscountTimeList}>
                    <li className={stl.hotProductDiscountTimeItem}><p>05</p><p>дней</p></li>
                    <li><p>:</p></li>
                    <li className={stl.hotProductDiscountTimeItem}><p>12</p><p>часов</p></li>
                    <li><p>:</p></li>
                    <li className={stl.hotProductDiscountTimeItem}><p>52</p><p>минуты</p></li>
                    <li><p>:</p></li>
                    <li className={stl.hotProductDiscountTimeItem}><p>25</p><p>секунд</p></li>
                  </ul>
                </div>

                <div className={`${style.recommendProductPrice} ${stl.hotProductPriceInfo}`}>
                          <div>
                            <p>{item.random_shop.monthly_price} сум / мес.</p>
                            <p>{item.random_shop.price} сум</p>
                          </div>
                          <button>
                            <span hidden='hidden'>
                              <BucketLogo />
                            </span>
                            в Корзину
                          </button>
                        </div>
             </div>
            </li>
            ))}
          </ul>
            </div>
        </section>
    
    );
}