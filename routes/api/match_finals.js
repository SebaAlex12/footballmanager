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
    .sort({ date: -1 })
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
      matches.forEach( match = async(match) => {
          try{
            const data = generateMatchFinals(match);
            // console.log("generate match finsals data", data);
          }catch(errors){
            console.log("add finals errors", errors);
          }
      })
      // console.log("matches",matches);
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
        let firstHalfHitWinner = 0;
        let secondHalfHitWinner = 0;
        let firstHalfHitResult = 0;
        let secondHalfHitResult = 0;

        // first and second half match winner
        let firstHalfWinner = {
          firstTeam: 0,
          secondTeam: 0
        };

        let secondHalfWinner = {
          firstTeam: 0,
          secondTeam: 0
        };

        // first and second half betting winner
        let firstHalfBettingWinner = {
          firstTeam: 0,
          secondTeam: 0
        };

        let secondHalfBettingWinner = {
          firstTeam:0,
          secondTeam:0
        }

        // who won first and who won second half in match
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
        
        // who won first and who won second half in betting
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

        const data = {
            userId: betting.userId,
            matchId: match._id,
            firstHalfPoints: firstHalfPoints,
            secondHalfPoints: secondHalfPoints,
            firstHalfHitWinner: firstHalfHitWinner,
            secondHalfHitWinner: secondHalfHitWinner,
            firstHalfHitResult: firstHalfHitResult,
            secondHalfHitResult: secondHalfHitResult,
            date: match.date,
            totalPoints: firstHalfPoints + secondHalfPoints
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
