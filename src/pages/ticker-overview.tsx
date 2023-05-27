import * as React from 'react';
import { useLoaderData } from 'react-router-dom';
import { LoaderFunctionArgs } from 'react-router-dom';


type Params = {
  ticker:string
};

export async function loader({ params } : LoaderFunctionArgs) {
  const ticker = params.ticker;
  return { ticker };
}

const TickerOverview = () => {
  const { ticker } = useLoaderData() as Params;
  return (
    <div>{ticker.toUpperCase()}</div>
  );
};

export default TickerOverview;
