import env from "../../utils/configs/env.js";
import OtpModel from "../../utils/database/models/otp.model.js";
import UserModel from "../../utils/database/models/user.model.js";
import { generateRandomCode } from "../../utils/helpers/common.js";
import logger from "../../utils/helpers/logger.js";
import { successResponse, serverErrorResponse, badResponse } from "../../utils/helpers/response.js";


async function resetPassword(req, res) {
    try {
        // [TODO]: wait for 120sec & after day resend ability

        const { email, code, password } = req.body;
        const { accesscode } = req.query;

        const otpModel = new OtpModel();
        const userModel = new UserModel();

        const existingOtp = await otpModel.findOne({ to: email, status: "unverified", utility: "reset" });
        const user = await userModel.findOne({ email: email });
        let otpcode = existingOtp?.code;
        if (accesscode && existingOtp) {
            if (!(code && password)) {
                return badResponse(res, "code & password are required fields");
            }
            existingOtp.verifycount += 1;
            if (existingOtp.verifycount > 5) {
                return badResponse(res, "verification rate exceeded");
            }

            if (existingOtp.code !== code) {
                await otpModel.update(existingOtp.id, {
                    verifycount: existingOtp.verifycount
                });

                return badResponse(res, "invalid otp");
            } else if (existingOtp.code === code && user?.id) {
                const newhashpassword = await userModel.hashPassword(password);
                await userModel.update(user.id, {
                    password: newhashpassword
                });
                await otpModel.update(existingOtp.id, {
                    status: "verified"
                });
            } else {
                return badResponse(res, "something went wrong. please contact support");
            }
            sendResetLink(otpcode, email);
            return successResponse(res, "user password updated. Please signin")
        } else if (existingOtp) {
            if (existingOtp.count >= 5) {
                return badResponse(res, "otp rate exceeded");
            }
            existingOtp.count += 1;
            await otpModel.update(existingOtp.id, {
                count: existingOtp.count
            });
            sendResetLink(otpcode, email);
            return successResponse(res, `otp has been sent, if registered email exists : ${email}`)
        }


        if (!accesscode) {
            otpcode = generateRandomCode()
            await otpModel.create({
                to: email,
                code: otpcode
            });


            if (!user) {
                return successResponse(res, `otp has been sent, if registered email exists ${email}`)
            } else {
                sendResetLink(otpcode, email);
            }

            return successResponse(res, `otp has been sent, if registered email exists: ${email}`)
        } else {
            return badResponse(res, "something went wrong. please contact support");
        }



    } catch (error) {
        logger("[ERR]: ", error);
        return serverErrorResponse(res);
    }
}

export default resetPassword;


function sendResetLink(code, email) {

    const resetlink = env.urls.fehost + `/auth/reset-password/?code=${code}&email=${email}`;
    const emailbody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <p>Hello User,</p>
        <p>We received a request to reset your password. If you did not make this request, you can safely ignore this email.</p>
        <p>To reset your password, please click on the following link:</p>
        <p><a href="${resetlink}" target="_blank" style="text-decoration: none; background-color: black; color: white; padding: 10px 20px; border-radius: 2px; display: inline-block;">Reset Password</a></p>
        <p>If you're having trouble clicking the "Reset Password" button, you can copy and paste the following URL into your browser:</p>
        <p>${resetlink}</p>
        <p>This link is valid for 24hrs hours.</p>
        <p>If you have any questions or need assistance, please contact our support team.</p>
        <p>Best regards,<br> AppZ</p>
  </div>`

    const postData = {
        to: [email],
        subject: 'AppZ: Password Reset Link',
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