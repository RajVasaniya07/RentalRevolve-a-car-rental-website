import React from 'react'


const index = () => {
  return (
    <div>
      {users.map((user) => {
        return(<>{user.email}<br></br></>);
      })
    }
    <br></br>
    {sellers.map((seller) => {
        return(<>{seller.email}<br></br></>);
      })
    }
    </div>
  )
}

export default index
