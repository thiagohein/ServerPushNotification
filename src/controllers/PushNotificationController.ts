// import { Request, Response } from 'express';
// import knex from '../database/connection';
// import fetch from 'node-fetch';




// class PushNotificationController {

//     async show (request: Request, response: Response)  {

//         const idPushToken = await knex('tb_usuarios_push_token')
//         .select('ds_token')
//         .first();
    
    
//         if (idPushToken === undefined) {
//           return response.status(400).json({ message: 'Erro'})
//       }
    
     
   
//       console.log(idPushToken)

//       sendToPushNotification(idPushToken.ds_token)

//       return response.status(200).json(idPushToken);

  

// }
// }

// export default PushNotificationController;


