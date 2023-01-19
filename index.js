const data = require('./data/data.json')
const { rules, actions } = require('./data/rule.json')
const RuleEngine = require('./src//RuleEngine')
const Logger = require('./src/Logger')

console.log(Logger)
new RuleEngine(rules, new Logger())
    .addActions(actions)
    .start(data)