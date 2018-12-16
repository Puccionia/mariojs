import {Sides} from './Entity.js';

export default class EntityCollider {
    constructor(entities) {
        this.entities = entities;
    }

    check(subject) {
        this.entities.forEach(candidate => {
            if (subject === candidate) {
                return;
            }

            if (subject.bounds.overlaps(candidate.bounds)) {
                subject.collides(candidate);
                candidate.collides(subject);
            }
        });
    }

    checkX(subject) {
        this.entities.forEach(candidate => {
            if (subject === candidate) {
                return;
            }

            if (subject.vel.x > 0) {
                if (subject.bounds.overlaps(candidate.bounds)) {
                    subject.collides(candidate, Sides.RIGHT);
                  //  candidate.collides2(Sides.LEFT, candidate);
                }
            } else if (subject.vel.x < 0) {
                if (subject.bounds.overlaps(candidate.bounds)) {
                    subject.collides(candidate, Sides.LEFT);
                //    candidate.collides2(Sides.RIGHT, candidate);
                }
            }
        });
    }

    checkY(subject) {
        this.entities.forEach(candidate => {
            if (subject === candidate) {
                return;
            }

            if (subject.vel.y > 0) {
                if (subject.bounds.overlaps(candidate.bounds)) {
                    subject.collides(candidate, Sides.BOTTOM);
                }
            } else if (subject.vel.y < 0) {
                if (subject.bounds.overlaps(candidate.bounds)) {
                    subject.collides(candidate, Sides.TOP);
                }
            }
        });
    }

}
