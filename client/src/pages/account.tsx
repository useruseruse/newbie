import React from "react";
import Header from "../components/header";
import axios from "axios";
import {SAPIBase} from "../tools/api";
import "./css/account.css";
import { useNavigate }  from "react-router-dom";
import { useLocation }  from "react-router-dom";
import { stat } from "fs";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";



const AccountPage = () => {
  const [ SAPIKEY, setSAPIKEY ] = React.useState<string>("");
  const [ NBalance, setNBalance ] = React.useState<number | "Not Authorized">("Not Authorized");
  const [ NTransaction, setNTransaction ] = React.useState<number | ''>(0);
  const navigate = useNavigate();
  const location = useLocation();
  interface IAPIResponse  { itemName: string, room: string, startDate: string, userName: string }


  const state = location.state as {userName: string, data:IAPIResponse[]};
  const userName = state.userName;
  const booking = state.data;
 


  return (
    <div className={"account"}>
      <div className={"account-token-input"}>
        <h2>
          {userName}'s page
        </h2>
      <Button variant="secondary" onClick={() => {navigate("/")}}>Back</Button>
      </div>
      <div className={"account-bank"}>
              <Table striped>
                <th>itemName</th>
                <th>room</th>
                <th>startDate</th>
                <tbody>
                    {booking.map( b => {
                      if(b.userName == userName){
                      return(
                          <tr>
                          <td>{b.room}</td>
                          <td>{b.userName}</td>
                          <td>{b.startDate}</td>
                          <td><Button>Delete</Button></td>
                          </tr>
                    )};})}
                </tbody>
              </Table>
      </div>
    </div>
  );
}

export default AccountPage;