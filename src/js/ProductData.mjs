
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `/json/${this.category}.json`;
  }

  async getData() {
    try {
      const data = await fetch(this.path).then(convertToJson);

      // If the JSON has a Result array (like backpacks), use it; else use data itself (like tents)
      const products = data.Result || data;

      // Normalize each product for consistent template usage
      return products.map((item) => ({
        Id: item.Id,
        NameWithoutBrand: item.NameWithoutBrand || item.Name,
        Name: item.Name,
        Image: item.Image || item.Images?.PrimaryMedium || "",
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

  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
}
