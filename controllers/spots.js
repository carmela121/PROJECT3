var Spot = require('../models/spot');

function spotsIndex (req, res) {
  Spot.find(function(err, spots) {
    if(err) return res.status(500).json({ message: err });
    return res.status(200).json({ spots: spots });
  });
}

  function spotshow (req, res) {
    Spot.findById(req.params.id, function(err, spot) {
      if(err) return res.status(500).json({ message: err });
      return res.status(200).json({ spot: spot });
    });
  }

  function spotUpdate (req, res) {
    Spot.findByIdAndUpdate(req.params.id, req.body.spot, { new: true}, function(err, spot) {
      if(err) return res.status(500).json({ message: err });
      return res.status(200).json({ spot: spot });
    });
  }

  function spotDelete (req, res) {
    Spot.findByIdAndRemove(req.params.id, function(err) {
      if(err) return res.status(500).json({ message: err });
      return res.status(204).send();
    });
  }

  module.exports = {
    index: spotsIndex,
    show: spotsShow,
    update: spotsUpdate,
    delete: spotsDelete
  };