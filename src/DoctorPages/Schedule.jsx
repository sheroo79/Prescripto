import { useState } from "react";
import Select from "react-select";

function Schedule() {
  const [selectedDays, setSelectedDays] = useState([])
  const [duration, setDuration] = useState(20)
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [error, setError] = useState('')
  const [schedules,setSchedules] = useState([])
  console.log(selectedDays)
  // console.log(duration)
  // console.log(startTime)
  // console.log(endTime)
  const days = [
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
    { value: "Sunday", label: "Sunday" },
  ];
  const slotDuration = [20,40,60]

  const getSlotGenerate = (duration, startTime, endTime) =>{
    const slots = []
    const currentTime = new Date(`2025-01-01T${startTime}:00`)
    const endTimeDate = new Date(`2025-01-01T${endTime}:00`)
    while(currentTime < endTimeDate){
      const slotStart = currentTime.toTimeString().slice(0,5); 
      currentTime.setMinutes(currentTime.getMinutes() + duration)
      const slotEnd = currentTime.toTimeString().slice(0,5);
      slots.push(`${slotStart} - ${slotEnd}`);
    }
    return {slots, slotCount: slots.length}
    console.log(slots)
  }

  const handleAddSchedule = (e) =>{
    e.preventDefault()
    setError('')
    setStartTime(""); 
    setEndTime("");
    if(selectedDays.length === 0){
      setError('Please select at least one day.')
      return;
    }
    if (!startTime || !endTime) {
      setError("Please select both start and end times.");
      return;
    }
    const {slots,slotCount} = getSlotGenerate(duration,startTime,endTime)
    console.log(slotCount,slots)
    const newSchedules = selectedDays.map((day) => ({
            day: day.value,
            duration,
            startTime,
            endTime,
            slotCount, slots
        }));
        setSchedules([...schedules, ...newSchedules]);
        console.log([...schedules, ...newSchedules], "schedules")
        setSelectedDays([]);
        setDuration(20);
        setStartTime("09:00");
        setEndTime("17:00");
  }
  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Doctor Schedule</h1>
        <form className="mb-6" onSubmit={(e) => handleAddSchedule(e)}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-gray-700 text-sm font-medium block">Days</label>
              <Select isMulti options={days} value={selectedDays} onChange={setSelectedDays} placeholder="Select days..."></Select>
            </div>
            <div>
              <label className="text-gray-700 text-sm font-medium block">Slot Duration (minutes)</label>
              <select value={duration} onChange={(e)=> setDuration(e.target.value)} className="w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 p-2">
                {
                  slotDuration.map((slot,index)=>(
                    <option key={index}>{slot} minutes</option>
                  ))
                }
              </select>
            </div>
            <div>
              <label className="text-gray-700 text-sm font-medium block">Start Time</label>
              <input type="time" onChange={(e)=> setStartTime(e.target.value)} value={startTime} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
            <div>
              <label className="text-gray-700 text-sm font-medium block">End Time</label>
              <input type="time" onChange={(e)=> setEndTime(e.target.value)} value={endTime} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
          </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          <button type="submit" className="bg-blue-600 text-white rounded-md py-2 px-3 mt-2">Add Schedule</button>
        </form>
      
      {schedules.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="py-2 px-4 border-b text-left">Day</th>
                                <th className="py-2 px-4 border-b text-left">Slot Duration</th>
                                <th className="py-2 px-4 border-b text-left">Start Time</th>
                                <th className="py-2 px-4 border-b text-left">End Time</th>
                                <th className="py-2 px-4 border-b text-left">Available Slots</th>
                            </tr>
                        </thead>
                        <tbody>
                            {schedules.map((schedule, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="py-2 px-4 border-b">{schedule.day}</td>
                                    <td className="py-2 px-4 border-b">{schedule.duration}</td>
                                    <td className="py-2 px-4 border-b">{schedule.startTime}</td>
                                    <td className="py-2 px-4 border-b">{schedule.endTime}</td>
                                    <td className="py-2 px-4 border-b">{schedule.slotCount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
      )}
      </div>
    </>
  );
}

export default Schedule;
