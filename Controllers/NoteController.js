// 'use strict'

const boom=require('boom');
const Notes=require('../models/myNotes');
const mail=require('./Mail');

//get all notes
exports.getAllNotes=async(_req,_res)=>{
    try{
        let allNotes=await Notes.find();
        return allNotes;
    }
    catch(e){
        throw boom.boomify(e);
    }
};

//get notes by id
// exports.getSingleNote=async(_req,_res)=>{
//     try{
//         const id=_req.params.id;
//         let singleNote=await Notes.findById(id);
//         return singleNote;
//     }
//     catch(e){
//         throw boom.boomify(e);
//     }
// };

//add single note
exports.addNewNote=async(_req,_res)=>{
    try{
        console.log(_req.body);
        let note=new Notes(_req.body);
        let noteAdded=await note.save();
        return noteAdded;
    }
    catch(e){
        return boom.boomify(e);
    }
};

//update single note by id
exports.updateNote=async(_req,_res)=>{
    try{
        const id=_req.params.id;
        // console.log(JSON.stringify(_req.body));
        let noteUpdated=await Notes.findByIdAndUpdate(id,JSON.parse(_req.body));
        return noteUpdated;
    }
    catch(e){
        throw boom.boomify(e);
    }
};

//delete single by id
exports.deletePost=async(_req,_res)=>{
    try{
        const id=_req.params.id;
        let noteDeleted=await Notes.findByIdAndDelete(id);
        return {noteDeleted};
    }
    catch(e){
        throw boom.boomify(e);
    }
};

exports.sendId=async(_req,_res)=>{
    try{
        const id=_req.params.id;
        let noteUpdated=await Notes.findOne({'user.email':id});
        if(noteUpdated===null){
            _req.body={user:{email:id}}
            return this.addNewNote(_req,_res);
        }
        return noteUpdated;
    }
    catch(e){
        throw boom.boomify(e);
    }
};

exports.addEmployee=async(_req,_res)=>{
    try{
        console.log(_req.body);
        const id=_req.params.id;
        const tid=_req.params.tid;
        let user=await Notes.findById(id)
        mail.sendMail(JSON.parse(_req.body).employeeemail).then(result=>console.log("Email Sent",result)).catch(e=>console.log(e));
        let others=user.user.companies.map((value)=>{
            if(value._id===tid){
                return {...value,employees:[...value.employees,{...JSON.parse(_req.body)}]}
            }
            return value
        })
        let note=new Notes(others);
        let noteAdded=await note.save();
        return noteAdded;
    }
    catch(e){
        return boom.boomify(e);
    }
};

exports.employeeLogin=async(_req,_res)=>{
    try{
        const email=_req.params.email;
        const companyName=_req.params.companyName;
        let allNotes=await Notes.find();
        allNotes.forEach(user=>{
            user.companies.forEach(company=>{
                if(company.name===companyName){
                    company.employees.forEach(employee=>{
                        if(employee.employeeemail===email){
                            return user;
                        }
                    })
                }
            })
        })
        return null;
    }
    catch(e){
        throw boom.boomify(e);
    }
};