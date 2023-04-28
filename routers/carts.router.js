import { Router } from 'express';
import CartManager from '../managers/CartManager.js';

const router = Router();

const cartManager = new CartManager();



router.post('/', async (req, res) => {
    const cart = {
        products: []
    };
    const result = await cartManager.save(cart);
    res.send({ status: 'success', result });
})

router.get('/:id', async (req, res) => {
    const cartId = Number(req.params.id);
    const cart = await cartManager.getById(cartId);
    if (!cart) {
        return res.status(404).send({ error: 'cart not found' })
    }
    res.send({ status: 'success', cart });
});

router.get('/:cid', async (req, res) => {
    const cid = req.params.cid;
    const cart = await cartManager.findById(cid);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    const productsInCart = cart.products;
    res.json(productsInCart);
  });
  
router.post('/:cid/product/:pid', async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity || 1;

    try {
        let cart = await cartManager.getById(cid);
        if (!cart) {
            cart = {
                id: cid,
                products: []
            };
        }
        for (let i = 0; i < quantity; i++) {
            cart.products.push(pid);
        }
        await cartManager.save(cart);
        res.send({ message: 'Product added to cart', cart: cart });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error adding product to cart' });
    }
});


export default router;