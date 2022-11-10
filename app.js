//Creating a server and aquiring the express module by using "require" keyword, and assigning it to "app" variable.
var express = require("express")
var app = express()
app.use(express.json())
var uuid = require("uuid");
var bodyParser = require("body-parser")


//Creating the employes data and storing it as array list, and the name of the array is "Employ"
var employ = [
        {
            "empid": uuid.v4(), "empname": "jaswanth", "password": "1234", "empmail": "jas@gmail"
        },
        {
            "empid": uuid.v4(), "empname": "veera", "password": "1234", "empmail": "veera@gmail"
        },
        {
            "empid": uuid.v4(), "empname": "anil", "password": "1234", "empmail": "anil@gmail"
        },
        {
            "empid": uuid.v4(), "empname": "prakash", "password": "1234", "empmail": "prak@gmail"
        } 
    ] 
    console.log(employ)


 //getting data
// By using get method we  retrive the employees data.
app.get('/getinfo', (req,res) => {
    res.json(employ)
})

//retriving data by id of employ.
app.get('/getinfo/:id', (req, res) => {
        eid=req.params.id
        for (i=0; i<employ.length ; i++)
        {
                if (employ[i].empid == eid)
                {
                  var flag = true
                  result = employ[i]
                }
        }
        if (flag==true)
        {
             res.json({status:true, details: result, messege: 'succesfully retrived the data'})
        }
        else
        {
             res.status(200).send({status:false , details: 'Error', messege: 'employ not found'})
        }
     })



//posting data
//By using post method we can post new employ data in to the employess data.
//app.use(bodyParser.urlencoded({ extended: false }))
     app.post('/add', function(req, res) {
     stu = {
             empid: req.body.empid, empname: req.body.empname, password : req.body.password, empmail: req.body.empmail
           }
    employ.push(stu)
    res.json(employ)  
})


// updating data
//By using put method we can update the employs data at any place of employees data i.e, we can update the data with 
//respective to the employs id's
//app.use(bodyParser.json())
app.put('/up/:id', (req,res) =>
{
    uid=req.params.id;
    data1 = {ename:req.body.empname}
    data2 = {empmail:req.body.empmail}
    val1=data1.ename
    val2=data2.empmail
    for(i=0; i<employ.length; i++)
    {
        if (employ[i].empid==uid)
       {
         employ[i].empname=val1
         employ[i].empmail=val2
         flag=true;
         result= employ[i]
       }
    }
  if (flag==true)
   {
    res.json({status: true, details: result, message: "succesfully updated the data"})
   } 
   else{
    res.json({status:false, details:error, message:"data is not updated"})
   }
})


//deleting data
//By using delete method we can delete any employ data from the total  employees data by using employ id reference.
app.delete('/delete/:id',(req,res) => {
    var uid = req.params.id;
    // employ = employ.filter(employ => employ.empid != uid)
    // res.json(employ)
    for (i=0; i<employ.length; i++)
    {
    if (employ[i].empid == uid)
    {
        delete employ[i]
        var flag = true;
    }
    }
    if (flag==true)
    {
        res.json({status:true, details: employ, messege: 'succesfully deleted the employ data'})
    }
    else{
        res.json({status:false, details: 'Error', messege: 'data is not deleted'})
    }
})

app.listen(3000, () => console.log("server running"))