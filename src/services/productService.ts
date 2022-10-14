import connection from '../models/connection';
import ProductModel from '../models/productsModel';
import Product from '../interfaces/productInterface';

class ProductService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  public async create(product: Product): Promise<Product> {
    const newProduct = await this.model.create(product);
    return newProduct;
  }

  public async getAll(): Promise<Product[]> {
    const products = await this.model.getAll();
    return products;
  }
}

export default ProductService;