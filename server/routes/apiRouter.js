const express = require( 'express' );
const {APIController} = require( './../controllers/apiController' );
const APIRouter = express.Router();

APIRouter
    .route( '/' )
    .get( APIController.getAll)
    .post(APIController.addNew);
APIRouter
    .route('/:id')
    .get(APIController.getOne)
    .delete(APIController.deleteOne );

APIRouter
    .put( '/:id', APIController.updateOne );
APIRouter
    .post( '/:id', APIController.addNewComment );

module.exports = { APIRouter };