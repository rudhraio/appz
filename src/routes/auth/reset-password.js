import OtpModel from "../../utils/database/models/otp.model.js";
import UserModel from "../../utils/database/models/user.model.js";
import { generateRandomCode } from "../../utils/helpers/common.js";
import logger from "../../utils/helpers/logger.js";
import { successResponse, serverErrorResponse, badResponse } from "../../utils/helpers/response.js";


async function resetPassword(req, res) {
    try {
        // [TODO]: wait for 120sec
        
        const { email, code, password } = req.body;
        const { accesscode } = req.query;

        const otpModel = new OtpModel();
        const userModel = new UserModel();

        const existingOtp = await otpModel.findOne({ to: email, status: "unverified", utility: "reset" });
        const user = await userModel.findOne({ email: email });

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

            return successResponse(res, "user password updated. Please signin")
        } else if (existingOtp) {
            if (existingOtp.count >= 5) {
                return badResponse(res, "otp rate exceeded");
            }
            existingOtp.count += 1;
            await otpModel.update(existingOtp.id, {
                count: existingOtp.count
            });
            return successResponse(res, `otp has been sent, if registered email exists : ${email}`)
        }

        if (!accesscode) {
            await otpModel.create({
                to: email,
                code: generateRandomCode()
            });


            if (!user) {
                return successResponse(res, `otp has been sent, if registered email exists ${email}`)
            } else {
                // [todo]: send email
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