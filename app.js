const express = require('express')
const app = express()
require('dotenv').config()
const mysql = require('mysql2')

app.post('/api/add', (req, res) => {
    api_route = Buffer.from(Math.random().toString()).toString("base64").substring(10,20);

    let cnxn = mysql.createConnection(process.env.DATABASE_URL)

    cnxn.execute('insert into briantools.yestful_routes (api_route, http_resp_body, user_id) values (?, ?, ?)', [api_route, req.resp_body, req.user], function(err, results, fields) {
      if(results.affectedRows > 0) {
        res.send({'status': 1, 'api': api_route})
      } else {
        res.send({'status': 0, 'api': ''})
      }
    })
    cnxn.end()
})

app.get('/api/:routeKey', (req, res) => {
  if (typeof req.params.routeKey === undefined) {
    res.send({'status': 0, 'body': '', 'msg': 'Route Missing'})
    return
  }

  let cnxn = mysql.createConnection(process.env.DATABASE_URL)

  cnxn.query("select http_resp_body from briantools.yestful_routes where api_route = ?", [req.params.routeKey], function(err, results) {

    if(typeof results[0]['http_resp_body'] !== undefined) {
      res.send({'status': 1, 'body': results[0]['http_resp_body']})
    } else {
      res.send({'status': 0, 'body': '', 'msg': 'Route Not Found'})
    }

  })
  cnxn.end()
})

app.get('/api/:routeKey/delete', (req, res) => {
  if (typeof req.params.routeKey === undefined) {
    res.send({'status': 0, 'msg': 'Route Missing'})
    return
  }

  let cnxn = mysql.createConnection(process.env.DATABASE_URL)

  cnxn.execute('update briantools.yestful_routes set active_status = "D" where api_route = ?', [req.params.routeKey], function(err, results, fields) {
    if(results.affectedRows > 0) {
      res.send({'status': 1, 'msg': 'Route Deleted'})
    } else {
      res.send({'status': 0, 'msg': 'Route Not Found'})
    }
  })
  cnxn.end()

})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})