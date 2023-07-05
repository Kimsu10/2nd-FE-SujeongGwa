import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './ProductList.scss';

const ProductList = () => {
  const [rangking, setRangking] = useState([]);
  const [productListData, setProductListData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState('');

  const { sub_category_id } = useParams();
  useEffect(() => {
    fetch('/data/rangkingData.json')
      .then(res => res.json())
      .then(data => {
        setRangking(data);
      });
  }, []);

  useEffect(() => {
    fetch(`http://10.58.52.156:3000/goods/category/${sub_category_id}`)
      .then(res => res.json())
      .then(data => {
        setProductListData(data.data);
      });
  }, [sub_category_id]);

  useEffect(() => {
    let categoryData = [];
    let title = '';
    if (sub_category_id >= 1 && sub_category_id <= 5) {
      categoryData = PORCELAIN_SUB_CATEGORY;
      title = 'PORCELAIN';
    } else if (sub_category_id >= 6 && sub_category_id <= 7) {
      categoryData = WALL_SUB_CATEGORY;
      title = 'WALL';
    } else if (sub_category_id >= 8 && sub_category_id <= 9) {
      categoryData = FLOOR_TILE_SUB_CATEGORY;
      title = 'FLOOR';
    }

    setSubCategoryData(categoryData);
    setCategoryTitle(title);
  }, [sub_category_id]);

  const surfaceType = [
    { id: 1, type: 'MATT' },
    { id: 2, type: 'HARD MATT' },
    { id: 3, type: 'SOFT MATT' },
    { id: 4, type: 'LAPPATO' },
    { id: 5, type: 'GLOSSY' },
  ];

  const findSurFace = surfaceTypeId => {
    return surfaceType.find(el => el.id === surfaceTypeId).type;
  };

  return (
    <div className="productList">
      <section className="rangking">
        <h1>RANGKING</h1>
        <ul className="rangkingBox">
          {rangking.map(rangking => (
            <li key={rangking.id}>
              <h2>{rangking.top}</h2>
              <Link to={`/goods/name/${rangking.name}`}>
                <div className="imgBox">
                  <img src={rangking.img} alt={rangking.name} />
                  <button type="sumbit">+ 상품 보기</button>
                </div>
                <p>{rangking.name}</p>
                <span>{rangking.type}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="subCategory">
        <div className="container">
          <h1>{categoryTitle} TILE</h1>
          <span>|</span>
          <ul className="subCategoryBox">
            {subCategoryData.map(subCategory => (
              <li key={subCategory.id}>
                <Link to={`/goods/category/${subCategory.id}`}>
                  {subCategory.name}
                </Link>
              </li>
            ))}
            <li className="case">
              <Link to="/">시공사례</Link>
            </li>
          </ul>
        </div>
      </section>
      <section className="productListBox">
        <ul className="productListRow">
          {productListData.length > 0 &&
            productListData.map(product => (
              <li key={product.id}>
                <Link to={`/goods/name/${product.name}`}>
                  <div className="imgBox">
                    <img src={product.image_url} alt={product.name} />
                    <button>+ 상품 보기</button>
                  </div>
                  <p>{product.name}</p>
                  <span>{findSurFace(product.surface_type_id)}</span>
                </Link>
              </li>
            ))}
        </ul>
      </section>
      {/* <ConstructionCase /> */}
    </div>
  );
};

export default ProductList;

const PORCELAIN_SUB_CATEGORY = [
  { id: 1, name: '600X600X10MM' },
  { id: 2, name: '600X600X20MM' },
  { id: 3, name: '600X1200X20MM' },
  { id: 4, name: '600X1200X11MM' },
  { id: 5, name: '400X800X10MM' },
  // { id: 6, name: '시공사례' },
];

const WALL_SUB_CATEGORY = [
  { id: 6, name: '300X600MM' },
  { id: 7, name: '200X600MM' },
];

const FLOOR_TILE_SUB_CATEGORY = [
  { id: 8, name: '300X300MM' },
  { id: 9, name: '200X400MM' },
];
