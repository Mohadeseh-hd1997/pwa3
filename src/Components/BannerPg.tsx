import React, { useEffect, useState } from "react";
import MyCard from './MyCard';
import { Col, Layout, Row } from "antd";
import { UsePhotos } from "../Hook/UsePhotos";
import GeoLocation from "../module/GeoLocation";
interface PhotoItem {
  id: number;
  title: string;
  image: string;
}

const SwiperComponent: React.FC<{ items: PhotoItem[] }> = ({ items }) => (
  <Layout>
    <Row>
      <GeoLocation/>
    </Row>
    <Row>
      {items.map((img) => (
        <Col xs={12} sm={3} md={4} className="gutter-row" key={img.id}>
          <MyCard
            btn1="Add"
            btn2="View"
            desc=""
            head={img.title}
            img={img.image}
          />
        </Col>
      ))}
    </Row>
    <h3>Repeat Banner</h3>
    <Row>
      {items.map((img) => (
        <Col xs={12} sm={3} md={4} className="gutter-row" key={img.id}>
          <MyCard
            btn1="Add"
            btn2="View"
            desc=""
            head={img.title}
            img={img.image}
          />
        </Col>
      ))}
    </Row>
  </Layout>
);

const BannerPg: React.FC = () => {
  const [list, setList] = useState<PhotoItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UsePhotos();
        setList(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <SwiperComponent items={list} />
    </div>
  );
};

export default BannerPg;
