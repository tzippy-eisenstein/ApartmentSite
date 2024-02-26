// emailSender.js

const sendWelcomeEmail = (email) => {
    // יצירת תבנית הודעת דוא"ל
   
    const emailTemplate = `
        <html>
        <head>
            <style>
                /* כאן ייכתב עיצוב הדוא"ל */
            </style>
        </head>
        <body>
            <div class="container">
                <div class="logo">
                <img src="https://www.publicdomainpictures.net/pictures/40000/nahled/real-estate-property.jpg" alt="Real Estate Property">
                </div>
                <div class="message">
                <h1>Welcome to Our Real Estate Services!</h1>
                <p>Thank you for joining our platform! We're thrilled to welcome you aboard.</p>
                <p>At our agency, we understand that finding the perfect property is a significant decision. Our team of experienced agents is here to assist you every step of the way.</p>
                <p>Whether you're looking to buy, sell, or rent, we provide personalized solutions tailored to your unique needs.</p>
                <p>Feel free to explore our listings and resources to begin your real estate journey. We're here to help you turn your dreams into reality.</p>
                <a href="https://example.com" class="action-button">Start Exploring</a>
            </div>
            
            </div>
        </body>
        </html>
    `;
    return emailTemplate;
};


module.exports = sendWelcomeEmail;
