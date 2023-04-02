import React, { useEffect, useState } from "react";
const Testfilebody = () => {
    
    const [users, setUsers] = useState([])

    const fetchData = async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts")
      const data = await response.json()
      setUsers(data)
    }
  
    useEffect(() => {
      fetchData()
    }, [])
  
    return (
      <div>
        {users.length > 0 && (
          <ul>
            {users.map(user => (
              <li key={user.id}>{user.id}- {user.title}</li>
            ))}
          </ul>
        )}
      </div>
    )
  }
export default Testfilebody