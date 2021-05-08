module.exports = mongoose => {
    const Product = mongoose.model(
      "Products",
      new mongoose.Schema(
        {
          name: { type: String },
          image: { type: String },
          link: { type: String },
          price: { type: Number },
          currency: { type: String },
          description: { type: String },
          id: { type: String }
        }
      )
    );
  
    return Product;
  };