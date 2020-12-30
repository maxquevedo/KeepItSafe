const express = require('express');
var cors = require('cors');
const app = express();
const oracledb = require('oracledb');
var bodyParser = require('body-parser');

oracledb.autoCommit = true;
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

oracledb.outFormat = oracledb.OUT_FORMAT_ARRAY;
const mypw = '1234';
const mypw2 = 'Aa123456';
const connectionInfo = { user: "c##max2330", password: mypw, connectString: "localhost:1521" };
const connectionInfo2 = { user: "c##dba_desarrollo", password: mypw2, connectString: "localhost:1521" };
//const connectionInfo2 = { user: "system",password: mypw2, connectString: "localhost:1521" }

function mapResult(arreglo) {
    if (!arreglo || !arreglo.metaData || !arreglo.rows)
        return;

    var resJson = {};
    for (var i = 0; i < arreglo.metaData.length; i++) {
        var nombre = arreglo.metaData[i].name;
        var value = arreglo.rows[0][i];
        resJson = {...resJson, [nombre]: value };
    }
    return resJson;
}

function mapMultipleResult(arreglo) {
    console.log(arreglo.rows.length);
    var respJson = [];
    var resJson = {};
    //for()
    for (var j = 0; j < arreglo.rows.length; j++) {
        for (var i = 0; i < arreglo.metaData.length; i++) {
            var nombre = arreglo.metaData[i].name;
            var value = arreglo.rows[j][i];
            resJson = {...resJson, [nombre]: value };
        }
        respJson = [...respJson, resJson];
    }

    return respJson;
}

dateToString = (date) => {
        result = '';

        if (date && date instanceof Date && !isNaN(date.valueOf())) {
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            result = `${(day < 10 ? `0${day}` : day )}-${(month < 10 ? `0${month}` : month )}-${year}`;
    }

    return result;
};

async function getUsuarios(req, res) {
    let connection;
    let query = "SELECT * FROM USUARIOS";
    try {
        connection = await oracledb.getConnection(connectionInfo);
        result = await connection.execute(query)
    } catch (err) {
        console.log(err)
    } finally {
        if (connection) {
            try {
                await connection.close();

            } catch (err) {
                console.log(err);
            }
        }
        console.log(result);
        return res.send(result.rows);
    }

}

async function logIn(req, res, username, password) {
    let connection;
    let query = `select * from usuarios where usr_username= :username and usr_password = :password`
    try {
        connection = await oracledb.getConnection(connectionInfo);
        result = await connection.execute(query, [username, password], {});
    } catch (e) {
        console.log(e);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (e) {
                console.log(e);
            }
        }
    }
    return res.send(result.rows);
}

//MOVIL

app.get('/', async function(req, res) {
    res.send('KeepItSafe Api');
})

app.get('/usuarios', (req, res) => {
    getUsuarios(req, res);
})

app.get('/clientes', async(req, res) => {
    let connection;
    let query = `select * from usuarios where usr_tipousuario = 'Cliente'`
    try {
        connection = await oracledb.getConnection(connectionInfo);
        result = await connection.execute(query, [], {});
    } catch (e) {
        console.log(e);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (e) {
                console.log(e);
            }
        }
    }
    res.send(result.rows)
})

app.get('/profesionales', async(req, res) => {
    let connection;
    let query = `select * from usuarios where usr_tipousuario = 'Profesional'`
    try {
        connection = await oracledb.getConnection(connectionInfo);
        result = await connection.execute(query, [], {});
    } catch (e) {
        console.log(e);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (e) {
                console.log(e);
            }
        }
    }
    res.send(result.rows)
})

app.get('/login/:username/:password', (req, res) => {
    let username = req.params.username;
    let password = req.params.password;

    logIn(req, res, username, password)
});

app.post('/create/profesional', async(req, res) => {
    console.log("Body: ", req.body);
    console.log("Params: ", req.params);
    console.log("Query: ", req.query);
    console.log("Body: ", req.body);
    console.log("Params: ", req.params);
    console.log("Query: ", req.query);
    let username = req.body.json.username;
    let password = req.body.json.password;
    let email = req.body.json.email;
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
    let query3 = `insert into pro values('${rut}','${name}','${lastName}',TO_DATE('${formatted_date}','dd-mm-yyyy'))`;
    let query4 = `select count(*) from usuarios where usr_tipousuario = 'Profesional' `
    try {
        //console.log("Query 3:",query3);
        //Agregar el id correspondiente y crearlo en usuario

        connection = await oracledb.getConnection(connectionInfo);
        result = await connection.execute(query1, [], {})

        userId = (result.rows[0][0]) + 1;
        let query2 = `INSERT INTO USUARIOS VALUES (${userId},'${username}','${email}','${name}','${password}','${tipoUsuario}',${userId}) `;

        result = await connection.execute(query2, [], {});
        result = await connection.execute(query3, [], {});
        // console.log(result);      
    } catch (err) {
        console.log("Error en query: ", err)
        res.send(err);
    } finally {
        if (connection) {
            try {
                await connection.close();

            } catch (err) {
                console.log(err);

            }
        }
        //console.log(result);
        return res.json(JSON.stringify({ result }));
    }
});

app.post('/create/cliente', async(req, res) => {
    console.log("Body: ", req.body);
    console.log("Params: ", req.params);
    console.log("Query: ", req.query);
    let username = req.body.json.username;
    let password = req.body.json.password;
    let email = req.body.json.email;
    let rut = req.body.json.rut;
    let name = req.body.json.name;
    let razonSocial = req.body.json.razonSocial;
    let status = 'Disabled';
    let plan = 1;
    let tipoUsuario = 'Cliente';

    let connection;
    let userId = 0;
    let query1 = `select count(*) from usuarios`;
    let query3 = `insert into clientes values('${rut}','${razonSocial}','${status}',${plan})`;
    let query4 = `select count(*) from usuarios where usr_tipousuario = 'Cliente' `
    try {
        //console.log("Query 3:",query3);

        connection = await oracledb.getConnection(connectionInfo);
        result = await connection.execute(query1, [], {})

        userId = (result.rows[0][0]) + 1;
        let query2 = `INSERT INTO USUARIOS VALUES (${userId},'${username}','${email}','${name}','${password}','${tipoUsuario}',${userId}) `;

        result = await connection.execute(query2, [], {});
        result = await connection.execute(query3, [], {});
    } catch (err) {
        console.log(err)
        res.send(err);
    } finally {
        if (connection) {
            try {
                await connection.close();

            } catch (err) {
                console.log(err);
            }
        }
        //console.log(result);
        //return res.send(result.rows);
        return res.json(JSON.stringify({ result }));
    }


});

app.patch('/update/email', async(req, res) => {
    console.log("Body: ", req.body);
    console.log("Params: ", req.params);
    console.log("Query: ", req.query);
    let email = req.body.json.email;
    let id = req.body.json.id;

    let connection;
    let query = `update usuarios set usr_correo='${email}' where usr_id = ${id}`
    try {
        connection = await oracledb.getConnection(connectionInfo);
        result = await connection.execute(query, [], {});
    } catch (e) {
        console.log(e);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (e) {
                console.log(e);
            }
        }
    }
    res.json(JSON.stringify({ result }));
})

app.get('/actividades/:userId/:tipoUsuario/:id2', async function(req, res) {
    let id = req.params.userId;
    let tipoUsuario = req.params.tipoUsuario;
    let rut = req.params.rut;
    let id2 = req.params.id2;
    var asesorias = [];
    var capacitaciones = [];
    var visitas = [];

    let connection;

    let query = `select * from usuarios`
    try {
        connection = await oracledb.getConnection(connectionInfo);
        switch (tipoUsuario) {
            case 'Cliente':
                query = `select to_char(ase_fecha,'DD/MM/YYYY') from asesorias where ase_id_usuario = :id2`;
                result = await connection.execute(query, [id2], {});
                asesorias.push(result.rows);
                query = `select to_char(cap_fecha,'DD/MM/YY') from capacitaciones where cap_id_cli = :id2`;
                result = await connection.execute(query, [id2], {});
                capacitaciones.push(result.rows);
                query = `select to_char(vis_fcita,'DD/MM/YY') from visitas where vis_id_cli = :id2`;
                result = await connection.execute(query, [id2], {});
                visitas.push(result.rows);
                break;

            case 'Profesional':
                query = `select to_char(ase_fecha,'DD/MM/YYYY') from asesorias where ase_id_pro = :id2`;
                result = await connection.execute(query, [id2], {});
                asesorias.push(result.rows);
                query = `select to_char(cap_fecha,'DD/MM/YY') from capacitaciones where cap_id_pro = :id2`;
                result = await connection.execute(query, [id2], {});
                capacitaciones.push(result.rows);
                query = `select to_char(vis_fcita,'DD/MM/YY') from visitas where vis_id_pro = :id2`;
                result = await connection.execute(query, [id2], {});
                visitas.push(result.rows);
                break;

            default:
                break;
        }

    } catch (e) {
        console.log(e);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (e) {
                console.log(e);
            }
        }
    }
    let respuesta = new Array();
    respuesta.push(asesorias, capacitaciones, visitas);
    res.json(respuesta);
});

app.get('/clientes/:id', async function(req, res) {

    let id = req.params.id;
    let connection;
    let query = `select * from clientes where cli_id = :id`
    try {
        connection = await oracledb.getConnection(connectionInfo);
        result = await connection.execute(query, [id], {});
    } catch (e) {
        console.log(e);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (e) {
                console.log(e);
            }
        }
    }
    res.json(result.rows[0])
})

app.get('/profesionales/:id', async function(req, res) {
    let id = req.params.id;
    let connection;
    let query = `select * from pro where pro_id = :id`
    try {
        connection = await oracledb.getConnection(connectionInfo);
        result = await connection.execute(query, [id], {});
    } catch (e) {
        console.log(e);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (e) {
                console.log(e);
            }
        }
    }
    res.json(result.rows[0])
});

app.get('/usuarios_clientes/:id', async function(req, res) {
    let id = req.params.id;
    let connection;
    let query = `select * from usuarios where usr_tipoUsuario='Cliente' and usr_idperfil = :id`
    try {
        connection = await oracledb.getConnection(connectionInfo);
        result = await connection.execute(query, [id], {});
    } catch (e) {
        console.log(e);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (e) {
                console.log(e);
            }
        }
    }
    res.json(result.rows[0])
});

app.get('/asignarPro/:cli_electo/:fecha/:evento', async function(req, res) {
    let cli_electo = req.params.cli_electo;
    let fecha = req.params.fecha;
    let fechaFormateada = fecha[3] + fecha[4] + '/' + fecha[0] + fecha[1] + '/' + fecha[6] + fecha[7];
    let evento = req.params.evento;
    let fechasOcupadas = [];
    let profesionalesLibres = [];
    let idCliente = '';
    let proAsignado = '';
    let cont = 0;
    //console.log("Cliente: "+cli_electo,"Fecha: ",fechaFormateada,"Evento: "+evento);
    let connection;
    let query = `select * from usuarios where usr_nombrecompleto = :cli_electo`;
    try {
        connection = await oracledb.getConnection(connectionInfo);
        result = await connection.execute(query, [cli_electo], {});
        idCliente = result.rows[0][6];
        query = `select * from pro`
        result = await connection.execute(query, [], {});
        profesionalesLibres = result.rows;
        for (pro in profesionalesLibres) {
            //Visitas
            query = `select to_char(vis_fcita,'DD/MM/YY'),vis_id_pro from visitas where vis_id_pro = ${profesionalesLibres[pro][1]}`;
            result = await connection.execute(query, [], {});
            if (result.rows[0] != undefined) {
                for (days in result.rows) {
                    if (fechaFormateada == result.rows[days][0]) {
                        profesionalesLibres.splice(pro, 1);
                    }
                }
            }
            console.log("profesionalesLibres visita: ", profesionalesLibres)
            if (profesionalesLibres.length == 0) {
                break;
            }

            //Capacitaciones
            query = `select to_char(cap_fecha,'DD/MM/YY'),cap_id_pro from capacitaciones where cap_id_pro = ${profesionalesLibres[pro][1]}`;
            result = await connection.execute(query, [], {});
            console.log("Capacitaciones: ", result.rows)
            if (result.rows[0] != undefined) {
                for (days in result.rows) {
                    console.log(fechaFormateada, result.rows[days][0])
                    if (fechaFormateada == result.rows[days][0]) {
                        profesionalesLibres.splice(pro, 1);
                    }
                }
            }

            console.log("profesionalesLibres capacitacion: ", profesionalesLibres)
            if (profesionalesLibres.length == 0) {
                break;
            }
            //Asesorias
            query = `select to_char(ase_fecha,'DD/MM/YY'),ase_id_pro from asesorias where ase_id_pro = ${profesionalesLibres[pro][1]}`;
            result = await connection.execute(query, [], {});
            if (result.rows[0] != undefined) {
                for (days in result.rows) {
                    console.log(fechaFormateada, result.rows[days][0])
                    if (fechaFormateada == result.rows[days][0]) {
                        profesionalesLibres.splice(pro, 1);
                    }
                }
            }
            console.log("profesionalesLibres asesoria: ", profesionalesLibres)
        }
    } catch (e) {
        console.log(e);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (e) {
                console.log(e);
            }
        }
    }
    if (profesionalesLibres.length == 0) {
        res.json("-1");
    } else {
        console.log(profesionalesLibres);
        res.json({ profesionalesLibres, idCliente })
    }
});

app.patch('/asignarPro', async function(req, res) {
    let info = req.body.jeison;
    let idCliente = info.idCli;
    let idPro = info.idPro;
    let fecha = info.fecha;
    let evento = info.evento;
    let query = "";
    let fechaFormat = fecha[3] + fecha[4] + '/' + fecha[0] + fecha[1] + '/' + fecha[6] + fecha[7];
    console.log(fechaFormat);
    switch (evento) {
        case 'asesoria':
            console.log("asesoria")
            query = `update asesorias set ase_id_pro = :idPro where ase_fecha = to_date(':fechaFormat','DD/MM/YY') and ase_id_usuario = :idCliente`;
            console.log(query)
            break;
        case 'capacitacion':
            console.log("Capacitacion")
            query = `update capacitaciones set cap_id_pro =:idPro where cap_fecha = to_date(':fechaFormat','DD/MM/YY')  and cap_id_cli = :idCliente`;
            break;
        case 'visita':
            console.log('Visita')
            query = `update visitas set vis_id_pro = :idPro where vis_id_cli = :idCliente and vis_fcita = to_date(':fechaFormat','DD/MM/YY');`;
            console.log(query)
            break;
        default:
            break;
    }
    let connection;

    try {
        connection = await oracledb.getConnection(connectionInfo);
        console.log(query);
        result = await connection.execute(query, [idCliente, idPro, fechaFormat], {})
        console.log(result);
    } catch (err) {
        console.log(err)
    } finally {
        if (connection) {
            try {
                await connection.close();

            } catch (err) {
                console.log(err);
            }
        }
        console.log(result);
        return res.send(result.rows);
    }

    res.status(200).json("Wena: ") //,idCli,idPro,fecha,evento);
});

app.get('/accidentes/:id', async function(req, res) {
    let id_cli = req.params.id;
    let connection;
    let query = `select * from accidentes where acc_id = 1`;
    let possibleAccidents = [];
    try {
        connection = await oracledb.getConnection(connectionInfo);
        result = await connection.execute(query)
        possibleAccidents.push(result.rows[0]);
        query = `select * from accidentes where acc_id_cliente = :id_cli`;
        result = await connection.execute(query, [id_cli], {})
        for (var i = 0; i < result.rows.length; i++) {
            possibleAccidents.push(result.rows[i]);
        }
        //console.log("Accidentes: ",possibleAccidents);
    } catch (err) {
        console.log(err)
    } finally {
        if (connection) {
            try {
                await connection.close();

            } catch (err) {
                console.log(err);
            }
        }
        //console.log(result);
        return res.json(possibleAccidents);
    }
});

app.get('/reportes/:id', async function(req, res) {
    let id = req.params.id;
    let connection;
    let reportDays = [];
    let query = `select to_char(con_finicio,'DD/MM/YY') from contratos where con_id_usu = :id`
    try {
        connection = await oracledb.getConnection(connectionInfo);
        result = await connection.execute(query, [id], {});
        let inicio = result.rows[0][0];
        let inicioFormat = inicio[3] + inicio[4] + '-' + inicio[0] + inicio[1] + '-' + inicio[6] + inicio[7]
        let dateInicio = new Date(inicioFormat);
        let now = new Date();
        let monthsBetween = 0;
        console.log("Date Inicio: ", dateInicio.toLocaleDateString())
        if (dateInicio.getFullYear() != now.getFullYear()) {
            console.log("año distinto");
        } else {
            monthsBetween = (now.getMonth() + 1) - (dateInicio.getMonth() + 1);
        }
        console.log("Months Between: " + monthsBetween);
        for (var i = 0; i < monthsBetween; i++) {
            let aux = "";
            if (dateInicio.getDate() < 10) {
                aux = "0" + dateInicio.getDate();
                reportDays.push((aux + '/' + ((dateInicio.getMonth() + 2) + i) + '/' + dateInicio.getFullYear()));
            } else {
                reportDays.push((dateInicio.getDate() + '/' + ((dateInicio.getMonth() + 2) + i) + '/' + dateInicio.getFullYear()));
            }
        }

    } catch (e) {
        console.log(e);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (e) {
                console.log(e);
            }
        }
    }
    return res.json(reportDays)
});

app.get('/checks/:id_pro/:id_cli/', async function(req, res) {
    let id_pro = req.params.id_pro;
    let id_cli = req.params.id_cli;
    let connection;
    let query = `select acc_descripcion, acc_estado,acc_id from accidentes where acc_id_pro = :id_pro and acc_id_cliente = :id_cli`
    try {
        connection = await oracledb.getConnection(connectionInfo);
        result = await connection.execute(query, [id_pro, id_cli], {});
        //console.log(result.rows);
    } catch (e) {
        console.log(e);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (e) {
                console.log(e);
            }
        }
    }
    return res.json(result.rows);
})

app.patch('/checkFail', async function(req, res) {
    let id = req.body.jeison.id;
    let connection;
    let query = `update accidentes set acc_estado = 1 where acc_id = :id`
    try {
        connection = await oracledb.getConnection(connectionInfo);
        result = await connection.execute(query, [id], {});
        console.log(result);
    } catch (e) {
        console.log(e);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (e) {
                console.log(e);
            }
        }
    }
    return res.json(result.rowsAffected);
});

app.patch('/checkSuccess', async function(req, res) {
    let id = req.body.jeison.id;
    let connection;
    let query = `update accidentes set acc_estado = 0 where acc_id = :id`
    try {
        connection = await oracledb.getConnection(connectionInfo);
        result = await connection.execute(query, [id], {});
        console.log(query, id);
        console.log(result.rowsAffected);
    } catch (e) {
        console.log(e);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (e) {
                console.log(e);
            }
        }
    }
    return res.json(result.rowsAffected);
})

//WEB
app.get('/prueba', async(req, res) => {
    let connection;
    let query = "SELECT * FROM USUARIOS";
    try {
        connection = await oracledb.getConnection(connectionInfo2);
        result = await connection.execute(query)
    } catch (err) {
        console.log(err)
    } finally {
        if (connection) {
            try {
                await connection.close();

            } catch (err) {
                console.log(err);
            }
        }
        console.log(result);
        return res.send(result.rows);
    }
})

app.get('/web/login/:username/:password', async(req, res) => {

    let password = req.params.password;
    let username = req.params.username;

    let connection;
    let query = `select * from usuarios where usr_username= :username and usr_password = :password`
    try {
        connection = await oracledb.getConnection(connectionInfo2);
        result = await connection.execute(query, [username, password], {});
    } catch (e) {
        console.log(e);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (e) {
                console.log(e);
            }
        }
    }
    return res.json(mapResult(result));

})

app.get('/web/clientes', async(req, res) => {
    let connection;
    let query = `select * from usuarios where usr_estado = 'Habilitado' or usr_estado = '1' and usr_tipousuario = 'Cliente'`
    try {
        connection = await oracledb.getConnection(connectionInfo2);
        result = await connection.execute(query, [], {});
    } catch (e) {
        console.log(e);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (e) {
                console.log(e);
            }
        }
    }
    res.json(mapMultipleResult(result))
})

app.get('/web/rev/clientes', async(req, res) => {
    let connection;
    let query = `select * from clientes`
    try {
        connection = await oracledb.getConnection(connectionInfo2);
        result = await connection.execute(query, [], {});
    } catch (e) {
        console.log(e);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (e) {
                console.log(e);
            }
        }
    }
    res.json(mapMultipleResult(result))
})


app.get('/web/cliente/:id', async function(req, res) {

    let id = req.params.id;

    let connection;
    let query = `select * from clientes where cli_id = :id`
    try {
        connection = await oracledb.getConnection(connectionInfo2);
        result = await connection.execute(query, [id], {});
    } catch (e) {
        console.log(e);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (e) {
                console.log(e);
            }
        }
    }
    res.json(mapMultipleResult(result))
})


app.get('/web/usuario/:id', async function(req, res) {

    let id = req.params.id;

    let connection;
    let query = `select * from usuario where usr_id = :id`
    try {
        connection = await oracledb.getConnection(connectionInfo2);
        result = await connection.execute(query, [id], {});
    } catch (e) {
        console.log(e);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (e) {
                console.log(e);
            }
        }
    }
    res.json(mapMultipleResult(result))
})

app.get('/web/responderchecklist/:id_pro/:id_cli/', async function(req, res) {
    let id_pro = req.params.id_pro;
    let id_cli = req.params.id_cli;
    let connection;
    let query = `select acc_descripcion, acc_estado,acc_id from accidentes where acc_id_pro = :id_pro and acc_id_cliente = :id_cli`
    try {
        connection = await oracledb.getConnection(connectionInfo);
        result = await connection.execute(query, [id_pro, id_cli], {});
        //console.log(result.rows);
    } catch (e) {
        console.log(e);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (e) {
                console.log(e);
            }
        }
    }
    return res.json(result.rows);
})

app.post('/web/cliente', async(req, res) => {
    console.log("Body: ", req.body);
    console.log("Params: ", req.params);
    console.log("Query: ", req.query);
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let rut = req.body.rut;
    let name = req.body.name;
    let razonSocial = req.body.razonSocial;
    let status = 'Disabled';
    let plan = 1;
    let tipoUsuario = 'Cliente';
    let estadousuario = '1';

    let connection;
    let userId = 0;
    let query1 = `select count(*) from usuarios`;
    let query3 = `insert into clientes(CLI_RUT, CLI_ID, CLI_RAZONSOCIAL, CLI_STATUS, PLANES_PLA_IDPLAN) values('${rut}','${userId}','${razonSocial}','${status}',${plan})`;
    console.log("query3 -> ", query3);
    let query4 = `select count(*) from usuarios where usr_tipousuario = 'Cliente' `
    try {
        //console.log("Query 3:",query3);

        connection = await oracledb.getConnection(connectionInfo2);
        result = await connection.execute(query1, [], {})

        userId = (result.rows[0][0]) + 1;
        let query2 = `INSERT INTO USUARIOS VALUES (${userId},'${username}','${email}','${name}','${password}','${tipoUsuario}','${userId}',${estadousuario}) `;
        console.log("query2 -> ", query2);

        result = await connection.execute(query2, [], {});
        result = await connection.execute(query3, [], {});
    } catch (err) {
        console.log(err)
        res.send(err);
    } finally {
        if (connection) {
            try {
                await connection.close();

            } catch (err) {
                console.log(err);
            }
        }
        //console.log(result);
        //return res.send(result.rows);
        return res.json(JSON.stringify({ result }));
    }


});

app.post('/web/profesional', async(req, res) => {
    console.log("Body: ", req.body);
    console.log("Params: ", req.params);
    console.log("Query: ", req.query);
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let rut = req.body.rut;
    let name = req.body.name;
    let apellido = req.body.apellido;
    let fechaingreso = req.body.fechaingreso;
    let razonSocial = req.body.razonSocial;
    let status = 'Disabled';
    let plan = 1;
    let tipoUsuario = 'Profesional';
    let estadousuario = '1';

    let connection;
    let userId = 0;
    //let query1 = `select max(usr_id) from usuarios`;
    let querypro = `select max(PRO_ID) from pro`;
    let query4 = `select count(*) from usuarios where usr_tipousuario = 'Cliente' `

    connection = await oracledb.getConnection(connectionInfo2);
    result = await connection.execute(querypro, [], {});

    let proId = parseInt(result.rows[0]) + 1;
    console.log("result", result);

    let query3 = `insert into pro (PRO_RUT,PRO_ID,PRO_NOMBRE,PRO_APELLIDO,PRO_FINGRESO) values('${rut}',${proId},'${name}','${apellido}','${fechaingreso}')`;
    console.log("query3 -> ", query3);

    try {
        //console.log("Query 3:",query3);

        //result = await connection.execute(query1,[],{})

        //userId = (result++);
        let query2 = `INSERT INTO USUARIOS(USR_USERNAME, USR_CORREO, USR_NOMBRECOMPLETO, USR_PASSWORD, USR_TIPOUSUARIO, USR_IDPERFIL, USR_ESTADO) VALUES ('${username}','${email}','${name} ${apellido}','${password}','${tipoUsuario}',${proId} ,${estadousuario}) `;

        console.log("query2 -> ", query2);

        result = await connection.execute(query2, [], {});
        result = await connection.execute(query3, [], {});
    } catch (err) {
        console.log(err)
        res.send(err);
    } finally {
        if (connection) {
            try {
                await connection.close();

            } catch (err) {
                console.log(err);
            }
        }
        //console.log(result);
        //return res.send(result.rows);
        return res.json(JSON.stringify({ result }));
    }


});

app.put('/web/profesional/:id', async(req, res) => {
    console.log("Body: ", req.body);
    console.log("Params: ", req.params);
    console.log("Query: ", req.query);
    let id = req.body.id;
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let rut = req.body.rut;
    let name = req.body.name;
    let apellido = req.body.apellido;
    let fechaingreso = req.body.fechaingreso;
    let razonSocial = req.body.razonSocial;
    let status = 'Disabled';
    let plan = 1;
    let tipoUsuario = 'Profesional';
    let estadousuario = '1';

    //update -->    

    let connection;
    //let userId = 0;
    //let query1 = `select max(usr_id) from usuarios`;
    let querypro = `select max(PRO_ID) from pro`;
    let query4 = `select count(*) from usuarios where usr_tipousuario = 'Cliente'`

    

    try {

        connection = await oracledb.getConnection(connectionInfo2);
        //result = await connection.execute(querypro, [], {});

        //let proId = parseInt(result.rows[0]) + 1;
        //console.log("result", result);
        let query2 = `update USUARIOS set USR_USERNAME = '${username}', USR_CORREO = '${email}', USR_NOMBRECOMPLETO = '${name} ${apellido}', USR_PASSWORD = '${password}' where USR_ID= ${id}`;
        console.log("query2 -> ", query2);

        let queryidpro =`select USUARIOS.USR_IDPERFIL from usuarios where USUARIOS.USR_ID='${id}'`;
        idpro = await connection.execute(queryidpro, [], {});
        
        console.log("idpro->", idpro);

        let query3 = `update pro  set PRO_RUT ='${rut}', PRO_NOMBRE = '${name}', PRO_APELLIDO = '${apellido}' where PRO_ID =${idpro.rows}`;
        console.log("query3 -> ", query3);

        //console.log("Query 3:",query3);

        //result = await connection.execute(query1,[],{})

        //userId = (result++);
        

        result = await connection.execute(query2, [], {});
        result = await connection.execute(query3, [], {});
    } catch (err) {
        console.log(err)
        res.send(err);
    } finally {
        if (connection) {
            try {
                await connection.close();

            } catch (err) {
                console.log(err);
            }
        }
        //console.log(result);
        //return res.send(result.rows);
        return res.json(JSON.stringify({ result }));
    }


});

app.get('/web/profesional', async(req, res) => {
    let connection;
    let query = `select * from usuarios where usr_tipousuario = 'Profesional'`
    try {
        connection = await oracledb.getConnection(connectionInfo2);
        result = await connection.execute(query, [], {});
    } catch (e) {
        console.log(e);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (e) {
                console.log(e);
            }
        }
    }
    res.json(mapMultipleResult(result))
})

app.get('/web/profesional/:id', async(req, res) => {
    let connection;
    let id = req.params.id;
    console.log(id);
    let query = `select * from profesionales where pro_id = :id`
    try {
        connection = await oracledb.getConnection(connectionInfo2);
        result = await connection.execute(query, [id], {});
    } catch (e) {
        console.log(e);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (e) {
                console.log(e);
            }
        }
    }
    res.json(mapResult(result))
});

app.put('/web/usuario/:id', async function(req, res) {

    let id = req.params.id;

    let connection;
    let query = `UPDATE usuarios SET USR_ESTADO = 0 WHERE USR_ID = ${id}`
    console.log("query ->",query)
    try {
        connection = await oracledb.getConnection(connectionInfo2);
        result = await connection.execute(query, [],{});
    } catch (e) {
        console.log(e);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (e) {
                console.log(e);
            }
        }
    }
    res.json(result.rowsAffected)


});

app.get('/web/reporteglobal', async(req, res) => {
    let connection;
    let query = `select * from reportes_global`;
    try {
        connection = await oracledb.getConnection(connectionInfo2);
        result = await connection.execute(query);
    } catch (err) {
        console.log(err)
    } finally {
        if (connection) {
            try {
                await connection.close();

            } catch (err) {
                console.log(err);
            }
        }
        console.log(result);
        return res.json(mapMultipleResult(result))
    }
})

app.get('/web/reporteclientes/:id', async(req, res) => {

    let id = req.params.id;
    let connection;
    let query = "SELECT * FROM reportes_global where REP_ID_CLI = :id";
    try {
        connection = await oracledb.getConnection(connectionInfo2);
        result = await connection.execute(query)
    } catch (err) {
        console.log(err)
    } finally {
        if (connection) {
            try {
                await connection.close();

            } catch (err) {
                console.log(err);
            }
        }
        console.log(result);
        return res.json(mapMultipleResult(result))
    }
})

app.get('/web/reportecliente', async(req, res) => {
    let connection;
    let query = `select * from Reporte_cliente' where REP_ID_CLIENTE = :id`
    try {
        connection = await oracledb.getConnection(connectionInfo2);
        result = await connection.execute(query, [], {});
    } catch (e) {
        console.log(e);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (e) {
                console.log(e);
            }
        }
    }
    res.json(mapMultipleResult(result))
})

app.get('/web/profesionalclientes', async(req, res) => {
    let connection;
    let query = `select * from clientes INNER JOIN pro on PRO_CLI_ASIGNADO = CLI_ID`
    try {
        connection = await oracledb.getConnection(connectionInfo2);
        result = await connection.execute(query, [], {});
    } catch (e) {
        console.log(e);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (e) {
                console.log(e);
            }
        }
    }
    res.json(mapMultipleResult(result))
})

app.get('/web/asesorias', async(req, res) => {
    let connection;
    let query = `select * from asesorias INNER JOIN pro on asesorias.ASE_ID_PRO = PRO_ID INNER JOIN clientes on asesorias.ase_id_usuario=CLI_ID`
    try {
        connection = await oracledb.getConnection(connectionInfo2);
        result = await connection.execute(query, [], {});
    } catch (e) {
        console.log(e);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (e) {
                console.log(e);
            }
        }
    }
    res.json(mapMultipleResult(result))
})


// visitas
app.post('/web/visitas', async (req, res) => {
    console.log('post/web/visitas: ', req.body);
    let connection;
    let result;
    try {
        connection = await oracledb.getConnection(connectionInfo2);

        let existeVisita = await connection
            .execute(`SELECT 1 FROM VISITAS 
                    WHERE VIS_FCITA = TO_DATE(:fechaVisita,'YYYY-MM-DD') 
                    AND VIS_ID_CLI = :idCliente 
                    AND VIS_ID_PRO = :idProfesional`, 
                    {
                        fechaVisita: req.body.VIS_FCITA,
                        idCliente: req.body.VIS_ID_CLI,
                        idProfesional: req.body.VIS_ID_PRO
                    }, {});

        if (existeVisita.rows && existeVisita.rows.length > 0) {
            res.status(400).send('No se puede crear una visita ya que existe otra visita creada para esta misma fecha');
            return; 
        }
        
        let maxIdQuery = await connection.execute('SELECT MAX(VIS_ID) FROM VISITAS', [], {});
        
        let maxVisitaId = 1; 
        if (maxIdQuery.rows){
            maxVisitaId = parseInt(maxIdQuery.rows[0]) + 1;
        }

        result = await connection
            .execute(`INSERT INTO VISITAS (VIS_ID,  VIS_FCREACION, VIS_FCITA, VIS_ID_CLI, VIS_ID_PRO) 
                      VALUES (:id, SYSDATE, TO_DATE(:fechaVisita,'YYYY-MM-DD'), :idCliente, :idProfesional)`, 
                      {
                        id: maxVisitaId, 
                        fechaVisita: req.body.VIS_FCITA,
                        idCliente: req.body.VIS_ID_CLI,
                        idProfesional: req.body.VIS_ID_PRO
                      }, {});

        console.log('post/web/visitas result: ', result);
        res.json(mapResult(result));
    } catch (e) {
        res.status(400).send('ocurrió un error al crear la visita');
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (e) {
                console.log(e);
            }
        }
    }
});

// Crearmejoras
app.post('/web/mejoras', async (req, res) => {
    console.log('post/web/mejoras: ', req.body);
    let connection;
    let result;
    
    try {
        connection = await oracledb.getConnection(connectionInfo2);
        let maxIdQuery = await connection.execute('SELECT MAX(MEJ_ID) FROM MEJORAS', [], {});
        let maxMEJORAId = 1; 
        if (maxIdQuery.rows){
            maxMEJORAId = parseInt(maxIdQuery.rows[0]) + 1;
        }
        
        result = await connection
        .execute(`INSERT INTO MEJORAS (MEJ_ID, MEJ_ESTADO,  MEJ_DESCRIPCION, MEJ_RESP_CLI, MEJ_IDCLI, MEJ_IDPRO) 
                  VALUES (:id, :estadoMejora, :descripcionMejora, :descripcionRespuesta, :idCliente, :idProfesional)`, 
                  {
                    id: maxMEJORAId, 
                    estadoMejora: 'abierta',
                    descripcionMejora: req.body.MEJ_DESCRIPCION,
                    descripcionRespuesta: null,
                    idCliente: req.body.MEJ_IDCLI,
                    idProfesional: req.body.MEJ_IDPRO
                  }, {});

        console.log('post/web/mejoras result: ', result.rows);
        res.json(mapResult(result));
        
    } catch (err) {
        console.log(err)
        res.send(err);
    } finally {
        if (connection) {
            try {
                await connection.close();

            } catch (err) {
                console.log(err);
            }
        }
    }
});

//RevisarMejoras
app.get('/web/mejoras/:id', async(req, res) => {
    let connection;
    let id = req.params.id;
    console.log(req.params);
    let query = `select * from mejoras INNER JOIN pro on mejoras.MEJ_IDPRO = PRO_ID INNER JOIN clientes on mejoras.MEJ_IDCLI=CLI_ID WHERE PRO_ID= ${id}`
    try {
        connection = await oracledb.getConnection(connectionInfo2);
        result = await connection.execute(query, [], {});
    } catch (e) {
        console.log(e);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (e) {
                console.log(e);
            }
        }
    }
    res.json(mapMultipleResult(result))
});

//AprobarMejora
app.put('/web/mejoras/aprobar', async(req, res) => {
    console.log("Body: ", req.body);
    //console.log("Params: ", req.params);
    //console.log("Query: ", req.query);
    let id = req.body.id;
    let status = 'aprobada';
    let connection;
  


    try {

        connection = await oracledb.getConnection(connectionInfo2);
        let query2 = `UPDATE MEJORAS SET MEJ_ESTADO = '${status}' WHERE MEJ_ID= ${id}`;
        console.log("query2 -> ", query2);

        result = await connection.execute(query2, [], {});

    } catch (err) {
        console.log(err)
        res.send(err);
    } finally {
        if (connection) {
            try {
                await connection.close();

            } catch (err) {
                console.log(err);
            }
        }
        return res.json(JSON.stringify({ result }));
    }


});

// CrearAccidentes
app.post('/web/accidentes', async (req, res) => {
    console.log('post/web/accidentes: ', req.body);
    let connection;
    let result;
    
    try {
        connection = await oracledb.getConnection(connectionInfo2);
        let maxIdQuery = await connection.execute('SELECT MAX(ACC_ID) FROM ACCIDENTES', [], {});
        let maxACCIDENTEId = 1; 
        if (maxIdQuery.rows){
            maxACCIDENTEId= parseInt(maxIdQuery.rows[0]) + 1;
        }
        
        result = await connection
        .execute(`INSERT INTO ACCIDENTES (ACC_ID, ACC_DESCRIPCION, ACC_ID_CLIENTE, ACC_ID_PRO, ACC_ESTADO) 
                  VALUES (:id,:descripcionAccidente,:idCliente, :idProfesional,:estadoAccidente )`, 
                  {
                    id: maxACCIDENTEId, 
                    descripcionAccidente: req.body.ACC_DESCRIPCION,
                    idCliente: req.body.ACC_ID_CLIENTE,
                    idProfesional: req.body.ACC_ID_PRO,
                    estadoAccidente: '0'
                  }, {});

        console.log('post/web/accidentes result: ', result.rows);
        res.json(mapResult(result));
        
    } catch (err) {
        console.log(err)
        res.send(err);
    } finally {
        if (connection) {
            try {
                await connection.close();

            } catch (err) {
                console.log(err);
            }
        }
    }
});

//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8081;
app.listen(port, () => console.log(`Listening on port ${port}..`));