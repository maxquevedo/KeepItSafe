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
    console.log("Enviando desde api: ",result.rows)
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
    console.log("Body: ",req.body);
    console.log("Params: ",req.params);
    console.log("Query: ",req.query);
    let id = req.params.userId;
    let tipoUsuario = req.params.tipoUsuario;
    let id2 = req.params.id2

    res.json("Wena wena los k")
});



//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));