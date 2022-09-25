
 exports.handler = async function (context, event, callback) {
    const response = new Twilio.Response();
    response.appendHeader('Content-Type', 'application/json');
  
    /*
     * uncomment to support CORS
     * response.appendHeader('Access-Control-Allow-Origin', '*');
     * response.appendHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
     * response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');
     */
  
    try {
      if (typeof event.to === 'undefined' || typeof event.code === 'undefined') {
        throw new Error('Missing parameter.');
      }
  
      const client = context.getTwilioClient();
      const service = 'SK6ea111577bed20d63653a8e52f4e6658';
      const { to, code } = event;
  
      const check = await client.verify
        .services(service)
        .verificationChecks.create({ to, code });
  
      if (check.status === 'approved') {
        response.setStatusCode(200);
        response.setBody({
          success: true,
          message: 'Verification success.',
        });
        return callback(null, response);
        // eslint-disable-next-line no-else-return
      } else {
        throw new Error('Incorrect token.');
      }
    } catch (error) {
      console.error(error.message);
      response.setBody({
        success: false,
        message: error.message,
      });
      return callback(null, response);
    }
  };
  