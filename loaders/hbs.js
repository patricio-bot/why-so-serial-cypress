function registerHelpers(hbsModule) {
    hbsModule.registerHelper('ifeq', function (a, b, options) {
        if (a === b) {
            return options.fn(this);
        }
        return options.inverse(this);
    });
    hbsModule.registerHelper('ifneq', function (a, b, options) {
        if (a !== b) {
            return options.fn(this);
        }
        return options.inverse(this);
    });
    hbsModule.registerHelper('ifeqId', function (a, b, options) {
        if (a.equals(b)) {
            return options.fn(this);
        }
        return options.inverse(this);
    });
    hbsModule.registerHelper('ifneqId', function (a, b, options) {
        if (!a.equals(b)) {
            return options.fn(this);
        }
        return options.inverse(this);
    });
    hbsModule.registerHelper('ifinc', function (array, value, options) {
        if (array.includes(value)) {
            return options.fn(this);
        }
        return options.inverse(this);
    });
    hbsModule.registerHelper('ifIndexLessThan3', function (index, options) {
        if (index < 3) {
            return options.fn(this);
        }
        return options.inverse(this);
    });
    hbsModule.registerHelper('incremented', function (index) {
        index++;
        return index;
    });
    //Date time format
    hbsModule.registerHelper('dateFormat', require('handlebars-dateformat'));
}
module.exports = registerHelpers;
