
import "./CalendarView.css"
import Calendar from "./Calendar";
import CalendarTaskRow from "./CalendarTaskRow";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";



export default function CalendarView (){
    const [date,setDate] = useState();
    const [uncompletedTasks,setuncompletedTasks] = useState();
    const [completedTasks,setcompletedTasks] = useState();
    const [emptyTasks, setEmptyTasks] = useState(false);
    const getTasks = async ()=>{
        if(date){
        
        const {data} = await axios.get(`${config.BASE_URL}/date/${date}`);
        if(data.success === true){
            // Toggle the flag depending if there is any tasks registered for this day
            data.data.length > 0 ? setEmptyTasks(false) : setEmptyTasks(true)

            const uncompleted =  
            data.data.filter(e=>e.completed === false)
            .map((e,i)=> {
                     return <CalendarTaskRow key={i} {...e}/>;
                
            });
            setuncompletedTasks([...uncompleted]);
            const completed =data.data.filter(e=>e.completed === true)
            .map((e,i)=> {
                     return <CalendarTaskRow key={i} {...e}/>;
            });
            setcompletedTasks([...completed]);            

        }
    }

    };
        useEffect(()=>{
            getTasks();
        },[date])
    return (
        <div id="calendar_view_container">
        <Calendar dateState={setDate} />
        <div id="calendar_tasks_container">
            {completedTasks}
            {uncompletedTasks}
            {emptyTasks ? <tr className="empty_tasks"><td>You dont have tasks registered for this day.</td></tr> : ""}
        </div>
        </div>
    )
}