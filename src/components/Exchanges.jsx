import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import { Container, HStack, Image, Heading, VStack, Text } from "@chakra-ui/react";
import Loader from "./Loader";
import ErrorComponent  from "./ErrorComponent";
const Exchanges = () => {
  const [exchange, setexchange] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false)
  useEffect(() => {

    const fetchExchanges = async () => {
      try{
      let { data } = await axios.get(`${server}/exchanges`);
      // console.log(data)
      setexchange(data);
      setloading(false);
      }
      catch(error)
      {
        seterror(true);
        setloading(false)
      }
    };
    fetchExchanges();

  }, []);
  if(error)
  {
      return <ErrorComponent message="Error due to wrong url"/>
  }
  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {exchange.map((i) => {
              return <ExchangeCard
                id={i.id}
                name={i.name}
                img={i.image}
                rank={i.trust_score_rank}
                url={i.url}
              />;
            })}
          </HStack>
        </>
      )}
    </Container>
  );
};
const ExchangeCard = (props) => {
  return (<a href={props.url} target={"blank"}>
    <VStack
      w={"52"}
      shadow={"lg"}
      p={"8"}
      borderRadius={"lg"}
      transition={"all 0.3s"}
      m={"4"}
      css={{
        "&:hover": {
          transform: "scale(1.1)",
        }
      }}
    >
      <Image
        src={props.img}
        v={"10"}
        h={"10"}
        objectFit={"conatain"}
        alt={"Exchange"}
      />
      <Heading size={"md"} noOfLines={1}>
        {props.rank}
      </Heading>
      <Text noOfLines={1}>{props.name}</Text>
    </VStack>
  </a>)
}
export default Exchanges;
