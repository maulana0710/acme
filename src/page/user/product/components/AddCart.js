import axios from "axios";

function AddCart(item = [] , carts = []) {
  // console.log("carts", carts);
  // console.log("ITEM", item);
    const temp = [...carts] // cart list array
    const existingProduct = temp.find(carts => carts?.cart_productUUID === item?.product_uuid) // check kalo uuid product di cart sama
    const valueCart = (existingProduct?.cart_cartValue + item?.itemAmount)
    // console.log('valueCart', valueCart);
    // console.log('existingProduct', existingProduct);
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
      // console.log('baru', carts);
      // console.log('user id', item?.userUUID);
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