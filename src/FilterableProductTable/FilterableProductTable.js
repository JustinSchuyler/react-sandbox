import React from 'react';

const products = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

function ProductCategoryRow(props) {
  return <tr><th colSpan="2">{props.category}</th></tr>;
}

function ProductRow(props) {
  return <tr><td>{props.name}</td><td>{props.price}</td></tr>;
}

function ProductTable(props) {
  let rows = [];
  let lastCategory = null;

  props.products.forEach(product => {
    if (lastCategory !== product.category) {
      rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
    }
    rows.push(<ProductRow name={product.name} price={product.price} key={product.name} />);
    lastCategory = product.category;
  });

  return (
    <table>
      <thead><tr><th>Name</th><th>Price</th></tr></thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

class FilterableProductTable extends React.Component {
  render() {
    return (
      <ProductTable products={products} />
    );
  }
}

export default FilterableProductTable;
