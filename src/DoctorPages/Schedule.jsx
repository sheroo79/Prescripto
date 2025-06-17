import { useState } from "react";
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import "react-datepicker/dist/react-datepicker.css";
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import '../Css/AdminStyle.scss'
function Schedule() {
const [weeklySchedule, setWeeklySchedule] = useState([
    { day: "Monday", slots: [] },
    { day: "Tuesday", slots: [] },
    { day: "Wednesday", slots: [] },
    { day: "Thursday", slots: [] },
    { day: "Friday", slots: [] },
    { day: "Saturday", slots: [] },
    { day: "Sunday", slots: [] }
  ]);
  console.log(weeklySchedule)
function addSlot(dayIndex) {
  const updatedSchedule = [...weeklySchedule];
  updatedSchedule[dayIndex].slots.push({ start_time: "", end_time: "" });
  setWeeklySchedule(updatedSchedule);
}
function updateStartTime(dayIndex, slotIndex, val) {
  const updatedSchedule = [...weeklySchedule];
  updatedSchedule[dayIndex].slots[slotIndex].start_time = val;
  setWeeklySchedule(updatedSchedule);
}

function updateEndTime(dayIndex, slotIndex, val) {
  const updatedSchedule = [...weeklySchedule];
  updatedSchedule[dayIndex].slots[slotIndex].end_time = val;
  setWeeklySchedule(updatedSchedule);
}
function deleteSlot(dayIndex, slotIndex) {
  const updatedSchedule = [...weeklySchedule];
  updatedSchedule[dayIndex].slots.splice(slotIndex, 1);
  setWeeklySchedule(updatedSchedule);
}
  return (
    <>
        <div className='Appoint-wrapper'>
          <h4>My Schedule</h4>
          {/* <table className='table w-full table-fixed'>
             <thead>
                <tr>
                  <th className="w-1/4 p-2">Day</th>
                  <th className="w-1/4 p-2">Start Time</th>
                  <th className="w-1/4 p-2">End Time</th>
                  <th className="w-1/4 p-2">Status</th>
                </tr>
              </thead>
            <tbody>
              {
                daysOfWeek.map((day)=>(
                  <tr key={day}>
                  <td>
                    {day}
                  </td>
                  <td><TimePicker onChange={onChange} value={value}/></td>
                  <td><TimePicker onChange={onChange} value={value}/></td>
                  <td>Available</td>
                </tr>
                ))
              }
            </tbody>
          </table> */}
          {
            weeklySchedule.map((daySchedule, dayIndex) => (
              <table className="table" key={daySchedule.day}>
                <thead>
                  <tr>
                    <th className="d-flex justify-content-between">
                      {daySchedule.day}
                      <button className="btn btn-primary" onClick={() => addSlot(dayIndex)}>Add Slot</button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                {daySchedule.slots.length === 0 ? (
                  <tr>
                    <td><div>No slots added.</div></td>
                  </tr>
                ) : (
                  daySchedule.slots.map((slot, slotIndex) => (
                    <div key={slotIndex}>
                      <TimePicker 
                        value={slot.start_time}
                        onChange={(val) => updateStartTime(dayIndex, slotIndex, val)} 
                      />
                      -
                      <TimePicker 
                        value={slot.end_time}
                        onChange={(val) => updateEndTime(dayIndex, slotIndex, val)} 
                      />
                      <button className="btn btn-primary" onClick={() => deleteSlot(dayIndex, slotIndex)}>Delete</button>
                    </div>
                  ))
                )}
                </tbody>
              </table>
            ))
          }

        </div>
    </>
  )
}

export default Schedule