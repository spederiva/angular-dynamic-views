Function.prototype.clone = function() {
    var that = this;
    var temp = function temporary() { return that.apply(this, arguments); };
    for( key in this ) {
        temp[key] = this[key];
    }

    for(pkey in that.prototype){
        temp.prototype[pkey] = that.prototype[pkey].clone();
    }

    return temp;
};
