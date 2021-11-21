import ProductItem from '../ProductItem'
import { Typography } from 'antd'

import Underline from '../common/Underline'

export default function BestDiscount({ title, product }) {

    return (
        <div className="container">
            <div className="product">
                <Typography.Title
                    level={4}
                    className="title"
                >
                    {title}
                </Typography.Title>
                <Underline />
                <ul className="product__list">
                    {
                        product.slice(0, 5).map((product, index) => <ProductItem key={index} product={product} />)
                    }
                </ul>
            </div>
        </div>

    )
}