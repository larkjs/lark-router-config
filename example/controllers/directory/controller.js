'use strict';

class Controller {

    async main(ctx) {
        ctx.body = 'Controller';
    }

}

Controller.isClass = true;

exports.get = Controller;
