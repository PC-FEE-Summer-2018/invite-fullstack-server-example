const express = require('express')
const router = express.Router()
const axios = require('axios')
const shortid = require('shortid')

const data = {
  users:[],
  going:[],
  notgoing:[]
}

/*
 * type: GET
 * path: /users
 * resp: {
 *  users: [
 *   {
 *    id: number,
 *    name: string,
 *    email: string,
 *    phone: string,
 *    image: string,
 *    status: string
 *   }
 *  ] 
 * }
 * 
 */
router.get('/users', (req, res, next) => {
  if (data.users.length === 0) {
    axios.get('https://randomuser.me/api/?results=100').then(resp => {
      const users = resp.data.results.map(user => {
        return {
          id: shortid.generate(),
          name: user.name.first + ' ' + user.name.last,
          email: user.email,
          phone: user.phone,
          image: user.picture.large,
          status: 'pending'
        }
      })

      data.users = users

      res.json(users)
    })
  } else {
    res.json(data.users)
  }
})


/*
 * type: PATCH
 * path: /users/:id
 * data: {status:string}
 * resp: {
 *    id: number,
 *    name: string,
 *    email: string,
 *    phone: string,
 *    image: string,
 *    status: string
 *   }
 */
router.patch('/users/:id', (req, res, next) => {
  const id = req.params.id
  const status = req.body.status

  const user = data.users.find(user => user.id === id)

  user.status = status

  data[status].push(user)

  data.users = data.users.filter(user => user.id !== id)

  res.json(user)
})

/*
 * type: GET
 * path: /user/:id
 * resp: {
 *    id: number,
 *    name: string,
 *    email: string,
 *    phone: string,
 *    image: string,
 *    status: string
 *   }
 */
router.get('/users/:id', (req, res, next) => {
  const id = req.params.id

  const user = data.users.find(user => user.id === id)

  res.json(user)
})

/*
 * type: GET
 * path: /users/going
 * resp: users: array
 */
router.get('/going', (req, res, next) => {
  res.json(data.going)
})

/*
 * type: GET
 * path: /users/notgoing
 * resp: users: array
 */
router.get('/notgoing', (req, res, next) => {
  res.json(data.notgoing)
})

module.exports = router
