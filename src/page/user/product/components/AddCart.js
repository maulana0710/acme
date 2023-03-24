import axios from "axios";

function AddCart(item, cart) {
  
    const temp = [...cart] // cart list array punya lu
    const existingProduct = temp.find(cart => cart?.cart_productUUID === item?.product_uuid) // check kalo uuid product di cart sama
    const valueCart = (existingProduct?.cart_cartValue + item?.itemAmount)
    console.log(valueCart);
    if (existingProduct) {
      // console.log('update', existingProduct);
      try {
          axios.post(`http://localhost:8080/cart/edit/${existingProduct?.cart_uuid}`, {
            userUUID: item?.userUUID,
            productUUID: item?.product_uuid,
            cartValue: valueCart,
          });
        }
        catch (error) {
          console.log(error);
        }

    } else {
      // console.log('baru', cart);
      try {
          axios.post("http://localhost:8080/cart/add", {
            userUUID: item?.userUUID,
            productUUID: item?.product_uuid,
            cartValue: item?.itemAmount,
          });
        }
        catch (error) {
          console.log(error);
        }
      }
}

export default AddCart;