import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';



function FeedItem(props:any){
    const itemName = props.itemName
    const userName = props.userName
    const [date, setDate] = useState("");
    const [time, setTime] = useState()
    const [room, setRoom] = useState("");

    const onChangeDate = (d:any) => {
        setDate(d.target.value)
    }
    const onChangeRoom = (r:any) => {
        setRoom(r.target.value)
    }
    const onChangeSubmit = async () => {
         console.log(itemName, room, date, userName);
            const a = (room == "");
            const b = date == "";
            const c = userName == "";
           
            if( c ){ 
                await window.alert(" 로그인 부터 해주세요.")
                return false;
            }
            if( a || b ){ 
                await window.alert("날짜와 예약하려는 방을 입력해주세요.")
                return false;
            }
        props.submitReserve(itemName, room, date, userName);  //state내용을 담아서 parent node의 핸들러 submit reserve를 사용하기 
        setRoom("");
        setDate("");
    }


return( 
    <div> 
    <Card style={{ width: '18rem' }}>
        <Card.Body>
        <Card.Title>{itemName}</Card.Title>
        <Form.Select name="room" onChange={onChangeRoom} value={room}>
            <option value="">Choose room</option>                
              <option value="room1">room1</option>                
              <option value="room2">room2</option>
              <option value="room3">room3</option>
        </Form.Select>
      <p>
        <Form.Control type="date" onChange={onChangeDate} value={date}/>
      </p>
      <p>
          <Button variant="primary" onClick={onChangeSubmit}>submit</Button>
      </p>
        </Card.Body>
    </Card>
    </div>
    );
}


export default FeedItem;

