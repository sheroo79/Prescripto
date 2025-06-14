import React from 'react'

function Schedule() {
  return (
    <>
        <div className='Appoint-wrapper'>
          <h4>My Schedule</h4>
          <table className='table w-full table-fixed'>
             <thead>
                <tr>
                  <th className="w-1/4 p-2">Date</th>
                  <th className="w-1/4 p-2">Start Time</th>
                  <th className="w-1/4 p-2">End Time</th>
                  <th className="w-1/4 p-2">Status</th>
                </tr>
              </thead>
            <tbody>
              <tr>
                <td>
                  Date
                </td>
                <td>9:00AM</td>
                <td>12:00AM</td>
                <td>Available</td>
              </tr>
            </tbody>
          </table>
        </div>
    </>
  )
}

export default Schedule