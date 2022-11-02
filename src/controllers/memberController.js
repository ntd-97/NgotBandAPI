const { Member } = require("../models/model");

const memberController = {
  addMember: async (req, res) => {
    try {
      const newMember = new Member(req.body);
      const savedMember = await newMember.save();
      res.status(200).json(savedMember);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getMembers: async (req, res) => {
    try {
      const members = await Member.find();
      res.status(200).json(members);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = memberController;
