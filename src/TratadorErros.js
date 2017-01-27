import PubSub from 'pubsub-js';

export default class TratadorErros {

    publicaErros(erros) {
        erros.errors.forEach(function(erro) {
            let msg = erro.defaultMessage;
            PubSub.publish('erro-validacao', msg);
        }, this);
    }
}