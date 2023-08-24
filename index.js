import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
const date = new Date().toLocaleDateString('en-us', { weekday:"long", month:"short", day:"numeric"});
const year = new Date().getFullYear();
let Todays_List = [];
let Work_List = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    let list = Todays_List;
    res.render(__dirname + "/views/index.ejs",{
        Date : date,
        Year : year,
        Todays_List,
        list
    });
});

app.get("/work",(req,res) => {
    let list = Work_List;
    res.render(__dirname + "/views/index.ejs",{
        Year : year,
        Work_List,
        list
    });
});

app.get("/delete/:index/:task", (req, res) => {
    const index = parseInt(req.params.index, 10);
    const task = decodeURIComponent(req.params.task);

    if(Todays_List[index]==task){
        Todays_List.splice(index,1);
    }
    if(Work_List[index]==task){
        Work_List.splice(index,1);
    }

    res.redirect("/");
});

app.post("/", (req, res) => {
    const task = req.body["item"];
    Todays_List.push(task);
    let list =  Todays_List;
    res.render(__dirname + "/views/index.ejs",{
        Date : date,
        Year : year,
        Todays_List,
        list
    });
});

app.post("/work",(req,res) => {
    const task = req.body["item"];
    Work_List.push(task);
    let list = Work_List;
    res.render(__dirname + "/views/index.ejs",{
        Year : year,
        Work_List,
        list
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
  