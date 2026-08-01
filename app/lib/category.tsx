



export async function getAllCategories() {
  try {
    
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch categories (${response.status})`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}
