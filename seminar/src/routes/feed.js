const express = require('express');
const Feed = require('../models/feed');
const User = require('../models/account');
const e = require('express');
const router = express.Router();

//Room DB와 RoomModel이 어떻게 연결되는지 모르겠음. 
// js Class 인 RoomDB의 constructor 로 함수를 짜서 실제 백엔드의 RoomModel에 요청을 보내는 건가?)


class UserDB{
    static _inst_;
    static getInst = ( ) => {
        if( !UserDB._inst_ ) UserDB._inst_ = new UserDB();
        return UserDB._inst_;
    }
    constructor() { console.log("[User-DB] DB Init Completed"); }
    //Login related functions --------------------------------
    enrollUser = async (id, pwd) => {
        try{
            //id가 중복되면 경고 메세지 출력 
            const checkExists = await User.UserModel.exists({userName:id})
            if(checkExists){
               return {success:false, r:1};
            }
            const newUser = await new User.UserModel({ userName: id, pwd: pwd });    //중복 id는 db 설정(unique에서 먹아줄 것임.)           return true;
            const res = await newUser.save();
            return {success:true,};
        } catch(e) {
            console.log(`[User-DB] Enroll Error: ${ e }`);
            return {success:false, r:0};
        }
    }
    doLogin = async (id, pwd) =>{
        try{
            const checkUserName = await User.UserModel.exists({userName:id});
            const checkPwd = await User.UserModel.exists({userName:id, pwd:pwd});
            if(checkUserName == null){
               return {success:false, r:0};
            } 
            if(checkPwd == null){
                return {success:false, r:1};
            }
            else return {success:true};
        } catch(e) {
            console.log(`[User-DB] Login Error: ${ e }`);
            return false;
        }
    }
}

  

class BookingDB {
    static _inst_;
    static getInst = () => {
        if ( !BookingDB._inst_ ) BookingDB._inst_ = new BookingDB();
        return BookingDB._inst_;
    }
    constructor() { console.log("[Booking-DB] DB Init Completed");} 
    

    //Booking Related Functions --------------------------------
   
    addReserve = async({itemName, room, date, userName}) => {
        try{ //id -> room의 해당 date에 예약이 없을 경우에만 add reserve
            console.log(itemName, room, date, userName);
            const a = (room == "");
            const b = date == "";
            const c = userName == "";
           
            if( a || b || c ){ 
                console.log("please enter every entries")
                return false;
            }
       
            const Reserved = await Feed.BookingModel.exists({
                $and: [
                    {itemName: itemName},
                    {room: room},
                    {startDate: date},
                ]     
            })
            if(!Reserved){   //Q1. find의 반환값이 true인지 false인지 ...
                const newBooking = await new Feed.BookingModel({itemName:itemName, room:room, startDate:date, reserved:"Yes", userName:userName});
                const res = await newBooking.save();
                return {success: true};
            }
            else{
                console.log(`Already registered`)
                return {success: false, r:1};
            }
        }catch(e){
            console.log(`[Booking-DB] Submit Error: ${ e }`);
            return {success: false};
        }
    }

    findReservedItems = async () => {
        try {        
            //if (count < 0) return { success: false, data: "Invalid count provided" };
            const reservedArg = await Feed.BookingModel.find({reserved: "Yes"}).sort({'createdAt': -1}).exec();
            return { success: true, data: reservedArg};
        } catch (e) {
            console.log(`[Booking-DB] Select Error: ${ e }`);
            return { success: false, data: `DB Error - ${ e }` };
        }
    }



    deleteItem = async ( itemName, room, startDate ) => {
        try {           
            const res = await FeedModel.deleteOne({itemName, room, startDate});
            console.log('server deletes item');
            return true;
        } catch (e) {
            console.log(`[Feed-DB] Delete Error: ${ e }`);
            return false;
        }
    }
}





router.get('/getFeed', async (req, res) => {
    try {
        const dbRes = await BookingDBInst.findReservedItems();
        if (dbRes.success) return res.status(200).json(dbRes.data);
        else return res.status(500).json({ error: dbRes.data })
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});



router.post('/addFeed', async (req, res) => {
   try {
       const { itemName, room, date, userName } = req.body;
       const addResult = await BookingDBInst.addReserve({ itemName, room, date, userName });
       if (addResult.success == false && addResult.r == 1){
            return res.send("이미 동일한 날짜에 예약이 되어 있습니다. 다른 날 예약 해주세요.").status(500);
        }else return res.status(200).json({ isOK: true });
   } catch (e) {
       return res.status(500).json({ error: e });
   }
})

router.post('/enrollUser', async(req, res) =>{
    try{
        const { id, pwd } = req.body; 
        const result = await UserDBInst.enrollUser(id, pwd);
        if (!result.success && result.r == 1) {
            return res.send("이미 같은 ID 가 존재합니다. 다른 아이디를 사용해주세요.");
        }
        else return res.send("정상적으로 등록되었습니다.");
    }catch (e) {
        return res.status(500).json({ error:e })
    }
})



router.post('/doLogin', async(req, res) =>{
    try{
        const { id, pwd } = req.body; 
        const dbRes = await UserDBInst.doLogin(id, pwd);
        console.log(dbRes.success, dbRes.r,"uu")
        if (dbRes.success == false && dbRes.r == 0) {
          return res.send("없는 아이디입니다, 이용하기 전에 먼저 등록하세요")}        
        if (dbRes.success == false && dbRes.r == 1) {
          return  res.send("비밀번호가 일치하지 않습니다.")}     
        else { 
        return  res.send("정상적으로 로그인 되었습니다.").status(200);}
    }catch (e) {
        return res.status(500).json({ error:e })
    }
})


router.post('/deleteItem', async (req, res) => {
    try {
        const { itemName, room, startDate } = req.body;
        const deleteResult = await BookingDB.deleteItem(itemName, room, startDate);
        if (!deleteResult) return res.status(500).json({ error: "No item deleted" })
        else return res.status(200).json({ isOK: true });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
})



const UserDBInst = UserDB.getInst();
const BookingDBInst = BookingDB.getInst();



module.exports = router;