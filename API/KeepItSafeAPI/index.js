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
// max user
// const credentials = { user: "c##max2330", password: "Aa123456", connectString: "localhost:1521" };
// dev user
//const credentials = { user: "c##dba_desarrollo", password: "Aa123456", connectString: "localhost:1521" };
const credentials = { user: "system", password: "Aa123456", connectString: "localhost:1521" };

function mapResult(arreglo) {
    if (!arreglo || !arreglo.metaData || !arreglo.rows)
        return {};

    var resJson = {};
    for (var i = 0; i < arreglo.metaData.length; i++) {
        var nombre = arreglo.metaData[i].name;
        var value = arreglo.rows[0][i];
        resJson = {...resJson, [nombre]: value };
    }
    return resJson;
}

function mapMultipleResult(arreglo) {
    if (!arreglo || arreglo.length === 0)
        return [];

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

            result = `${(day < 10 ? `0${day}` : day)}-${(month < 10 ? `0${month}` : month)}-${year}`;
    }

    return result;
};

async function getUsuarios(req, res) {
    let connection;
    let query = "SELECT * FROM USUARIOS";
    try {
        connection = await oracledb.getConnection(credentials);
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
        connection = await oracledb.getConnection(credentials);
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

app.get('/', async function (req, res) {
    res.send('KeepItSafe Api');
})

app.get('/usuarios', (req, res) => {
    getUsuarios(req, res);
})

app.get('/clientes', async (req, res) => {
    let connection;
    let query = `select * from usuarios where usr_tipousuario = 'Cliente'`
    try {
        connection = await oracledb.getConnection(credentials);
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

app.get('/profesionales', async (req, res) => {
    let connection;
    let query = `select * from usuarios where usr_tipousuario = 'Profesional'`
    try {
        connection = await oracledb.getConnection(credentials);
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

app.post('/create/profesional', async (req, res) => {
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

        connection = await oracledb.getConnection(credentials);
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

app.post('/create/cliente', async (req, res) => {
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

        connection = await oracledb.getConnection(credentials);
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

app.patch('/update/email', async (req, res) => {
    console.log("Body: ", req.body);
    console.log("Params: ", req.params);
    console.log("Query: ", req.query);
    let email = req.body.json.email;
    let id = req.body.json.id;

    let connection;
    let query = `update usuarios set usr_correo='${email}' where usr_id = ${id}`
    try {
        connection = await oracledb.getConnection(credentials);
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

app.get('/actividades/:userId/:tipoUsuario/:id2', async function (req, res) {
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
        connection = await oracledb.getConnection(credentials);
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

app.get('/clientes/:id', async function (req, res) {

    let id = req.params.id;
    let connection;
    let query = `select * from clientes where cli_id = :id`
    try {
        connection = await oracledb.getConnection(credentials);
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

app.get('/profesionales/:id', async function (req, res) {
    let id = req.params.id;
    let connection;
    let query = `select * from pro where pro_id = :id`
    try {
        connection = await oracledb.getConnection(credentials);
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

app.get('/usuarios_clientes/:id', async function (req, res) {
    let id = req.params.id;
    let connection;
    let query = `select * from usuarios where usr_tipoUsuario='Cliente' and usr_idperfil = :id`
    try {
        connection = await oracledb.getConnection(credentials);
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

app.get('/asignarPro/:cli_electo/:fecha/:evento', async function (req, res) {
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
        connection = await oracledb.getConnection(credentials);
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

app.patch('/asignarPro', async function (req, res) {
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
        connection = await oracledb.getConnection(credentials);
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

app.get('/accidentes/:id', async function (req, res) {
    let id_cli = req.params.id;
    let connection;
    let query = `select * from accidentes where acc_id = 1`;
    let possibleAccidents = [];
    try {
        connection = await oracledb.getConnection(credentials);
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

app.get('/reportes/:id', async function (req, res) {
    let id = req.params.id;
    let connection;
    let reportDays = [];
    let query = `select to_char(con_finicio,'DD/MM/YY') from contratos where con_id_usu = :id`
    try {
        connection = await oracledb.getConnection(credentials);
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

app.get('/checks/:id_pro/:id_cli/', async function (req, res) {
    let id_pro = req.params.id_pro;
    let id_cli = req.params.id_cli;
    let connection;
    let query = `select acc_descripcion, acc_estado,acc_id from accidentes where acc_id_pro = :id_pro and acc_id_cliente = :id_cli`
    try {
        connection = await oracledb.getConnection(credentials);
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

app.patch('/checkFail', async function (req, res) {
    let id = req.body.jeison.id;
    let connection;
    let query = `update accidentes set acc_estado = 1 where acc_id = :id`
    try {
        connection = await oracledb.getConnection(credentials);
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

app.patch('/checkSuccess', async function (req, res) {
    let id = req.body.jeison.id;
    let connection;
    let query = `update accidentes set acc_estado = 0 where acc_id = :id`
    try {
        connection = await oracledb.getConnection(credentials);
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
app.get('/prueba', async (req, res) => {
    let connection;
    let query = "SELECT * FROM USUARIOS";
    try {
        connection = await oracledb.getConnection(credentials);
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

app.get('/web/login/:username/:password', async (req, res) => {

    let password = req.params.password;
    let username = req.params.username;

    let connection;
    let query = `select * from usuarios where usr_username= :username and usr_password = :password`
    try {
        connection = await oracledb.getConnection(credentials);
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

app.get('/web/clientes', async (req, res) => {
    let connection;
    let query = `select * from usuarios where usr_tipousuario = 'Cliente'`
    try {
        connection = await oracledb.getConnection(credentials);
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

app.get('/web/rev/clientes/:id', async (req, res) => {
    let connection;
    let id = req.params.id;
    let query = `select * from clientes WHERE CLI_ID_PRO=${id}`
    try {
        connection = await oracledb.getConnection(credentials);
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


app.get('/web/cliente/:id', async function (req, res) {

    let id = req.params.id;

    let connection;
    let query = `select * from clientes inner join USUARIOS on CLIENTES.CLI_ID = USUARIOS.USR_IDPERFIL where USUARIOS.USR_ID = ${id}`
    try {
        connection = await oracledb.getConnection(credentials);
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


app.get('/web/usuario/:id', async function (req, res) {

    let id = req.params.id;

    let connection;
    let query = `select * from usuario where usr_id = :id`
    try {
        connection = await oracledb.getConnection(credentials);
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

app.get('/web/responderchecklist/:id', async function (req, res) {
    let connection;
    let id = req.params.id;
    let query = `select * from accidentes WHERE ACC_ID_PRO=${id}`
    try {
        connection = await oracledb.getConnection(credentials);
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
//AprobarChecklist
app.put('/web/responderchecklist/aprobar/:id', async(req, res) => {
    console.log("Body: ", req.body);
    console.log("Params: ", req.params);
    console.log("Query: ", req.query);
   
    let id = req.params.id;
    let status = 1;
    let connection;
  
    console.log("ID: ",id);
    console.log("Estado: ",status);


    try {

        connection = await oracledb.getConnection(credentials);
        let query2 = `UPDATE ACCIDENTES SET ACC_ESTADO = ${status} WHERE ACC_ID= ${id}`;
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
//AprobarChecklist
app.put('/web/responderchecklist/aprobar/:id', async(req, res) => {
    console.log("Body: ", req.body);
    console.log("Params: ", req.params);
    console.log("Query: ", req.query);
   
    let id = req.params.id;
    let status = 1;
    let connection;
  
    console.log("ID: ",id);
    console.log("Estado: ",status);


    try {

        connection = await oracledb.getConnection(credentials);
        let query2 = `UPDATE ACCIDENTES SET ACC_ESTADO = ${status} WHERE ACC_ID= ${id}`;
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
//RechazarrChecklist
app.put('/web/responderchecklist/rechazar/:id', async(req, res) => {
    console.log("Body: ", req.body);
    console.log("Params: ", req.params);
    console.log("Query: ", req.query);
   
    let id = req.params.id;
    let status = 0;
    let connection;
  
    console.log("ID: ",id);
    console.log("Estado: ",status);


    try {

        connection = await oracledb.getConnection(credentials);
        let query2 = `UPDATE ACCIDENTES SET ACC_ESTADO = ${status} WHERE ACC_ID= ${id}`;
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

app.post('/web/cliente', async (req, res) => {
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
    
    try {
        //console.log("Query 3:",query3);
        let querycli = `select max(CLI_ID) from clientes`;
        let queryusr = `select max(USR_ID) from USUARIOS`;
        connection = await oracledb.getConnection(credentials);
        resultCliId = await connection.execute(querycli, [], {})
        resultUsrId = await connection.execute(queryusr, [], {})


        cliId = (resultCliId.rows[0][0]) + 1;
        usrid = (resultUsrId.rows[0][0]) + 1;
        let query3 = `insert into   clientes(CLI_RUT, CLI_ID, CLI_RAZONSOCIAL, CLI_STATUS, PLANES_PLA_IDPLAN) 
                                    values('${rut}','${cliId}','${razonSocial}','${status}',${plan})`;
        let query2 = `INSERT INTO   USUARIOS(USR_ID,USR_USERNAME,USR_CORREO,USR_NOMBRECOMPLETO,USR_PASSWORD,USR_TIPOUSUARIO,USR_IDPERFIL,USR_ESTADO) 
                                    VALUES ('${usrid}','${username}','${email}','${name}','${password}','${tipoUsuario}','${cliId}',${estadousuario}) `;
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

app.post('/web/profesional', async (req, res) => {
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
    let querypro = `select max(PRO_ID) from pro`;
    let queryusr = `select max(usr_ID) from usuarios`;

    connection = await oracledb.getConnection(credentials);
    result = await connection.execute(querypro, [], {});
    idusuario = await connection.execute(queryusr, [], {});

    let proId = parseInt(result.rows[0]) + 1;
    let usrId = parseInt(idusuario.rows[0]) + 1;
    console.log("result", proId);
    console.log("usrID: ", usrId);

    let query3 = `insert into pro (PRO_RUT,PRO_ID,PRO_NOMBRE,PRO_APELLIDO,PRO_FINGRESO) values('${rut}',${proId},'${name}','${apellido}','${fechaingreso}')`;
    console.log("query3 -> ", query3);

    try {
        
        let query2 = `INSERT INTO USUARIOS(USR_ID,USR_USERNAME, USR_CORREO, USR_NOMBRECOMPLETO, USR_PASSWORD, USR_TIPOUSUARIO, USR_IDPERFIL, USR_ESTADO) VALUES ('${usrId}','${username}','${email}','${name} ${apellido}','${password}','${tipoUsuario}',${proId} ,${estadousuario}) `;
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

app.put('/web/profesional/:id', async (req, res) => {
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

        connection = await oracledb.getConnection(credentials);
        //result = await connection.execute(querypro, [], {});

        //let proId = parseInt(result.rows[0]) + 1;
        //console.log("result", result);
        let query2 = `update USUARIOS set USR_USERNAME = '${username}', USR_CORREO = '${email}', USR_NOMBRECOMPLETO = '${name} ${apellido}', USR_PASSWORD = '${password}' where USR_ID= ${id}`;
        console.log("query2 -> ", query2);

        let queryidpro = `select USUARIOS.USR_IDPERFIL from usuarios where USUARIOS.USR_ID='${id}'`;
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

app.get('/web/profesional', async (req, res) => {
    let connection;
    let query = `select * from usuarios where usr_tipousuario = 'Profesional'`
    try {
        connection = await oracledb.getConnection(credentials);
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

app.get('/web/profesional/:id', async (req, res) => {
    let connection;
    let id = req.params.id;
    console.log(id);
    let query = 'select USR_USERNAME, USR_CORREO, PRO_NOMBRE, PRO_APELLIDO, PRO_RUT from usuarios u inner join pro p on u.usr_idperfil = p.pro_id where u.usr_id=:id'
    try {
        connection = await oracledb.getConnection(credentials);
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


app.get('/web/solicitud/profesional/:id', async(req, res) => {
    let connection;
    let id = req.params.id;
    console.log(id);
    let query = `select * from PRO where pro_cli_asignado = :id`
    try {
        connection = await oracledb.getConnection(credentials);
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

app.put('/web/usuario/:id', async function (req, res) {

    let id = req.params.id;

    let connection;
    let query = `UPDATE usuarios SET USR_ESTADO = 0 WHERE USR_ID = ${id}`
    console.log("query ->", query)
    try {
        connection = await oracledb.getConnection(credentials);
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
    res.json(result.rowsAffected)


});

app.get('/web/reporteglobal', async (req, res) => {
    let connection;
    let queryid = `select max(REP_ID) from REPORTES_GLOBAL`
    let query = `select * from reportes_global`;
    let idreporte = "0";
    try {
        
        connection = await oracledb.getConnection(credentials);
        resultqryid = await connection.execute(queryid);
        console.log("resulqryID",resultqryid.rows[0][0]);

        if (resultqryid.rows[0][0] == null) {
            idreporte = '1';

        } else {
            idreporte = parseInt(resultqryid.rows[0]) + 1;
            
        }
        
        console.log("idReporte", idreporte)


        let query2 =`insert into REPORTES_GLOBAL (REPORTES_GLOBAL.REP_ID) values ('${idreporte}') `
        result = await connection.execute(query2);
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

app.get('/web/reporteclientes/:id', async (req, res) => {

    let id = req.params.id;
    let connection;
    let queryid = `select max(REP_CLI_ID) from REPORTES_CLI`;
    let query = `SELECT * FROM reportes_cli where REP_CLI_ID = ${id}`;
    let idreporte = "0";

    try {
        connection = await oracledb.getConnection(credentials);
        resultqryid = await connection.execute(queryid);

        if (resultqryid.rows[0][0] == null) {
            idreporte = '1';

        } else {
            idreporte = parseInt(resultqryid.rows[0]) + 1;
            
        }

        let query2 =`insert into REPORTES_CLI ( REP_CLI_ID, REP_ID_CLI, REP_PROFESIONAL) values (${idreporte},1,'1') `
        result = await connection.execute(query2);
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

app.get('/web/reportecliente', async (req, res) => {
    let connection;
    let query = `select * from Reporte_cliente' where REP_ID_CLIENTE = :id`
    try {
        connection = await oracledb.getConnection(credentials);
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

app.get('/web/profesionalclientes', async (req, res) => {
    let connection;
    let query = `select * from clientes INNER JOIN pro on PRO_CLI_ASIGNADO = CLI_ID`
    try {
        connection = await oracledb.getConnection(credentials);
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

app.get('/web/asesorias', async (req, res) => {
    let connection;
    let query = `select * from asesorias INNER JOIN pro on asesorias.ASE_ID_PRO = PRO_ID INNER JOIN clientes on asesorias.ase_id_usuario=CLI_ID`
    try {
        connection = await oracledb.getConnection(credentials);
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
        connection = await oracledb.getConnection(credentials);

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
        if (maxIdQuery.rows && maxIdQuery.rows.length > 0 && maxIdQuery.rows[0][0]) {
            maxVisitaId = parseInt(maxIdQuery.rows[0][0]) + 1;
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

// controlar pagos
app.post('/web/obtenerPagos', async (req, res) => {
    console.log('api/obtenerPagos: ', req.body);
    let connection;
    let result;

    try {
        connection = await oracledb.getConnection(credentials);
        // obtener los registros de la tabla FACTURA_MENSUAL para el mes solicitado
        let date = `${new Date().getFullYear()}-${(req.body.mes + 1)}`;

        result = await connection.execute(`SELECT * FROM FACTURA_MENSUAL fm
        INNER JOIN CLIENTES c ON c.CLI_ID = fm.PAGO_MENS_CLI
        INNER JOIN USUARIOS u ON u.USR_IDPERFIL = c.CLI_ID
        WHERE TO_CHAR(PAGO_MENS_FECHA_GEN, 'YYYY-MM') = :fecha
        AND u.USR_TIPOUSUARIO = 'Cliente'`, {
            fecha: date
        });

        res.json(mapMultipleResult(result));
    } catch (error) {
        res.status(400).send('ocurrió un error al obtener las facturas de los clientes');
    }
});
app.post('/web/generarFacturas', async (req, res) => {
    console.log('api/generarFacturas: ', req.body);
    let connection;

    try {
        connection = await oracledb.getConnection(credentials);
        // obtener los registros de la tabla FACTURA_MENSUAL para el mes solicitado
        let today = new Date();
        let date = `${today.getFullYear()}-${(req.body.mes + 1)}`;

        let facturasQuery = await connection.execute(`SELECT * FROM FACTURA_MENSUAL WHERE TO_CHAR(PAGO_MENS_FECHA_GEN, 'YYYY-MM') = :fecha`, {
            fecha: date
        });

        let facturas = [];
        if (facturasQuery && facturasQuery.rows) {
            // materializamos las facturas
            facturas = mapMultipleResult(facturasQuery);

            // obtenemos los precios que se usarán en caso de que sea necesario 
            let preciosQuery = await connection.execute(`SELECT * FROM PRECIOS_EXTRA`, {});

            let precios = []; 
            if (preciosQuery && preciosQuery.rows)
            {
                precios = mapMultipleResult(preciosQuery);
            }
            
            // con esto podemos validar de solo generar facturas a los clientes que no tienen
            let clientes = await connection.execute(`SELECT * FROM CLIENTES`, {});

            if (clientes && clientes.rows) {
                let clientesMapeados = mapMultipleResult(clientes);
                if (clientesMapeados && clientesMapeados.length > 0) {
                    for (let index = 0; index < clientesMapeados.length; index++) {
                        const cliente = clientesMapeados[index];
    
                        if (!facturas || (facturas && !facturas.some(x => x.PAGO_MENS_CLI === cliente.CLI_ID))) {
                            // crear factura del cliente
                            let totalMensualCliente = 0;
    
                            // generacion de detalle 
                            // concepto de pago mensual 
                            let precioSuscripcionMensual = obtenerDetallePago(precios, 'Subscripción mensual');
                            let suscripcionMensual = {
                                DETALLE_DESCRIPCION: 'Subscripción mensual',
                                DETALLE_VALOR: precioSuscripcionMensual.PRECIOS_VALOR
                            };
                            totalMensualCliente += precioSuscripcionMensual.PRECIOS_VALOR;
    
                            // visitas
                            let visitasQry = await connection.execute(`SELECT COUNT(1) FROM VISITAS 
                            WHERE VIS_ID_CLI = :idCliente AND TO_CHAR(VIS_FCITA, 'YYYY-MM') = :fechaGen`,
                                {
                                    idCliente: cliente.CLI_ID,
                                    fechaGen: date
                                });
    
                            let visitas = null;
                            if (visitasQry && visitasQry.rows && visitasQry.rows[0][0] > 2) {
                                let precioVisitas = obtenerDetallePago(precios, 'Visita');
                                visitas = {
                                    DETALLE_DESCRIPCION: visitasQry.rows[0][0] + ' Visitas',
                                    DETALLE_VALOR: precioVisitas.PRECIOS_VALOR
                                }
                                totalMensualCliente += precioVisitas.PRECIOS_VALOR;
                            }
    
                            // capacitaciones 
                            let capacitacionesQry = await connection.execute(`SELECT COUNT(1) FROM CAPACITACIONES 
                            WHERE CAP_ID_CLI = :idCliente AND TO_CHAR(CAP_FECHA, 'YYYY-MM') = :fechaGen`,
                                {
                                    idCliente: cliente.CLI_ID,
                                    fechaGen: date
                                });
    
                            let capacitaciones = null;
                            if (capacitacionesQry && capacitacionesQry.rows && capacitacionesQry.rows[0][0] > 1) {
                                let precioCapacitaciones = obtenerDetallePago(precios, 'Capacitacion');
                                capacitaciones = {
                                    DETALLE_DESCRIPCION: capacitacionesQry.rows[0][0] + ' Capacitaciones',
                                    DETALLE_VALOR: precioCapacitaciones.PRECIOS_VALOR
                                }
                                totalMensualCliente += precioCapacitaciones.PRECIOS_VALOR;
                            }
    
                            // reportes cliente
                            let reportesClienteQry = await connection.execute(`SELECT COUNT(1) FROM REPORTES_CLI 
                            WHERE REP_ID_CLI = :idCliente AND TO_CHAR(REP_FECHA, 'YYYY-MM') = :fechaGen`,
                                {
                                    idCliente: cliente.CLI_ID,
                                    fechaGen: date
                                });
    
                            let reporteCliente = null;
                            if (reportesClienteQry && reportesClienteQry.rows && reportesClienteQry.rows[0][0] > 1) {
                                let precioReporteCliente = obtenerDetallePago(precios, 'Reporte cliente');
                                reporteCliente = {
                                    DETALLE_DESCRIPCION: reportesClienteQry.rows[0][0] + ' Reportes cliente',
                                    DETALLE_VALOR: precioReporteCliente.PRECIOS_VALOR
                                }
                                totalMensualCliente += precioReporteCliente.PRECIOS_VALOR;
                            }
    
                            // cambios de check
                            let cambiosCheckQry = await connection.execute(`SELECT COUNT(1) FROM HISTORIAL_CHECKS 
                            WHERE HIS_CLI_ID = :idCliente AND TO_CHAR(HIS_FECHA, 'YYYY-MM') = :fechaGen`,
                                {
                                    idCliente: cliente.CLI_ID,
                                    fechaGen: date
                                });
    
                            let cambiosCheck = null;
                            if (cambiosCheckQry && cambiosCheckQry.rows && cambiosCheckQry.rows[0][0] > 2) {
                                let precioCambioCheck = obtenerDetallePago(precios, 'Cambiar checks');
                                cambiosCheck = {
                                    DETALLE_DESCRIPCION: 'Cambiar checks',
                                    DETALLE_VALOR: precioCambioCheck.PRECIOS_VALOR
                                }
                                totalMensualCliente += precioCambioCheck.PRECIOS_VALOR;
                            }
                            // asesorias especiales
                            let asesoriasEspecialesQry = await connection.execute(`SELECT COUNT(1) FROM ASESORIAS 
                            WHERE ASE_ID_USUARIO = :idCliente AND TO_CHAR(ASE_FECHA, 'YYYY-MM') = :fechaGen`,
                                {
                                    idCliente: cliente.CLI_ID,
                                    fechaGen: date
                                });
                            // reportes de accidente
                            let accidentesQry = await connection.execute(`SELECT COUNT(1) FROM REPORTES_ACCIDENTES 
                            WHERE REP_ACC_CLI_ID = :idCliente AND TO_CHAR(REP_ACC_FECHA, 'YYYY-MM') = :fechaGen`,
                                {
                                    idCliente: cliente.CLI_ID,
                                    fechaGen: date
                                });
                            
                            let asesoriasEspeciales = null;
                            let suma = 0;
                            if (asesoriasEspecialesQry && asesoriasEspecialesQry.rows && asesoriasEspecialesQry.rows[0][0]) {
                                suma = asesoriasEspecialesQry.rows[0][0];
    
                                if (accidentesQry && accidentesQry.rows && accidentesQry.rows[0][0]){
                                    suma += accidentesQry.rows[0][0];
    
                                    if (suma > 10) {
                                        let precioAsesoriaEspecial = obtenerDetallePago(precios, 'Asesoria especial');
                                        asesoriasEspeciales = {
                                            DETALLE_DESCRIPCION: suma + ' Asesoria especial',
                                            DETALLE_VALOR: precioAsesoriaEspecial.PRECIOS_VALOR
                                        }
                                        totalMensualCliente += precioAsesoriaEspecial.PRECIOS_VALOR;
                                    }
                                }
                            }
    
                            let factura = {
                                "PAGO_MENS_CLI": cliente.CLI_ID,
                                "PAGO_MENS_FECHA_GEN": `${date}-${today.getDate()}`,
                                "PAGO_MENS_ESTADO": 0,
                                "PAGO_MENS_TOTAL": totalMensualCliente,
                                "PAGO_MENS_FECHA_PAGO": null
                            };
    
                            let insertFactura = await connection.execute(`INSERT INTO FACTURA_MENSUAL (PAGO_MENS_CLI, PAGO_MENS_FECHA_GEN, PAGO_MENS_ESTADO, PAGO_MENS_TOTAL) 
                            VALUES (:idCliente, TO_DATE(:fechaGen, 'YYYY-MM-DD'), :estado, :total)
                            RETURNING PAGO_MENS_ID INTO :idFacturaMensual`,
                                {
                                    idCliente: factura.PAGO_MENS_CLI,
                                    fechaGen: factura.PAGO_MENS_FECHA_GEN,
                                    estado: factura.PAGO_MENS_ESTADO,
                                    total: factura.PAGO_MENS_TOTAL,
                                    idFacturaMensual: {
                                        type: oracledb.NUMBER, dir: oracledb.BIND_OUT
                                    }
                                }
                            );
    
                            // suscripcion mensual 
                            await connection.execute(`INSERT INTO DETALLE_FACTURA (DETALLE_FACTURA_ID, DETALLE_DESCRIPCION, DETALLE_VALOR)
                            VALUES (:idFacturaMensual, :descripcion, :valor)`, {
                                idFacturaMensual: insertFactura.outBinds.idFacturaMensual[0],
                                descripcion: suscripcionMensual.DETALLE_DESCRIPCION,
                                valor: suscripcionMensual.DETALLE_VALOR
                            });
                            // visitas
                            if (visitas){
                                await connection.execute(`INSERT INTO DETALLE_FACTURA (DETALLE_FACTURA_ID, DETALLE_DESCRIPCION, DETALLE_VALOR)
                                VALUES (:idFacturaMensual, :descripcion, :valor)`, {
                                    idFacturaMensual: insertFactura.outBinds.idFacturaMensual[0],
                                    descripcion: visitas.DETALLE_DESCRIPCION,
                                    valor: visitas.DETALLE_VALOR
                                });
                            }
                            
                            // capacitaciones
                            if (capacitaciones) {
                                await connection.execute(`INSERT INTO DETALLE_FACTURA (DETALLE_FACTURA_ID, DETALLE_DESCRIPCION, DETALLE_VALOR)
                                VALUES (:idFacturaMensual, :descripcion, :valor)`, {
                                    idFacturaMensual: insertFactura.outBinds.idFacturaMensual[0],
                                    descripcion: capacitaciones.DETALLE_DESCRIPCION,
                                    valor: capacitaciones.DETALLE_VALOR
                                });
                            }
                            
                            // reporte cliente
                            if (reporteCliente) {
                                await connection.execute(`INSERT INTO DETALLE_FACTURA (DETALLE_FACTURA_ID, DETALLE_DESCRIPCION, DETALLE_VALOR)
                                VALUES (:idFacturaMensual, :descripcion, :valor)`, {
                                    idFacturaMensual: insertFactura.outBinds.idFacturaMensual[0],
                                    descripcion: reporteCliente.DETALLE_DESCRIPCION,
                                    valor: reporteCliente.DETALLE_VALOR
                                });
                            }
                            
                            // cambios check
                            if (cambiosCheck) {
                                await connection.execute(`INSERT INTO DETALLE_FACTURA (DETALLE_FACTURA_ID, DETALLE_DESCRIPCION, DETALLE_VALOR)
                                VALUES (:idFacturaMensual, :descripcion, :valor)`, {
                                    idFacturaMensual: insertFactura.outBinds.idFacturaMensual[0],
                                    descripcion: cambiosCheck.DETALLE_DESCRIPCION,
                                    valor: cambiosCheck.DETALLE_VALOR
                                });
                            }
                            
                            // asesorias especiales
                            if (asesoriasEspeciales) {
                                await connection.execute(`INSERT INTO DETALLE_FACTURA (DETALLE_FACTURA_ID, DETALLE_DESCRIPCION, DETALLE_VALOR)
                                VALUES (:idFacturaMensual, :descripcion, :valor)`, {
                                    idFacturaMensual: insertFactura.outBinds.idFacturaMensual[0],
                                    descripcion: asesoriasEspeciales.DETALLE_DESCRIPCION,
                                    valor: asesoriasEspeciales.DETALLE_VALOR
                                });
                            }
                            
                        }
                    }

                }
                
            }

            res.json({status: 200});
        }
    } catch (error) {
        res.status(400).send('ocurrió un error al generar la factura del cliente');
    }

});

function obtenerDetallePago(list, key) {
    if (!list || list.length === 0)
        return;

    return list.find(x => x.PRECIOS_ITEM === key);
}

app.post('/web/validarPago', async (req, res) => {
    console.log('api/validarPago: ', req.body);
    let connection;
    try {
        connection = await oracledb.getConnection(credentials); 

        let result = await connection.execute(`UPDATE FACTURA_MENSUAL 
        SET PAGO_MENS_ESTADO = 1,
        PAGO_MENS_FECHA_PAGO = sysdate
        WHERE PAGO_MENS_ID = :idFactura`, {
            idFactura: req.body.factura.PAGO_MENS_ID
        });

        res.json(result);
    } catch (error) {
        res.status(400).send('ocurrió un error al validar el pago del cliente');
    }
});

app.post('/web/obtenerDetalleFactura', async (req, res) => {
    console.log('api/obtenerDetalleFactura: ', req.body);
    let connection;
    try {
        connection = await oracledb.getConnection(credentials); 

        let result = await connection.execute(`SELECT * FROM DETALLE_FACTURA WHERE DETALLE_FACTURA_ID = :idFactura`, {
            idFactura: req.body.factura.PAGO_MENS_ID
        });

        res.json(mapMultipleResult(result));
    } catch (error) {
        res.status(400).send('ocurrió un error al obtener el detalle de la factura');
    }
});
//RevisarMejorasProfesional(ResponderMejora)
app.get('/web/cli/mejoras/:id', async(req, res) => {
    let connection;
    let id = req.params.id;
    console.log(req.params);
    let query = `select * from mejoras inner join PRO on mejoras.MEJ_IDCLI= pro.pro_cli_asignado WHERE MEJ_IDCLI=${id}`
    try {
        connection = await oracledb.getConnection(credentials);
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

//ResponderAprobarCli
app.put('/web/cli/mejoras/aprobar/:id/:resp', async(req, res) => {
    console.log("Body: ", req.body);
    console.log("Params: ", req.params);
    console.log("Query: ", req.query);
    let resp=req.params.resp;
    let id = req.params.id;
    let status = 'enviada';
    let connection;
    console.log("ID: ",id);
    console.log("Estado: ",status);

    try {

        connection = await oracledb.getConnection(credentials);
        let query2 = `UPDATE MEJORAS SET MEJ_ESTADO = '${status}' , MEJ_RESP_CLI = '${resp}' WHERE MEJ_ID= ${id}`;
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
//ResponderRechazarCli
app.put('/web/cli/mejoras/rechazar/:id', async(req, res) => {
    console.log("Body: ", req.body);
    console.log("Params: ", req.params);
    console.log("Query: ", req.query);
   
    let id = req.params.id;
    let status = 'rechazado';
    let connection;
  
    console.log("ID: ",id);
    console.log("Estado: ",status);


    try {

        connection = await oracledb.getConnection(credentials);
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
// Crearmejoras
app.post('/web/mejoras', async (req, res) => {
    console.log('post/web/mejoras: ', req.body);
    let connection;
    let result;
    
    try {
        connection = await oracledb.getConnection(credentials);
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

//RevisarMejorasProfesional
app.get('/web/mejoras/:id', async(req, res) => {
    let connection;
    let id = req.params.id;
    console.log(req.params);
    let query = `select * from mejoras INNER JOIN pro on mejoras.MEJ_IDPRO = PRO_ID INNER JOIN clientes on mejoras.MEJ_IDCLI=CLI_ID WHERE PRO_ID= ${id}`
    try {
        connection = await oracledb.getConnection(credentials);
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
app.put('/web/mejoras/aprobar/:id', async(req, res) => {
    console.log("Body: ", req.body);
    console.log("Params: ", req.params);
    console.log("Query: ", req.query);
   
    let id = req.params.id;
    let status = 'aprobada';
    let connection;
  
    console.log("ID: ",id);
    console.log("Estado: ",status);


    try {

        connection = await oracledb.getConnection(credentials);
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

//RechazarMejora
app.put('/web/mejoras/rechazar/:id', async(req, res) => {
    console.log("Body: ", req.body);
    console.log("Params: ", req.params);
    console.log("Query: ", req.query);
   
    let id = req.params.id;
    let status = 'rechazado';
    let connection;
  
    console.log("ID: ",id);
    console.log("Estado: ",status);


    try {

        connection = await oracledb.getConnection(credentials);
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

// CrearSolicitudAsesorias
app.post('/web/solicitudes', async (req, res) => {
    console.log("Body: ", req.body);
    console.log("Params: ", req.params);
    console.log("Query: ", req.query);

    
    let idCliente =  req.body.SOL_CLI_ID;
    let idProfesional= req.body.SOL_PRO_ID;
    let descripcionSolicitud= req.body.SOL_DESCRIPCION;
    let estadoSolicitud= 'pendiente';
    let tipoSolicitud= 'asesoria especial';
    let fechaSolicitud=req.body.SOL_FECHA;
    let solicitudID=0;
    let query1 = 'select count(*) from SOLICITUDES';
    let connection;

    try {
        connection = await oracledb.getConnection(credentials);
        result = await connection.execute(query1, [], {})
        console.log("result query1", result);
        solicitudID = parseInt(result.rows[0][0]) + 1;
        console.log("ResultRows",result.rows);
        console.log("VALOR",solicitudID);
        console.log(typeof(solicitudID));
        let query2 = `INSERT INTO SOLICITUDES (SOL_ID, SOL_CLI_ID, SOL_PRO_ID, SOL_DESCRIPCION, SOL_ESTADO,SOL_TIPO, SOL_FECHA) VALUES (${solicitudID},${idCliente},${idProfesional},'${descripcionSolicitud}','${estadoSolicitud}','${tipoSolicitud}',TO_DATE('${fechaSolicitud}','YYYY-MM-DD'))`;
        console.log("insert: ",query2)
        result = await connection.execute(query2, [], {});
       
        
    } catch (err) {
        console.log("Error en query: ",err)
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
    console.log("Body: ", req.body);
    console.log("Params: ", req.params);
    console.log("Query: ", req.query);

    let idAccidente=0;
    let descripcionAccidente=req.body.ACC_DESCRIPCION;
    let idCliente= req.body.ACC_ID_CLIENTE;
    let idProfesional= req.body.ACC_ID_PRO;
    let estadoAccidente = 0;
    let query1 ='select count(*) from ACCIDENTES';
    let connection;

    
    try {
        connection = await oracledb.getConnection(credentials);
        result = await connection.execute(query1, [], {})
        console.log("result query1", result);
        idAccidente = parseInt(result.rows[0][0]) + 1;
        let query2 = `INSERT INTO ACCIDENTES (ACC_ID, ACC_DESCRIPCION, ACC_ID_CLIENTE, ACC_ID_PRO, ACC_ESTADO) VALUES (${idAccidente},'${descripcionAccidente}',${idCliente},${idProfesional},${estadoAccidente})`;
        console.log("insert: ",query2)
        console.log("ID:",idAccidente)
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

// visualizar actividades 
app.post('/web/obtenerActividades', async (req, res) => {
    console.log('post/web/obtenerActividades: ', req.body);
    let connection;
    let result = [];
    
    try {
        connection = await oracledb.getConnection(credentials);
        let mesInt = parseInt(req.body.mes) + 1;
        let mes = mesInt < 10 ? '0' + (mesInt) : mesInt;
        let date = `${req.body.anio}-${mes}`;
        console.log('date: ', date);

        let capacitacionesQry = `
        SELECT 
            CAP_ID AS ID, CAP_FECHA AS FECHA, CAP_ID_PRO AS ID_PRO, 1 AS ACTIVIDAD, up.USR_NOMBRECOMPLETO AS NOMBRE_PROFESIONAL, uc.USR_NOMBRECOMPLETO AS NOMBRE_CLIENTE
        FROM CAPACITACIONES c
        INNER JOIN USUARIOS up ON up.USR_IDPERFIL = c.CAP_ID_PRO AND up.USR_TIPOUSUARIO = 'Profesional'
        INNER JOIN USUARIOS uc ON uc.USR_IDPERFIL = c.CAP_ID_CLI AND uc.USR_TIPOUSUARIO = 'Cliente'
        WHERE (:idCliente IS NULL OR CAP_ID_CLI = :idCliente) AND TO_CHAR(CAP_FECHA, 'YYYY-MM') = :fechaGen`;
        let visitasQry = `
        SELECT 
            VIS_ID AS ID, VIS_FCITA AS FECHA, VIS_ID_PRO AS ID_PRO, 2 AS ACTIVIDAD, up.USR_NOMBRECOMPLETO AS NOMBRE_PROFESIONAL, uc.USR_NOMBRECOMPLETO AS NOMBRE_CLIENTE
        FROM VISITAS v
        INNER JOIN USUARIOS up ON up.USR_IDPERFIL = v.VIS_ID_PRO AND up.USR_TIPOUSUARIO = 'Profesional'
        INNER JOIN USUARIOS uc ON uc.USR_IDPERFIL = v.VIS_ID_CLI AND uc.USR_TIPOUSUARIO = 'Cliente'
        WHERE (:idCliente IS NULL OR VIS_ID_CLI = :idCliente) AND TO_CHAR(VIS_FCITA, 'YYYY-MM') = :fechaGen`;
        let asesoriasQry = `
        SELECT 
            ASE_ID AS ID, ASE_FECHA AS FECHA, ASE_ID_PRO AS ID_PRO, 3 AS ACTIVIDAD, up.USR_NOMBRECOMPLETO AS NOMBRE_PROFESIONAL, uc.USR_NOMBRECOMPLETO AS NOMBRE_CLIENTE
        FROM ASESORIAS a
        INNER JOIN USUARIOS up ON up.USR_IDPERFIL = a.ASE_ID_PRO AND up.USR_TIPOUSUARIO = 'Profesional'
        INNER JOIN USUARIOS uc ON uc.USR_IDPERFIL = a.ASE_ID_USUARIO AND uc.USR_TIPOUSUARIO = 'Cliente'
        WHERE (:idCliente IS NULL OR ASE_ID_USUARIO = :idCliente) AND TO_CHAR(ASE_FECHA, 'YYYY-MM') = :fechaGen`;

        let capacitaciones = await connection.execute(capacitacionesQry, {
            idCliente: req.body.idCliente,
            fechaGen: date
        });
        let visitas = await connection.execute(visitasQry, {
            idCliente: req.body.idCliente,
            fechaGen: date
        });
        let asesorias = await connection.execute(asesoriasQry, {
            idCliente: req.body.idCliente,
            fechaGen: date
        });

        if (capacitaciones.rows && capacitaciones.rows.length > 0)
            result.push.apply(result, mapMultipleResult(capacitaciones));
        if (visitas.rows && visitas.rows.length > 0)
            result.push.apply(result, mapMultipleResult(visitas));
        if (asesorias.rows && asesorias.rows.length > 0)
            result.push.apply(result, mapMultipleResult(asesorias));

        console.log('capacitaciones: ', capacitaciones);
        console.log('visitas: ', visitas);
        console.log('asesorias: ', asesorias);
        res.json(result);
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