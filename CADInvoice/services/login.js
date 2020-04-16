var login = require('login');
const { ApiResponse, Config, HttpStatus, GetCodeMsg, Errors, GetLoggerInstance } = require('../utils');


exports.Login = async (args) => {
    try {
        let url = Config.ServiceURL;
        let LoginClient = await login.createClientAsync(url) 
        let loginResult = await LoginClient.loginAsync(args)
        return loginResult

    } catch (error) {
        err = {
          errCode :  Errors.ADAUTHSERVICEERROR,
          statusCode : HttpStatus.SERVER_ERROR,
          error
        }
        throw err;
    }
}