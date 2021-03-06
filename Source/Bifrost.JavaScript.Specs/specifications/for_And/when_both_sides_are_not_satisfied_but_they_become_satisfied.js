﻿describe("when both sides are not satisfied but they become satisfied", function () {
    
    var leftHandSideEvaluator = ko.observable(false);
    var leftHandSide = Bifrost.specifications.Specification.create()
    leftHandSide.evaluator = leftHandSideEvaluator;

    var rightHandSideEvaluator = ko.observable(false);
    var rightHandSide = Bifrost.specifications.Specification.create();
    rightHandSide.evaluator = rightHandSideEvaluator;

    var instance = { something: 42 };
    var rule = Bifrost.specifications.And.create({
        leftHandSide: leftHandSide,
        rightHandSide: rightHandSide
    });
    rule.evaluate(instance);

    var result = false;
    rule.isSatisfied.subscribe(function (newValue) {
        result = newValue;
    });
    result = false;

    leftHandSideEvaluator(true);
    rightHandSideEvaluator(true);

    it("should be considered satisfied", function () {
        expect(result).toBe(true);
    });
});