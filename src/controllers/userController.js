const { User, Ticket } = require("../models/model");

const userController = {
  addUser: async (req, res) => {
    try {
      let userInfo = await User.find({ email: req.body.email });
      if (userInfo[0]?._id) {
        res
          .status(404)
          .send({ success: false, message: "Email đã được đăng ký!" });
      } else {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getUserInfo: async (req, res) => {
    try {
      let userInfo = await User.findById(req.params.id).select("-password");
      res.status(200).json(userInfo);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  login: async (req, res) => {
    try {
      const userLogin = await User.findOne({
        email: req.body.email,
        password: req.body.password,
      }).select({ _id: 1, fullName: 1 });
      if (userLogin) {
        res.status(200).json(userLogin);
      } else {
        res
          .status(401)
          .json({ success: false, message: "Email hoặc password không đúng!" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        res.status(404).send({ success: false, message: "Không tìm thấy tài khoản!" });
      } else {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );
        res.status(200).json(updatedUser);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const tickets = await Ticket.find({ user: req.params.id });
      if (!user) {
        res.status(404).send({ success: false, message: "Không tìm thấy tài khoản!" });
      } else {
        if (tickets.length === 0) {
          const deletedUser = await User.findByIdAndDelete(req.params.id);
          res.status(200).json(deletedUser);
        } else {
          res.status(404).send({
            success: false,
            message: "Xóa vé của tài khoản trước khi xóa tài khoản!",
          });
        }
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = userController;
