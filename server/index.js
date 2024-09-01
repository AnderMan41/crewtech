// servidor 
import express from "express";
import cors from "cors";

// importar SDK de mercadopago

import { MercadoPagoConfig, Preference } from 'mercadopago';

// agrega credenciales

const client = new MercadoPagoConfig({ accessToken: 'TEST-3736412988635405-082513-b5eb2f5f2a62ab906357fdfa9c63a4bc-98686701' });


// puerto server

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// ruta

app.get("/", (req,res)=> {
    res.send("Soy el server :)");
});

// preferencias varias

app.post("/create_preference", async (req,res)=> {
    try{
        const body = {
            items: [{
                title: req.body.title,
                quantity: Number(req.body.quantity),
                unit_price: Number(req.body.price),
                currency_id: "CLP",
                },
            ],
            back_urls: {
                success:"https://www.youtube.com/",
                failure:"https://www.youtube.com/",
                pending:"https://www.youtube.com/",
            },
            auto_return: "approved",
        };

        const preference = new Preference(client);
        const result = await preference.create({ body });
        res.json({
            id: result.id,
        });
    } catch (error){
        console.log(error);
        res.status(500).json({
            error: "Error al crear la preferencia",
        });
    }
});

app.listen(port, ()=> {
    console.log(`El servidor esta corriendo en el puerto ${port}`);
});