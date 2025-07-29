let multer=require("multer")
let path=require("path")
let fs=require("fs")
let csv=require("csv-parser")
let xlsx=require("xlsx")
let uploadCsv=require("../model/uploadcsv.schema")
const { error } = require("console")

//configure multer
const storage=multer.diskStorage({
    destination:'uploads/',
    filename:(_,file,cb)=> cb(null, `${Date.now()}-${file.originalname}`)
})

const upload=multer({
    storage,
    fileFilter:(_,file,cb)=>{
        const ext=path.extname(file.originalname);
        if(!['.csv','.xlsx','.xls'].includes(ext)){
            return cb(new Error('only .csv, .xlsx, .xls files allowed'))
        }
        cb(null,true)
    }
}).single('file')

//controller:upload,distributes

const uploadFile=(req,res,next)=>{
    upload(req,res,async(err)=>{
        if(err){
            return res.json({error:true,message:err.message})
        }
        if(!req.file){
            return res.json({error:true,message:"No file uploaded"})
        }
        const ext=path.extname(req.file.originalname)
        let data=[]
        try {
            if(ext==='.csv'){
                fs.createReadStream(req.file.path)
                .pipe(csv())
                .on('data',(row)=>{
                    data.push({
                        firstName:row.FirstName,
                        phone:row.Phone,
                        notes:row.Notes
                    })
                })
                .on('end',async()=>{
                    await distributeAndSave(data);
                    fs.unlinkSync(req.file.path);
                    return res.json({error:false,message:"CSV processed and distributed"})
                })
            }else{
                const workbook=xlsx.readFile(req.file.path);
                const sheet=workbook.Sheets[workbook.SheetNames[0]];
                data=xlsx.utils.sheet_to_json(sheet);
                await distributeAndSave(data);
                fs.unlinkSync(req.file.path);
                return res.json({error:false,message:"Excel processed and distributed"})
            }
        } catch (error) {
            next(error)
        }
    })
}

// distribute logic
async function distributeAndSave(data) {
    const chunkSize=Math.floor(data.length/5);
    const remainder=data.length%5;
    await uploadCsv.deleteMany()
    for(let i=0;i<5;i++){
        const start= i*chunkSize +Math.min(i,remainder);
        const end=start + chunkSize + (i<remainder ? 1:0);
        await uploadCsv.create({
            agentId: i+1,
            items:data.slice(start,end)
        })
    }
}

//get all distributed items;

const getDistributedLists=async(req,res)=>{
    try {
        const lists=await uploadCsv.find();
        return res.json({error:false,data:lists})
    } catch (error) {
        return res.json({error:true,message:"failed to fetch"})
    }
}

module.exports={getDistributedLists,uploadFile}