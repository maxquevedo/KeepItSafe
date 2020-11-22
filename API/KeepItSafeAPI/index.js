const express = require('express');
const app = express();
const oracledb = require('oracledb');
oracledb.autoCommit = true;
var bodyParser = require('body-parser');
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

oracledb.outFormat = oracledb.OUT_FORMAT_ARRAY;
const mypw = '1234';
const connectionInfo = { user: "c##max2330",password: mypw, connectString: "localhost:1521" }

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
    // console.log("Body: ",req.body);
    // console.log("Params: ",req.params);
    // console.log("Query: ",req.query);
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
    let query3 =  `insert into pro values('${rut}','${name}','${lastName}',TO_DATE('${formatted_date}','dd-mm-yyyy'))`;
    let query4 = `select count(*) from usuarios where usr_tipousuario = 'Profesional' `
    try{
        //console.log("Query 3:",query3);
        //Agregar el id correspondiente y crearlo en usuario

        connection = await oracledb.getConnection(connectionInfo);
        result = await connection.execute(query1,[],{})
        
        userId = (result.rows[0][0])+1;
        let query2 = `INSERT INTO USUARIOS VALUES (${userId},'${username}','${email}','${name}','${password}','${tipoUsuario}',${userId}) `;
        
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

       // console.log(result);

      
       
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
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));