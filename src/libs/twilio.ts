import { Twilio } from 'twilio';
import { constants } from '../../utils/constants';



export const sendSMS = async (phoneNumber: string, message: string) => {
  const { twilioAccountSID, twilioAuthToken, twilioPhoneNumber } = constants;
const client = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  try {
    const smsResponse = await client.messages.create({
      from: '+92 3086590821',
      to: '+92 3306582946',
      body: message,
    });
    console.log('smsResponse:::>', smsResponse)
    return smsResponse
  } catch (error) {
    error.statusCode = 400;
    throw error;
  }
};
