const data = require('./data.json')
const { rules, actions } = require('./rule.json')
const RuleEngine = require('./RuleEngine')
const Logger = require('./Logger')

console.log(Logger)
new RuleEngine(rules, new Logger())
    .addActions(actions)
    .start(data)