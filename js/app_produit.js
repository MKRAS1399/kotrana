const PRODUCTS = [
  {category: "Resaka sakafo", price: "200Ar", stocked: true, name: "Menakely"},
  {category: "Resaka sakafo", price: "500Ar", stocked: true, name: "Mofo akondro"},
  {category: "Resaka sakafo", price: "100Ar", stocked: false, name: "Mofogasy"},
  {category: "Resaka finday", price: "1.000.000Ar", stocked: true, name: "Redmi Note 8"},
  {category: "Resaka finday", price: "1.500.000Ar", stocked: false, name: "iPhone X"}
];

function ProductRow ({product}) {
    const name = product.stocked ? 
        product.name : 
        <span className="text-danger">{product.name}</span>
    return <tr>
        <td>{name}</td>
        <td>{product.price}</td>
    </tr>
}

function ProductCategoryRow ({category}) {
    return <tr>
        <th colSpan = "2">{category}</th>
    </tr>
}

function ProductTable ({products, inStockOnly, filterText}) {
    const rows = []
    let lastCategory = null

    products.forEach(product => {
        if (
            (inStockOnly && !product.stocked) || 
            (product.name.indexOf(filterText) === -1)){
            return null;
        }

        if (product.category !== lastCategory ) {
            lastCategory = product.category;
            rows.push(<ProductCategoryRow key = {lastCategory} category = {lastCategory} />)
        }
        rows.push(<ProductRow key = {product.name} product = {product} />)
    });

    return <table className = "table">
        <thead>
            <tr>
                <th>Anarana</th>
                <th>Vidiny</th>
            </tr>
        </thead>
        <tbody>{rows}</tbody>
    </table>
}

class SearchBar extends React.Component {

    constructor (props) {
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }

    handleFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value);
    }

    handleInStockChange(e) {
        this.props.onStockChange(e.target.checked);
    }

    render() {
        const {filterText, inStockOnly} = this.props;
        return <div className = "mb-3">
            <div className="form-group mb-0">
                <input type="text" value = {filterText} className = "form-control" placeholder = "Hitady..." onChange = {this.handleFilterTextChange}/>
            </div>
            <div className = "form-check">
                <input type="checkbox" checked = {inStockOnly} className = "form-check-input" id = "stock" onChange = {this.handleInStockChange}/>
                <label htmlFor="stock" className = "form-check-label">Ny zavatra mbola misy</label>
            </div>
        </div>
    }
}

class FilterableProductTable extends React.Component {
    
    constructor (props) {
        super(props);
        this.state = {
            filterText: '',
            inStockOnly: false
        }
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }

    handleFilterTextChange (filterText) {
        this.setState({filterText});
    }

    handleInStockChange (inStockOnly) {
        this.setState({inStockOnly});
    }

    render(){
        const {products} = this.props;
        return <React.Fragment>
            <Clock />
            <SearchBar 
                filterText = {this.state.filterText}
                inStockOnly = {this.state.inStockOnly}
                onFilterTextChange = {this.handleFilterTextChange}
                onStockChange = {this.handleInStockChange}
            />
            <ProductTable 
                products = {products}
                filterText = {this.state.filterText}
                inStockOnly = {this.state.inStockOnly}
            />
        </ React.Fragment> 
    }
}

class Clock extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            date : new Date()
        };
        this.timer = null;
    }

    componentDidMount(){
        this.timer = window.setInterval(this.tick.bind(this), 1000);
    }

    componentWillUnmount(){
        window.clearInterval(this.timer);
    }

    tick(){
        this.setState({ date : new Date()});
    }
    
    render(){
        return (
            <div class = "text-center mb-4 lera">
               - Androany dia {this.state.date.toLocaleDateString()} {this.state.date.toLocaleTimeString()} -
            </div>
        )
    }
}

ReactDOM.render(<FilterableProductTable products = {PRODUCTS}/>, document.querySelector('#app'));