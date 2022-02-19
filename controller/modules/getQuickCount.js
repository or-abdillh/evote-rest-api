'use strict'

const response = require('../../response')
const conn = require('../../connection.js')

/*
	format response :
	[
	   {
	      candidate: chairman - vice chairman,
	      vote: 9,
	      decimal: 42.77777778,
	      percent: 42.88%
	   }
]
*/

//Create percent from example data
const createPercent = (n, m) =>  n / m * 100;

module.exports = ( req, res ) => {

	//Query length of Accounts table where field role = general or voters
  //And query to get chairman_name and vice_chairman_name from Candidates table
  let sql = `
     SELECT username, status_vote, candidate_id FROM Accounts WHERE role = "general";
     SELECT chairman_name, vice_chairman_name, candidate_number, candidate_id FROM Candidates ORDER BY candidate_number ASC
  `;
	
  //Query
  conn.query(sql, (err, rows) => {
     if (err) response.internalError(res, err); //Sql error
     else {
        //Query Accounts handler
        const accounts = {
           data: rows[0], //Fresh data Accounts
           total: rows[0].length, //Amount accounts
           voted: rows[0].filter(vote => vote.status_vote > 0).length //accounts voted
        };
        
        //Query Candidates handler 
        const data = []; //container
        //Loop all results from Candidates to create quick count data
        rows[1].forEach(row => {
           //Get vote from accounts
           let vote = accounts.data.filter(d => d.candidate_id === row.candidate_id);
           //Create sample object and push to container
           data.push({
              candidate: `${row.chairman_name} - ${row.vice_chairman_name}`,
              candidateNumber: row.candidate_number,
              vote: vote.length,
              decimal: createPercent(vote.length, accounts.total),
              percent: createPercent(vote.length, accounts.total).toFixed(2) + "%"
           });
        });
        //Send final response
        response.success(res, { quickCount: data })
     }
  })
}
