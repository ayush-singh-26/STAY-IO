import { Booking } from "../models/booking.model.js"

export const getDashboardStats = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments()

    const totalRevenueAgg = await Booking.aggregate([
      { $match: { isPaid: true } },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } }
    ])
    const totalRevenue = totalRevenueAgg[0]?.total || 0

    // Recent bookings (last 5)
    const recentBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'username') // only fetch username
      .populate('room', 'roomType') // only fetch roomType

    return res.status(200).json({
      status: "success",
      data: {
        totalBookings,
        totalRevenue,
        bookings: recentBookings
      },
      message: "Dashboard data fetched successfully"
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ status: "error", message: "Server error" })
  }
}
