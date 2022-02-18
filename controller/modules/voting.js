'use strict'

const response = require('../../response')
const conn = require('../../connection.js')
const jwt = require('jsonwebtoken')

require('dotenv').config()

module.exports = ( req, res ) => {

	//Get token and decoded
	const token = req.headers.authorization
	const decoded = jwt.decode(token, { complete: true })
	const username = decoded.payload.username
	
	//Get candidate id
	const candidateID = req.params.candidate
	//SQL
   var sql;
   
   //Handler for check if user status_vote === true
   const isStatusVote = callback => {
      //Create sql
      sql = `SELECT status_vote FROM Accounts WHERE token = "${token}" AND username = "${username}"`;

      conn.query(sql, (err, rows) => {
         if (err) response.serverError(res, err);
         else {
            if ( rows[0].status_vote < 1 ) callback() //status_vote false
            else response.forbidden(res, 'Anda sudah melakukan vote');
         }
      });
   }
   
   //Check event is available
   const isEventAvailable = () => {
      //create sql 
      sql = 'SELECT event_start_at, event_finish_at FROM Event';
      conn.query(sql, (err, rows) => {
         if (err) response.serverError(res, err);
         else {
            const eventStartAt = rows[0].event_start_at;
            const eventFinishAt = rows[0].event_finish_at;
            //Get current time
            const now = new Date().getTime();
            //Check isEventAvailable ?
            if ( now >= eventStartAt && now <= eventFinishAt ) submitVote(now); //Event is available
            else response.forbidden(res, 'Event tidak tersedia');
         }
      })
   }
   
   //Handler for submit vote and savve timestamp
   const submitVote = now => {
      //Create sql
      sql = `UPDATE Accounts SET candidate_id = "${candidateID}", status_vote = "1", time_stamp = "${now}" WHERE token = "${token}" AND username = "${username}"`;
      conn.query(sql, (err, rows) => {
         if (err) response.serverError(res, err);
         else {
            if (rows.affectedRows > 0) response.success(res, 'Your vote success to submit');
            else response.notFound(res, { username });
         }
      })
   }

   //Main handler
   isStatusVote( isEventAvailable )
     	
}
