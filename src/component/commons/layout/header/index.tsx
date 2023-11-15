import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import { useMoveToPage } from "../../../hooks/customs/useMoveToPage";
const Wrapper = styled.div`
  height: 50px;
  background-color: yellow;
`;
import * as S from "../../../../../styles/WebsiteMain.styles";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../stores";
import { useEffect } from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";

const WHITE_TEXT = [
  "/",
  "/website/",
  // "/designer/products/new",
];

export const LOGOUT = gql`
  mutation logout {
    logout
  }
`;
export default function LayoutHeader(): JSX.Element {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const router = useRouter();
  const isWhiteText = WHITE_TEXT.includes(router.asPath);
  // console.log(router.asPath, isWhiteText);
  const { onClickMoveToPage, visitedPage } = useMoveToPage();
  // console.log(visitedPage);

  // useEffect(() => {
  //   console.log("accessToken: ", accessToken);
  // }, []);
  const [logout] = useMutation(LOGOUT);

  const onClickLogout = async () => {
    const result = await logout();
    // console.log(result);
    alert("logout!!");
    setAccessToken("");
    void router.push("/website");
    // console.log(visitedPage);
  };
  return (
    <>
     <Head>
        <meta property='og:title' content='furniture website portfolio' />
        <meta
          property='og:description'
          content='Hello, this is a furniture website portfolio page.'
        />
        <meta
          property='og:image'
          content='https://storage.googleapis.com/webportfolio-backend-storage/magazine.living.png'
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel='icon' href='/logo2.png' />
      </Head>
      <S.WebsiteMainHeader isWhiteText={isWhiteText}>
        <div style={{ cursor: "pointer" }} className='website-logo'>
          <Link href='/website'>
            <S.WebsiteMainHeaderA isWhiteText={isWhiteText} href='/website'>
              Amber
            </S.WebsiteMainHeaderA>
          </Link>
        </div>
        <S.WebsiteMainHeaderList>
          <Link href='/website'>
            <S.WebsiteMainHeaderLi
              onClick={onClickMoveToPage("/website")}
              isWhiteText={isWhiteText}>
              Home
            </S.WebsiteMainHeaderLi>
          </Link>

          <Link href='/website/products'>
            <S.WebsiteMainHeaderLi
              onClick={onClickMoveToPage("/website/products")}
              isWhiteText={isWhiteText}>
              Products
            </S.WebsiteMainHeaderLi>
          </Link>
          <Link href='/website/products/cart'>
            <S.WebsiteMainHeaderLi
              onClick={onClickMoveToPage("/website/products/cart")}
              isWhiteText={isWhiteText}>
              Cart
            </S.WebsiteMainHeaderLi>
          </Link>
        </S.WebsiteMainHeaderList>
        <S.WebsiteMainHeaderListProfile>
          <div className='profile-item'>
            {accessToken ? (
              // <Link href='/website/login'>
              <S.WebsiteMainHeaderLiProfile></S.WebsiteMainHeaderLiProfile>
            ) : (
              <Link href='/website/signup'>
                <S.WebsiteMainHeaderLiProfile
                  onClick={onClickMoveToPage("/website/signup")}
                  isWhiteText={isWhiteText}>
                  Sign up
                </S.WebsiteMainHeaderLiProfile>
              </Link>
            )}
          </div>
          {/* <Link href='/website/signup'>
            <S.WebsiteMainHeaderLiProfile
              onClick={onClickMoveToPage("/website/signup")}
              isWhiteText={isWhiteText}>
              Sign up
            </S.WebsiteMainHeaderLiProfile>
          </Link> */}
          <div className='profile-item'>
            {accessToken ? (
              // <Link href='/website/login'>
              <S.WebsiteMainHeaderLiProfile
                onClick={onClickLogout}
                isWhiteText={isWhiteText}>
                Logout
              </S.WebsiteMainHeaderLiProfile>
            ) : (
              <Link href='/website/login'>
                <S.WebsiteMainHeaderLiProfile
                  onClick={onClickMoveToPage("/website/login")}
                  isWhiteText={isWhiteText}>
                  Login
                </S.WebsiteMainHeaderLiProfile>
              </Link>
            )}
          </div>
        </S.WebsiteMainHeaderListProfile>
      </S.WebsiteMainHeader>
    </>
  );
}
