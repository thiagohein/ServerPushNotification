import express, {Request, Response, request, response} from 'express';
import knex from './database/connection';
import fetch from 'node-fetch';


// import routes from './routes';
// import controller from './controllers/PushNotificationController'

const app = express();
const bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(express.json());





async function showNotification ()  {
  try {

    const dataToken = await knex('tb_eventos_abertos')
    .join('tb_usuarios_push_token', 'tb_eventos_abertos.id_usuario_operador', '=', 'tb_usuarios_push_token.id_usuario')
    .where('tb_eventos_abertos.fl_notification', Boolean(false))
    .where('tb_eventos_abertos.fl_abertura_evento', '=',Boolean(true) )
    .select('tb_eventos_abertos.idEventoApp','tb_eventos_abertos.id_usuario_operador','tb_usuarios_push_token.ds_token','tb_eventos_abertos.fl_abertura_evento').orderBy('tb_eventos_abertos.dtEvento','asc').first();


      if (dataToken === undefined) {
        return console.log('Sem notificações para serem enviadas!')
    }

    console.log(dataToken)

    sendToPushNotification(dataToken.idEventoApp,dataToken.id_usuario_operador,dataToken.ds_token,dataToken.fl_abertura_evento)
    
  } catch (error) {
    console.log(error)
  }


 }


 
async function endNotification ()  {
  try {

    const dataToken = await knex('tb_eventos_encerrados')
    .join('tb_usuarios_push_token', 'tb_eventos_encerrados.id_usuario_operador', '=', 'tb_usuarios_push_token.id_usuario')
    .where('tb_eventos_encerrados.fl_notification', Boolean(false))
    .select('tb_eventos_encerrados.idEventoApp','tb_eventos_encerrados.id_usuario_operador','tb_usuarios_push_token.ds_token','tb_eventos_encerrados.fl_encerrado').orderBy('tb_eventos_encerrados.dtEvento','asc').first();


      if (dataToken === undefined) {
        return console.log('Sem notificações para serem enviadas!')
    }

    console.log(dataToken)

    sendToEndPushNotification(dataToken.idEventoApp,dataToken.id_usuario_operador,dataToken.ds_token,dataToken.fl_encerrado)
    
  } catch (error) {
    console.log(error)
  }


 }



 async function updateFlNotifications (idEventoApp: number, idUsuarioAgente: Number){
   try {
          const updateNotification =  await knex('tb_eventos_abertos')
          .where('id_usuario_operador', '=', Number(idUsuarioAgente))
          .where('idEventoApp', '=',Number(idEventoApp) )
          .update({
          fl_notification: Boolean(true),
          })

      if(updateNotification == undefined){
        console.log('Erro ao fazer update! ',idEventoApp)
      }
    
          //return response.status(200).json({message: 'Sucesso'});
     
   } catch (error) {
     console.log(error)
   }
  
}

 async function sendToPushNotification(idEventoApp:number, idUsuarioAgente: number, token:string, flAberturaEvento: Boolean) {0
    try {
        const message = {
           //to: `${'ExponentPushToken[TSab8oFFe2d6-ztfXU5fM_]'}`,
            to:`${token}` ,
            sound: 'default',
            title: 'App Pronta Resposta',
            //body : flAberturaEvento ? 'Novo Evento' : 'Evento Encerrado',
            body: 'Novo Evento',
            data: { data: 'goes here' },
          };
          fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Accept-encoding': 'gzip, deflate',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
          }).then(response => {
    
            if(response.status === 200){
              console.log(response.status)
                 updateFlNotifications(idEventoApp,idUsuarioAgente)
               }
            })
    } catch (error) {
        console.log(error)
    }
  
  }
  



  async function updateEndFlNotifications (idEventoApp: number, idUsuarioAgente: Number){
    try {
           const updateNotification =  await knex('tb_eventos_encerrados')
           .where('id_usuario_operador', '=', Number(idUsuarioAgente))
           .where('idEventoApp', '=',Number(idEventoApp) )
           .update({
           fl_notification: Boolean(true),
           })
 
       if(updateNotification == undefined){
         console.log('Erro ao fazer update! ',idEventoApp)
       }
     
           //return response.status(200).json({message: 'Sucesso'});
      
    } catch (error) {
      console.log(error)
    }
   
 }

  async function sendToEndPushNotification(idEventoApp:number, idUsuarioAgente: number, token:string, fl_encerrado: Boolean) {0
    try {
        const message = {
           //to: `${'ExponentPushToken[TSab8oFFe2d6-ztfXU5fM_]'}`,
            to:`${token}` ,
            sound: 'default',
            title: 'App Pronta Resposta',
            //body : flAberturaEvento ? 'Novo Evento' : 'Evento Encerrado',
            body: 'Evento Encerrado',
            data: { data: 'goes here' },
          };
          fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Accept-encoding': 'gzip, deflate',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
          }).then(response => {
    
            if(response.status === 200){
              console.log(response.status)
                 updateEndFlNotifications(idEventoApp,idUsuarioAgente)
               }
            })
    } catch (error) {
        console.log(error)
    }
  
  }



  







  setInterval(function () {
    showNotification();
    endNotification();
}, 10000);



//setInterval(showNotification,10000)


app.listen(3334);