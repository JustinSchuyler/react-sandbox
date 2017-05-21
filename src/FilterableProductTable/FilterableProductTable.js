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
  return (
    <tr>
      <td className={!props.stocked ? 'not-in-stock' : ''}>{props.name}</td>
      <td>{props.price}</td>
    </tr>
  );
}

function ProductTable(props) {
  let rows = [];
  let lastCategory = null;

  props.products.forEach(product => {
    if (product.name.indexOf(props.query) === -1 || (props.inStockOnly && !product.stocked)) return;
    if (lastCategory !== product.category) {
      rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
    }
    rows.push(
      <ProductRow
        name={product.name}
        price={product.price}
        stocked={product.stocked}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead><tr><th>Name</th><th>Price</th></tr></thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar(props) {
  return (
    <div>
      <div>
        <input
          placeholder="Search..."
          value={props.query}
          autoFocus />
      </div>
      <label>
        <input type="checkbox" checked={props.inStockOnly} />
        {' '}
        Only show products in stock
      </label>
    </div>
  );
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      inStockOnly: false
    }
  }

  render() {
    return (
      <div>
        <SearchBar
          query={this.state.query}
          inStockOnly={this.state.inStockOnly} />
        <ProductTable
          products={products}
          query={this.state.query}
          inStockOnly={this.state.inStockOnly} />
      </div>
    );
  }
}

export default FilterableProductTable;
