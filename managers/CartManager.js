import fs from 'fs';

export default class CartManager {
  constructor(path) {
    this.carts = [];
    this.path = './Files/carts.json';
  }

  async save(cart) {
    if (this.carts.length === 0) {
      cart.id = 1;
    } else {
      cart.id = this.carts[this.carts.length - 1].id + 1;
    }

    this.carts.push(cart);
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(this.carts, null, "\t")
    );
    return cart;
  }

  async getById(id) {
    const cart = this.carts.find((cart) => cart.id === id);
    return cart;
  }

  async readCarts() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.path, (error, data) => {
        if (error) {
          reject(error);
        } else {
          try {
            this.carts = JSON.parse(data);
            resolve(this.carts);
          } catch (error) {
            reject(error);
          }
        }
      });
    });
  }

  async writeCarts() {
    return new Promise((resolve, reject) => {
      fs.writeFile(this.path, JSON.stringify(this.carts), (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
}