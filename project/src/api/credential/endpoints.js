const { Router } = require ('express');

const controller = require ('./controllers.js');


const router = Router ();

router.put ('/', controller.saveCretential);

module.exports = router;
