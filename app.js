const express = require("express")
const prod = express()
//5
var {productos} = require("./models/producto");

//9 Middleware
prod.use(express.json())

//7
prod.get("/productos",(req,res)=>{
    return res.status(200).json(productos)
})


//8
prod.get("/productos/:id_producto",(req,res)=>{
const id_producto = req.params.id_producto
const filtro = productos.filter((producto)=>producto.id_producto==id_producto)
if (filtro.length >0)
    return res.json(filtro)
else 
    return res.status(404).json({status:"NO ENCONTRADO"})
})

//9
prod.post("/productos",(req,res)=>{
 var body = req.body
 body.id=productos.length +1 
 productos.push(body)
 return res.status(201).json(body)

})

//12
prod.get("/productos/marca/:Marca",(req,res)=>{
    const Marca = req.params.Marca
    const filtro_marca=productos.filter((producto)=>producto.Marca==Marca)
    if (filtro_marca.length>0)
        return res.json(filtro_marca)
    else
        return res.status(404).json({status:"No Se Encontró Ninguna Marca"})
})

//13
prod.get("/productos/precio_mayor/:costo",(req,res)=>{
    const costo = req.params.costo
    const filtro_costo = productos.filter((producto)=>producto.costo>=costo)
    if (filtro_costo.length > 0)
        return res.json(filtro_costo)
    else 
    return res.status(404).json({status: "Escriba correctamente el precio"})
})

//14
prod.get("/productos/precio_menor/:costo",(req,res)=>{
    const costo = parseFloat(req.params.costo)
    const filtro_costo = productos.filter((producto)=>producto.costo<=costo)
    if (filtro_costo.length > 0)
        return res.json(filtro_costo)
    else 
    return res.status(404).json({status: "Escriba correctamente el precio"})
})

//6
prod.listen(8080, ()=>{
    console.log("Servidor iniciado")
})