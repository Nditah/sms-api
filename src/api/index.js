import express from "express";

// Routes
import bankRoute from "./bank";
import messageRoute from "./message";
import notificationRoute from "./notification";
import settingRoute from "./setting";
import setupRoute from "./setup";
import smsRoute from "./sms";
import ticketRoute from "./ticket";
import transactionRoute from "./transaction";
import userRoute from "./user";

const router = express.Router();

// Use Routes
router.use(bankRoute);
router.use(messageRoute);
router.use(notificationRoute);
router.use(settingRoute);
router.use(setupRoute);
router.use(smsRoute);
router.use(ticketRoute);
router.use(transactionRoute);
router.use(userRoute);

export default router;
