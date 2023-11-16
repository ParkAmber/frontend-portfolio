import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  ApolloLink,
  fromPromise,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { useEffect } from "react";
const GLOBAL_STATE = new InMemoryCache(); //랜더 되도 이건 유지되게 상수로 저장해준다음, 이 변수를 가져다 써줘야 유지 됨(global state에 있는 것들 페이지 이동되도 캐싱 유지 되게!!)!!
interface IApolloSettingProps {
  children: JSX.Element;
}
import { useRecoilState, useRecoilValueLoadable } from "recoil";
//   import { getAccessToken } from "../libraries/getAccessToken";
import { accessTokenState, restoreAccessTokenLoadable } from "../stores";
import { onError } from "@apollo/client/link/error";
import { getAccessToken } from "../../commons/libraries/getAccessToken";
export default function ApolloSetting(props: IApolloSettingProps): JSX.Element {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const aaa = useRecoilValueLoadable(restoreAccessTokenLoadable);
 
  useEffect(() => {
  
    void aaa.toPromise().then((newAccessToken) => {
      // console.log(newAccessToken);
      setAccessToken(newAccessToken ?? "");
    });
  }, []);
  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    //1. error 캐치(어떤 에러가 났는지..)
    if (typeof graphQLErrors !== "undefined") {
      for (const err of graphQLErrors) {
        
        if (err.extensions.code === "UNAUTHENTICATED") {
       
          return fromPromise(
          
            getAccessToken().then((newAccessToken) => {
              setAccessToken(newAccessToken ?? "");
      
              operation.setContext({
                headers: {
                  ...operation.getContext().headers, //3-1 기존의 Authorization들어있음! => Authorization: Bearer ~~~ ==>만료된 토큰이 추가되어있는 상태
                  Authorization: `Bearer ${newAccessToken}`, //3-2 토큰만 새걸로 바꾸주기! ==>위의...operation.getContext().headers에 들어있는 기존의 `Bearer ${accessToken}`를 덮어씀!!
                },
              });
            })
          ).flatMap(
            () => forward(operation) //3-3 방금 수정한 쿼리 재요청하기!
          );
        }
      }
    }
  });
  const uploadLink = createUploadLink({
    uri: "https://backend.amberpark.net/graphql",
    headers: {
      "Apollo-Require-Preflight": "true",
      "Access-Control-Allow-Credentials": "true",
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include", //cookie에 저장될수있게 headers에 cookie포함시킴!
  });
  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, uploadLink]),
    cache: GLOBAL_STATE,
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}

