// import Head from "next/head";
// // import Image from 'next/image'
// // import { Inter } from 'next/font/google'
// // import styles from '@/styles/Home.module.css'

// // const inter = Inter({ subsets: ['latin'] })

// export default function Home() {
//   return (
//     <>
//       {/* <Head>
//         <title>Create Next App</title>
//         <meta name='description' content='Generated by create next app' />
//         <meta name='viewport' content='width=device-width, initial-scale=1' />
//         <link rel='icon' href='/favicon.ico' />
//       </Head>
//       <div>hihi</div> */}
//       <Head>
//         <meta property='og:title' content='furniture website portfolio' />
//         <meta
//           property='pg:description'
//           content='Hello this is furniture website portfolio page'
//         />
//         <meta
//           property='og:image'
//           content='https://storage.googleapis.com/webportfolio-backend-storage/magazine.living.png'
//         />
//         <link rel='icon' href='/logo.png' />
//       </Head>
//     </>
//   );
// }
import { useState } from "react";
// import LiItem from "../../src/commons/LiTag";
// import { useQueryProductsByCategory } from "../../src/component/hooks/query/useMutationFetchProducts";
// import { useAddToCart } from "../../src/component/hooks/customs/useAddToCart";
import { useRouter } from "next/router";
import { useQueryProductsByCategory } from "../../src/component/hooks/query/useMutationFetchProducts";
import { useAddToCart } from "../../src/component/hooks/customs/useAddToCart";
import LiItem from "../../src/commons/LiTag";
// import { useQueryProductsByCategory } from "../src/component/hooks/query/useMutationFetchProducts";
// import { useAddToCart } from "../src/component/hooks/customs/useAddToCart";
// import LiItem from "../src/commons/LiTag";

export default function MainPage() {
  const categories = ["chair", "promotion", "magazine", "table", "lamp"];

  const result = categories.map((category) =>
    useQueryProductsByCategory({ search: category })
  );

  // console.log(result);

  let [tab, setTab] = useState(0);
  const { addObject } = useAddToCart();

  // Fetch products for multiple categories using Promise.all
  //   const fetchAllCategories = async () => {
  //     const categories2 = ["chair", "table", "magazine", "promotion"];
  //     const categoryData = await Promise.all(
  //       categories.map((category) =>
  //         useQueryProductsByCategory({ search: category })
  //       )
  //     );
  //     console.log(categoryData);
  //     return [categoryData];
  //   };
  //   fetchAllCategories();
  //   const result2 = fetchAllCategories().then((categoryData) => {
  //     console.log(categoryData[0]);
  //   });
  const router = useRouter();
  const onClickMoveToDetail = (path: string) => () => {
    router.push(`/website/products/detailItem/${path}`);
  };
  return (
    <>
      <section
        className='main-bg'
        style={{ backgroundImage: "url(/main.bg.png)" }}>
        {/* <img className='main-bg-image' src='/main.bg.png' /> */}
        <div className='main-text'>
          <h1>A House Look</h1>
          <h1>New Collection</h1>
          <p>Rob works with executives, business leaders, and </p>
        </div>
      </section>
      <section className='chair-section'>
        <h1 className='section-title'>CHAIR</h1>
        {result?.[0].data?.fetchProductsByCategory?.slice(0, 4).map((el) => (
          <div key={el.id} className='item'>
            <div className='section-img'>
              <img
                onClick={onClickMoveToDetail(String(el.id))}
                src={`https://storage.googleapis.com/webportfolio-backend-storage/${el.files[0].name}`}
              />
            </div>
            <div className='section-content'>
              <h3>{el.name}</h3>
              <p>{el.description}</p>
              <div className='cart-section'>
                <p>${el.price}</p>
                <img
                  className='cart-img'
                  src='/cart.png'
                  onClick={() =>
                    addObject({
                      id: el.id,
                      name: el.name,
                      price: el.price,
                      description: el.description,
                      url: el.files[0].name,
                      quantity: 1,
                    })
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </section>
      <section className='promotion-section'>
        <h1 className='section-title'>PROMOTION</h1>
        {result?.[1].data?.fetchProductsByCategory?.map((el) => (
          <div key={el.id} className='item'>
            <div className='section-img'>
              <img
                src={`https://storage.googleapis.com/webportfolio-backend-storage/${el.files[0].name}`}
              />
            </div>
            <div className='section-content'>
              <h3>{el.name}</h3>
              <p>{el.description}</p>
              <div className='cart-section'>
                <p>$ {el.price}</p>
                <img
                  className='cart-img'
                  src='/cart.png'
                  onClick={() =>
                    addObject({
                      id: el.id,
                      name: el.name,
                      price: el.price,
                      description: el.description,
                      url: el.files[0].name,
                      quantity: 1,
                    })
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </section>
      <section className='magazine-section'>
        <h1 className='section-title'>MAGAZINE</h1>

        <div className='magazine-item'>
          {/* <hr /> */}
          <div className='magazine-item-1'>
            <img
              src={`https://storage.googleapis.com/webportfolio-backend-storage/${result?.[2].data?.fetchProductsByCategory[0]?.files[0].name}`}
            />
            <p>
              Rob works with executives, business leaders, and their
              <br /> teams with executives, business leaders,
              <br /> and their teams to create powerful change, inspire
            </p>
          </div>
          <hr className='margin-hr' />
          <div className='magazine-item-2'>
            {/* <div>
              <p></p>
            </div> */}
            <img
              src={`https://storage.googleapis.com/webportfolio-backend-storage/${result?.[2].data?.fetchProductsByCategory[0]?.files[1].name}`}
            />
            <div>
              <p>
                A House <span>Look</span>
                <br />
                &nbsp; &nbsp; &nbsp; New <span>Collection</span>
              </p>
            </div>
          </div>
          <hr />
          <div className='magazine-item-3'>
            <div>
              <p className='magazine-item-3-title'>Product Name</p>{" "}
              <p>
                Rob works with executives, business leaders, and their teams
                with executives,
                <br /> business leaders, and their teams to create powerful
                change, inspire innovation, <br />
                develop powerful strategy, and create effective engagement. He
                is
              </p>
            </div>

            <img
              src={`https://storage.googleapis.com/webportfolio-backend-storage/${result?.[2].data?.fetchProductsByCategory[0]?.files[2].name}`}
            />
          </div>
        </div>
      </section>
      <section className='table-section'>
        <h1 className='section-title'>TABLE</h1>
        {result?.[3].data?.fetchProductsByCategory?.slice(0, 4).map((el) => (
          <div key={el.id} className='item'>
            <div className='section-img'>
              <img
                onClick={onClickMoveToDetail(String(el.id))}
                src={`https://storage.googleapis.com/webportfolio-backend-storage/${el.files[0].name}`}
              />
            </div>
            <div className='section-content'>
              <h3>{el.name}</h3>
              <p>{el.description}</p>
              <div className='cart-section'>
                <p>$ {el.price}</p>
                <img
                  className='cart-img'
                  src='/cart.png'
                  onClick={() =>
                    addObject({
                      id: el.id,
                      name: el.name,
                      price: el.price,
                      description: el.description,
                      url: el.files[0].name,
                      quantity: 1,
                    })
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </section>
      <section className='collection-section'>
        <div className='collection-section-contents'>
          <div>
            <h1>Product Name</h1>
            <p>
              {" "}
              <span>
                Rob works with executives, business leaders, and their teams
                with
              </span>
            </p>
          </div>
          <div>
            <h2>COLLECTION</h2>
            <p>
              Rob works with executives, business leaders, and their teams with
              executives, business leaders, and their teams to create powerful
              change, inspire innovation, develop powerful strategy, and create
              effective engagement. He is
            </p>
          </div>
        </div>
        <div>
          <img src='/bg1.png' />
        </div>
      </section>
      <section className='rooms-section'>
        <ul>
          <LiItem setTab={setTab} />
        </ul>

        <div className='rooms-section-img-container'>
          <div className='item'>
            <div>
              <img
                onClick={onClickMoveToDetail(
                  String(result?.[0].data?.fetchProductsByCategory[tab]?.id)
                )}
                src={`https://storage.googleapis.com/webportfolio-backend-storage/${result?.[0].data?.fetchProductsByCategory[tab]?.files[0].name}`}
              />
            </div>
            <div className='section-content'>
              <h3>{result?.[0].data?.fetchProductsByCategory[tab]?.name}</h3>
              <p>
                {result?.[0].data?.fetchProductsByCategory[tab]?.description}
              </p>
              <div className='cart-section'>
                <p>$ {result?.[0].data?.fetchProductsByCategory[tab]?.price}</p>
                <img
                  className='cart-img'
                  src='/cart.png'
                  onClick={() =>
                    addObject({
                      id: String(
                        result?.[0].data?.fetchProductsByCategory[tab]?.id
                      ),
                      name: String(
                        result?.[0].data?.fetchProductsByCategory[tab]?.name
                      ),
                      price: Number(
                        result?.[0].data?.fetchProductsByCategory[tab]?.price
                      ),
                      description: String(
                        result?.[0].data?.fetchProductsByCategory[tab]
                          ?.description
                      ),
                      url: String(
                        result?.[0].data?.fetchProductsByCategory[tab]?.files[0]
                          .name
                      ),
                      quantity: 1,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className='item'>
            <div>
              <img
                onClick={onClickMoveToDetail(
                  String(result?.[3].data?.fetchProductsByCategory[tab]?.id)
                )}
                src={`https://storage.googleapis.com/webportfolio-backend-storage/${result?.[3].data?.fetchProductsByCategory[tab]?.files[0].name}`}
              />
            </div>
            <div className='section-content'>
              <h3>{result?.[3].data?.fetchProductsByCategory[tab]?.name}</h3>
              <p>
                {result?.[3].data?.fetchProductsByCategory[tab]?.description}
              </p>
              <div className='cart-section'>
                <p>$ {result?.[3].data?.fetchProductsByCategory[tab]?.price}</p>
                <img
                  className='cart-img'
                  src='/cart.png'
                  onClick={() =>
                    addObject({
                      id: String(
                        result?.[3].data?.fetchProductsByCategory[tab]?.id
                      ),
                      name: String(
                        result?.[3].data?.fetchProductsByCategory[tab]?.name
                      ),
                      price: Number(
                        result?.[3].data?.fetchProductsByCategory[tab]?.price
                      ),
                      description: String(
                        result?.[3].data?.fetchProductsByCategory[tab]
                          ?.description
                      ),
                      url: String(
                        result?.[3].data?.fetchProductsByCategory[tab]?.files[0]
                          .name
                      ),
                      quantity: 1,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className='item'>
            <div>
              <img
                onClick={onClickMoveToDetail(
                  String(result?.[4].data?.fetchProductsByCategory[tab]?.id)
                )}
                src={`https://storage.googleapis.com/webportfolio-backend-storage/${result?.[4].data?.fetchProductsByCategory[tab]?.files[0].name}`}
              />
            </div>
            <div className='section-content'>
              <h3>{result?.[4].data?.fetchProductsByCategory[tab]?.name}</h3>
              <p>
                {result?.[4].data?.fetchProductsByCategory[tab]?.description}
              </p>
              <div className='cart-section'>
                <p>$ {result?.[4].data?.fetchProductsByCategory[tab]?.price}</p>
                <img
                  className='cart-img'
                  src='/cart.png'
                  onClick={() =>
                    addObject({
                      id: String(
                        result?.[4].data?.fetchProductsByCategory[tab]?.id
                      ),
                      name: String(
                        result?.[4].data?.fetchProductsByCategory[tab]?.name
                      ),
                      price: Number(
                        result?.[4].data?.fetchProductsByCategory[tab]?.price
                      ),
                      description: String(
                        result?.[4].data?.fetchProductsByCategory[tab]
                          ?.description
                      ),
                      url: String(
                        result?.[4].data?.fetchProductsByCategory[tab]?.files[0]
                          .name
                      ),
                      quantity: 1,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className='item'>
            <div>
              <img
                onClick={onClickMoveToDetail(
                  String(result?.[0].data?.fetchProductsByCategory[tab + 1]?.id)
                )}
                src={`https://storage.googleapis.com/webportfolio-backend-storage/${result?.[0]
                  .data?.fetchProductsByCategory[tab + 1]?.files[0].name}`}
              />
            </div>
            <div className='section-content'>
              <h3>
                {result?.[0].data?.fetchProductsByCategory[tab + 1]?.name}
              </h3>
              <p>
                {
                  result?.[0].data?.fetchProductsByCategory[tab + 1]
                    ?.description
                }
              </p>
              <div className='cart-section'>
                <p>
                  $ {result?.[0].data?.fetchProductsByCategory[tab + 1]?.price}
                </p>
                <img
                  className='cart-img'
                  src='/cart.png'
                  onClick={() =>
                    addObject({
                      id: String(
                        result?.[0].data?.fetchProductsByCategory[tab + 1]?.id
                      ),
                      name: String(
                        result?.[0].data?.fetchProductsByCategory[tab + 1]?.name
                      ),
                      price: Number(
                        result?.[0].data?.fetchProductsByCategory[tab + 1]
                          ?.price
                      ),
                      description: String(
                        result?.[0].data?.fetchProductsByCategory[tab + 1]
                          ?.description
                      ),
                      url: String(
                        result?.[0].data?.fetchProductsByCategory[tab + 1]
                          ?.files[0].name
                      ),
                      quantity: 1,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className='item'>
            <div>
              <img
                onClick={onClickMoveToDetail(
                  String(result?.[0].data?.fetchProductsByCategory[tab + 2]?.id)
                )}
                src={`https://storage.googleapis.com/webportfolio-backend-storage/${result?.[0]
                  .data?.fetchProductsByCategory[tab + 2]?.files[0].name}`}
              />
            </div>
            <div className='section-content'>
              <h3>
                {result?.[0].data?.fetchProductsByCategory[tab + 2]?.name}
              </h3>
              <p>
                {
                  result?.[0].data?.fetchProductsByCategory[tab + 2]
                    ?.description
                }
              </p>
              <div className='cart-section'>
                <p>
                  $ {result?.[0].data?.fetchProductsByCategory[tab + 2]?.price}
                </p>
                <img
                  className='cart-img'
                  src='/cart.png'
                  onClick={() =>
                    addObject({
                      id: String(
                        result?.[0].data?.fetchProductsByCategory[tab + 2]?.id
                      ),
                      name: String(
                        result?.[0].data?.fetchProductsByCategory[tab + 2]?.name
                      ),
                      price: Number(
                        result?.[0].data?.fetchProductsByCategory[tab + 2]
                          ?.price
                      ),
                      description: String(
                        result?.[0].data?.fetchProductsByCategory[tab + 2]
                          ?.description
                      ),
                      url: String(
                        result?.[0].data?.fetchProductsByCategory[tab + 2]
                          ?.files[0].name
                      ),
                      quantity: 1,
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='style-section'>
        <div>
          <img src='/bg2.png' />
        </div>
        <div className='style-section-contents'>
          <div>
            <p>We've Got Your Style</p>
            <h2>
              {" "}
              Rob works with executives, business leaders, and their teams with
            </h2>
          </div>
          <div>
            <p>
              Rob works with executives, business leaders, and their teams with
              executives, business leaders, and their teams to create powerful
              change, inspire innovation
            </p>
          </div>
        </div>
      </section>
      <section className='banner-section'>
        <div>
          <img src='/banner.png' />
        </div>
      </section>
    </>
  );
}
