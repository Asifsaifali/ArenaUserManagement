
import cron from "node-cron";
import VipMember from "../models/user.model.js";

cron.schedule("0 0 * * *", async () => {
  console.log("⏰ Running daily subscription update...");

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const members = await VipMember.find();

    for (const member of members) {
      const endDate = new Date(member.subscription.endDate);
      endDate.setHours(0, 0, 0, 0);

      const diff = endDate - today;
      const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));
      const isExpired = daysLeft <= 0;

      // Update fields
      member.subscription.daysLeft = isExpired ? 0 : daysLeft;
      member.subscription.expired = isExpired;
      member.subscription.status = isExpired ? "expired" : "active";

      await member.save();
    }

    console.log("✅ Subscription status updated for all members.");
  } catch (error) {
    console.error("❌ Error in cron job:", error.message);
  }
});
