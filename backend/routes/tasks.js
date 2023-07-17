import express from "express";
import Tasks from "../models/task";
import multer from "multer";
import { PrismaClient } from "@prisma/client";
import path from "path";
import { log } from "console";
const router = express.Router();

export { router };

const prisma = new PrismaClient();

router.get("/", async (req,res)=>{
    try {
        const tasks = await prisma.task.findMany();
        res.json({success:true, data:tasks});
    } catch (error) {
        res.json({success:false, data:error.message})
    }
});

router.get("/:id", async (req,res)=>{
    if(req.params){
        try {
            const task = await prisma.task.findFirst({ where: {
                id: Number(req.params.id)
            } });
            console.log(task);
            if(task){
                return res.json({success:true, data:task});
            }
            return res.json({success:false, data:"task got deleted from database"});
        } catch (error) {
            return res.json({success:false, msg:error.message});
        }
    }
    else{
        return res.json({success:false, msg:"Request is empty!"});
    }

});
router.get("/date/:day/:month/:year", async (req,res)=>{
    if(req.params){
        try {
        const taskDate = await prisma.task.findFirst({
            where: {
                dueDate:`${req.params.day}/${req.params.month}/${req.params.year}`
            }
        });
            if(taskDate){
                return res.json({success:true, data:taskDate});
            }
            return res.json({success:false, data:"task got deleted from database"});
        } catch (error) {
            return res.json({success:false, msg:error.message});
        }
    }
})
router.post("/add", async (req,res)=>{
    console.log("Bateu no post", req.body);
    try {
        await prisma.task.create({
            data: req.body
        });
        return res.status(200).json({success:true,msg:"Task created successfuly"});
    } catch (error) {
        console.log(error);
        if("errors" in error){
            let errors = [] ;
            Object.keys(error.errors).forEach(err => {
                errors.push(error.errors[err].message)
            });
            return res.json({success:false, msg:errors});

        }
        else
            return res.json({success:false, msg:error});
    }
});
// const storageEngine = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,"../frontend/task-manager-app/public/images")
//     },
//     filename: async (req,file,cb)=>{
//         const task =  await Tasks.findOne().sort({id : -1});
//         try {
//             await Tasks.updateOne({id:task.id},{path: "images/"  + task.id+".png"});            
//         } catch (error) {
//         }
//         cb(null,task.id+".png");
//     }
// });
// const upload = multer({storage:storageEngine});
// router.post("/upload",upload.single("image"),(req,res)=>{
//     res.send("Image downloaded succesfuly!");
// });
router.put("/:id", async (req,res)=>{
    try {
        await prisma.task.update({
            where: {
                id: Number(req.params.id)
            },
            data: req.body
        });
        return res.json({success:true, msg:"Task updated successfuly"})
    } catch (error) {
        return res.json({success:false, msg:error.message})        
    }

});

router.delete("/:id",async (req,res)=>{
    try {
        await prisma.task.delete({
            where: {
                id: Number(req.params.id)
            }
        });
        
        return res.json({success:true,msg:"Task deleted successfuly"});
    } catch (error) {
        return res.json({success:false,msg:error.message});
    }
});