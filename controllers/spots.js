var Spot = require('../models/spot');

function spotsIndex (req, res) {
  Spot.find(function(err, spots) {
    if(err) return res.status(500).json({ message: err });
    return res.status(200).json({ spots: spots });
  });
}

function spotsCreate(req, res){
  Spot.create(req.body.spot, function(err,spot){
    if(err) return res.status(500).send(err);
    return res.status(200).json({message: "added to db"});
   })
}


  function spotsShow (req, res) {
    Spot.findById(req.params.id, function(err, spot) {
      if(err) return res.status(500).json({ message: err });
      return res.status(200).json({ spot: spot });
    });
  }

  function spotsUpdate (req, res) {
    console.log(req.body);
    Spot.findByIdAndUpdate(req.params.id, req.body.spot, { new: true}, function(err, spot) {
      if(err) return res.status(500).json({ message: err });
      return res.status(200).json({ spot: spot });
    });
  }

  function spotsDelete (req, res) {
    Spot.findByIdAndRemove(req.params.id, function(err) {
      if(err) return res.status(500).json({ message: err });
      return res.status(204).send();
    });
  }

  module.exports = {
    index: spotsIndex,
    create: spotsCreate,
    show: spotsShow,
    update: spotsUpdate,
    delete: spotsDelete
  };
