import api from './api'

const productsServices = {
    getAll() {
        return api.callWithToken().get('/products')
    },
    create(formData) {
        return api.callWithToken().post('/product', formData)
    },
    getDetailProduct(id) {
        return api.call().get(`/product?id=${id}`)
    },
    getBestDiscount() {
        return api.call().get('/home/products?sort=price-discount')
    }
}

export default productsServices