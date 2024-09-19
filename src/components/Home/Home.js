import React from 'react';
import TopSales from '../TopSales/TopSales';
import Catalog from '../Catalog/Catalog';
import { useSelector, useDispatch } from 'react-redux';

export default function Home() {
  
  //  query={`?query=${searchState.search}&category=${categoriesState.activeCategory}`}
  return (
    <>
      <TopSales />
      <Catalog searchSupport={false}/>
    </>
  );
}