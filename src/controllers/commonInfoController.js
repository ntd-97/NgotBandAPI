const { CommonInfo } = require("../models/model");

const commonInfoController = {
  addCommonInfo: async (req, res) => {
    try {
      const newCommonInfo = new CommonInfo(req.body);
      const savedCommonInfo = await newCommonInfo.save();
      res.status(200).json(savedCommonInfo);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getCommonInfo: async (req, res) => {
    try {
      const commonInfo = await CommonInfo.find();
      res.status(200).json(commonInfo);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = commonInfoController;
