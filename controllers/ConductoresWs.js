const cnx = require('../database/cnx');
const sql = require('mssql');

// get conductores all
async function getConductores(){
    try {
        let pool = await sql.connect(cnx);
        let salida = await pool.request().query('select * from conductores');
        return salida.recordsets;
    } catch (err) {
       console.log(err);        
    }
}

// get conductores all
async function getConductorByid(id_conductor){
    try {
        let pool = await sql.connect(cnx);
        let salida = await pool.request()
            .input('id_conductor', sql.Int, id_conductor )
            .query('select * from conductores where id_conductor = @id_conductor');
        return salida.recordsets;
    } catch (err) {
       console.log(err);        
    }
}

// post Conductor
async function postConductor(conductor){
    try {
        let pool = await sql.connect(cnx);
        let postConductor = await pool.request()
            .input('cedula', sql.Int, conductor.cedula)
            .input('nombre', sql.VarChar, conductor.nombre)
            .input('fec_vto_pase', sql.DateTime, conductor.fec_vto_pase)
            .input('act_usua', sql.VarChar, conductor.act_usua)
            .input('act_hora', sql.DateTime, conductor.act_hora)
            .input('act_esta', sql.Char, conductor.act_esta)
            .execute('sp_PostConductor');
            
        return postConductor.recordsets;
    } catch (err) {
       throw new Error(`se presento error en Sp  ${err.procName}...  err: ${err.message}`);       
    }
}
// put Conductor
async function putConductor(conductor){
    try {
        let pool = await sql.connect(cnx);
        let putConductor = await pool.request()
            .input('id_conductor', sql.Int, conductor.id_conductor)
            .input('cedula', sql.Int, conductor.cedula)
            .input('nombre', sql.VarChar, conductor.nombre)
            .input('fec_vto_pase', sql.DateTime, conductor.fec_vto_pase)
            .input('act_usua', sql.VarChar, conductor.act_usua)
            .input('act_hora', sql.DateTime, conductor.act_hora)
            .input('act_esta', sql.Char, conductor.act_esta)
            .execute('sp_PutConductor');
            
        return putConductor.recordsets;
    } catch (err) {
       throw new Error(`se presento error en Sp  ${err.procName}...  err: ${err.message}`);       
    }
}
// delete Conductor
async function deleteConductor(conductor){
    try {
        let pool = await sql.connect(cnx);
        let deleteConductor = await pool.request()
            .input('id_conductor', sql.Int, conductor.id_conductor)
            .execute('sp_DeleteConductor');
            
        return deleteConductor.recordsets;
    } catch (err) {
       throw new Error(`se presento error en Sp  ${err.procName}...  err: ${err.message}`);       
    }
}

module.exports = {
    getConductores: getConductores,
    getConductorByid : getConductorByid,
    postConductor: postConductor,
    putConductor: putConductor,
    deleteConductor: deleteConductor
}