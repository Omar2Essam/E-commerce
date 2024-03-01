import axios from "axios"
import { Grid } from "react-loader-spinner";
import { useQuery } from "react-query";
import Homeslider from "../HomeSlider/Homeslider";
import Categoryslider from "../Categoryslider/Categoryslider";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { cartContext } from "../../Context/Cartcontext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";



export default function Products() {

  const { addProductToCart } = useContext(cartContext);

  async function addproduct(id) {

    const res = await addProductToCart(id);

    try {
      if (res.status === "success") {

        toast.success(res.message, {
          duration: 2000
        });
      } else {
        toast.error("Error Happend");
      }
    } catch (e) {
      console.log(e);
    }
  }

  function getAllProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }
  const { isError, isFetching, isLoading, data } = useQuery("allproducts", getAllProducts);

  if (isLoading) {
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
  return (
    <>

      <div className="container-fluid  mt-5 pt-5">

        <div className="row mb-5 p-5 d-flex align-items-center justify-content-center w-75 m-auto ">
          <div className="col-sm-8  w-25 ">
            <Homeslider />

          </div>

          <div className="col-sm-4  ">
            <img style={{ width: "100%", height: "200px" }} src={require('../../images/1 (1).jpg')} />
            <img style={{ width: "100%", height: "200px" }} src={require('../../images/1 (5).jpg')} />
          </div>
        </div>

        <Categoryslider />
        <div className="container mb-5">
          <div className="row g-4">
            {data?.data.data.map(function (product, idx) {
              return <div key={idx} className="col-md-3">

                <div className="product ">
                  <Link to={`/Productdetails/${product.id}`}>
                    <img src={product.imageCover} alt="product" className="w-100 " />
                    <h6 className="main-color text-center">{product.category.name}</h6>
                    <h5 className="text-center">{product.title.split(' ').slice(0, 2).join("-")}</h5>
                    <div className="d-flex justify-content-between">
                      <p>{product.price} EGP</p>
                      <p> <span><i className="fa-solid fa-star text-warning "></i></span> {product.ratingsAverage}</p>
                      {/* <i class="fa-solid fa-heart" onClick={() => addproduct(product.id)} ></i> */}
                    </div>

                  </Link>
                  <button onClick={() => addproduct(product.id)} className="w-100 p-1 mt-2 rounded-3 main-bg-color border-white text-white ">+ Add To Cart</button>

                </div>

              </div>
            })}


          </div>
        </div>

      </div>

    </>
  )
}
