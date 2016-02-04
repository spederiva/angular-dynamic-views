
 var src = function(){

 }
 srv.prototype.doSomething = function(){

 }

 var src3 = function(){

 }
 src3.prototype = new src();
 src3.prototype.somethingNew = function(){

 }

module.value("myVal", {
    xxx: 111
});

module.const("myConst", 1111);



module.service("srv", function () {

    this.getUsers = function () {

    }

});

module.service("srv2", src)
module.service("srv3", src3)


module.factory("factory", function () {

    var retVal;
    //arg1 and arg2 are external arguments
    if (arg1)
        retVal.getUsers = function () {
        };
    if (arg2)
        retVal.getCars = function () {
        };


    return {
        xxx: function () {

        }
    };

});

module.provider("myPrv", function () {
    var apiurl = "";
    this.config = function (url) {
        apiurl = url;
    }

    this.$get = function () {
        return {
            qqq: function () {

            }
        }
    }
})
