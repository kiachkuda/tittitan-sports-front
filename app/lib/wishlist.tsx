import { API_URL } from "../types/constants";

export const addToWishlist = async (productId:number) => {
  try {
    const response = await fetch(
      `${API_URL}/wishlist/${productId}`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

export const removeFromWishlist = async (productId:number) => {
  try {
    const response = await fetch(
      `${API_URL}/wishlist/${productId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
export const getWishlist = async () => {
  try {
    const response = await fetch(
      `${API_URL}/wishlist`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};