const express = require('express');
const app = express();
const oracledb = require('oracledb');
var bodyParser = require('body-parser');

oracledb.autoCommit = true;
app.use(bodyParser.json());

oracledb.outFormat = oracledb.OUT_FORMAT_ARRAY;
const mypw = '1234';
const mypw2 = 'Aa123456';
const connectionInfo = { user: "c##max2330",password: mypw, connectString: "localhost:1521" }
const connectionInfo2 = { user: "c##dba_desarrollo",password: mypw2, connectString: "localhost:1521" }


function mapResult(arreglo){
    var resJson = { };
    for(var i=0;i<arreglo.metaData.length;i++){
        var nombre = arreglo.metaData[i].name;
        var value = arreglo.rows[0][i];
        resJson = {...resJson,[nombre]:value };
    }
    return resJson;
}

function mapMultipleResult(arreglo){
    console.log(arreglo.rows.length);
    var respJson = { };
    var resJson = { };
    //for()
    for(var j=0;j<arreglo.rows.length;j++){
        for(var i=0;i<arreglo.metaData.length;i++){
            var nombre = arreglo.metaData[i].name;
            var value = arreglo.rows[j][i];
            resJson = {...resJson,[nombre]:value };
        }
        respJson = { ...respJson, [j]:resJson};
    }
    
    return respJson;
}

async function getUsuarios(req,res){
    let connection;
    let query = "SELECT * FROM USUARIOS";
    try{
        connection = await oracledb.getConnection(connectionInfo);
        result = await connection.execute(query)
    }catch(err){
        console.log(err)
    }
    finally{
        if(connection){
            try{
                await connection.close();
               
            }catch(err){
                console.log(err);
            }
        }
        console.log(result);
        return res.send(result.rows);
    }
  
}

async function logIn(req,res,username,password){
    let connection;
    let query = `select * from usuarios where usr_username= :username and usr_password = :password`
    try{    
        connection = await oracledb.getConnection(connectionInfo);
        result = await connection.execute(query,[username,password],{});
    }catch(e){
        console.log(e);
    }finally{
        if(connection){
            try{
                await connection.close();
            }catch(e){
                console.log(e);
            }
        }
    }
    return res.send(result.rows);
}
 
//MOVIL

app.get('/', async function(req,res){
    res.send('KeepItSafe Api');
})

app.get('/usuarios', (req,res) => {
   getUsuarios(req,res);
})

app.get('/clientes', async(req,res) => {
    let connection;
    let query = `select * from usuarios where usr_tipousuario = 'Cliente'`
    try{    
        connection = await oracledb.getConnection(connectionInfo);
        result = await connection.execute(query,[],{});
    }catch(e){
        console.log(e);
    }finally{
        if(connection){
            try{
                await connection.close();
            }catch(e){
                console.log(e);
            }
        }
    }
    res.send(result.rows)
})

app.get('/profesionales', async(req,res) => {
    let connection;
    let query = `select * from usuarios where usr_tipousuario = 'Profesional'`
    try{    
        connection = await oracledb.getConnection(connectionInfo);
        result = await connection.execute(query,[],{});
    }catch(e){
        console.log(e);
    }finally{
        if(connection){
            try{
                await connection.close();
            }catch(e){
                console.log(e);
            }
        }
    }
    res.send(result.rows)
})

app.get('/login/:username/:password', (req,res)=> {
    let username = req.params.username;
    let password = req.params.password;

   logIn(req,res,username,password)
});

app.post('/create/profesional', async(req,res)=>{
    console.log("Body: ",req.body);
    console.log("Params: ",req.params);
    console.log("Query: ",req.query);
    console.log("Body: ",req.body);
    console.log("Params: ",req.params);
    console.log("Query: ",req.query);
    let username = req.body.json.username;
    let password = req.body.json.password;
    let email= req.body.json.email;
    let rut = req.body.json.rut;
    let nameSplitted = req.body.json.name.split(' ');
    let name = nameSplitted[0];
    let lastName = nameSplitted[1];
    let current_datetime = new Date()
    let formatted_date = current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear()
    console.log(formatted_date)
    let tipoUsuario = 'Profesional';

    let connection;
    let userId = 0;
    let query1 = `select count(*) from usuarios`;
    let query3 =  `insert into pro values('${rut}','${name}','${lastName}',TO_DATE('${formatted_date}','dd-mm-yyyy'),0)`;
    let query4 = `select count(*) from usuarios where usr_tipousuario = 'Profesional' `
    try{
        //console.log("Query 3:",query3);
        //Agregar el id correspondiente y crearlo en usuario

        connection = await oracledb.getConnection(connectionInfo);
        result = await connection.execute(query1,[],{})
        
        userId = (result.rows[0][0])+1;
        let query2 = `INSERT INTO USUARIOS VALUES (${userId},'${username}','${email}','${name}','${password}','${tipoUsuario}',${userId},0) `;
        
        result = await connection.execute(query2,[],{});
        result = await connection.execute(query3,[],{});
       // console.log(result);      
    }catch(err){
        console.log("Error en query: ",err)
        res.send(err);
    }
    finally{
        if(connection){
            try{
                await connection.close();
               
            }catch(err){
                console.log(err);
                
            }
        }
        //console.log(result);
        return res.json(JSON.stringify({result}));
    }
});

app.post('/create/cliente',async(req,res)=>{
    console.log("Body: ",req.body);
    console.log("Params: ",req.params);
    console.log("Query: ",req.query);
    let username = req.body.json.username;
    let password = req.body.json.password;
    let email= req.body.json.email;
    let rut = req.body.json.rut;
    let name = req.body.json.name;
    let razonSocial = req.body.json.razonSocial;
    let status = 'Disabled';
    let plan = 1;
    let tipoUsuario = 'Cliente';

    let connection;
    let userId = 0;
    let query1 = `select count(*) from usuarios`;
    let query3 =  `insert into clientes values('${rut}','${razonSocial}','${status}',${plan})`;
    let query4 = `select count(*) from usuarios where usr_tipousuario = 'Cliente' `
    try{
        //console.log("Query 3:",query3);

        connection = await oracledb.getConnection(connectionInfo);
        result = await connection.execute(query1,[],{})
        
        userId = (result.rows[0][0])+1;
        let query2 = `INSERT INTO USUARIOS VALUES (${userId},'${username}','${email}','${name}','${password}','${tipoUsuario}',${userId}) `;
        
        result = await connection.execute(query2,[],{});
        result = await connection.execute(query3,[],{});
    }catch(err){
        console.log(err)
        res.send(err);
    }
    finally{
        if(connection){
            try{
                await connection.close();
               
            }catch(err){
                console.log(err);
            }
        }
        //console.log(result);
        //return res.send(result.rows);
        return res.json(JSON.stringify({result}));
    }
  

});

app.patch('/update/email',async(req,res)=>{
    console.log("Body: ",req.body);
    console.log("Params: ",req.params);
    console.log("Query: ",req.query);
    let email = req.body.json.email;
    let id= req.body.json.id;

    let connection;
    let query = `update usuarios set usr_correo='${email}' where usr_id = ${id}`
    try{    
        connection = await oracledb.getConnection(connectionInfo);
        result = await connection.execute(query,[],{});
    }catch(e){
        console.log(e);
    }finally{
        if(connection){
            try{
                await connection.close();
            }catch(e){
                console.log(e);
            }
        }
    }
    res.json(JSON.stringify({result}));
})

app.get('/actividades/:userId/:tipoUsuario/:id2',async function(req,res){
    let id = req.params.userId;
    let tipoUsuario = req.params.tipoUsuario;
    let rut = req.params.rut;
    let id2 = req.params.id2;
    var asesorias = [];
    var capacitaciones = [];
    var visitas = [];
    
    let connection;

    let query = `select * from usuarios`
    try{    
        connection = await oracledb.getConnection(connectionInfo);
        switch (tipoUsuario) {
            case 'Cliente':
                query = `select to_char(ase_fecha,'DD/MM/YYYY') from asesorias where ase_id_usuario = :id2` ;    
                result = await connection.execute(query,[id2],{});
                asesorias.push(result.rows);
                query = `select to_char(cap_fecha,'DD/MM/YY') from capacitaciones where cap_id_cli = :id2`; 
                result = await connection.execute(query,[id2],{});
                capacitaciones.push(result.rows);
                query = `select to_char(vis_fcita,'DD/MM/YY') from visitas where vis_id_cli = :id2`;
                result = await connection.execute(query,[id2],{});
                visitas.push(result.rows);
                break;

            case 'Profesional':
                query = `select to_char(ase_fecha,'DD/MM/YYYY') from asesorias where ase_id_pro = :id2` ;    
                result = await connection.execute(query,[id2],{});
                asesorias.push(result.rows);
                query = `select to_char(cap_fecha,'DD/MM/YY') from capacitaciones where cap_id_pro = :id2`; 
                result = await connection.execute(query,[id2],{});
                capacitaciones.push(result.rows);
                query = `select to_char(vis_fcita,'DD/MM/YY') from visitas where vis_id_pro = :id2`;
                result = await connection.execute(query,[id2],{});
                visitas.push(result.rows);
                break;

            default:
                break;
        }

    }catch(e){
        console.log(e);
    }finally{
        if(connection){
            try{
                await connection.close();
            }catch(e){
                console.log(e);
            }
        }
    }
    let respuesta = new Array();
    respuesta.push(asesorias,capacitaciones,visitas);
    res.json(respuesta);
});

app.get('/clientes/:id',async function(req,res){
    let id = req.params.id;
    let connection;
    let query = `select * from clientes where cli_id = :id`
    try{    
        connection = await oracledb.getConnection(connectionInfo);
        result = await connection.execute(query,[id],{});
    }catch(e){
        console.log(e);
    }finally{
        if(connection){
            try{
                await connection.close();
            }catch(e){
                console.log(e);
            }
        }
    }
    res.json(result.rows[0])
})

app.get('/profesionales/:id',async function(req,res){
    let id = req.params.id;
    let connection;
    let query = `select * from pro where pro_id = :id`
    try{    
        connection = await oracledb.getConnection(connectionInfo);
        result = await connection.execute(query,[id],{});
    }catch(e){
        console.log(e);
    }finally{
        if(connection){
            try{
                await connection.close();
            }catch(e){
                console.log(e);
            }
        }
    }
    res.json(result.rows[0])
});

app.get('/usuarios_clientes/:id',async function(req,res){
    let id = req.params.id;
    let connection;
    let query = `select * from usuarios where usr_tipoUsuario='Cliente' and usr_idperfil = :id`
    try{    
        connection = await oracledb.getConnection(connectionInfo);
        result = await connection.execute(query,[id],{});
    }catch(e){
        console.log(e);
    }finally{
        if(connection){
            try{
                await connection.close();
            }catch(e){
                console.log(e);
            }
        }
    }
    res.json(result.rows[0])
});

app.get('/asignarPro/:cli_electo/:fecha/:evento',async function(req,res){
    let cli_electo = req.params.cli_electo;
    let fecha = req.params.fecha;
    let fechaFormateada = fecha[3]+fecha[4]+'/'+fecha[0]+fecha[1]+'/'+fecha[6]+fecha[7];
    let evento = req.params.evento;
    let fechasOcupadas = [];
    let profesionalesLibres = [];
    let idCliente= '';
    let proAsignado = '';
    let cont = 0;
    //console.log("Cliente: "+cli_electo,"Fecha: ",fechaFormateada,"Evento: "+evento);
    let connection;
    let query = `select * from usuarios where usr_nombrecompleto = :cli_electo`;
    try{    
        connection = await oracledb.getConnection(connectionInfo);
        result = await connection.execute(query,[cli_electo],{});
        idCliente = result.rows[0][6];
        query = `select * from pro where pro_cli_asignado = :idCli`
        result = await connection.execute(query,[idCliente],{});
        profesionalesLibres = result.rows;
        for(pro in profesionalesLibres){
            //Visitas
            query  = `select to_char(vis_fcita,'DD/MM/YY'),vis_id_pro from visitas where vis_id_pro = ${profesionalesLibres[pro][1]}`;
            result = await connection.execute(query,[],{});
            if(result.rows[0]!= undefined){
                for(days in result.rows){
                   if( fechaFormateada == result.rows[days][0]){
                       profesionalesLibres.splice(pro,1);
                   }
                }
            }
            console.log("profesionalesLibres visita: ",profesionalesLibres)
            if(profesionalesLibres.length == 0 ){
                break;
            }

            //Capacitaciones
            query  = `select to_char(cap_fecha,'DD/MM/YY'),cap_id_pro from capacitaciones where cap_id_pro = ${profesionalesLibres[pro][1]}`;
            result = await connection.execute(query,[],{});
            console.log("Capacitaciones: ",result.rows)
            if(result.rows[0]!= undefined){
                for(days in result.rows){
                    console.log(fechaFormateada , result.rows[days][0])
                   if( fechaFormateada == result.rows[days][0]){
                       profesionalesLibres.splice(pro,1);
                   }
                }
            }
            
            console.log("profesionalesLibres capacitacion: ",profesionalesLibres)
            if(profesionalesLibres.length == 0 ){
                break;
            }
            //Asesorias
            query  = `select to_char(ase_fecha,'DD/MM/YY'),ase_id_pro from asesorias where ase_id_pro = ${profesionalesLibres[pro][1]}`;
            result = await connection.execute(query,[],{});
            if(result.rows[0]!= undefined){
                for(days in result.rows){
                    console.log(fechaFormateada , result.rows[days][0])
                   if( fechaFormateada == result.rows[days][0]){
                       profesionalesLibres.splice(pro,1);
                   }
                }
            }
            console.log("profesionalesLibres asesoria: ",profesionalesLibres)
        }
    }catch(e){
        console.log(e);
    }finally{
        if(connection){
            try{
                await connection.close();
            }catch(e){
                console.log(e);
            }
        }
    }
    if(profesionalesLibres.length == 0){
        res.json("-1");
    }else{
        res.json({profesionalesLibres,idCliente})
    }
});

app.post('/asignarPro',async function(req,res){
    let info = req.body.jeison;
    console.log("INFO: ",info);
    let idCliente = info.idCli;
    let idPro = info.idPro;
    let fecha = info.fecha;
    let evento = info.evento;
    let query = "";
    let fechaFormat = fecha[3]+fecha[4]+'/'+fecha[0]+fecha[1]+'/'+fecha[6]+fecha[7];
    var connection = await oracledb.getConnection(connectionInfo);;
    let result;
    console.log("Fecha asignarPro:",fechaFormat);
   //to_date(:fechaFormat,'DD/MM/YY')
    try{
        switch(evento){
            case 'asesoria':
                console.log("asesoria")
                query = `select distinct count(*) from asesorias`;
                result = await connection.execute(query,[],{});
                let idAse = (result.rows[0][0]+1);
                query = `select count(*) from asesorias where ase_id_usuario =:idCliente and ase_fecha between trunc(sysdate, 'MM') and last_day(sysdate)` ;
                result = await connection.execute(query,[idCliente],{})
                let cant = (result.rows[0][0]+1);
                let disp = 2 - cant;
                if(disp < 0 ){
                    disp = 0;
                }
                query = `insert into asesorias values(:idAse,:cant,:disp,'visita',:idCliente,:idPro,to_date(:fechaFormat,'DD/MM/YY'))`;
                result = await connection.execute(query,[idAse,cant,disp,idCliente,idPro,fechaFormat],{})
                console.log(result)
                break;
            case 'visita': 
                console.log('Visita')
                query = `select distinct count(*) from visitas`;
                connection = await oracledb.getConnection(connectionInfo);
                result = await connection.execute(query,[],{})
                let idVisita = (result.rows[0][0])+1;
                query = `insert into visitas values(:idVisita,sysdate,to_date(:fechaFormat,'DD/MM/YY'),:idCliente,:idPro)`;
                console.log(query);
                console.log("Query params: ",idVisita,fechaFormat,idCliente,idPro);
                console.log("idPro: "+idPro);
                result = await connection.execute(query,[idVisita,fechaFormat,idCliente,idPro],{})
                console.log("Resulta2: ",result);
                break;
            default: break;
        }
    }catch(err){
        console.log(err)
    }
    finally{
        if(connection){
            try{
                await connection.close();
               
            }catch(err){
                console.log(err);
            }
        }
        return res.send("Wena");
    }
  
    res.status(200).json("Wena: ")//,idCli,idPro,fecha,evento);
});

app.get('/accidentes/:id',async function(req,res){
    let id_cli = req.params.id;
    let connection;
    try{
        connection = await oracledb.getConnection(connectionInfo);
        query = `select * from accidentes where acc_id_cliente = :id_cli`;
        result = await connection.execute(query,[id_cli],{})
    }catch(err){
        console.log(err)
    }
    finally{
        if(connection){
            try{
                await connection.close();
               
            }catch(err){
                console.log(err);
            }
        }
        //console.log(result);
        return res.json(result.rows);
    }
});

app.get('/reportes', async function(req,res){
    let connection;
    let id = req.params.id;
    console.log(id);
    let query = `select * from reportes_global `;
    try{    
        connection = await oracledb.getConnection(connectionInfo);
        result = await connection.execute(query,[],{});
        console.log(result);
    }catch(e){
        console.log(e);
    }finally{
        if(connection){
            try{
                await connection.close();
            }catch(e){
                console.log(e);
            }
        }
    }
    return res.json(result.rows);
});

app.get('/reportesG/:id', async function(req,res){
    let connection;
    let id = req.params.id;
    let query = `select * from reportes_global where rep_id = :id`;
    try{    
        connection = await oracledb.getConnection(connectionInfo);
        result = await connection.execute(query,[id],{});
    }catch(e){
        console.log(e);
    }finally{
        if(connection){
            try{
                await connection.close();
            }catch(e){
                console.log(e);
            }
        }
    }
    return res.json(result.rows);
});

app.get('/generateGlobalReport', async function(req,res){
    let connection;
    let query = `select distinct count(*) from reportes_global `;
    try{    
        connection = await oracledb.getConnection(connectionInfo);
        result = await connection.execute(query,[],{});
        let id = 0;
        id = 1+ parseInt(result.rows[0]);
        console.log(id);
        query = `insert into reportes_global values(:id,sysdate,1,1,1,1,1,1)`; 
        result = await connection.execute(query,[id],{});
    }catch(e){
        console.log(e);
    }finally{
        if(connection){
            try{
                await connection.close();
            }catch(e){
                console.log(e);
            }
        }
    }
    return res.json(result);
});

app.get('/reportesCli/:id', async function(req,res){
    let id = req.params.id;
    let connection;
    let query = `select * from reportes_cli where rep_id_cli = :id`
    try{    
        connection = await oracledb.getConnection(connectionInfo);
        result = await connection.execute(query,[id],{});

    }catch(e){
        console.log(e);
    }finally{
        if(connection){
            try{
                await connection.close();
            }catch(e){
                console.log(e);
            }
        }
    }
    return res.json(result.rows)
});

app.get('/reportesPro/:id', async function(req,res){
    let id = req.params.id;
    let connection;
    let query = `select * from reportes_pro where rep_id_pro = :id`
    try{    
        connection = await oracledb.getConnection(connectionInfo);
        result = await connection.execute(query,[id],{});
    }catch(e){
        console.log(e);
    }finally{
        if(connection){
            try{
                await connection.close();
            }catch(e){
                console.log(e);
            }
        }
    }
    return res.json(result.rows);
});

app.get('/propuestas/:id/:user',async function(req,res){
    let id = req.params.id;
    let usu = req.params.user;
    let connection;
    if(usu == "Cliente"){
        var query = `select * from mejoras where mej_idCli = :id`
    }else{
        var query = `select * from mejoras where mej_idPro = :id`
    }
    try{    
        connection = await oracledb.getConnection(connectionInfo);
        result = await connection.execute(query,[id],{});
    }catch(e){
        console.log(e);
    }finally{
        if(connection){
            try{
                await connection.close();
            }catch(e){
                console.log(e);
            }
        }
    }
    return res.json(result.rows);
    res.json("Wena");
})

app.get('/checks/:id/:user',async function(req,res){
    let id = req.params.id;
    let tipoUsuario = req.params.user;
    let connection;
    if(tipoUsuario == "Cliente"){
        var query = `select * from accidentes where acc_id_cliente = :id`;
    }else{
        var query = `select * from accidentes where acc_id_pro = :id`;
    }
    try{    
        connection = await oracledb.getConnection(connectionInfo);
        result = await connection.execute(query,[id],{});
    }catch(e){
        console.log(e);
    }finally{
        if(connection){
            try{
                await connection.close();
            }catch(e){
                console.log(e);
            }
        }
    }
    return res.json(result.rows);
})

app.get('/checks/:id_pro/:id_cli/',async function(req,res){
    let id_pro = req.params.id_pro;
    let id_cli = req.params.id_cli;
    let connection;
    let query = `select acc_id,acc_descripcion, acc_estado from accidentes where acc_id_pro = :id_pro and acc_id_cliente = :id_cli`
    try{    
        connection = await oracledb.getConnection(connectionInfo);
        result = await connection.execute(query,[id_pro,id_cli],{});
        //console.log(result.rows);
    }catch(e){
        console.log(e);
    }finally{
        if(connection){
            try{
                await connection.close();
            }catch(e){
                console.log(e);
            }
        }
    }
    return res.json(result.rows);
})

app.patch('/checkFail',async function(req,res){
    let id = req.body.jeison.id;
    let connection;
    let query = `update accidentes set acc_estado = 1 where acc_id = :id`
    try{    
        connection = await oracledb.getConnection(connectionInfo);
        result = await connection.execute(query,[id],{});
    }catch(e){
        console.log(e);
    }finally{
        if(connection){
            try{
                await connection.close();
            }catch(e){
                console.log(e);
            }
        }
    }
    return res.json(result.rowsAffected);
});

app.patch('/checkSuccess',async function(req,res){
    let id = req.body.jeison.id;
    let connection;
    let query = `update accidentes set acc_estado = 0 where acc_id = :id`
    try{    
        connection = await oracledb.getConnection(connectionInfo);
        var result = await connection.execute(query,[id],{});
    }catch(e){
        console.log(e);
    }finally{
        if(connection){
            try{
                await connection.close();
            }catch(e){
                console.log(e);
            }
        }
    }
    return res.json(result.rowsAffected);
})

app.patch('/aprobarMejoras',async function(req,res){
    console.log("res,body: ",req.body);
    let id = req.body.jeison.id;
    let connection;
    let query = `update mejoras set mej_estado = 'aprobada' where mej_id = :id`
    try{    
        connection = await oracledb.getConnection(connectionInfo);
        var result = await connection.execute(query,[id],{});
    }catch(e){
        console.log(e);
    }finally{
        if(connection){
            try{
                await connection.close();
            }catch(e){
                console.log(e);
            }
        }
    }
    return res.json(result.rowsAffected);
});

app.patch('/rechazarMejora',async function(req,res){
    let id = req.body.jeison.id;
    let connection;
    let query = `update mejoras set mej_estado = 'rechazada' where mej_id = :id`
    try{    
        connection = await oracledb.getConnection(connectionInfo);
        var result = await connection.execute(query,[id],{});
    }catch(e){
        console.log(e);
    }finally{
        if(connection){
            try{
                await connection.close();
            }catch(e){
                console.log(e);
            }
        }
    }
    return res.json(result.rowsAffected);
});

app.patch('/enviarPropuesta',async function(req,res){
    let id = req.body.jeison.id;
    let mensaje = req.body.jeison.propuestaMensaje;
    console.log(mensaje,id);
    let connection;
    let query = `update mejoras set mej_resp_cli = :mensaje where mej_id = :id`
    try{    
        connection = await oracledb.getConnection(connectionInfo);
        var result = await connection.execute(query,[mensaje,id],{});
    }catch(e){
        console.log(e);
    }finally{
        if(connection){
            try{
                await connection.close();
            }catch(e){
                console.log(e);
            }
        }
    }
    return res.json(result.rowsAffected);
});


//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));
