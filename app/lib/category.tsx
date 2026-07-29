
export async function getAllCategories() {
  try {
    
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/categories`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch products (${response.status})`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
