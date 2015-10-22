'use strict';

const SEQUENCE_LENGTH = 20;

function Sequence() {
    this.sequence = [];
}

Sequence.prototype.generate = function(begin, operation) {
    this.sequence = [];
    for (let i = 1; i <= SEQUENCE_LENGTH; i++) {
        switch (operation) {
            case 'add':
                this.sequence.push(begin + i);
                break;
            case 'multiply':
                this.sequence.push(begin * i);
                break;
            case 'power':
                this.sequence.push(Math.pow(begin, i));
                break;            
        }
    }
    return this.sequence;
}

Sequence.prototype.transform = function(number, operation) {
    switch (operation) {
        case 'add':
            this.sequence = this.sequence.map(function(value) { return value + number; } );
            break;
        case 'multiply':
            this.sequence = this.sequence.map(function(value) { return value * number; } );
            break;
        case 'power':
            this.sequence = this.sequence.map(function(value) { return Math.pow(value, number); } );
            break;            
    }
    return this.sequence;
}

Sequence.prototype.decimalToOther = function(base) {
    this.sequence = this.sequence.map(function(value) { return +value.toString(base); });
    return this.sequence;
}

Sequence.prototype.alternate = function(otherSeq) {
    let newSeq = [];
    for (let i = 0; i < SEQUENCE_LENGTH / 2; i++) {
        newSeq.push(this.sequence[i]);
        newSeq.push(otherSeq[i]);
    }
    return newSeq; // or should it change this.seq and return that???
}

//apply each element of a sequence to this.seq using selected operation
Sequence.prototype.apply = function(seqToApply, operation) {
    switch (operation) {
        case 'add':
            this.sequence = this.sequence.map(function(value, index) { return value + seqToApply[index]; } );
            break;
        case 'multiply':
            this.sequence = this.sequence.map(function(value, index) { return value * seqToApply[index]; } );
            break;
        case 'power':
            this.sequence = this.sequence.map(function(value, index) { return Math.pow(value, seqToApply[index]); } );
    }
    return this.sequence;
}



module.exports = Sequence;