import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Skeleton, Spin, Tooltip } from 'antd'
import { actDeleteItemInWishListAsync, actGetMyWishListAsync } from '../../store/wishList/action'
import { convertNewPrice, formatVND } from '../../helpers/priceFormat'

const DashboardUserWishList = () => {

    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        dispatch(actGetMyWishListAsync()).then(() => {
        }).finally(() => {
            setIsLoading(false)
        })
    }, [dispatch])

    const myWishList = useSelector(state => state.WishList)

    if (!myWishList) {
        return
    }

    if (isLoading) {
        return <>
            <Skeleton paragraph={3} />
            <Skeleton paragraph={3} />
            <Skeleton paragraph={3} />
        </>
    }


    const handleRemoveProduct = (productId) => {
        setIsLoading(true)
        dispatch(actDeleteItemInWishListAsync(productId)).then(() => {
            dispatch(actGetMyWishListAsync())
        }).finally(() => setIsLoading(false))
    }

    return (

        <div className="wishlist-page">
            <ul className="wishlist">
                {
                    myWishList.map((item, index) => {
                        return (
                            <li className="wishlist__item" key={index}>
                                <Link to={`/product/${item.product.slug}`}>
                                    <div className="wishlist__item-thumb">
                                        <img src={item.product.image} alt="" />
                                    </div>
                                </Link>
                                <div className="wishlist__item-info">
                                    <Link to={`/product/${item.product.slug}`}>
                                        <div className="wishlist__item-name">
                                            {item.product.name}
                                        </div>
                                    </Link>
                                </div>
                                <div className="wishlist__item-price">
                                    <div className="wishlist__item-price--new">
                                        {formatVND(convertNewPrice(item.product.price, item.product.discount))}
                                    </div>
                                    <div className="wishlist__item-price--old">
                                        {
                                            item.product.discount != 0 ?
                                                (
                                                    <>
                                                        {formatVND(item.product.price)}
                                                        <span>-{item.product.discount}%</span>
                                                    </>
                                                ) :
                                                null
                                        }
                                    </div>
                                </div>
                                <Tooltip title="Xóa">
                                    <button className="btn-close" onClick={() => handleRemoveProduct(item.product_id)}>
                                        ×
                                    </button>
                                </Tooltip>
                            </li>
                        )
                    })
                }
            </ul>
        </div>

    )


}

export default DashboardUserWishList
