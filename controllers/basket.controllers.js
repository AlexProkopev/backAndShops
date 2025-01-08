const getBasket = (req,res,next)=> {
    res.send("get basket")
  }
  
  const addToBasket = (req,res,next)=> {
    // const { productId, quantity } = req.body;
    res.send("add to basket")
  }

  const deletedFromBasket = (req,res,next)=> {
    // const productId = req.params.productId;
    res.send(`delete from basket product `)
  }
    
  module.exports = { getBasket, addToBasket, deletedFromBasket }