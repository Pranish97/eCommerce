import React from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />

      <HorizontalCardProduct category="airpods" heading="Top's Airpods" />
      <HorizontalCardProduct category="camera" heading="Popular Camera" />

      <VerticalCardProduct
        category="mobiles"
        heading="Best Smart Phones of 2025"
      />

      <VerticalCardProduct category="mouse" heading="Mouse" />
      <VerticalCardProduct category="televisions" heading="Televisions" />
      <VerticalCardProduct category="watches" heading="Watches" />
      <VerticalCardProduct category="earphones" heading="Earphones" />
      <VerticalCardProduct category="speakers" heading="Speakers" />
      <VerticalCardProduct category="refrigerator" heading="Refrigerator" />
      <VerticalCardProduct category="trimmers" heading="Trimmers" />
    </div>
  );
};

export default Home;
