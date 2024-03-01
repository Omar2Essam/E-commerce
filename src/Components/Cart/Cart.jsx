import React from 'react'
import { useContext } from 'react'
import { cartContext } from '../../Context/Cartcontext'
import { Grid } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Payment from '../Payment/Payment';
import cart from '../../images/cart2.png'

export default function Cart() {
  const { removeCartData, cartProducts, totalcartprice, numOfcartitems, DeleteProduct, updateCount } = useContext(cartContext);

  async function UpdateCounter(id, count) {
    const res = await updateCount(id, count);
    if (res.status === "success") {
      toast.success("Updated Successfully");
    } else {
      toast.error("Error on Updating");
    }
  }

  if (cartProducts === null) {
    return <div className='vh-100 align-items-center d-flex justify-content-center'>
      <Grid
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  }
  if (cartProducts.length === 0) {
    return <>
    <div className='w-75 m-auto '>
     <img src={cart} />
   </div>
    </>
  }
  async function DeleteElement(id) {
    const res = await DeleteProduct(id);
    if (res.status === "success") {
      toast.success("Product Removed Successfully");
    } else {
      toast.error("Error Occurr")
    }
  }
  async function removeCart() {
    await removeCartData();
  }
  return <>
    <div style={{ backgroundColor: '#eee' }} className='container mt-5 m-auto py-5 '>
      <h2>Shop Cart:</h2>
      <h5>Total Price:{totalcartprice}</h5>
      <h6>Total Items:{numOfcartitems}</h6>
      <div className='d-flex justify-content-between'>
        <button onClick={removeCart} className='btn btn-outline-danger'>Clear Cart</button>
        <Link to="/payment" className='btn btn-outline-primary'>Confirm Payment</Link>
      </div>
      {cartProducts.map(function (product, idx) {
        return <div key={idx} className='row align-items-center  py-2 border-bottom border-3'>
          <div className='col-sm-1'>
            <img src={product.product.imageCover} className='w-100' alt='' />
          </div>
          <div className='col-sm-9'>
            <h2>{product.product.title}</h2>
            <h5>Price: {product.price}</h5>
            <button onClick={() => DeleteElement(product.product.id)} className='btn btn-outline-danger my-2'>Remove</button>
          </div>
          <div className='col-sm-2'>
            <div className='d-flex align-items-center'>
              <button onClick={() => UpdateCounter(product.product.id, product.count + 1)} className='btn btn-outline-success'>+</button>
              <span className='mx-2'>{product.count}</span>
              <button onClick={() => UpdateCounter(product.product.id, product.count - 1)} className='btn btn-outline-success'>-</button>
            </div>
          </div>
        </div>
      })}

    </div>
  </>
}
