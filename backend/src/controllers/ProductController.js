const Product = require('../models/Product')

module.exports = {
  getAll: async (_, res) => {
    try {
      const items = await Product.find()
      res.status(200).json(items)
    } catch (err) {
      res.status(500).json({ message: err })
    }
  },
  getItem: async (req, res) => {
    try {
      const item = await Product.findById(req.params.id)
      if (!item) {
        return res.status(400).json({ message: 'Product does not exist' })
      }
      res.status(200).json(item)
    } catch (err) {
      res.status(500).json({ message: err })
    }
  },
  create: async (req, res) => {
    const newItem = new Product(req.body)
    try {
      const createdItem = await Product.create(newItem)
      res
        .status(201)
        .json({ message: 'Product created successfully', createdItem })
    } catch (err) {
      res.status(500).json({ message: err })
    }
  },
  update: async (req, res) => {
    const item = await Product.findById(req.params.id)
    if (!item) {
      return res.status(400).json({ message: 'Product does not exist' })
    }
    try {
      const updatedItem = await Product.findByIdAndUpdate(
        req.params.id,
        req.body
      )
      res
        .status(200)
        .json({ message: 'Product is successfully updated', updatedItem })
    } catch (err) {
      res.status(500).json({ message: err })
    }
  },
  delete: async (req, res) => {
    const item = await Product.findById(req.params.id)
    if (!item) {
      return res.status(400).json({ message: 'Product does not exist' })
    }
    try {
      const deletedItem = await Product.findByIdAndDelete(req.params.id)
      res
        .status(200)
        .json({ message: 'Product is successfully deleted', deletedItem })
    } catch (err) {
      res.status(500).json({ message: err })
    }
  }
}
