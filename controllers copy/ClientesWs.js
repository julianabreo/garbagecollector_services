const cnx = require('../database/cnx');
const sql = require('mssql');

// get Clientes  all
async function getClientes(){
    try {
        let pool = await sql.connect(cnx);
        let salida = await pool.request().query('select * from clientes');
        return salida.recordsets;
    } catch (err) {
       console.log(err);        
    }
}

// get Clientes by id 
async function getClienteByid(id_cliente){
    try {
        let pool = await sql.connect(cnx);
        let salida = await pool.request()
            .input('id_cliente', sql.Int, id_conductor )
            .query('select * from clientes where id_cliente = @id_cliente');
        return salida.recordsets;
    } catch (err) {
       console.log(err);        
    }
}

// post Cliente
async function postCliente(cliente){
    try {
        let pool = await sql.connect(cnx);
        let postCliente = await pool.request()
            .input('nit', sql.VarChar, cliente.nit)
            .input('nombre', sql.VarChar, cliente.nombre)
            .input('direccion', sql.VarChar, cliente.direccion)
            .input('id_ciudad', sql.Int, cliente.id_ciudad)
            .input('telefono_fijo', sql.NChar, cliente.telefono_fijo)
            .input('telefonocelular', sql.VarChar, cliente.telefonocelular)
            .input('correo', sql.VarChar, cliente.correo)
            .input('act_usua', sql.VarChar, cliente.act_usua)
            .input('act_hora', sql.DateTime, cliente.act_hora)
            .input('act_esta', sql.Char, cliente.act_esta)
            .execute('sp_PostCliente');
            
        return postCliente.recordsets;
    } catch (err) {
       throw new Error(`se presento error en Sp  ${err.procName}...  err: ${err.message}`);       
    }
}

// put Cliente
async function putCliente(cliente){
    try {
        let pool = await sql.connect(cnx);
        let putCliente = await pool.request()
            .input('id_cliente', sql.Int, conductor.id_cliente)
            .input('nit', sql.VarChar, cliente.nit)
            .input('nombre', sql.VarChar, cliente.nombre)
            .input('direccion', sql.VarChar, cliente.direccion)
            .input('id_ciudad', sql.Int, cliente.id_ciudad)
            .input('telefono_fijo', sql.NChar, cliente.telefono_fijo)
            .input('telefonocelular', sql.VarChar, cliente.telefonocelular)
            .input('correo', sql.VarChar, cliente.correo)
            .input('act_usua', sql.VarChar, cliente.act_usua)
            .input('act_hora', sql.DateTime, cliente.act_hora)
            .input('act_esta', sql.Char, cliente.act_esta)
            .execute('sp_PutCliente');
            
        return putCliente.recordsets;
    } catch (err) {
       throw new Error(`se presento error en Sp  ${err.procName}...  err: ${err.message}`);       
    }
}

// delete Cliente
async function deleteCliente(cliente){
    try {
        let pool = await sql.connect(cnx);
        let deleteCliente = await pool.request()
            .input('id_cliente', sql.Int, cliente.id_cliente)
            .execute('sp_DeleteCliente');
            
        return deleteCliente.recordsets;
    } catch (err) {
       throw new Error(`se presento error en Sp  ${err.procName}...  err: ${err.message}`);       
    }
}

module.exports = {
    getClientes: getClientes,
    getClienteByid : getClienteByid,
    postCliente: postCliente,
    putCliente: putCliente,
    deleteCliente: deleteCliente
}