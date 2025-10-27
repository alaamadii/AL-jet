const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

// استيراد المسارات
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');

// الاتصال بقاعدة البيانات
connectDB();

const app = express();

// الوسائط
app.use(cors());  // السماح بالاتصال من الواجهة الأمامية
app.use(express.json());  // فهم بيانات JSON

// ربط المسارات
app.use('/api/v1/auth', authRoutes);      // جميع مسارات التسجيل تبدأ بـ /api/v1/auth
app.use('/api/v1/bookings', bookingRoutes); // جميع مسارات الحجز تبدأ بـ /api/v1/bookings

// تشغيل الخادم
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 الخادم يعمل على http://localhost:${PORT}`);
});