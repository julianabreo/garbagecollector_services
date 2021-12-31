const cnx = require('../database/cnx');
const sql = require('mssql');

// get vehiculos all
async function getVehiculos(){
    try {
        let pool = await sql.connect(cnx);
        let salida = await pool.request().query('select * from vehiculos');
        return salida.recordsets;
    } catch (err) {
       console.log(err);        
    }
}

// get vehiculos by id
async function getVehiculoByid(id_vehiculo){
    try {
        let pool = await sql.connect(cnx);
        let salida = await pool.request()
            .input('id_vehiculo', sql.Int, id_conductor )
            .query('select * from vehiculos where id_vehiculo = @id_vehiculo');
        return salida.recordsets;
    } catch (err) {
       console.log(err);        
    }
}

// post Vehiculo
async function postVehiculo(vehiculo){
    try {
        let pool = await sql.connect(cnx);
        let postVehiculo = await pool.request()
            .input('placa', sql.VarChar, vehiculo.placa)
            .input('descripcion', sql.VarChar, conductor.descripcion)
            .input('peso', sql.Decimal, vehiculo.peso)
            .input('soat', sql.DateTime, vehiculo.soat)
            .input('tecnicomecanica', sql.DateTime, vehiculo.tecnicomecanica)
            .input('seguro', sql.DateTime, vehiculo.seguro)
            .input('act_usua', sql.VarChar, vehiculo.act_usua)
            .input('act_hora', sql.DateTime, vehiculo.act_hora)
            .input('act_esta', sql.Char, vehiculo.act_esta)
            .execute('sp_PostConductor');
            
        return postVehiculo.recordsets;
    } catch (err) {
       throw new Error(`se presento error en Sp  ${err.procName}...  err: ${err.message}`);       
    }
}

// put Vehiculo
async function putVehiculo(vehiculo){
    try {
        let pool = await sql.connect(cnx);
        let putVehiculo = await pool.request()
            .input('id_vehiculo', sql.Int, vehiculo.id_vehiculos)
            .input('placa', sql.VarChar, vehiculo.placa)
            .input('descripcion', sql.VarChar, conductor.descripcion)
            .input('peso', sql.Decimal, vehiculo.peso)
            .input('soat', sql.DateTime, vehiculo.soat)
            .input('tecnicomecanica', sql.DateTime, vehiculo.tecnicomecanica)
            .input('seguro', sql.DateTime, vehiculo.seguro)
            .input('act_usua', sql.VarChar, vehiculo.act_usua)
            .input('act_hora', sql.DateTime, vehiculo.act_hora)
            .input('act_esta', sql.Char, vehiculo.act_esta)
            .execute('sp_PutVehiculo');
            
        return putVehiculo.recordsets;
    } catch (err) {
       throw new Error(`se presento error en Sp  ${err.procName}...  err: ${err.message}`);       
    }
}

// delete Vehiculo
async function deleteVehiculo(vehiculo){
    try {
        let pool = await sql.connect(cnx);
        let deleteVehiculo = await pool.request()
            .input('id_vehiculo', sql.Int, vehiculo.id_vehiculo)
            .execute('sp_DeleteVehiculo');
            
        return deleteVehiculo.recordsets;
    } catch (err) {
       throw new Error(`se presento error en Sp  ${err.procName}...  err: ${err.message}`);       
    }
}

module.exports = {
    getVehiculos: getVehiculos,
    getVehiculoByid : getVehiculoByid,
    postVehiculo: postVehiculo,
    putVehiculo: putVehiculo,
    deleteVehiculo: deleteVehiculo
}