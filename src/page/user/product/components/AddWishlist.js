import axios from "axios";
import React, { useEffect } from "react";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import jwt_decode from "jwt-decode";

function AddWishlist({ wishlistFeature, isWishList, wishlist, allItemWishlist, userID }) {
  // console.log('status', wishlistUUID);
  const [productID] = React.useState(wishlistFeature);
  const [add, setAdd] = React.useState(true);
  // console.log(add);
      const [wishlistUUID, setWishlistUUID] = React.useState();
      // console.log("wishlist UUID ",wishlistUUID);
      useEffect(() => {
      const findItemWishlistUUID = allItemWishlist.filter((wishlist) => {
        if (productID?.product_uuid === wishlist?.wishlist_productUUID) {
        // console.log('1 masuk');
          if (userID === wishlist?.wishlist_userUUID) {
            // console.log('2 masuk lagi');
            setWishlistUUID(wishlist?.wishlist_uuid)
          } else {
            // console.log('2 gamasuk');
          }
        } else {
          // console.log('1 gamasuk');
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
        await axios.post(`https://api.acmeo2.online/wishlist/delete/${wishlistUUID}`);
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
        await axios.post("https://api.acmeo2.online/wishlist/add", {
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
