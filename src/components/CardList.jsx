import React, { useState, useEffect } from 'react';
import Card from './Card';
import Button from './Button';
import Search from './Search';

const CardList = ({ data }) => {
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [filteredData, setFilteredData] = useState(data || []);
  const [products, setProducts] = useState((data || []).slice(0, limit));

  useEffect(() => {
    if (data) {
      setFilteredData(data);
      setOffset(0);
    }
  }, [data]);

  useEffect(() => {
    if (filteredData && filteredData.length > 0) {
      setProducts(filteredData.slice(offset, offset + limit));
    } else {
      setProducts([]);
    }
  }, [offset, filteredData, limit]);

  function changePage(direction) {
    if (direction === "next" && offset + limit < filteredData.length) {
      setOffset(offset + limit);
    }
    if (direction === "previous" && offset > 0) {
      setOffset(offset - limit);
    }
  }

  function filterTags(term) {
    if (!data) return;
    const lowerTerm = term.toLowerCase();
    const filtered = data.filter(product => 
      product.tags && product.tags.some(tag => tag.title.toLowerCase().includes(lowerTerm))
    );
    setFilteredData(filtered);
    setOffset(0);
  }

  return (
    <div className="cf pa2 mt2 mb2">
      <Search handleSearch={filterTags} />
      <div className="cf mt2 mb2">
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>
      <div className="cf flex items-center justify-center pa4">
        <Button 
          text="Previous" 
          handleClick={() => changePage("previous")} 
        />
        <Button 
          text="Next" 
          handleClick={() => changePage("next")} 
          disabled={!filteredData || offset + limit >= filteredData.length}
        />
      </div>
    </div>
  );
}

export default CardList;