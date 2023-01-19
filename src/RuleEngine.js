
const rulesGroup = {
    "and": "&&",
    "or": "||"
}
module.exports = class RuleEngine {

    constructor(rules, logger) {
        this.rules = rules
        this.logger = logger

    }

    addActions(actions) {
        this.actions = actions;
        return this;
    }

    constructRule(operator, conditions, data) {
        let exp = ``;
        for (const cond of conditions) {
            let { key, operation, value } = cond;
            if (exp) exp += ` ${operator} `;
            exp += `${data[key]} ${operation} ${value}`;
        }
        this.logger.info(["constructRule", exp])

        return `return ${exp}`;
    }


    trigerAction(ruleResult) {
        let action = this.actions[ruleResult];
        //TODO can we handle action in the future maybe it's a function
        //for ex send SMS or upate status etc  ...
        action ? this.logger.info(["trigerAction", ruleResult,"action:", action]) :
            this.logger.info(["trigerAction", ruleResult, "no action"])
    }

    getRuleGropeOperation(operation) {
        return rulesGroup[operation];
    }

    executeRule(ruleEquation) {
        try {
            return new Function(ruleEquation)()

        } catch (ex) {
            this.logger.error("ex:executeRule>>>>>>>.", ex.message)
            return false
        }
    }
    validate(data) {
        for (let rule of this.rules) {
            //  this.logger.info(["rule:", rule])
            let [operator, conditions] = Object.entries(rule)[0];
            //   this.logger.info(["operators:", operator])
            operator = this.getRuleGropeOperation(operator)
            if (!operator) throw 'enter valid operator';
            let ruleEquation = this.constructRule(operator, conditions, data)
            let result = this.executeRule(ruleEquation);
            this.trigerAction(result)
        }

    }

    start(data) {
        return this.validate(data);
    }
}