import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import DatabaseInit from './database/init';
import routes from './routes';

const app : Application = express();
const PORT = 8000;

// middleware per parsare il body delle req
app.use(express.json())
// middleware per abilitare le richieste cors
app.use(cors({
    credentials: true,
    origin: `http://localhost:4200`
}))
// middleware per parsare i dati dei form
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// inserisco tutte le rotte
app.use('/api', routes)


// semplice route di testing
app.get('/', (req,res) => {
    return res.send({message:'test'})
})


const main = async () => {
    try {
        // init mi sincronizza tutti i modelli
        await DatabaseInit();
        console.log("DB connesso e sincronizzato.");

        // l'app è in ascolto sulla porta 8000
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`)
        })
    } catch (error: any) {
        console.error("Errore DB:", error.original);
    }
}


main();



