/*
  Retrieve the games data from the server
*/

export async function retrieveGames (id) {
  id = id || ''
  if (id) {
    const response = await fetch(`/game/browse/${id}`)
    const data = await response.json()
    return data
  } else {
    const response = await fetch('/game/browse')
    const data = await response.json()
    return data
  }
}

export async function insertGame (bodyInformation) {
  const response = await fetch('/game/insert', {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: bodyInformation
  })
  const data = await response.json()
  console.log(data)
  return data
}

export async function deleteGame (id) {
  const response = await fetch(`/game/remove/${id}`, {
    method: 'DELETE'
  })
  const data = await response.json()
  return data
}
