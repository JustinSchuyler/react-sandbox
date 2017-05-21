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

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterInputChange = this.handleFilterInputChange.bind(this);
    this.handleInStockInputChange = this.handleInStockInputChange.bind(this);
  }

  handleFilterInputChange(e) {
    this.props.onFilterInput(e.target.value);
  }

  handleInStockInputChange(e) {
    this.props.onInStockInput(e.target.checked);
  }

  render() {
    return (
      <div>
        <div>
          <input
            placeholder="Search..."
            value={this.props.query}
            onChange={this.handleFilterInputChange}
            autoFocus />
        </div>
        <label>
          <input
            type="checkbox"
            checked={this.props.inStockOnly}
            onChange={this.handleInStockInputChange} />
          {' '}
          Only show products in stock
        </label>
      </div>
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      inStockOnly: false
    };
    this.handleFilterInput = this.handleFilterInput.bind(this);
    this.handleInStockInput = this.handleInStockInput.bind(this);
  }

  handleFilterInput(query) {
    this.setState({ query });
  }

  handleInStockInput(inStockOnly) {
    this.setState({ inStockOnly });
  }

  render() {
    return (
      <div>
        <SearchBar
          query={this.state.query}
          inStockOnly={this.state.inStockOnly}
          onFilterInput={this.handleFilterInput}
          onInStockInput={this.handleInStockInput} />
        <ProductTable
          products={products}
          query={this.state.query}
          inStockOnly={this.state.inStockOnly} />
      </div>
    );
  }
}

export default FilterableProductTable;
