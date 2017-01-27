import PubSub from 'pubsub-js';

export default class TratadorErros {

    publicaErros(erros) {
        erros.errors.forEach(function(erro) {
            let msgError = {message: erro.defaultMessage, field: erro.field};
            PubSub.publish('erro-validacao', msgError);
        }, this);
    }
}