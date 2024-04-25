import env from "../../utils/configs/env.js";
import OtpModel from "../../utils/database/models/otp.model.js";
import UserModel from "../../utils/database/models/user.model.js";
import { generateRandomCode } from "../../utils/helpers/common.js";
import { badResponse, successResponse } from "../../utils/helpers/response.js";

const otpModel = new OtpModel();
const userModel = new UserModel();

async function userVerify(req, res) {
  const { email, code, sendemail } = req.query;

  const user = await userModel.findOne({ email: email });
  if (user?.verified) {
    return successResponse(res, "User already verified.");
  }

  const existingCode = await otpModel.findOne({ to: email, status: "unverified", utility: "verify" });
  let otpcode = existingCode?.code;

  // send verify link
  if (sendemail) {
    if (existingCode) {
      if (existingCode.count >= 10) {
        return badResponse(res, "Sending rate exceeded. Please contact support.");
      }

      existingCode.count += 1;
      await otpModel.update(existingCode.id, {
        count: existingCode.count
      });
    } else {
      otpcode = await generateNewLink(email);
    }

    if (user) {
      sendVerifyLink(otpcode, email);
    }
    return successResponse(res, `Verification link has been sent to your email ${email}.`);
  }

  // verify account
  if (!code || !existingCode) {
    return badResponse(res, "Invalid request.");
  }

  existingCode.verifycount += 1;
  if (existingCode.verifycount > 10) {
    return badResponse(res, "Verification rate exceeded. Please contact support.");
  }

  if (existingCode.code !== code) {
    await otpModel.update(existingCode.id, {
      verifycount: existingCode.verifycount
    });
    return badResponse(res, "Verification failed. Invalid code.");
  }

  if (existingCode.code === code && user?.id) {
    await userModel.update(user.id, {
      verified: true
    });
    await otpModel.update(existingCode.id, {
      status: "verified"
    });

    return successResponse(res, "User verified successfully")
  }

  return badResponse(res, "Something went wrong. please contact support");
}

export default userVerify;


export async function generateNewLink(email) {
  let otpcode = generateRandomCode()
  await otpModel.create({
    to: email,
    code: otpcode,
    utility: "verify"
  });
  return otpcode;
}

export function sendVerifyLink(code, email) {

  const verifylink = env.urls.fehost + `/auth/verify/?code=${code}&email=${email}`;
  const emailbody = `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <p>Hello User,</p>
    <p>Thank you for signing up with us!</p>
    <p>To verify your account type, please click on the following link:</p>
    <p><a href="${verifylink}" target="_blank" style="text-decoration: none; background-color: black; color: white; padding: 10px 20px; border-radius: 2px; display: inline-block;">Verify Account</a></p>
    <p>If you're having trouble clicking the "Verify Account" button, you can copy and paste the following URL into your browser:</p>
    <p>${verifylink}</p>
    <p>This link is valid for 24 hours.</p>
    <p>If you have any questions or need assistance, please contact our support team.</p>
    <p>Best regards,<br> AppZ</p>
</div>`

  const postData = {
    to: [email],
    subject: 'AppZ: Account Verification Link',
    body: emailbody
  };

  const url = env.email.host;

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': env.email.token

    },
    body: JSON.stringify(postData)
  };


  fetch(url, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
}
