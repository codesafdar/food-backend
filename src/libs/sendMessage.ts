import { Infobip, AuthType } from "@infobip-api/sdk";



export const sendMessage = async (mobileNumber: string, otp: string) => {
  try {
    const stringifiedNumber = mobileNumber.toString()
    const formatNumber = stringifiedNumber.replace('-', '')
    let infobipClient = new Infobip({
      baseUrl: "e1zkd3.api.infobip.com",
      apiKey: "38f04a2149c7ebdba84aecb8594aa2d9-56341bbe-6ed6-4111-97b5-112994ddf780",
      authType: AuthType.ApiKey,
    });
    const infobipResponse = await infobipClient.channels.sms.send({
      type: 'text',
      messages: [{
        destinations: [
          {
            to: formatNumber,
          },
        ],
        from: 'Infosum SDK Test',
        text: `This is your OTP code ${otp}`,
      }],
    });
    return infobipResponse

  } catch (error) {
    console.error(error);
  }
}