const { Router } = require ('express');

const controller = require ('./controllers.js');


const router = Router ();

router.post ('/', controller.makeCretential);

module.exports = router;
