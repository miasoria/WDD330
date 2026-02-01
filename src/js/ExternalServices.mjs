function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
  constructor(category) {
    this.category = category;
    this.path = category ? `/json/${this.category}.json` : null;
  }

  

  // Fetch product data from JSON file
  async getData() {
    if (!this.path) return [];

    try {
      const data = await fetch(this.path).then(convertToJson);

      const products = data.Result || data;

      return products.map((item) => ({
        Id: item.Id,
        NameWithoutBrand: item.NameWithoutBrand || item.Name,
        Name: item.Name,
        Image: item.Image || item.Images?.PrimaryMedium || "",
        PrimaryMedium: item.Images?.PrimaryMedium || "",
        Brand: item.Brand || { Name: "Unknown" },
        FinalPrice: item.FinalPrice || item.ListPrice || 0,
        SuggestedRetailPrice: item.SuggestedRetailPrice || item.ListPrice || 0,
        Colors: item.Colors || []
      }));
    } catch (err) {
      console.error(`Failed to load products for category "${this.category}":`, err);
      return [];
    }
  }

  // Find product by ID
  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }


  // Submit an order to the server
  static async checkout(order) {
    const url = "https://wdd330-backend.onrender.com/checkout";

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    };

    try {
      const res = await fetch(url, options);
      return await res.json();
    } catch (err) {
      console.error("Checkout failed:", err);
      throw err;
    }
  }
}
