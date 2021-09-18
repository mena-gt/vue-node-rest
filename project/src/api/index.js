const { Router } = require ('express');

const { routes: authnRoutes } = require ('./authn');
const { routes: credentialRoutes } = require ('./credential');
const { routes: messageRoutes } = require ('./message');


const router = Router ();

router.use ('/authorize', authnRoutes);
router.use ('/credential', credentialRoutes);
router.use ('/', messageRoutes);

module.exports = router;