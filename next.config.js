module.exports = {
  env: {
    DB_LOCAL_URI: "mongodb://localhost:27017/bookit",
    DB_URI: "mongodb+srv://huseyinbattal:Re5nzhh5urcsUMzc@bookit.2gpfq2g.mongodb.net/?retryWrites=true&w=majority",

    STRIPE_API_KEY: "pk_test_51MDA14Dwu9Z048lip514GJOHQQaoSHyzdJP6xLHHj6mHQszKt9f1B39eCBRozhDbotpFmfL9GuNaiN96Hvk2kZBi00TKYsfoAx",
    STRIPE_SECRET_KEY:"sk_test_51MDA14Dwu9Z048licTeGh2Z4n6IRzxhuyzubDySZNSWDHaZAYZPXEBuMsc4tMIsZKkf4Jz5QYeShhciCbrjC0XR3008oXqAdck",

    CLOUDINARY_CLOUD_NAME: "dxqfwqg24",
    CLOUDINARY_API_KEY: "565552225744115",
    CLOUDINARY_API_SECRET: "6YP0Men7e56mCq-pg8uLrjs9ugI",

    STRIPE_WEBHOOK_SECRET: "whsec_SYEZfvwAEXQEzgeRFejGAqqeqqwSrpJN",
    

    SMTP_HOST: "smtp.mailtrap.io",
    SMTP_PORT: "2525",
    SMTP_USER: "c444c97d14bd8c",
    SMTP_PASSWORD: "47301b62b9d1ae",
    SMTP_FROM_NAME: "BookIT",
    SMTP_FROM_EMAIL: "noreply@bookit.com",

    NEXTAUTH_URL:"https://book-it-six.vercel.app/",
  },

  images: {
    domains: ["images.unsplash.com","res.cloudinary.com"],
  },
};