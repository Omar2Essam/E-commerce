import axios from "axios";
import { useEffect } from "react";
import { createContext, useState } from "react";


export const cartContext=createContext();

export function CartContextProvider({children}){

    const [cartProducts,setCartProducts] =useState(null);
    const [totalcartprice,setTotalcartprice] =useState(0);
    const [numOfcartitems,setNumOfcartitems] =useState(0);
    const [cartid,setCartid]=useState(null);
    
   async function addProductToCart(id){
    try{
        const {data}=  await axios.post('https://ecommerce.routemisr.com/api/v1/cart',{
            "productId": id,
        },{
            headers:{token:localStorage.getItem('tkn')}
        });
        getUserCart();
        return data;
    }catch(e){
        console.log(e);
    }
    }
  async  function getUserCart(){
      try{
      const {data} =  await axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
            headers:{
                token:localStorage.getItem('tkn')
            }
        });
        setNumOfcartitems(data.numOfCartItems);
        setTotalcartprice(data.data.totalCartPrice);
        setCartProducts(data.data.products);
        setCartid(data.data._id);
      }catch(e){
        console.log(e);
      }
    }

     async  function removeCartData(){
      try{
      const {data} =  await axios.delete('https://ecommerce.routemisr.com/api/v1/cart',{
            headers:{
                token:localStorage.getItem('tkn')
            }
        });
        setNumOfcartitems(0);
        setTotalcartprice(0);
        setCartProducts([]);
      }catch(e){
        console.log(e);
      }
    }

    async function DeleteProduct(id){
        try {
          const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
            headers:{token:localStorage.getItem('tkn')}
          });
          setNumOfcartitems(data.numOfCartItems);
          setTotalcartprice(data.data.totalCartPrice);
          setCartProducts(data.data.products);
          return data;
        } catch (error) {
            console.log(error);
        }
    }

    async function updateCount(id,count){
      try {
        const {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
           "count":count
        },{
            headers:{token:localStorage.getItem('tkn')}
        });
        setCartProducts(data.data.products);
        setNumOfcartitems(data.numOfCartItems);
        setTotalcartprice(data.data.totalCartPrice);
        return data;
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(function(){
        getUserCart();
    },[]);

    return <cartContext.Provider value={{setNumOfcartitems,setTotalcartprice,setCartProducts,getUserCart,DeleteProduct,updateCount,addProductToCart,removeCartData,cartid,cartProducts,totalcartprice,numOfcartitems}}>   
    {children}
    </cartContext.Provider>
}