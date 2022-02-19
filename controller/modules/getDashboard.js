'use strict'

const response = require('../../response')
const conn = require('../../connection.js')

/*
	target response 
	{
	   candidates: 4,
	   participants: 6,
	   incomingVote: 2,
	   participations: 32.56%,
	}
*/

module.exports = ( req, res ) => {

	//Query to Accounts and Candidates table
  const sql = `
     SELECT status_vote FROM Accounts WHERE role = "general";
     SELECT candidate_id FROM Candidates
  `

	//Generate response from DB
	conn.query(sql, (err, rows) => {
		if (err) response.internalError(res, err); //MySQL error
		else {
			const dashboard = {}; //Container
			//Candidates property
			dashboard.candidates = rows[1].length;
			//participants property
			dashboard.participants = rows[0].length;
			//incomingVote property
			dashboard.incomingVote = rows[0].filter(d => d.status_vote > 0).length;
			//participations property
			dashboard.participations = ( dashboard.incomingVote / dashboard.participants * 100 ).toFixed(2) + '%';
			//Sending response
			response.success(res, { dashboard });
		}
	})
}
