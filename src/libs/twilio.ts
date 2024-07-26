import { Twilio } from 'twilio';



export const sendSMS = async (phoneNumber: string, message: string) => {
const client = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  try {
    const smsResponse = await client.messages.create({
      from: process.env.TWILIO_FROM_NUMBER,
      to: process.env.TWILIO_TO_NUMBER,
      body: message,
    });
    console.log('smsResponse:::>', smsResponse)
    return smsResponse
  } catch (error) {
    error.statusCode = 400;
    throw error;
  }
};
