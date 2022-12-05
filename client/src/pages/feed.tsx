import React, { useReducer } from "react";
import axios from "axios";
import { SAPIBase } from "../tools/api";
import Header from "../components/header";
import "./css/feed.css";
import "./css/account.css"
import FeedItem from "./feed-item";
import LoginBox from "./loginBox"
import { useNavigate }  from "react-router-dom";
import Table from "react-bootstrap/Table";



import { collapseTextChangeRangesAcrossMultipleVersions, resolveModuleName, walkUpBindingElementsAndPatterns } from "typescript";
interface IAPIResponse  { itemName: string, room: string, startDate: any, userName: string }

const FeedPage = (props: {}) => {
  const [ LAPIResponse, setLAPIResponse ] = React.useState<IAPIResponse[]>([]);
  const [ SNewPostTitle, setSNewPostTitle ] = React.useState<string>("");
  const [ SNewPostContent, setSNewPostContent ] = React.useState<string>("");
  const [ SSearchItem, setSSearchItem ] = React.useState<string>("");
  const [ Reserving, setReserving ] = React.useState<boolean>(false);
  const [ userName, setUserName ] = React.useState<String>("");
  const [ bookingData, setBookingData ] = React.useState<any>();
  const [ Logined, setLogined ] = React.useState<Boolean>(false)
   
  
  const navigate = useNavigate();

  React.useEffect( () => {
    let BComponentExited = false;
    const asyncFun = async () => {
      console.log("for the first time")
      const { data } = await axios.get<IAPIResponse[]>( SAPIBase + `/getFeed`);             
      if (BComponentExited) return;
      setLAPIResponse(data);
      setBookingData(data);
    };
    asyncFun().catch((e) => window.alert(`Error while running API Call: ${e}`));
    return () => { BComponentExited = true; }
   
  }, [Reserving]);

  const submitReserve = (itemName:any, room:any, date:any, userName:any) => {
    const asyncFun = async () => {
      setReserving(true)
      const res = await axios.post( SAPIBase + '/addFeed', { itemName: itemName,  room: room, date: date, userName:userName}) 
      if(res.data == "이미 동일한 날짜에 예약이 되어 있습니다. 다른 날 예약 해주세요."){ 
        window.alert(res.data)
      }
      setReserving(false)
    };asyncFun().catch(  e => 
    window.alert(`AN ERROR OCCURED!${e}`)
    )
  }
  /*
  const deletePost = (id: string) => {
    const asyncFun = async () => {
      // One can set X-HTTP-Method header to DELETE to specify deletion as well
      await axios.post( SAPIBase + '/feed/deleteFeed', { id: id } );
      setNPostCount(Math.max(NPostCount - 1, 0));
    }
    asyncFun().catch(e => window.alert(`AN ERROR OCCURED! ${e} ${(id)}`));
  }

  }*/

  

  //login function 
  const enrollUser = (Id:String, Pwd:String) => {
    const asyncFun = async () => {
      const res = await axios.post( SAPIBase + '/enrollUser', { id:Id, pwd:Pwd }) 
      window.alert(res.data)
    }; asyncFun().catch( e =>{
      window.alert(`AN ERROR OCCURED!${e}`)
    })
  }

  const doLogin = (Id:String, Pwd:String) =>{
    const asyncFun = async() => {
      const res = await axios.post( SAPIBase + '/doLogin', {id:Id, pwd:Pwd} )
      window.alert(res.data)
      if(res.status == 200){
        setLogined(true);
      }
    }; asyncFun().catch( e => {
      window.alert(`AN ERROR OCCURED!${e}`)
    })
  }


 const deleteItem =  (itemName:String, room:String, startDate:string) =>{
    const asyncFun = async() => {
      await axios.post( SAPIBase + '/deleteItem', {itemName : itemName, room:room, startDate:startDate} )
    }; asyncFun().catch( e => {
      window.alert(`AN ERROR OCCURED!${e}`)
    })
  }
  const getMyPage  = (Id:String, Pwd:String) => {
    navigate("/account", {state : {userName :userName, data:LAPIResponse}})
  }




  return (
    <div>
      <div className="login-box">
            <LoginBox  enrollUser={enrollUser} getMyPage={getMyPage} setUserName={setUserName} setLogined={setLogined} Logined={Logined} doLogin={doLogin}></LoginBox>
      </div>
    <div className="main">
      <div className="aside">
        <h2>Reserve Rooms!</h2>
        <div className={"feed-list"}>
            <FeedItem itemName={"Sports"} submitReserve={submitReserve} userName={userName}/>
            <FeedItem itemName={"Library"} submitReserve={submitReserve} userName={userName}/>  
        </div>
      </div>
      <div className="board">
        <div className="reserved-list">
              <Table striped >
                <th>itemName</th>
                <th>room</th>
                <th>startDate</th>
                <th>userName</th>
                <tbody>
                    {LAPIResponse.map( booking => {
                      return(
                          <tr>
                          <td>{booking.itemName}</td>
                          <td>{booking.room}</td>
                          <td>{booking.startDate}</td>
                          <td>{booking.userName}</td>
                          </tr>
                    );})}
                </tbody>
              </Table>
        </div>
      </div>
    </div>
    </div>
    

  );
}

export default FeedPage;