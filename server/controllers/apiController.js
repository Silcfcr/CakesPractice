const { cakeModel } = require('../models/cakeModel');
const { commentModel } = require('../models/commentModel')


const APIController = {
    getAll: function (request, response) {
        cakeModel.getAll()
            .then(tasks => {
                response.status(200).json(tasks);
            });
    },
    getOne: function (request, response) {
        let id = request.params.id;

        cakeModel.getOneById({ _id: id })
            .then(data => {
                console.log(id, data);
                response.status(200).json(data);
            });
    },
    addNew: function (request, response) {
        let { baker, imageUrl } = request.body;

        if (baker && imageUrl) {
            let newCake = {
                baker,
                imageUrl
            };
            console.log(newCake);

            cakeModel
                .create(newCake)
                .then(data => {
                    response.status(201).json(data);
                });
        }
        else {
            response.statusMessage = "You are missing a field to create a new cake";
            response.status(406).end();
        }
    },
    deleteOne: function (request, response) {
        let id = request.params.id;
        console.log(id);

        cakeModel
            .getOneById({ _id: id })
            .then(data => {
                console.log(data);
                if (data === null) {
                    throw new Error("That cake doesn't exist");
                }
                else {
                    cakeModel
                        .deleteOne({ _id: id })
                        .then(result => {
                            console.log("I got here")
                            response.status(204).end();
                        });
                }
            })
            .catch(error => {
                console.log("Error")
                response.statusMessage = error.message;
                response.status(404).end();
            })

    },
    updateOne: function (request, response) {
        let { baker, imageUrl } = request.body;
        let id = request.params.id;

        let fieldsToUpdate = {}

        if (baker) {
            fieldsToUpdate.baker = baker;
        }

        if (imageUrl) {
            fieldsToUpdate.imageUrl = imageUrl;
        }

        if (Object.keys(fieldsToUpdate).length === 0) {
            response.statusMessage = "You need to provide at least one of the following fields to update the cake";
            response.status(406).end();
        }
        else {
            // fieldsToUpdate.updated_at = Date.now;
            cakeModel
                .getOneById({ _id: id })
                .then(data => {
                    if (data === null) {
                        throw new Error("That cake id doesn't exist");
                    }
                    else {
                        cakeModel
                            .updateOne(id, fieldsToUpdate)
                            .then(result => {
                                response.status(202).json(result);
                            });
                    }
                })
                .catch(error => {
                    response.statusMessage = error.message;
                    response.status(404).end();
                })

        }
    },
    addNewComment: function (request, response) {
        console.log("im getting here")
        let { stars, comment } = request.body;
        let id = request.params.id;
        if (stars && comment) {
            let newComment = {
                stars,
                comment
            };
            console.log(newComment);

            commentModel
                .createComment(newComment)
                .then(data => {
                    cakeModel
                .AddCommentToCake(id, newComment)
                .then(data => {
                    if (data === null) {
                        throw new Error("Error adding comment to cake");
                    }
                    else {
                        response.status(201).json(data);
                    }
                });
                    response.status(201).json(data);
                });
            
        }
    else {
        response.statusMessage = "You are missing a field to create a new cake";
        response.status(406).end();
        }
    }
}

module.exports = { APIController };


