import { Rate } from 'antd';
import { Link } from 'react-router-dom'
import { formatVND } from '../../utils/formatVND'

export default function ProductItem({ product }) {

    // const { avatar, name, price, oldPrice, rating, ratingCount } = product
    // console.log(product)

    const formatNewPrice = formatVND(product.newPrice);
    const formatOldPrice = formatVND(product.price)
    return (
        <li className="product__item">
            <Link to='/iphone-15gb'>
                <img src={product.avatar} alt="" className="product__item--thumb" />
            </Link>
            <div className="product__item--name">
                {product.name}
            </div>
            <div className="product__item--price">
                <span className="product__item--price-new">{formatNewPrice}</span>
                <span className="product__item--price-old">
                    <del>{formatOldPrice}</del>
                </span>
            </div>
            <div className="product__item--rating">
                <Rate disabled value={product.rating} />
                <span className="product__item--rating-num">
                    {product.ratingCount} đánh giá
                </span>
            </div>
        </li>
    )
}