import api from "../../services/api"
import orderServices from "../../services/orderServices"

export const ACT_GET_MY_ORDERS = 'ACT_GET_MY_ORDERS'
export const ACT_GET_DETAIL_ORDERS = ' ACT_GET_DETAIL_ORDERS'
export const ACT_GET_LIST_ORDERS_USER = 'ACT_GET_LIST_ORDERS_USER'
export const ACT_TRACKING_ORDER = 'ACT_TRACKING_ORDER'

// create new order
export const actMakeNewOrder = (formData) => async (dispatch) => {
    try {
        const res = await orderServices.makeNewOrder(formData)
    } catch (err) {
        throw err
    }
}

// get my order (user)
export const actGetMyOrders = (myOrders) => {
    return {
        type: ACT_GET_MY_ORDERS,
        payload: { myOrders }
    }
}

export const actGetMyOrdersAsync = () => async (dispatch) => {
    const res = await orderServices.getListOrder()
    const myOrders = res.data.data
    dispatch(actGetMyOrders(myOrders))
}

//Get detail my orders
export const actGetDetailOrders = (orders) => {
    return {
        type: ACT_GET_DETAIL_ORDERS,
        payload: { orders }
    }
}

export const actGetDetailOrdersAsync = (orderCode) => async (dispatch) => {
    try {
        const res = await orderServices.getDetailOrder(orderCode)
        console.log(res)
        const orders = res.data.data
        dispatch(actGetDetailOrders(orders))
    } catch (err) {
        throw err
    }
}

//Get list orders user (admin)
export const actGetListOrdersUser = (listOrdersUser) => {
    return {
        type: ACT_GET_LIST_ORDERS_USER,
        payload: { listOrdersUser }
    }
}

export const actGetListOrdersUserAsync = (ordersTime) => async (dispatch) => {
    try {
        const res = await orderServices.getListOrderUser(ordersTime)
        const listOrdersUser = res.data.data
        dispatch(actGetListOrdersUser(listOrdersUser))
    } catch (err) {
        throw err
    }
}

//Get detail orders user (admin)

export const actGetDetailOrderUserAsync = (order_code) => async (dispatch) => {
    try {
        const res = await orderServices.getDetailOrderUser(order_code)
        console.log('Order user: ', res)
        const orders = res.data.data
        dispatch(actGetDetailOrders(orders))
    } catch (err) {
        throw err
    }
}

//Update status orders
export const actUpdateStatusOrder = (order_code, status) => async (dispatch) => {
    try {
        const res = await orderServices.updateStatusOrders(order_code, status)
    } catch (err) {
        throw err
    }
}

export const actDeleteOrder = (order_code) => async (dispatch) => {
    try {
        await orderServices.deleteOrder(order_code)
        return {
            ok: true,
            message: 'Xoá thành công!'
        }
    } catch (err) {
        return {
            ok: false,
            message: 'Có lỗi xảy ra!'
        }
    }
}

export const actDeleteOrderInProgressAsync = (order_code) => async (dispatch) => {
    try {
        await orderServices.deleteOrderInProgress(order_code)
        return {
            ok: true,
            message: 'Xoá thành công!'
        }
    } catch (err) {
        return {
            ok: false,
            message: 'Có lỗi xảy ra'
        }
    }
}

export const actTrackingOrder = (order) => {
    return {
        type: ACT_TRACKING_ORDER,
        payload: { order }
    }
}

export const actTrackingOrderAsync = (formValues) => async (dispatch) => {
    try {
        const res = await orderServices.trackingOrder(formValues)
        console.log('Tracking - Order: ', res)
        if (res.data.data.length === 0) {
            return {
                ok: false,
                message: 'Thông tin cung cấp không chính xác, vui lòng kiểm tra lại!'
            }
        } else {
            dispatch(actTrackingOrder(res.data.data[0]))
            return {
                ok: true,
                message: 'Tra cứu đơn hàng thành công!'
            }
        }
    } catch (err) {
        throw err
    }
}