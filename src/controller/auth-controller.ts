import { compare, hash } from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { User } from "../mongoose/models/user.model";
import { UserBodyType } from "../type/user";
import { sign } from "jsonwebtoken";
import { SessionManager } from "../sessionManager";
import { randomBytes } from "crypto";

const envr = process.env;
const sessionManager = new SessionManager();
sessionManager.isConnectedFn();

async function loginUser(req: { body: UserBodyType }, res: any) {
  try {
    const validUser = await User.findOne({ email: req.body.email });
    if (!validUser) {
      return res.status(401).json({
        response: {
          code: 401,
          message: `Invalid username!`,
        },
      });
    }
    const matchPassword = compare(req.body.password, validUser.password ?? "");
    if (!matchPassword) {
      return res.status(401).json({
        response: {
          code: 401,
          message: `Invalid password!`,
        },
      });
    }

    const tokenObj = {
      id: validUser._id,
      name: validUser.name,
      email: validUser.email,
    };
    const jwtToken = sign(tokenObj, envr.SERVER_SECRET || "", {
      expiresIn: envr.TOKEN_EXPIRY_TIME_IN_MINUTES,
    });
    const expiry_time_in_sec =
      Number(envr.TOKEN_EXPIRY_TIME_IN_MINUTES?.split("m")[0]) * 60;
    const ivSecret = randomBytes(16).toString("hex");
    sessionManager.setSession(ivSecret, expiry_time_in_sec, {
      jwtToken,
      expiry_time_in_sec,
      ...tokenObj,
    });
    return res.status(200).json({
      response: {
        code: 200,
        message: `Logged in Successfully!`,
      },
      sessionId: ivSecret,
      expiry_time_in_sec,
    });
  } catch (error) {
    return res.status(500).json({
      response: { code: 500, message: `Successfully Created users! ${error}` },
      error,
    });
  }
}

async function registerUser(req: { body: UserBodyType }, res: any) {
  const emailExist = await User.findOne({ email: req.body.email });
  const phoneExist = await User.findOne({ phone: req.body.phone });
  if (emailExist || phoneExist) {
    try {
      console.log("Duplicate user already exist!", req.body);
      return res.status(409).json({
        response: { code: 409, message: "Duplicate user already exist!" },
      });
    } catch (error) {
      return console.log("Error while registering the user data", error);
    }
  }

  const uuid = uuidv4();
  const userModel = new User({ uuid, ...req.body });
  userModel.password = await hash(req.body.password, 10);

  try {
    const data = await userModel.save();
    data.password = undefined;
    return res.status(201).json({
      response: { code: 201, message: "Successfully Created users!" },
      data,
    });
  } catch (error) {
    console.log("Error while registering the user data", error);
  }
}

export { loginUser, registerUser };
