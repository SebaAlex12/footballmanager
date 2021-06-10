const express = require("express");
const router = express.Router();
const passport = require("passport");

const moment = require("moment");

// Match Model
const Match = require("../../models/Match");

// Validation
const validateMatchInput = require("../../validation/match");

// @route GET api/matches/test
// @desc test match route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "matches works" }));

// @route GET api/matches/imports
// @desc test match route
// @access Public
router.post("/imports", (req, res) => {

    const matches = JSON.parse(req.body.imports);
    matches.forEach( item = (item) => {

      // explode item line
      const elements = item["line"].split(";");

      console.log("elements",elements);

      const dateFormat = moment(
        `${elements[0]} ${elements[2]}`,
        "YYYY-MM-DD HH:mm:ss"
      ).format();
  
      const newMatch = new Match({
        firstTeamName: elements[1],
        secondTeamName: elements[3],
        firstTeamFirstHalfGoals:0,
        firstTeamSecondHalfGoals:0,
        secondTeamFirstHalfGoals:0,
        secondTeamSecondHalfGoals:0,
        date: dateFormat,
        disabled: 0,
        closed: 0
      });
      console.log(newMatch);
      newMatch
        .save()
        .then(match => res.json(match))
        .catch(err => res.status(400).json({ matchnotadd: "matchnotadd" }));

    });

});

// @route GET api/matches
// @desc get matches
// @access Public
router.get("/", async(req, res) => {
  try{
    const matches = await Match.find({}, null, {
        sort: { date: "asc" },
    });
    if(matches){
      return res.json(matches);
    }
  }catch(err){
    return res.status(404).json({ nomatchesfound: `No matches found` });
  }
  // Match.find()
  //   .sort({ date: -1 })
  //   .then(matches => res.json(matches))
  //   .catch(err => res.status(404).json({ nomatchesfound: `No matches found` }));
});

// @route GET api/matches/:id
// @desc get match by id
// @access Public
router.get("/:id", (req, res) => {
  Match.findById(req.params.id)
    .then(match => res.json(match))
    .catch(err =>
      res.status(404).json({ nomatchfound: `No match found with id` })
    );
});

// @route GET api/matches/current/:id
// @desc get match id
// @access Public
router.get("/current/:id", (req, res) => {
  // console.log(req.params.id);
  Match.findById(req.params.id)
    .then(match => res.json(match))
    .catch(err =>
      res.status(404).json({ nomatchfound: `No match found with id` })
    );
});

// @route POST api/matches/betting/:id
// @desc Add betting to match
// @access Private
router.post(
  "/betting/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // console.log(req.params.id);
    Match.findById(req.params.id)
      .then(match => {
        const newBetting = {};
        newBetting.userId = req.user.id;
        newBetting.userName = req.user.name;

        newBetting.firstTeamFirstHalfGoals =
          req.body.firstTeamFirstHalfGoals === ""
            ? 0
            : req.body.firstTeamFirstHalfGoals;
        newBetting.firstTeamSecondHalfGoals =
          req.body.firstTeamSecondHalfGoals === ""
            ? 0
            : req.body.firstTeamSecondHalfGoals;
        newBetting.secondTeamFirstHalfGoals =
          req.body.secondTeamFirstHalfGoals === ""
            ? 0
            : req.body.secondTeamFirstHalfGoals;
        newBetting.secondTeamSecondHalfGoals =
          req.body.secondTeamSecondHalfGoals === ""
            ? 0
            : req.body.secondTeamSecondHalfGoals;

        let UserBettingExists = false;

        // match.bettings = match.bettings.filter(betting => {
        //   betting.userId !== req.user.id;
        // });

        match.bettings.map(betting => {
          if (req.user.id == betting.userId) {
            UserBettingExists = true;

            //     console.log("user betting exists");

            betting.firstTeamFirstHalfGoals =
              newBetting.firstTeamFirstHalfGoals;
            betting.firstTeamSecondHalfGoals =
              newBetting.firstTeamSecondHalfGoals;
            betting.secondTeamFirstHalfGoals =
              newBetting.secondTeamFirstHalfGoals;
            betting.secondTeamSecondHalfGoals =
              newBetting.secondTeamSecondHalfGoals;
          }
        });

        if (!UserBettingExists) {
          match.bettings.unshift(newBetting);
        }

        match.save().then(match => res.json(match));
      })
      .catch(err => res.status(404).json({ matchnotfound: "match not found" }));
  }
);

// @route POST api/matches
// @desc create match
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateMatchInput(req.body);

    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const dateFormat = moment(
      `${req.body.date} ${req.body.time}`,
      "YYYY-MM-DD HH:mm:ss"
    ).format();

    const newMatch = new Match({
      user: req.user.id,
      firstTeamName: req.body.firstTeamName,
      secondTeamName: req.body.secondTeamName,
      firstTeamFirstHalfGoals:
        req.body.firstTeamFirstHalfGoals === ""
          ? 0
          : req.body.firstTeamFirstHalfGoals,
      firstTeamSecondHalfGoals:
        req.body.firstTeamSecondHalfGoals === ""
          ? 0
          : req.body.firstTeamSecondHalfGoals,
      secondTeamFirstHalfGoals:
        req.body.secondTeamFirstHalfGoals === ""
          ? 0
          : req.body.secondTeamFirstHalfGoals,
      secondTeamSecondHalfGoals:
        req.body.secondTeamSecondHalfGoals === ""
          ? 0
          : req.body.secondTeamSecondHalfGoals,
      date: dateFormat,
      disabled: 0,
      closed: 0
    });
    // console.log(newMatch);
    newMatch
      .save()
      .then(match => res.json(match))
      .catch(err => res.status(400).json({ matchnotadd: "matchnotadd" }));
  }
);

// @route POST api/matches/update/:id
// @desc update match
// @access Private
router.post(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // const { errors, isValid } = validateMatchInput(req.body);

    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }
    
    Match.findById(req.params.id)
      .then(match => {
        if (req.body.firstTeamFirstHalfGoals)
          match.firstTeamFirstHalfGoals = req.body.firstTeamFirstHalfGoals;
        if (req.body.firstTeamSecondHalfGoals)
          match.firstTeamSecondHalfGoals = req.body.firstTeamSecondHalfGoals;
        if (req.body.secondTeamFirstHalfGoals)
          match.secondTeamFirstHalfGoals = req.body.secondTeamFirstHalfGoals;
        if (req.body.secondTeamSecondHalfGoals)
          match.secondTeamSecondHalfGoals = req.body.secondTeamSecondHalfGoals;
        if (typeof req.body.disabled !== 'undefined') match.disabled = req.body.disabled;
        if (typeof req.body.closed !== 'undefined') match.closed = req.body.closed;

        match
          .save()
          .then(match => res.json(match))
          .catch(err =>
            res.status(404).json({ matchdontsave: "match dont save" })
          );
      })
      .catch(err => res.status(404).json({ matchnotfound: "match not found" }));
  }
);

// @route DELETE api/matches/:id
// @desc delete match id
// @access Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Match.deleteOne({ _id: req.params.id })
      .then(match => res.json(match))
      .catch(err =>
        res.status(404).json({ nomatchfound: `No match found with id` })
      );
    // Match.findById(req.params.id)
    //   .then(match => {
    //     match.remove().then(() => res.json({ success: true }));
    //   })
    //   .catch(err => res.status(404).json({ postnotfound: "No match found" }));
  }
);

module.exports = router;
