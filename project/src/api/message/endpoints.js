const { Router } = require ('express');

const controller = require ('./controllers.js');
const { auth } = require ('../../middlewares');


const router = Router ();

router.post ('/message', auth.required, controller.saveNewMessage);
router.get  ('/message/:id', auth.required, controller.fetchMessageByID);
router.get  ('/messages/:tag', auth.required, controller.fetchMessagesByTag);

module.exports = router;
