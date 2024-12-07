import transporter from './mailer.service';

export interface SendCourseEmailParams {
  recipientEmail: string;
  courseName: string;
  courseDescription: string;
  coursePrice: number;
}

export const sendCourseEmail = async ({
  recipientEmail,
  courseName,
  courseDescription,
  coursePrice,
}: SendCourseEmailParams) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: recipientEmail,
      subject: `Course Available: ${courseName}`,
      html: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <style>
            body {
              font-family: 'Arial', sans-serif;
              background-color: #f4f4f9;
              color: #000;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #2c3e50;
              font-size: 28px;
              margin-bottom: 15px;
            }
            p {
              font-size: 16px;
              line-height: 1.6;
              margin: 10px 0;
            }
            a {
              color: #3498db;
              text-decoration: none;
              font-weight: bold;
            }
            .price {
              font-size: 18px;
              color: #e74c3c;
              font-weight: bold;
            }
            .cta-button {
              display: inline-block;
              padding: 10px 20px;
              background-color: #000;
              color: #fff;
              border-radius: 5px;
              text-align: center;
              font-size: 16px;
              font-weight: bold;
              text-decoration: none;
              margin-top: 20px;
            }
            .cta-button:hover {
              background-color: #000;
            }
          </style>
          <title>${courseName} - Enrollment</title>
        </head>
        <body>
          <div class="container">
            <h1>${courseName}</h1>
            <p>${courseDescription}</p>
            <p class="price">Price: $${coursePrice}</p>
            <p>To enroll, click the button below:</p>
            <a class="cta-button">Enroll Now</a>
          </div>
        </body>
      </html>
`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${recipientEmail}`);
  } catch (error) {
    console.error('Error sending email:', error);
    return new Error('Failed to send email');
  }
};
