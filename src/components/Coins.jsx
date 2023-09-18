import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import { Radio, RadioGroup, Container, HStack, Button } from "@chakra-ui/react";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import CoinCard from "./CoinCard";
const Coins = () => {
  const [coins, setcoins] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false)
  const [page, setpage] = useState(1)
  const [currency, setcurrency] = useState("inr")
  const currencySymbol= currency==="inr"?"₹":currency==="eur"?"€":"$"
  const btns=new Array(132).fill(1)
  useEffect(() => {

    const fetchCoins = async () => {
      try{
      let { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
      // console.log(data)
      setcoins(data);
      setloading(false);
      }
      catch(error)
      {
        seterror(true);
        setloading(false)
      }
    };
    fetchCoins();

  }, [page,currency]);
  if(error)
  {
      return <ErrorComponent message="Error while fetching coins"/>
  }
  const changePage=(pg)=>{
      setpage(pg+1)
      setloading(true)
  }
  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <RadioGroup value={currency} onChange={setcurrency} p={"8"}>
            <HStack spacing={"4"}>
              <Radio value={"inr"}>INR</Radio>
              <Radio value={"usd"}>USD</Radio>
              <Radio value={"eur"}>EUR</Radio>
            </HStack>
          </RadioGroup>

          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {coins.map((i) => {
              return <CoinCard
                id={i.id}
                key={i.id}
                name={i.name}
                img={i.image}
                symbol={i.symbol}
                currencySymbol={currencySymbol}
                price={i.current_price}
              />;
            })}
          <HStack w={"full"} overflowX={"auto"} p={"8"}>
            {btns.map((item, index) => (
              <Button
                key={index}
                bgColor={"blackAlpha.900"}
                color={"white"}
                onClick={() => changePage(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </HStack>
          </HStack>
        </>
      )}
    </Container>
  );
};
export default Coins;
