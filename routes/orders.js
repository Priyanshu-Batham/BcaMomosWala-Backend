import express from "express";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import { placeOrder, getMyOrders, getOrderDetails, getAdminOrders, processOrder } from "../controllers/order.js";

const router = express.Router();

router.post("/createorder", isAuthenticated, placeOrder);

// router.post("/createorderonline", isAuthenticated, placeOrderOnline);

router.get("/myorders", isAuthenticated, getMyOrders);

router.get("/order/:id", isAuthenticated, getOrderDetails);

router.get("/admin/orders", isAuthenticated, authorizeAdmin, getAdminOrders);

router.get("/admin/order/:id", isAuthenticated, authorizeAdmin, processOrder);

export default router;