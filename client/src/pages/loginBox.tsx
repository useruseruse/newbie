import axios from "axios";
import React, {useState, useEffect} from "react";
import "./css/feed.css";
import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { isRegExp } from "util/types";



function LoginBox(props:any){
    const [ Id, setId ] = React.useState<string>("");
    const [ Pwd, setPwd ] = React.useState<string>("");
    const [ enrolled, setEnrolled ] = React.useState<Boolean>(false);
    //use Effect로 리렌더링 해줄 필요는 없나??
    
    React.useEffect( () =>{
      setEnrolled(false)
    }, [enrolled])

    const enrollUser = async () => {
      if(Id == "" || Pwd == ""){
        await window.alert("등록을 하기 위해 이름과 패스워드를 입력해주세요");
        return false;
      }
      const res = props.enrollUser( Id, Pwd );
      setEnrolled(true)
      setId("");
      setPwd("");
    }

    const doLogin =async () => {
      if(Id == "" || Pwd == ""){
        await window.alert("로그인을 하기 위해 이름과 패스워드를 입력해주세요");
        return false;
      }
      props.doLogin(Id, Pwd);
      props.setUserName(Id);   
      //}
    }
  
    const doLogout = () => {
      props.setUserName("")
      setId("")
      setPwd("")
      props.setLogined(false)
    }

    const getMyPage = () => {
      props.getMyPage(Id, Pwd)
    }

    return(
      <div className={"feed-item"}>
      { (!props.Logined) ? (
                <div>
                <p>
                  Enter UserID: <input type={"text"}  onChange={e => setId(e.target.value)} value={Id} />
                </p>
                <p>
                  Enter Password: <input type={"text"} onChange={e => setPwd(e.target.value)} value={Pwd}/>
                </p>
                <Button variant="secondary" onClick={e => enrollUser()}>등록</Button>
                <Button variant="secondary" onClick={e => doLogin()}>로그인</Button>
                </div>
        ) : (
                <div>
                <h4>
                      Welcome, User {Id}
                </h4>
                      <Button variant="secondary"className="Button" onClick={e => getMyPage()}>my Page</Button>
                <p></p>
                      <Button variant="secondary"className="Button" onClick={e => doLogout()}>로그아웃</Button>
                </div>                
          )
      }
      </div>
      
    );
}
export default LoginBox;
