import axios from "axios";
import React, { useEffect } from "react";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";

function AddWishlist({ wishlistFeature, isWishList, wishlist, allItemWishlist }) {
  // console.log('status', wishlistUUID);
  const userLogin = JSON.parse(localStorage.getItem("user"));
  const [userID] = React.useState(userLogin?.user_uuid);
  const [productID] = React.useState(wishlistFeature);
  // const [wishlistID, setWishlistID] = React.useState();
  // const wislist = wishlist.map((value) => {return console.log(value);})
  // if (userID === wishlist.wishlist_userId) {
  //   console.log('ada');
  // }
  // console.log(productID?.product_uuid);
  const [add, setAdd] = React.useState(true);
  // console.log(add);
      const [wishlistUUID, setWishlistUUID] = React.useState();
      console.log("wishlist UUID ",wishlistUUID);
      useEffect(() => {
      const findItemWishlistUUID = allItemWishlist.filter((wishlist) => {
        if (productID?.product_uuid === wishlist?.wishlist_productUUID) {
        console.log('1 masuk');
          if (userID === wishlist?.wishlist_userUUID) {
            console.log('2 masuk lagi');
            setWishlistUUID(wishlist?.wishlist_uuid)
          } else {
            console.log('2 gamasuk');
          }
        } else {
          console.log('1 gamasuk');
        }
       }
      );
    }, );
  
  const addOrRemoveWishlist = async (e) => {
    e.preventDefault();
    if (isWishList === true) {
      setAdd(false);
      console.log('remove wish UUID', wishlistUUID);
      console.log('User ID: ', userID, 'Product ID: ', wishlistFeature?.product_uuid, 'Wishlist ID', wishlistUUID);
      try {
        await axios.post(`http://localhost:8080/wishlist/delete/${wishlistUUID}`);
      }
      catch (error) {
        console.log(error);
      }
      window.location.reload(false);
    } else {
      setAdd(true);
      console.log('add wish');
      console.log('User ID: ', userID, 'Product ID: ', wishlistFeature?.product_uuid, 'Wishlist ID', wishlistUUID);
      try {
        await axios.post("http://localhost:8080/wishlist/add", {
          userUUID: userID,
          productUUID: productID?.product_uuid
        });
      }
      catch (error) {
        console.log(error);
      }
      window.location.reload(false);
    }
  };

  return (
    <>
    {isWishList === add ? (
      <FcLike type="button" onClick={(e) => addOrRemoveWishlist(e)} />
    ) : (
      <FcLikePlaceholder type="button" onClick={(e) => addOrRemoveWishlist(e)} />
    )}
    </>
  )
}

export default AddWishlist;
