'use strict';

const API_PREFIX = '/api/research'

module.exports = function(app){

	const controller = require('../controllers/researchController.js')

	app.route(API_PREFIX)
		.get(controller.getActiveResearch)
		.post(controller.newResearch);

	app.route(API_PREFIX + '/all')
		.get(controller.getAllReseach);

	app.route(API_PREFIX + '/:researchId')
		.get(controller.getResearch)
		.put(controller.updateResearch)
		.delete(controller.deleteResearch);
}