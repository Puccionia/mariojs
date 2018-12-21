import Entity, {Sides, Trait} from '../Entity.js';
import Solid from '../traits/Solid.js';
import Interactive from '../traits/Interactive.js';
import Physics from '../traits/Physics.js';



class Behavior extends Trait {
    constructor() {
        super('behavior');

        

    }

}

export function createQuestionFactory(sprite) {

    function routeFrame(question) {
       
        if(question.interactive.moving === true || question.interactive.hitten === true){
            return 'hitten';
        }

        
        return 'nothing';
    }

    function drawQuestion(context) {
        sprite.draw(routeFrame(this), context, 0, 0);
    }

    return function createQuestion() {
        const question = new Entity();
        question.size.set(10, 16);
        
        question.offset.x = 3;

        question.addTrait(new Solid());
        question.addTrait(new Physics());
        question.addTrait(new Interactive());
        question.addTrait(new Behavior());


        question.solid.tileObstructs = false;
        question.solid.entityCollides = false;
        question.physics.enableGravity = false;
        question.interactive.spriteAfterMove = 'hitten';

        question.draw = drawQuestion;
        return question;
    }
}