const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const fs = require("fs/promises");
const path = require("path");
const gravatar = require("gravatar");
const Jimp = require("jimp");

const  User   = require("../../models/user");

const { HttpError } = require("../../helpers");

const  ctrlWrapper  = require("../../decorators/ctrlWrapper");

const { SECRET_KEY } = process.env;

const avatarDir = path.resolve("public", "avatars");

const register = async (req, res) => {
    const { email,password,subscription } = req.body;
    const user = await User.findOne({ email });
    
    if (user) {
        throw HttpError(409, "Email in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    
    const newUser = await User.create({ ...req.body, password: hashPassword,subscription, avatarURL });
    res.status(201).json({
      user: {
        email: newUser.email,
            subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    });
}


    const login = async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            throw HttpError(401, "Email or password invalid");
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            throw HttpError(401, "Email or password invalid");
        }
        const payload = {
    id: user._id,
        }
    
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
        await User.findByIdAndUpdate(user._id, { token });
        res.json({
            token, user: {
                email: user.email,
                subscription: user.subscription,
            }
        })
}
    
const getCurrent = async (req, res) => {
    const { email, subscription } = req.user;
    res.json({ email, subscription });
}

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    res.status(204).json({
        message: "No Content"
    });
   
};

// змінює тільки поле підписки subscription на одно з цих значень ['starter', 'pro', 'business']
const updateSubscription = async (req, res) => {
   const { _id } = req.user;
    const result = await User.findByIdAndUpdate(_id, req.body, { new: true }); 
    if (!result) {
        throw HttpError(404, `Contact with ${_id} not found`);
    }
    res.json(result);
}


const updateAvatarUser = async (req, res) => {
    if (!req.file) {
        throw HttpError(400, "Аvatar is required");
}

  const { _id} = req.user;
  const { path: oldPath, filename } = req.file;

    await Jimp.read(oldPath)
        .then((avatar) => {
            return avatar
        .resize(250, 250) //resize
        .quality(60) //set JPEG quality
        .write(oldPath); //save
})
    .catch ((error)=>{
        throw error;
    });
    
  const newPath = path.join(avatarDir, filename);

  await fs.rename(oldPath, newPath);
  const avatarURL = path.join("avatar", filename);

  await User.findByIdAndUpdate(_id, {avatarURL});
  res.status(201).json({ avatarURL });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatarUser: ctrlWrapper(updateAvatarUser),
};