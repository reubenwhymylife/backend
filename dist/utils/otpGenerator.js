"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpManager = void 0;
class OtpManager {
    // Function to generate a random 4-digit OTP code
    static generateRandomOtp() {
        return Math.floor(1000 + Math.random() * 9000);
    }
    // Function to generate the OTP code and add an expiration time of 10 minutes
    static generateOtp() {
        const otp = this.generateRandomOtp();
        const expiresAt = new Date(Date.now() + 20 * 60 * 1000); // 10 minutes from now
        return { otp, expiresAt };
    }
    // Function to set OTP for a user email
    static setOtp(email) {
        const { otp, expiresAt } = this.generateOtp();
        this.otpStore.set(email, { otp, expiresAt });
        console.log(`Generated OTP for ${email}: ${otp}, Expires at: ${expiresAt}`);
        return otp;
    }
    // Function to get the current OTP for a user email, regenerating it if expired
    static getOtp(email) {
        const otpEntry = this.otpStore.get(email);
        if (otpEntry) {
            if (new Date() > otpEntry.expiresAt) {
                return this.setOtp(email); // Regenerate OTP if expired
            }
            return otpEntry.otp;
        }
        return null; // No OTP found for the email
    }
    // Function to verify the OTP for a user email
    static verifyOtp(email, otp) {
        const otpEntry = this.otpStore.get(email);
        if (otpEntry && otpEntry.otp === otp && new Date() <= otpEntry.expiresAt) {
            this.otpStore.delete(email); // Optionally delete OTP after verification
            return true;
        }
        return false;
    }
}
exports.OtpManager = OtpManager;
OtpManager.otpStore = new Map();
// Example usage
// // Generating and setting OTP for a user email
// const email = "user@example.com";
// const otp = OtpManager.setOtp(email);
// console.log(`OTP for ${email}: ${otp}`);
// // Retrieving OTP (after some time, to demonstrate expiration check)
// setTimeout(() => {
//   const currentOtp = OtpManager.getOtp(email);
//   console.log(`Current OTP for ${email}: ${currentOtp}`);
// }, 5 * 60 * 1000); // Check OTP after 5 minutes
// // Verifying the OTP
// const isValid = OtpManager.verifyOtp(email, otp);
// console.log(`OTP verification for ${email}: ${isValid ? isValid : "Invalid"}`);
