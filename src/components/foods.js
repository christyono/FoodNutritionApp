import React from 'react'

const Foods = ({ foods }) => {
  return (
    <div>
      <center><h1>Food List</h1></center>
      {foods.map((foods) => (
        <div className="card" key = {foods.ndbno}>
          <div className="card-body" >
            <h5 className="card-title">{foods.name}</h5>
          </div>
        </div>
      ))}
    </div>
  )
};

export default Foods