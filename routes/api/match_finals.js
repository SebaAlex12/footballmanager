const express = require("express");
const router = express.Router();

// MatchFinal Model
const MatchFinal = require("../../models/MatchFinal");

// Match Model
const Match = require("../../models/Match");

// @route GET api/match_final/test
// @desc test match final route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "match final works" }));

// @route GET api/match_finals
// @desc get match final
// @access Public
router.get("/", (req, res) => {
  MatchFinal.find()
    .sort({ matchDate: -1 })
    .then(matchFinal => res.json(matchFinal))
    .catch(err =>
      res.status(404).json({ nomatchfinalfound: `No match final found` })
    );
});

// @route GET api/match_finals/generate
// @desc get match final
// @access Public
router.post("/generate",async(req,res) => {
  try{
    const matches = await Match.find({closed:1}, null, {
        sort: { date: "asc" },
    });
    if(matches){
      // truncate collection matchfinals
      const response = await MatchFinal.remove({});
      if(response){
        matches.forEach( match = async(match) => {
            try{
              const data = generateMatchFinals(match);
            }catch(errors){
              console.log("add finals errors", errors);
            }
        })
      }
    }
  }catch(errors){
    console.log("find matches errors",errors);
  }
});

// @route POST api/match_finals
// @desc create point
// @access Private
router.post(
  "/",
  //   passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Match.findById(req.body.matchId)
      .then(match => {
        if (match) {
           generateMatchFinals(match);
        }
      })
      .catch(err =>
        res.status(404).json({ nomatchesfound: `No matches found` })
      );
  }
);

const generateMatchFinals = async(match) => {
  try{
      match.bettings.map( betting = async(betting) => {

        // default values
        let firstHalfPoints = 0;
        let secondHalfPoints = 0;
        let overtimePoints = 0;
        
        let firstHalfHitWinner = 0;
        let secondHalfHitWinner = 0;
        let overtimeHitWinner = 0;

        let firstHalfHitResult = 0;
        let secondHalfHitResult = 0;
        let overtimeHitResult = 0;

        // first half second half overtime match winner
        let firstHalfWinner = {
          firstTeam: 0,
          secondTeam: 0
        };

        let secondHalfWinner = {
          firstTeam: 0,
          secondTeam: 0
        };

        let overtimeWinner = {
          firstTeam: null,
          secondTeam: null
        };

        // first half second half and overtime betting winner
        let firstHalfBettingWinner = {
          firstTeam: 0,
          secondTeam: 0
        };

        let secondHalfBettingWinner = {
          firstTeam:0,
          secondTeam:0
        }

        let overtimeBettingWinner = {
          firstTeam:null,
          secondTeam:null
        }

        // who won first and who won second half and how won overtime in match
        if(match.firstTeamFirstHalfGoals > match.secondTeamFirstHalfGoals){
            firstHalfWinner.firstTeam = 1;
        }

        if(match.firstTeamFirstHalfGoals < match.secondTeamFirstHalfGoals){
            firstHalfWinner.secondTeam = 1;
        }

        if(match.firstTeamSecondHalfGoals > match.secondTeamSecondHalfGoals){
          secondHalfWinner.firstTeam = 1;
        }

        if(match.firstTeamSecondHalfGoals < match.secondTeamSecondHalfGoals){
            secondHalfWinner.secondTeam = 1;
        }  


  if(typeof match.firstTeamOvertimeGoals === "number" && typeof match.secondTeamOvertimeGoals === "number"){

      if(match.firstTeamOvertimeGoals > match.secondTeamOvertimeGoals){
        overtimeWinner.firstTeam = 1;
        overtimeWinner.secondTeam = 0;
      }
      
      if(match.firstTeamOvertimeGoals < match.secondTeamOvertimeGoals){
        overtimeWinner.firstTeam = 0;
          overtimeWinner.secondTeam = 1;
      }

  }


        
        // who won first half who won second half and who won overtime in betting
              if(betting.firstTeamFirstHalfGoals > betting.secondTeamFirstHalfGoals){
                  firstHalfBettingWinner.firstTeam = 1;
              }
      
              if(betting.secondTeamFirstHalfGoals < betting.secondTeamFirstHalfGoals){
                  firstHalfBettingWinner.secondTeam = 1;
              }
      
              if(betting.firstTeamSecondHalfGoals > betting.secondTeamSecondHalfGoals){
                secondHalfBettingWinner.firstTeam = 1;
              }
      
              if(betting.firstTeamSecondHalfGoals < betting.secondTeamSecondHalfGoals){
                  secondHalfBettingWinner.secondTeam = 1;
              }  



        if(typeof betting.firstTeamOvertimeGoals === "number" && typeof betting.secondTeamOvertimeGoals === "number"){

                if(betting.firstTeamOvertimeGoals > betting.secondTeamOvertimeGoals){
                  overtimeBettingWinner.firstTeam = 1;
                  overtimeBettingWinner.secondTeam = 0;
                }
        
                if(betting.firstTeamOvertimeGoals < betting.secondTeamOvertimeGoals){
                    overtimeBettingWinner.firstTeam = 0;
                    overtimeBettingWinner.secondTeam = 1;
                } 
                
        }

        if(betting._id == "60db693efffd4c0017a02d24"){
          console.log("match",match);
          console.log("betting",betting);
          console.log("overtimeWinner",overtimeWinner);
          console.log("overtimeBettingWinner",overtimeBettingWinner);
        }


        // compare match and betting first half if true got one point
        if(firstHalfWinner.firstTeam == firstHalfBettingWinner.firstTeam && firstHalfWinner.secondTeam == firstHalfBettingWinner.secondTeam){
            firstHalfHitWinner = 1;
            firstHalfPoints = 1;
        }
        // compare match and betting second half if true got two points
        if(secondHalfWinner.firstTeam == secondHalfBettingWinner.firstTeam && secondHalfWinner.secondTeam == secondHalfBettingWinner.secondTeam){
            secondHalfHitWinner = 1;
            secondHalfPoints = 2;
        }
        // compare match and betting overtime if true got one point - check if was betting in overtime
        if(overtimeWinner.firstTeam !== null && overtimeBettingWinner.firstTeam !== null && overtimeWinner.secondTeam != null && overtimeBettingWinner.secondTeam !== null){
            if(overtimeWinner.firstTeam == overtimeBettingWinner.firstTeam && overtimeWinner.secondTeam == overtimeBettingWinner.secondTeam){
                overtimeHitWinner = 1;
                overtimePoints = 1;
            }
        }

        // if first half hit the some result you got two points
        if(match.firstTeamFirstHalfGoals == betting.firstTeamFirstHalfGoals && match.secondTeamFirstHalfGoals == betting.secondTeamFirstHalfGoals){
          firstHalfHitResult = 1;
          firstHalfPoints = 2; 
        }

        // if second half hit the some result you got three points
        if(match.firstTeamSecondHalfGoals == betting.firstTeamSecondHalfGoals && match.secondTeamSecondHalfGoals == betting.secondTeamSecondHalfGoals){
          secondHalfHitResult = 1;
          secondHalfPoints = 3; 
        }   
        
        if(typeof betting.firstTeamOvertimeGoals === "number" && typeof betting.secondTeamOvertimeGoals === "number"){

          // if overtime hit the some result you got two points
          if(match.firstTeamOvertimeGoals == betting.firstTeamOvertimeGoals && match.secondTeamOvertimeGoals == betting.secondTeamOvertimeGoals){
              overtimeHitResult = 1;
              overtimePoints = 2; 
          } 

        }

        const data = {
            userId: betting.userId,
            matchId: match._id,
            firstHalfPoints: firstHalfPoints,
            secondHalfPoints: secondHalfPoints,
            overtimePoints: overtimePoints,
            firstHalfHitWinner: firstHalfHitWinner,
            secondHalfHitWinner: secondHalfHitWinner,
            overtimeHitWinner: overtimeHitWinner,
            firstHalfHitResult: firstHalfHitResult,
            secondHalfHitResult: secondHalfHitResult,
            overtimeHitResult: overtimeHitResult,
            matchDate: match.date,
            totalPoints: firstHalfPoints + secondHalfPoints + overtimePoints
        };

        const matchFinal = new MatchFinal(data);
              try{
                const response = await matchFinal.save();
                if(response){
                    console.log("betting has been added");
                }
              }catch(errors){
                  console.log("betting errors",errors);
              }
      });
  }catch(errors){
      console.log("generate match finals errors",errors);
  }
}

module.exports = router;
